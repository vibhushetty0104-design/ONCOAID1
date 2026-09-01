import { AIProvider, AIRequest, AIResponse, AIClassification } from "../types";
import { ONCO_AID_SYSTEM_PROMPT, CLINICAL_DISCLAIMER } from "../safety";
import { MockAIProvider } from "./mock-provider";

/**
 * OpenAI & OpenAI-Compatible / Local Model Provider (Ollama, vLLM, LMStudio, Groq).
 * Connects to any standard /v1/chat/completions endpoint.
 */
export class OpenAICompatibleProvider implements AIProvider {
  name: string;
  private apiKey: string;
  private baseUrl: string;
  private model: string;

  constructor(apiKey?: string, baseUrl?: string, model?: string) {
    this.apiKey = apiKey || process.env.AI_API_KEY || "";
    this.baseUrl = (
      baseUrl ||
      process.env.AI_BASE_URL ||
      "https://api.openai.com/v1"
    ).replace(/\/$/, "");
    this.model = model || process.env.AI_MODEL || "gpt-4o-mini";
    this.name = this.baseUrl.includes("localhost") || this.baseUrl.includes("127.0.0.1")
      ? `Local Model (${this.model})`
      : `OpenAI / Compatible Provider (${this.model})`;
  }

  isAvailable(): boolean {
    const isLocal = this.baseUrl.includes("localhost") || this.baseUrl.includes("127.0.0.1");
    // Local endpoints like Ollama do not require API keys
    return isLocal || Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  async generateResponse(
    request: AIRequest,
    classification: AIClassification,
    knowledgeContext: string
  ): Promise<AIResponse> {
    if (!this.isAvailable()) {
      const mock = new MockAIProvider();
      return mock.generateResponse(request, classification, knowledgeContext);
    }

    try {
      const endpoint = `${this.baseUrl}/chat/completions`;

      const systemPrompt = `${ONCO_AID_SYSTEM_PROMPT}

Retrieved Clinical Domain Context:
${knowledgeContext || "General Oncology Reference Guidelines"}

Task Category: ${classification.category}
Detected Keywords: ${classification.detectedTerms.join(", ") || "None specified"}`;

      const messages: Array<{ role: string; content: string }> = [
        { role: "system", content: systemPrompt },
      ];

      if (request.conversationHistory && request.conversationHistory.length > 0) {
        request.conversationHistory.slice(-4).forEach((msg) => {
          messages.push({
            role: msg.role,
            content: msg.content,
          });
        });
      }

      messages.push({
        role: "user",
        content: request.prompt,
      });

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (this.apiKey) {
        headers["Authorization"] = `Bearer ${this.apiKey}`;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: this.model,
          messages,
          temperature: 0.3,
          max_tokens: 1024,
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        console.warn(`OpenAI-compatible API error (${res.status}): ${errText}. Falling back to knowledge base.`);
        const fallback = new MockAIProvider();
        return fallback.generateResponse(request, classification, knowledgeContext);
      }

      const data = (await res.json()) as {
        choices?: Array<{
          message?: {
            content?: string;
          };
        }>;
      };

      const generatedText = data?.choices?.[0]?.message?.content;

      if (!generatedText) {
        const fallback = new MockAIProvider();
        return fallback.generateResponse(request, classification, knowledgeContext);
      }

      const cleanMessage = generatedText.includes("Disclaimer") || generatedText.includes("Notice:")
        ? generatedText
        : `${generatedText}\n\n${CLINICAL_DISCLAIMER}`;

      return {
        message: cleanMessage,
        provider: this.name,
        category: classification.category,
        cached: false,
      };
    } catch (err) {
      console.warn("OpenAI-compatible provider failure, falling back to mock:", err);
      const fallback = new MockAIProvider();
      return fallback.generateResponse(request, classification, knowledgeContext);
    }
  }
}
