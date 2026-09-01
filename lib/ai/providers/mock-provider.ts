import { AIProvider, AIRequest, AIResponse, AIClassification } from "../types";
import { CLINICAL_DISCLAIMER } from "../safety";

/**
 * High-Fidelity Mock & Knowledge-Base AI Provider.
 * Provides rich, context-aware clinical educational guidance with zero external keys required.
 */
export class MockAIProvider implements AIProvider {
  name = "ONCO-AID Clinical Intelligence (Knowledge-Base Mode)";

  isAvailable(): boolean {
    return true;
  }

  async generateResponse(
    request: AIRequest,
    classification: AIClassification,
    knowledgeContext: string
  ): Promise<AIResponse> {
    const query = request.prompt.toLowerCase();
    const category = classification.category;

    let message = "";
    const doctorQuestions: string[] = [];
    const suggestedFollowUps: string[] = [];

    switch (category) {
      case "report_decode":
        message = `### 📋 Pathology & Biomarker Analysis

Here is a structured, plain-language translation of key elements from your report:

- **Tumor Subtype & Histological Grade:** Grade describes how abnormal the cancer cells look under a microscope compared to normal tissue. Grade 1 cells are well-differentiated (slower growing); Grade 2 is moderately differentiated; Grade 3 is poorly differentiated (more active).
- **Hormone & Protein Receptors (ER / PR / HER2):** These act as specific biological receptors. ER/PR positive tumors respond well to targeted endocrine blocking pills. HER2 3+ tumors benefit from targeted monoclonal antibody infusions (e.g. Trastuzumab).
- **Pathological Staging (TNM):**
  - **T (Tumor):** Size and direct depth of the primary tumor (e.g., T2 is between 2 cm and 5 cm).
  - **N (Nodes):** Status of regional lymph nodes (N0 indicates no microscopic nodal spread detected in sampled nodes).
  - **M (Metastasis):** Indicates absence (M0) or presence (M1) of spread to distant organs.

#### 💡 Questions to ask your Oncology Team:
1. *"Which specific biomarker and immunohistochemistry (IHC) results are final, and are any molecular or FISH tests still pending?"*
2. *"Based on my receptor profile, what sequence do you recommend between surgery first versus systemic treatment first?"*
3. *"Do you recommend a whole-body baseline staging scan (such as PET-CT) before we finalize the treatment plan?"*`;

        doctorQuestions.push(
          "Are any additional genomic tests (like Oncotype DX or MammaPrint) needed?",
          "How does my receptor status shape my medication options?"
        );
        suggestedFollowUps.push(
          "Explain difference between clinical stage (cTNM) and pathological stage (pTNM)",
          "What questions should I ask my surgical oncologist?"
        );
        break;

      case "appointment_prep":
        message = `### 📝 Preparing for Your Oncology Consultation

Entering a specialist consultation with a structured checklist helps you stay grounded, ask the right questions, and retain critical details.

#### 1. About Your Diagnosis & Biological Subtype
- *"Can you walk me through my exact tumor grade, stage, and biomarker report in plain language?"*
- *"Are there any further diagnostic scans (such as PET-CT, MRI, or genomic molecular testing) required before starting treatment?"*

#### 2. About Treatment Options & Tumor Board Review
- *"Has my case been evaluated by a multidisciplinary tumor board involving medical, surgical, and radiation specialists?"*
- *"What are the standard-of-care options versus clinical trial possibilities for my specific condition?"*

#### 3. About Daily Life, Side Effects & Support
- *"What side effects should I anticipate, and who is my immediate emergency contact if a fever or severe reaction occurs outside clinic hours?"*
- *"Can the hospital TPA / financial counseling desk provide an estimate for cashless insurance pre-authorization?"*

*Tip: Bring a trusted family member and a dedicated notebook to record medication schedules and direct clinician instructions.*`;

        doctorQuestions.push(
          "What is the primary curative or preventive goal of the recommended plan?",
          "What is our immediate timeline for beginning the first cycle of treatment?"
        );
        suggestedFollowUps.push(
          "How do second opinions work in Indian cancer hospitals?",
          "What documents should I carry to my first consultation?"
        );
        break;

      case "journey_understanding":
        message = `### 🔬 Understanding Treatment Modalities & Sequences

Modern cancer care often combines multiple therapies tailored to your tumor biology and staging:

- **Surgical Oncology:** Aims to resect the localized primary tumor with clear margins and sample sentinel lymph nodes to assess regional spread.
- **Medical Oncology (Systemic & Targeted):** Medications that circulate throughout the body to eliminate microscopic cells. This includes traditional chemotherapy, targeted molecular pills (e.g., EGFR/ALK inhibitors), and immunotherapy.
- **Radiation Oncology:** Delivers high-precision energy beams (e.g., IMRT, IGRT, CyberKnife, or Proton Beam) directly to the tumor site to neutralize residual cells while sparing adjacent organs.
- **Multidisciplinary Sequence:** In some cases, chemotherapy is given **before surgery** (neoadjuvant) to shrink the tumor, or **after surgery** (adjuvant) to reduce the likelihood of recurrence.

#### 💡 Discussion Prompt for Your Care Team:
*"In what exact sequence will these treatments be administered, and why is this order optimal for my specific tumor biology?"*`;

        doctorQuestions.push(
          "Will radiation therapy be needed after surgery?",
          "What supportive medications will prevent nausea and fatigue during treatment?"
        );
        suggestedFollowUps.push(
          "What is the difference between targeted therapy and chemotherapy?",
          "What should I expect during a chemotherapy daycare session?"
        );
        break;

      case "financial_navigation":
        message = `### 💳 Navigating Health Insurance & Cancer Care in India

Understanding billing, pre-authorization, and government coverage early helps prevent unexpected financial stress:

- **Cashless Pre-Authorization:** Private hospital TPA desks generally require 24 to 48 hours to process pre-auth requests. Ensure you have the doctor's prescription note, diagnosis summary, and estimated cost sheet.
- **Daycare Chemotherapy Coverage:** Most modern comprehensive health policies cover outpatient daycare chemotherapy sessions without requiring a 24-hour hospital admission.
- **Ayushman Bharat (PM-JAY) & State Schemes:** Government schemes provide substantial financial coverage for surgical and medical oncology packages at empaneled tertiary hospitals.
- **Discharge Summaries & Bills:** Always retain original pharmacy receipts, chemo vial barcodes, and itemized bill summaries for claim settlements.

#### 💡 Questions for the Hospital TPA Desk:
1. *"Is my health insurance provider empanelled for direct cashless claims at this facility?"*
2. *"Does the package estimate include supportive medications, anti-emetics, and post-chemo blood tests?"*`;

        doctorQuestions.push(
          "Can the hospital provide a formal treatment cost estimate letter for my insurer?",
          "Are biomarker tests covered under outpatient reimbursement?"
        );
        suggestedFollowUps.push(
          "What documents are needed for insurance claim submission?",
          "Explore financial guidance articles"
        );
        break;

      case "specialist_matching":
        message = `### 🏥 Finding the Right Oncology Specialist

Selecting the appropriate subspecialist ensures your treatment aligns with international clinical guidelines:

- **Medical Oncologist:** Specializes in systemic chemotherapy, immunotherapy, hormone therapy, and targeted oral medications. Often coordinates the overall treatment roadmap.
- **Surgical Oncologist:** Specializes in biopsy procedures, organ-preserving tumor resections, and lymph node dissections.
- **Radiation Oncologist:** Specializes in planning and delivering targeted radiation therapy protocols.
- **Organ-Specific Experts:** E.g., Gynecologic Oncologists for ovarian/cervical cancers, Thoracic Surgeons for lung tumors, and Hematologists for leukemias/lymphomas.

*You can filter verified oncology specialists across Bengaluru, Mumbai, Delhi, Chennai, Hyderabad, and Pune directly in the ONCO-AID Specialist Directory.*`;

        doctorQuestions.push(
          "Which specialist should be my primary point of contact for overall care coordination?",
          "How does your team coordinate with my surgical/medical oncologist?"
        );
        suggestedFollowUps.push(
          "Open Indian Specialist Directory",
          "What questions should I ask at a second opinion consultation?"
        );
        break;

      default:
        message = `### 🤝 ONCO-AID Educational Guide

Thank you for your question: **"${request.prompt}"**

#### Clinical Insights & Guidance:
- Every cancer care journey is unique. Treatment strategies are individualized based on tumor histology, receptor biomarkers, clinical staging, and overall health.
- Taking time to understand your notes and diagnostic reports empowers you to participate actively in shared decision-making with your oncology team.
- Keep an organized physical or digital folder containing all blood reports, biopsy slides recut numbers, imaging CDs (DICOM format), and prescription charts.

#### Recommended Next Steps on ONCO-AID:
1. **Report Analysis:** Use our **Pathology Report Decoder** to translate complex medical terms.
2. **Specialist Directory:** Browse accredited medical, surgical, and radiation oncologists across Indian cities.
3. **Appointment Checklist:** Prepare personalized questions for your upcoming hospital visit.`;

        doctorQuestions.push(
          "What are the immediate next steps before our treatment start date?",
          "What symptoms should I monitor closely between clinic visits?"
        );
        suggestedFollowUps.push(
          "Decode my biopsy report",
          "Prepare questions for oncologist",
          "Explore cancer staging guides"
        );
        break;
    }

    // Append standard disclaimer
    const fullMessage = `${message}\n\n${CLINICAL_DISCLAIMER}`;

    return {
      message: fullMessage,
      provider: this.name,
      category,
      cached: false,
      suggestedFollowUps,
      doctorQuestions,
    };
  }
}
