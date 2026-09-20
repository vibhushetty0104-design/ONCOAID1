"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

interface BiomarkerDemo {
  id: string;
  tag: string;
  category: string;
  statusBadge: string;
  clinicalReading: string;
  plainLanguage: string;
  significance: string;
  oncologistQuestions: string[];
}

const demoBiomarkers: BiomarkerDemo[] = [
  {
    id: "her2",
    tag: "HER2: 1+",
    category: "Receptor Profiling · IHC Status",
    statusBadge: "Negative (Score 1+)",
    clinicalReading:
      "IHC Score 1+ (Membrane staining is incomplete and faint in >10% of tumor cells). Negative for HER2 protein overexpression.",
    plainLanguage:
      "HER2 is a protein that can signal breast cells to grow and divide quickly. An IHC score of 1+ is classified as HER2-negative. This means the tumor is not driven by HER2 overexpression, so HER2-targeted therapies like Trastuzumab are generally not required.",
    significance:
      "Treatment focus typically centers on hormone-blocking therapies and conventional systemic therapy if indicated by staging.",
    oncologistQuestions: [
      "Does this 1+ result require reflex FISH testing to confirm negative status?",
      "Does this classify as 'HER2-low' under current clinical protocols?",
      "How does this shape my overall systemic chemotherapy recommendations?",
    ],
  },
  {
    id: "er",
    tag: "ER: Positive (90%)",
    category: "Hormone Receptor Status",
    statusBadge: "Strong Positive (Allred 8/8)",
    clinicalReading:
      "Estrogen Receptor (ER) Allred Score 8/8. Strong nuclear staining observed in 90% of malignant cells.",
    plainLanguage:
      "Your tumor cells possess receptors that attach to estrogen, fueling their growth. A 90% positive score is strong. This is an encouraging finding because endocrine (anti-estrogen) medications are very effective at cutting off this growth signal.",
    significance:
      "High hormone sensitivity suggests good long-term response to oral endocrine therapies (such as Tamoxifen or Aromatase Inhibitors).",
    oncologistQuestions: [
      "Will endocrine therapy begin before surgery or after completing other treatments?",
      "What is the recommended duration of hormone therapy (5 vs. 10 years)?",
      "Which specific medication is indicated based on my menopausal status?",
    ],
  },
  {
    id: "pr",
    tag: "PR: Positive (75%)",
    category: "Hormone Receptor Status",
    statusBadge: "Strong Positive (75%)",
    clinicalReading:
      "Progesterone Receptor (PR) nuclear staining observed in 75% of malignant cells. Strong intensity.",
    plainLanguage:
      "Like estrogen, progesterone is a hormone that can stimulate tumor cells. Strong positivity for both ER and PR indicates a Luminal-like tumor subtype, which tends to be slower growing and more responsive to hormone blockade.",
    significance:
      "Dual positivity confirms strong hormonal dependence and correlates with a more favorable response to endocrine therapy.",
    oncologistQuestions: [
      "Does dual ER/PR positivity classify this as Luminal A or Luminal B?",
      "Will a genomic recurrence test (such as CanAssist Breast or Oncotype DX) be helpful to evaluate chemotherapy benefit?",
    ],
  },
  {
    id: "grade",
    tag: "Nottingham Grade 2",
    category: "Histologic Differentiation",
    statusBadge: "Moderately Differentiated",
    clinicalReading:
      "Moderately differentiated ductal carcinoma (Tubule formation: 2, Nuclear pleomorphism: 2, Mitotic count: 2. Total score: 6/9).",
    plainLanguage:
      "Grade measures how abnormal the tumor cells appear under the microscope compared to healthy breast tissue. Grade 2 means the cells are moderately differentiated—faster growing than normal tissue, but not as erratic as Grade 3.",
    significance:
      "Helps your multidisciplinary care team balance surgical urgency and determine if systemic chemotherapy is beneficial.",
    oncologistQuestions: [
      "How does Grade 2 factor into the decision between lumpectomy and mastectomy?",
      "Will final surgical pathology re-evaluate the grade across the whole specimen?",
    ],
  },
  {
    id: "ki67",
    tag: "Ki-67: 18%",
    category: "Cell Proliferation Index",
    statusBadge: "Intermediate / Low",
    clinicalReading:
      "Nuclear proliferation marker expressed in 18% of evaluated neoplastic nuclei.",
    plainLanguage:
      "Ki-67 is a marker that reveals what percentage of tumor cells are actively dividing at the moment of biopsy. An 18% score is in the lower-to-intermediate range (clinical cutoffs are often 20%).",
    significance:
      "Lower proliferation suggests the tumor is growing at a moderate pace, supporting the effectiveness of hormonal management.",
    oncologistQuestions: [
      "Does an 18% proliferation rate favor hormone therapy over adjuvant chemotherapy?",
      "Is this score verified by digital image analysis or manual visual counting?",
    ],
  },
];

