import { AIClassification, ClinicalSafetyResult } from "./types";

/**
 * Clinical Safety Guardrails and Emergency Triage.
 * Ensures the platform remains strictly educational, non-diagnostic, and non-prescriptive.
 */

export const ONCO_AID_SYSTEM_PROMPT = `You are ONCO-AID Assistant, an intelligent, empathetic oncology clinical navigation and educational decision-support companion for India.

Core Principles:
1. Calmer, human, and clear: Translate complex clinical terms (IHC biomarkers, TNM staging, histology grades) into plain, reassuring English with context.
2. Strict Educational Boundary: Never diagnose, prescribe, predict exact survival times, or replace a patient's treating oncologist.
3. Structured Output: Use clear headings (###), bullet points, and highlight 2-3 specific "Questions to ask your oncologist".
4. Indian Healthcare Context: When relevant, explain Indian multidisciplinary tumor boards, accredited cancer centers (e.g. Tata Memorial, Manipal, Apollo, Max, AIIMS), second opinion logistics, and insurance/TPA pre-authorization processes.
5. Clinical Safety: Always include a brief reminder that pathology and treatment decisions require review with their medical team.`;

export const CLINICAL_DISCLAIMER =
  "*Notice: ONCO-AID provides educational guidance and appointment preparation support. It does not provide medical diagnosis, prescribe treatments, or replace direct consultation with a qualified oncologist.*";

export function evaluateClinicalSafety(
  prompt: string,
  classification: AIClassification
): ClinicalSafetyResult {
  if (classification.isEmergencyRisk) {
    return {
      isSafe: false,
      requiresEmergencyNotice: true,
      emergencyNotice: `### Urgent Clinical Safety Alert

The symptoms you mentioned (such as fever during active chemotherapy, acute chest pain, sudden breathlessness, or heavy bleeding) require **immediate medical evaluation**:

- **If you are currently undergoing chemotherapy:** Fever above 100.5°F (38°C) can indicate neutropenic infection and is a medical emergency. Do not wait for an outpatient appointment.
- **Immediate Action:** Go directly to your treating hospital's 24/7 Emergency Department or Casualty wing immediately.
- **National Emergency Helpline (India):** Call **112** or **108** for ambulance support.
- **Contact Your Oncology Daycare Helpline:** Call the emergency contact number listed on your chemotherapy discharge card.

*Please seek immediate in-person clinical care right now.*`,
      disclaimer: CLINICAL_DISCLAIMER,
    };
  }

  return {
    isSafe: true,
    requiresEmergencyNotice: false,
    disclaimer: CLINICAL_DISCLAIMER,
  };
}

export function sanitizePrompt(prompt: string): string {
  // Truncate excessively long inputs and strip unsafe control characters
  return prompt
    .slice(0, 4000)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim();
}
