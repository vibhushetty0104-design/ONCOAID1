import { AIProvider, AIRequest, AIResponse, AIClassification } from "../types";
import { ONCO_AID_SYSTEM_PROMPT, CLINICAL_DISCLAIMER } from "../safety";
import { MockAIProvider } from "./mock-provider";

/**
 * Google Gemini Provider for ONCO-AID.
 * Communicates server-side via REST API with knowledge grounding and safety system instructions.
 */
export class GeminiProvider implements AIProvider {
  name = "Google Gemini (Grounded Clinical Assistance)";
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model?: string) {
    this.apiKey = apiKey;
    this.model = model || process.env.AI_MODEL || "gemini-1.5-flash";
  }

  isAvailable(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
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
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;

      const systemInstructionText = `${ONCO_AID_SYSTEM_PROMPT}

Retrieved Clinical Domain Context:
${knowledgeContext || "General Oncology Reference Guidelines"}

Specific Task Category: ${classification.category}
Detected Clinical Keywords: ${classification.detectedTerms.join(", ") || "None specified"}`;

      // Build conversation history contents
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      if (request.conversationHistory && request.conversationHistory.length > 0) {
        request.conversationHistory.slice(-4).forEach((msg) => {
          contents.push({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
          });
        });
      }

      // Add current user prompt
      contents.push({
        role: "user",
        parts: [{ text: request.prompt }],
      });

      const payload = {
        systemInstruction: {
          parts: [{ text: systemInstructionText }],
        },
        contents,
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1024,
        },
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        console.warn(`Gemini API error (${res.status}): ${errText}. Falling back to knowledge base.`);
        const fallback = new MockAIProvider();
        return fallback.generateResponse(request, classification, knowledgeContext);
      }

      const data = (await res.json()) as {
        candidates?: Array<{
          content?: {
            parts?: Array<{ text: string }>;
          };
        }>;
      };

      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedText) {
        const fallback = new MockAIProvider();
        return fallback.generateResponse(request, classification, knowledgeContext);
      }

      // Ensure standard disclaimer is appended
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
      console.warn("Gemini provider network failure, falling back to mock:", err);
      const fallback = new MockAIProvider();
      return fallback.generateResponse(request, classification, knowledgeContext);
    }
  }
}
