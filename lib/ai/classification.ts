import { AIClassification, TaskCategory } from "./types";

/**
 * Intelligent Request Classifier for oncology queries.
 * Determines the clinical task category, key medical terms, and emergency triage signals.
 */
export function classifyRequest(prompt: string, taskHint?: string): AIClassification {
  const text = prompt.toLowerCase();
  const detectedTerms: string[] = [];

  // Emergency Triage Keywords (e.g. Neutropenic Fever post-chemo, severe hemorrhage, acute respiratory distress)
  const emergencyKeywords = [
    "fever during chemo",
    "high fever",
    "temperature 101",
    "temperature 102",
    "temperature 103",
    "temperature 38",
    "temperature 39",
    "coughing blood",
    "severe chest pain",
    "cannot breathe",
    "sudden breathlessness",
    "heavy bleeding",
    "uncontrolled bleeding",
    "emergency",
  ];

  const isEmergencyRisk = emergencyKeywords.some((keyword) => {
    if (text.includes(keyword)) {
      detectedTerms.push(keyword);
      return true;
    }
    return false;
  });

  if (isEmergencyRisk) {
    return {
      category: "emergency_triage",
      confidence: 0.98,
      detectedTerms,
      isEmergencyRisk: true,
    };
  }

  // Pathology / Report decoding markers
  const reportMarkers = [
    "biopsy",
    "histopathology",
    "ihc",
    "immunohistochemistry",
    "receptor",
    "er positive",
    "pr positive",
    "her2",
    "egfr",
    "kras",
    "braf",
    "alk",
    "pd-l1",
    "tnm",
    "pt1",
    "pt2",
    "pt3",
    "pt4",
    "n0",
    "n1",
    "n2",
    "m0",
    "m1",
    "gleason",
    "birads",
    "margins",
    "grade 1",
    "grade 2",
    "grade 3",
    "carcinoma",
    "adenocarcinoma",
    "specimen",
    "report",
    "decode",
  ];

  reportMarkers.forEach((term) => {
    if (text.includes(term)) detectedTerms.push(term);
  });

  // Appointment preparation
  const appointmentMarkers = [
    "question",
    "prepare",
    "first visit",
    "consultation",
    "ask doctor",
    "ask oncologist",
    "checklist",
    "second opinion",
    "appointment",
  ];

  appointmentMarkers.forEach((term) => {
    if (text.includes(term)) detectedTerms.push(term);
  });

  // Financial and Insurance navigation
  const financialMarkers = [
    "insurance",
    "ayushman bharat",
    "cashless",
    "tpa",
    "pre-auth",
    "preauthorization",
    "cost",
    "estimate",
    "claim",
    "daycare",
  ];

  financialMarkers.forEach((term) => {
    if (text.includes(term)) detectedTerms.push(term);
  });

  // Specialist matching
  const specialistMarkers = [
    "specialist",
    "oncologist",
    "hospital",
    "surgeon",
    "radiation doctor",
    "doctor in",
    "find doctor",
    "tata memorial",
    "manipal",
    "apollo",
  ];

  specialistMarkers.forEach((term) => {
    if (text.includes(term)) detectedTerms.push(term);
  });

  // Treatment journey understanding
  const journeyMarkers = [
    "chemotherapy",
    "radiation",
    "immunotherapy",
    "targeted therapy",
    "tumor board",
    "pet-ct",
    "pet scan",
    "surgery",
    "staging",
    "survivorship",
    "side effects",
  ];

  journeyMarkers.forEach((term) => {
    if (text.includes(term)) detectedTerms.push(term);
  });

  // Task hint priority if user explicitly selected a task tab
  if (taskHint === "report" || (detectedTerms.some((t) => reportMarkers.includes(t)) && detectedTerms.length >= 2)) {
    return {
      category: "report_decode",
      confidence: 0.9,
      detectedTerms,
      isEmergencyRisk: false,
    };
  }

  if (taskHint === "appointment" || detectedTerms.some((t) => appointmentMarkers.includes(t))) {
    return {
      category: "appointment_prep",
      confidence: 0.88,
      detectedTerms,
      isEmergencyRisk: false,
    };
  }

  if (detectedTerms.some((t) => financialMarkers.includes(t))) {
    return {
      category: "financial_navigation",
      confidence: 0.85,
      detectedTerms,
      isEmergencyRisk: false,
    };
  }

  if (detectedTerms.some((t) => specialistMarkers.includes(t))) {
    return {
      category: "specialist_matching",
      confidence: 0.85,
      detectedTerms,
      isEmergencyRisk: false,
    };
  }

  if (taskHint === "journey" || detectedTerms.some((t) => journeyMarkers.includes(t))) {
    return {
      category: "journey_understanding",
      confidence: 0.82,
      detectedTerms,
      isEmergencyRisk: false,
    };
  }

  if (detectedTerms.length > 0) {
    return {
      category: "term_explanation",
      confidence: 0.75,
      detectedTerms,
      isEmergencyRisk: false,
    };
  }

  return {
    category: (taskHint as TaskCategory) || "general_query",
    confidence: 0.7,
    detectedTerms: [],
    isEmergencyRisk: false,
  };
}