export function ProductDemonstration() {
  const [activeItem, setActiveItem] = useState<BiomarkerDemo>(demoBiomarkers[0]);

  return (
    <section className="border-t border-forest/10 bg-[#fbf9f5] py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-forest/60">
              Report Decoder · Clinical Translation
            </p>
            <h2 className="heading-serif-section mt-2.5 text-forest">
              What your pathology report actually says.
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-forest/75">
              Diagnostic reports are written in dense clinical shorthand. ONCO-AID translates histologic subtypes, receptor status, and staging markers into clear, human-understandable language — with exact questions to discuss with your oncologist.
            </p>
          </div>
        </Reveal>

        {/* Realistic Product Interface */}
        <div className="mt-12 overflow-hidden rounded-lg border border-forest/15 bg-white-soft shadow-[0_2px_12px_rgba(8,40,40,0.04)]">
          {/* Workstation Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-forest/10 bg-[#f4eee4] px-5 py-3 text-[12px]">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              <span className="font-semibold text-forest">
                PATHOLOGY DECODER · SPECIMEN RECORD
              </span>
              <span className="hidden text-forest/50 sm:inline">|</span>
              <span className="hidden text-forest/70 sm:inline font-mono">
                LAB-REF: #SYNTH-2026-08B
              </span>
            </div>
            <div className="rounded border border-forest/20 bg-forest/5 px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-forest/70">
              Synthetic Demonstration Record · Not a Real Patient
            </div>
          </div>

          {/* Clinical Workstation Grid */}
          <div className="grid divide-y divide-forest/10 lg:grid-cols-[1.1fr_1.3fr] lg:divide-x lg:divide-y-0">
            {/* Left: Raw Pathology Record & Marker Selection */}
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-forest/60">
                  Specimen Excerpt
                </span>
                <span className="font-mono text-[11.5px] text-forest/60">Core Needle Biopsy</span>
              </div>

              {/* Lab Monospace Excerpt */}
              <div className="mt-3 rounded-md border border-forest/12 bg-[#faf7f2] p-4.5 font-mono text-[12.5px] leading-relaxed text-forest/90">
                <p className="font-bold text-forest">
                  DIAGNOSIS: Left breast core needle biopsy (retroareolar mass)
                </p>
                <p className="mt-1 text-forest/80">
                  HISTOPATHOLOGY: Invasive Ductal Carcinoma, NST
                </p>
                <p className="text-forest/80">
                  HISTOLOGIC GRADE: Nottingham Grade 2 (Tubule: 2, Pleomorphism: 2, Mitosis: 2; Score: 6/9)
                </p>
                <div className="mt-2.5 border-t border-forest/10 pt-2 text-forest/85">
                  <span className="font-bold text-forest">IMMUNOHISTOCHEMISTRY (IHC):</span>
                  <div className="mt-1 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[12px]">
                    <span>ER: Positive (90%, Allred 8/8)</span>
                    <span>PR: Positive (75%)</span>
                    <span>HER2: Score 1+ (Negative)</span>
                    <span>Ki-67: 18% (Intermediate)</span>
                  </div>
                </div>
              </div>

              {/* Biomarker Selector Rows */}
              <div className="mt-6">
                <p className="text-[12px] font-medium text-forest/70">
                  Select a marker below to review its translation:
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {demoBiomarkers.map((bm) => {
                    const isSelected = activeItem.id === bm.id;
                    return (
                      <button
                        key={bm.id}
                        type="button"
                        onClick={() => setActiveItem(bm)}
                        className={`rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                          isSelected
                            ? "bg-forest text-white-soft"
                            : "border border-forest/15 bg-white-soft text-forest/80 hover:border-forest/30 hover:bg-[#f6f1e8]"
                        }`}
                      >
                        {bm.tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Decoder Access Callout */}
              <div className="mt-8 border-t border-forest/10 pt-5">
                <p className="text-[13px] text-forest/75">
                  Have a different pathology, biopsy, or PET-CT report?
                </p>
                <Link
                  href="/reports"
                  className="mt-1.5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-forest underline hover:opacity-80 transition-opacity"
                >
                  <span>Open Pathology Report Decoder</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Right: Plain-Language Interpretation & Clinical Inquiries */}
            <div className="p-6 md:p-8 bg-white-soft">
              {/* Active Marker Header */}
              <div className="border-b border-forest/10 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-forest/60">
                    {activeItem.category}
                  </span>
                  <span className="rounded bg-forest/8 px-2 py-0.5 font-mono text-[11px] font-semibold text-forest">
                    {activeItem.statusBadge}
                  </span>
                </div>
                <h3 className="heading-sans-ui mt-1 text-[20px] text-forest">
                  {activeItem.tag}
                </h3>
              </div>

              {/* Plain Language Meaning */}
              <div className="mt-5">
                <p className="text-[11.5px] font-semibold tracking-[0.12em] uppercase text-forest/60">
                  What this means in plain language
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-forest/90">
                  {activeItem.plainLanguage}
                </p>
              </div>

              {/* Clinical Significance */}
              <div className="mt-5 rounded-md border border-forest/10 bg-[#faf7f2] p-4 text-[13.5px] leading-relaxed text-forest/80">
                <strong className="font-semibold text-forest">Clinical context: </strong>
                {activeItem.significance}
              </div>

              {/* Questions for the Doctor */}
              <div className="mt-6 border-t border-forest/10 pt-5">
                <p className="text-[11.5px] font-semibold tracking-[0.12em] uppercase text-[#b84a39]">
                  Questions to ask your oncologist
                </p>
                <ul className="mt-3 space-y-2 text-[14px] text-forest/85">
                  {activeItem.oncologistQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-forest/40 font-bold select-none">—</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Action */}
              <div className="mt-7 flex flex-wrap items-center gap-4 text-[13px]">
                <Link
                  href="/ai?task=appointment"
                  className="font-semibold text-forest underline hover:opacity-80 transition-opacity"
                >
                  Save questions to appointment list →
                </Link>
                <Link
                  href="/cancer-types/breast-cancer"
                  className="text-forest/60 hover:text-forest transition-colors"
                >
                  Breast Cancer Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
