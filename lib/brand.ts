/**
 * Centralized Brand Configuration for ONCO—AID
 * 
 * Allows the brand name, tagline, AI companion name, accent colors,
 * and visual identity to be changed without rewriting visual components.
 */

export const brand = {
  name: "ONCO—AID",
  namePlain: "ONCO-AID",
  tagline: "Cancer care, made clearer.",
  subtagline: "Understand your diagnosis. Find the right care. Know what comes next.",
  shortDescription:
    "A clinical decision-support and navigation platform helping patients and families understand cancer, prepare for consultations, and find verified specialists.",
  
  // AI Companion Identity (Temporary until final character is designed)
  companion: {
    name: "Care Companion",
    systemName: "ONCO—AID AI",
    tagline: "Educational guidance grounded in clinical oncology frameworks",
    avatar: null, // Placeholder for future adult, calm care character
    status: "Active · Educational Guidance",
  },

  // Launch Geography
  launchCity: "Bengaluru",
  launchCountry: "India",
  verifiedHospitals: [
    "Manipal Hospital",
    "HCG Cancer Centre",
    "Mazumdar Shaw Cancer Centre, Narayana Health",
  ],

  // Color System Identity
  palette: {
    deepForest: "#063B36",
    deepForestDark: "#042220",
    warmIvory: "#F5F0E6",
    warmIvorySoft: "#FAF7F2",
    coral: "#E88970",
    coralDeep: "#B84A39",
    mint: "#7FD4D0",
    mintSoft: "#D7ECE3",
    sage: "#9EB8AC",
    darkTeal: "#0E4D48",
  },

  // Governance & Review
  governance: {
    lastReviewed: "August 2026",
    frameworks: "ICMR · NCCN · ESMO Guidelines",
    privacy: "Digital Personal Data Protection (DPDP) Act Aligned",
    disclaimer:
      "ONCO—AID provides educational guidance only. It does not diagnose, prescribe, or replace consultation with your oncologist. For medical emergencies, dial 112.",
  },
} as const;

export type BrandConfig = typeof brand;
