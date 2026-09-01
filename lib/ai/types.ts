/**
 * Core types for ONCO-AID AI Orchestration Layer.
 * Provider-agnostic domain interfaces.
 */

export type TaskCategory =
  | "report_decode"
  | "appointment_prep"
  | "journey_understanding"
  | "term_explanation"
  | "specialist_matching"
  | "financial_navigation"
  | "emergency_triage"
  | "general_query";

export interface AIClassification {
  category: TaskCategory;
  confidence: number;
  detectedTerms: string[];
  isEmergencyRisk: boolean;
}

export interface ClinicalSafetyResult {
  isSafe: boolean;
  requiresEmergencyNotice: boolean;
  emergencyNotice?: string;
  disclaimer: string;
}

export interface AIRequest {
  prompt: string;
  taskHint?: string;
  conversationHistory?: Array<{
    role: "user" | "assistant" | "system";
    content: string;
  }>;
  patientContext?: {
    cancerType?: string;
    stage?: string;
    city?: string;
  };
}

export interface AIResponse {
  message: string;
  provider: string;
  category: TaskCategory;
  cached?: boolean;
  suggestedFollowUps?: string[];
  doctorQuestions?: string[];
}

export interface AIProvider {
  name: string;
  isAvailable(): boolean;
  generateResponse(
    request: AIRequest,
    classification: AIClassification,
    knowledgeContext: string
  ): Promise<AIResponse>;
}
