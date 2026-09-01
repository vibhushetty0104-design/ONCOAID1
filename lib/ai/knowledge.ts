import { AIClassification } from "./types";
import { reportTerms, cancerTypes, specialists } from "@/lib/data";

/**
 * Oncology Knowledge Base and Context Retrieval (RAG) Module.
 * Supplies grounded domain context for Indian cancer care navigation.
 */

export interface KnowledgeItem {
  id: string;
  topic: string;
  category: string;
  content: string;
  doctorQuestions: string[];
}

export const ONCOLOGY_KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: "kb-er-pr",
    topic: "ER / PR Hormone Receptors",
    category: "Biomarker",
    content:
      "Estrogen Receptor (ER) and Progesterone Receptor (PR) testing on breast tissue indicates whether hormone-blocking therapies (e.g. Tamoxifen, Aromatase Inhibitors) are effective. >1% is considered positive; high percentages (80-95%) strongly suggest hormone sensitivity.",
    doctorQuestions: [
      "What percentage of cells were ER/PR positive in my sample?",
      "Will endocrine therapy be combined with chemotherapy or given afterward?",
    ],
  },
  {
    id: "kb-her2",
    topic: "HER2 Protein Receptor",
    category: "Biomarker",
    content:
      "HER2 (Human Epidermal Growth Factor Receptor 2) is evaluated via IHC (0, 1+, 2+, 3+). Scores of 0 or 1+ are HER2-Negative. A score of 2+ is equivocal and requires FISH (Fluorescence In Situ Hybridization) test confirmation. A score of 3+ is HER2-Positive, opening access to targeted monoclonal antibodies (e.g. Trastuzumab/Pertuzumab).",
    doctorQuestions: [
      "Was my HER2 result definitive (0, 1+, or 3+), or is FISH testing needed?",
      "If HER2 positive, how many cycles of targeted therapy are recommended?",
    ],
  },
  {
    id: "kb-egfr-alk",
    topic: "EGFR & ALK Genomic Mutations in Lung Cancer",
    category: "Genomics",
    content:
      "In Non-Small Cell Lung Cancer (Adenocarcinoma), molecular testing checks for EGFR exon 19/21 mutations, ALK rearrangements, ROS1, and PD-L1. Positive EGFR mutations enable oral targeted tyrosine kinase inhibitors (e.g. Osimertinib) rather than immediate standard intravenous chemo.",
    doctorQuestions: [
      "Are all molecular next-generation sequencing (NGS) results back?",
      "Does my mutation profile favor oral targeted therapy as first-line?",
    ],
  },
  {
    id: "kb-tnm",
    topic: "TNM Staging System",
    category: "Staging",
    content:
      "TNM describes anatomical spread: T (Primary Tumor size/depth, T1-T4), N (Regional lymph node involvement, N0-N3), M (Distant metastasis, M0 or M1). 'pT' indicates pathological stage confirmed after surgical pathology review, whereas 'cT' is clinical stage based on scans and exam.",
    doctorQuestions: [
      "Is our current stage clinical (cTNM) or pathological (pTNM)?",
      "Do we need a baseline whole-body PET-CT to finalize staging?",
    ],
  },
  {
    id: "kb-tumor-board",
    topic: "Multidisciplinary Tumor Boards in India",
    category: "Care Coordination",
    content:
      "Leading Indian cancer institutes (e.g. Tata Memorial, Manipal, Apollo, Max, AIIMS) convene Tumor Boards where surgical oncologists, medical oncologists, radiation oncologists, radiologists, and histopathologists jointly debate complex patient cases to form a single consensus treatment plan.",
    doctorQuestions: [
      "Has my case been discussed in the hospital's multidisciplinary tumor board?",
      "What were the alternative surgical or systemic sequences considered?",
    ],
  },
  {
    id: "kb-insurance-india",
    topic: "Cancer Health Insurance & Cashless Pre-Authorization",
    category: "Financial Navigation",
    content:
      "In India, daycare chemotherapy and robotic oncology surgeries are covered under most comprehensive health insurance plans. Cashless pre-authorization typically requires 24-48 hours with the hospital TPA desk. Essential documents include the initial consultation note, histopathology report, and estimate letter from the oncologist.",
    doctorQuestions: [
      "Can your hospital TPA desk provide a formal cost estimate letter for pre-auth?",
      "Is chemotherapy billed under daycare package rates for cashless claims?",
    ],
  },
  {
    id: "kb-second-opinion",
    topic: "Second Opinions in Indian Oncology",
    category: "Second Opinion",
    content:
      "Seeking a second opinion is a standard and respected practice in oncology. Patients should collect their original physical biopsy glass slides and paraffin blocks from the primary lab for second histopathology review, along with DICOM imaging scan CDs.",
    doctorQuestions: [
      "What is the procedure to collect my biopsy paraffin blocks and slide recuts?",
      "Will the new center accept my existing PET-CT or request repeat imaging?",
    ],
  },
];

export function retrieveRelevantKnowledge(
  prompt: string,
  classification: AIClassification
): { contextText: string; doctorQuestions: string[] } {
  const query = prompt.toLowerCase();
  const matchedItems: KnowledgeItem[] = [];
  const doctorQuestions: string[] = [];

  ONCOLOGY_KNOWLEDGE_BASE.forEach((item) => {
    const isMatched =
      query.includes(item.topic.toLowerCase()) ||
      classification.detectedTerms.some((term) =>
        item.content.toLowerCase().includes(term) || item.topic.toLowerCase().includes(term)
      );

    if (isMatched) {
      matchedItems.push(item);
      item.doctorQuestions.forEach((q) => {
        if (!doctorQuestions.includes(q)) doctorQuestions.push(q);
      });
    }
  });

  // Fallback default knowledge if no specific match
  if (matchedItems.length === 0) {
    matchedItems.push(ONCOLOGY_KNOWLEDGE_BASE[3]); // TNM
    matchedItems.push(ONCOLOGY_KNOWLEDGE_BASE[4]); // Tumor Board
  }

  const contextText = matchedItems
    .map((item) => `[Topic: ${item.topic} (${item.category})]\n${item.content}`)
    .join("\n\n");

  return {
    contextText,
    doctorQuestions: doctorQuestions.slice(0, 4),
  };
}
