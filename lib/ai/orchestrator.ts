import { AIRequest, AIResponse, AIProvider } from "./types";
import { classifyRequest } from "./classification";
import { evaluateClinicalSafety, sanitizePrompt } from "./safety";
import { retrieveRelevantKnowledge } from "./knowledge";
import { aiResponseCache } from "./cache";
import { aiRateLimiter } from "./rate-limiter";
import { MockAIProvider } from "./providers/mock-provider";
import { GeminiProvider } from "./providers/gemini-provider";
import { OpenAICompatibleProvider } from "./providers/openai-provider";

/**
 * Select the appropriate AI Provider based on server environment.
 */
function getSelectedProvider(): AIProvider {
  const providerType = (process.env.AI_PROVIDER || "mock").toLowerCase().trim();
  const apiKey = process.env.AI_API_KEY;

  if (providerType === "gemini" && apiKey) {
    const gemini = new GeminiProvider(apiKey);
    if (gemini.isAvailable()) return gemini;
  }

  if (providerType === "openai" || providerType === "local" || providerType === "custom") {
    const openai = new OpenAICompatibleProvider();
    if (openai.isAvailable()) return openai;
  }

  // Default provider (zero keys required, 100% self-contained)
  return new MockAIProvider();
}

/**
 * Main AI Orchestration Pipeline.
 * Request -> Rate Limit -> Sanitize -> Classify -> Safety Check -> Cache Check -> RAG -> Provider -> Cache Set -> Output
 */
export async function orchestrateAIRequest(
  request: AIRequest,
  clientId?: string
): Promise<{ success: boolean; response: AIResponse; status: number }> {
  // 1. Rate Limiting Check
  const rateLimit = aiRateLimiter.check(clientId || "anonymous");
  if (!rateLimit.allowed) {
    return {
      success: false,
      status: 429,
      response: {
        message: `### ⏳ Rate Limit Notice\n\nYou have made multiple requests in a short period. Please wait ${rateLimit.resetSeconds} seconds before sending another question.\n\nFor immediate emergency assistance, call **112**.`,
        provider: "ONCO-AID Rate Limiter",
        category: "general_query",
      },
    };
  }

  // 2. Input Sanitization
  const cleanPrompt = sanitizePrompt(request.prompt);
  if (!cleanPrompt) {
    return {
      success: false,
      status: 400,
      response: {
        message: "Please share a question or report excerpt to discuss.",
        provider: "ONCO-AID",
        category: "general_query",
      },
    };
  }

  // 3. Request Classification
  const classification = classifyRequest(cleanPrompt, request.taskHint);

  // 4. Clinical Safety & Emergency Evaluation
  const safety = evaluateClinicalSafety(cleanPrompt, classification);
  if (safety.requiresEmergencyNotice && safety.emergencyNotice) {
    return {
      success: true,
      status: 200,
      response: {
        message: safety.emergencyNotice,
        provider: "ONCO-AID Clinical Safety Triage",
        category: "emergency_triage",
      },
    };
  }

  // 5. Response Cache Check
  const cachedResponse = aiResponseCache.get(cleanPrompt, request.taskHint);
  if (cachedResponse) {
    return {
      success: true,
      status: 200,
      response: cachedResponse,
    };
  }

  // 6. Oncology Knowledge Retrieval (RAG Context)
  const { contextText, doctorQuestions } = retrieveRelevantKnowledge(
    cleanPrompt,
    classification
  );

  // 7. Provider Execution
  const provider = getSelectedProvider();
  const sanitizedRequest: AIRequest = {
    ...request,
    prompt: cleanPrompt,
  };

  const response = await provider.generateResponse(
    sanitizedRequest,
    classification,
    contextText
  );

  // Merge retrieved doctor questions if available
  if (doctorQuestions && doctorQuestions.length > 0 && !response.doctorQuestions) {
    response.doctorQuestions = doctorQuestions;
  }

  // 8. Cache Response
  aiResponseCache.set(cleanPrompt, response, request.taskHint);

  return {
    success: true,
    status: 200,
    response,
  };
}
