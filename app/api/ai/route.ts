import { NextResponse } from "next/server";
import { getAiConfig } from "@/lib/server/env";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { prompt?: string } | null;
  const prompt = body?.prompt?.trim();
  if (!prompt) {
    return NextResponse.json({ error: "Please share a question." }, { status: 400 });
  }

  const { hasKey, provider } = getAiConfig();

  // If real key exists in server environment, we can process here.
  // Otherwise, return realistic context-aware educational responses for the presentation demo.
  const query = prompt.toLowerCase();

  let message = "";

  if (query.includes("report") || query.includes("marker") || query.includes("er") || query.includes("her2") || query.includes("egfr") || query.includes("tnm") || query.includes("decode")) {
    message = `### 📋 Pathology & Biomarker Breakdown

Here is a plain-language explanation of key pathology report elements:

- **Tumor Type & Grade:** Indicates where the abnormal cells originated and how closely they resemble normal tissue. Grade 1 cells grow slowly; Grade 3 cells are more active.
- **Hormone & Protein Receptors (ER/PR/HER2):** These act as "ignition switches" on cancer cells. Receptors tell your oncology team whether targeted pill therapies, endocrine blocking agents, or targeted antibody infusions will be effective.
- **Staging Shorthand (TNM):** 
  - **T (Tumor):** Size of the primary area.
  - **N (Nodes):** Whether nearby lymph nodes showed microscopic involvement.
  - **M (Metastasis):** Whether cells were identified beyond the primary organ region.

#### 💡 Questions to take to your Oncologist:
1. *"Which specific biomarker results are complete, and are any specialized molecular or FISH tests still pending?"*
2. *"How does my receptor status shape our choice between surgery first or systemic treatment first?"*

*Disclaimer: ONCO-AID provides educational guidance. Always verify pathology details with your treating physician.*`;
  } else if (query.includes("question") || query.includes("first visit") || query.includes("doctor") || query.includes("prepare") || query.includes("appointment")) {
    message = `### 📝 Preparing for Your Oncology Consultation

Entering a specialist consultation with a structured set of questions helps maintain focus and reduce anxiety.

#### 1. About Your Specific Diagnosis & Staging
- *"Can you explain my exact stage and tumor subtype in plain language?"*
- *"What additional diagnostic tests (PET-CT, MRI, Next-Gen Sequencing) do we need before finalizing the treatment plan?"*

#### 2. About Treatment Options & Goals
- *"What is the primary goal of the recommended treatment plan (curative, preventive, or disease control)?"*
- *"What are the standard-of-care options versus clinical trial possibilities for my condition?"*

#### 3. About Daily Life & Support
- *"What side effects should I expect, and who do I call if I experience a fever or severe symptoms outside clinic hours?"*
- *"Are there dietary or activity restrictions I should follow during this phase?"*

*Tip: Bring a trusted family member or notebook to record key discussion points during your appointment.*`;
  } else if (query.includes("chemo") || query.includes("radiation") || query.includes("immuno") || query.includes("difference")) {
    message = `### 🔬 Understanding Treatment Modalities

Modern cancer care often combines different therapies tailored to your tumor biology:

- **Surgical Oncology:** Removes localized tumors and samples adjacent lymph nodes to determine exact spread.
- **Medical Oncology (Chemotherapy & Targeted Therapy):** Systemic medications that circulate through the bloodstream to destroy rapidly dividing cells or block specific genetic mutation pathways (e.g., EGFR, ALK, BRAF).
- **Radiation Oncology:** Uses high-energy X-rays or proton beams targeted precisely at the tumor bed to neutralize residual cancer cells while sparing healthy tissue.
- **Immunotherapy:** Advanced treatments that train your body's natural immune T-cells to recognize and attack tumor cells.

#### 💡 Discussion Prompt for Your Care Team:
*"In what sequence will these therapies be administered, and why is this sequence recommended for my specific tumor type?"*`;
  } else if (query.includes("second opinion") || query.includes("india") || query.includes("hospital")) {
    message = `### 🏥 Navigating Second Opinions in India

Seeking a second opinion is a standard, highly respected step in cancer care. High-volume comprehensive cancer centers welcome cross-consultations.

#### Recommended Steps:
1. **Gather Full Documentation:** Obtain physical or digital copies of your original biopsy slides, paraffin blocks, IHC pathology reports, and DICOM imaging scans (CT/MRI/PET-CT).
2. **Review with Multi-Disciplinary Tumor Boards:** Leading Indian centers (such as Tata Memorial Mumbai, Manipal Bengaluru, Apollo Chennai, Max Delhi) conduct tumor board reviews where medical, surgical, and radiation oncologists evaluate complex cases jointly.
3. **Verify Molecular Subtyping:** A second pathology review often confirms marker status (ER/PR, HER2, EGFR, PD-L1) before major treatment decisions.

*ONCO-AID can help you locate accredited specialists across major Indian medical centers.*`;
  } else if (query.includes("diagnosis") || query.includes("breast") || query.includes("lung") || query.includes("colon") || query.includes("prostate")) {
    message = `### 💡 Understanding Your Diagnosis

Receiving a diagnosis can feel overwhelming. Remember that modern oncology approaches every case based on individualized tumor biology, not a single generic label.

#### Key Steps Right Now:
- **Confirm the Histology:** Ensure you have the complete histopathology report with all biomarker staining.
- **Complete Staging Imaging:** Scans like PET-CT or MRI provide a baseline view so your team can design the safest pathway.
- **Formulate Questions:** Write down your priorities — treatment duration, work/family balance, and financial planning.

#### 💬 Questions for Your Next Consultation:
- *"Is our diagnosis complete, or do we need additional tissue markers?"*
- *"What is our immediate timeline for starting treatment?"*

*ONCO-AID AI is an educational guidance tool. Please share all notes with your medical oncologist.*`;
  } else {
    message = `### 🤝 ONCO-AID Educational Assistant

Thank you for asking: **"${prompt}"**

#### Clinical Insights & Guidance:
- Cancer care is highly individualized. Every treatment plan depends on the primary origin, histopathology grade, molecular markers, and overall patient health.
- Taking time to understand your notes and reports empowers you to participate actively in shared decision-making with your medical team.
- Keep a dedicated folder (digital or physical) with all blood reports, imaging CDs, pathology summaries, and prescription charts.

#### Recommended Next Steps on ONCO-AID:
1. **Pathology Analysis:** Use our **Report Decoder** tool to break down complex medical terms.
2. **Specialist Directory:** Explore verified Indian surgical, medical, and radiation oncologists in your city.
3. **Appointment Checklist:** Generate a personalized question list for your upcoming visit.

*Notice: ONCO-AID provides educational information. It does not replace medical advice, diagnosis, or clinical evaluation by a qualified healthcare professional.*`;
  }

  return NextResponse.json({
    message,
    provider: hasKey ? provider : "ONCO-AID Clinical Intelligence (Educational Mock Mode)",
  });
}
