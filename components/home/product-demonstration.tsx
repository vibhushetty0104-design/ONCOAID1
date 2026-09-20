"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

interface BiomarkerDemo {
  id: string;
  tag: string;
  category: string;
  clinicalReading: string;
  plainLanguage: string;
  oncologistQuestions: string[];
}

const demoBiomarkers: BiomarkerDemo[] = [
  {
    id: "her2",
    tag: "HER2: 1+",
    category: "Receptor Profiling · IHC Status",
    clinicalReading: "IHC Score 1+ (Membrane staining is incomplete and faint in >10% of tumor cells). Negative for HER2 protein overexpression.",
    plainLanguage:
      "HER2 is a protein that can cause cancer cells to grow faster. A score of 1+ is classified under clinical guidelines as HER2-negative. This means treatments that specifically target HER2 protein (such as Trastuzumab) are generally not indicated for this tumor subtype, and treatment focus typically shifts toward hormone receptor-directed therapies.",
    oncologistQuestions: [
      "Does this 1+ result require reflex FISH (fluorescence in situ hybridization) testing for confirmation?",
      "How does HER2-negative status shape my overall systemic treatment plan?",
      "Does this result classify the tumor as HER2-low for any current or future clinical protocols?",
    ],
  },
  {
    id: "er",
    tag: "ER: Positive (90%)",
    category: "Hormone Receptor Status",
    clinicalReading: "Estrogen Receptor (ER) Allred Score 8/8, Strong nuclear staining observed in 90% of malignant cells.",
    plainLanguage:
      "Your tumor cells have receptors that bind to estrogen, which fuels their growth. A 90% positive score is strong. This is favorable because it means anti-estrogen medications (endocrine therapy, such as Tamoxifen or Aromatase Inhibitors) are likely to be effective at blocking cell growth and reducing recurrence risk.",
    oncologistQuestions: [
      "Will endocrine therapy begin after surgery and chemotherapy, or before?",
      "What is the expected duration of hormone therapy (e.g., 5 vs. 10 years)?",
      "Which specific medication is recommended based on my menopausal status?",
    ],
  },
  {
    id: "pr",
    tag: "PR: Positive (75%)",
    category: "Hormone Receptor Status",
    clinicalReading: "Progesterone Receptor (PR) Nuclear staining observed in 75% of malignant cells. Strong intensity.",
    plainLanguage:
      "Like estrogen receptors, progesterone receptors indicate the tumor is hormone-dependent. Strong positivity for both ER and PR confirms a Luminal-type profile, which typically responds well to hormone-blocking treatments and carries a more favorable long-term prognosis than hormone-negative tumors.",
    oncologistQuestions: [
      "Does dual ER/PR positivity confirm a Luminal A or Luminal B subtype?",
      "Will genomic recurrence testing (such as Oncotype DX or CanAssist Breast) be helpful to evaluate chemotherapy benefit?",
    ],
  },
  {
    id: "grade",
    tag: "Nottingham Grade 2",
    category: "Histologic Differentiation",
    clinicalReading: "Moderately differentiated ductal carcinoma (Tubule formation: 2, Nuclear pleomorphism: 2, Mitotic count: 2. Total score: 6/9).",
    plainLanguage:
      "Grade reflects how closely the cancer cells look compared to healthy breast tissue. Grade 2 means moderately differentiated—the cells are growing and dividing faster than normal cells, but not as aggressively as Grade 3 (poorly differentiated) cells. It guides systemic treatment intensity.",
    oncologistQuestions: [
      "How does Grade 2 factor into the recommendation for adjuvant chemotherapy?",
      "Will the final surgical pathology reassess histologic grade on the entire tumor specimen?",
    ],
  },
  {
    id: "ki67",
    tag: "Ki-67: 18%",
    category: "Cell Proliferation Index",
    clinicalReading: "Nuclear proliferation marker expressed in 18% of evaluated neoplastic nuclei.",
    plainLanguage:
      "Ki-67 measures what percentage of tumor cells are actively dividing at any given moment. A rate of 18% is in the intermediate-to-low range (often cutoff around 20%). Lower proliferation rates typically indicate a slower-growing tumor that may be highly responsive to endocrine therapy.",
    oncologistQuestions: [
      "Is an 18% proliferation rate considered low or intermediate by your pathology lab?",
      "Does this Ki-67 percentage favor endocrine therapy over adjuvant chemotherapy?",
    ],
  },
];

export function ProductDemonstration() {
  const [activeItem, setActiveItem] = useState<BiomarkerDemo>(demoBiomarkers[0]);

  return (
    <section className="border-t border-forest/8 bg-ivory-deep/40 py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <span className="label text-teal">Product Demonstration</span>
            <span className="text-[12px] text-warm-gray">• Pathology Decoder</span>
          </div>
          <h2 className="heading-serif-section mt-3 text-forest">
            What your report actually says.
          </h2>
          <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-blue-gray">
            Medical reports are written in dense clinical shorthand. ONCO-AID translates complex histology, receptor status, and staging into plain language with specific questions for your doctor.
          </p>
        </Reveal>

        {/* Product Interface Demonstration Canvas */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-forest/12 bg-white-soft shadow-[var(--shadow-card)]">
          {/* Top Interface Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-forest/8 bg-ivory px-5 py-3 text-[12px]">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              <span className="font-semibold text-forest">DEMO RECORD: Surgical Pathology Report</span>
              <span className="hidden sm:inline text-warm-gray">· Core Needle Biopsy</span>
            </div>
            <span className="text-[11px] font-medium text-warm-gray">
              Synthetic Example · For Patient Understanding Only
            </span>
          </div>

          {/* Interactive Workspace Grid */}
          <div className="grid lg:grid-cols-[1fr_1.35fr] divide-y lg:divide-y-0 lg:divide-x divide-forest/8">
            {/* Left: Specimen Excerpt & Interactive Biomarkers */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <span className="text-meta-ui text-warm-gray block">Specimen Excerpt</span>
                <div className="mt-3 rounded-xl border border-forest/8 bg-ivory/60 p-4 font-mono text-[12.5px] leading-relaxed text-forest/90">
                  <p className="font-bold text-forest">SPECIMEN: Core needle biopsy, left breast (retroareolar mass)</p>
                  <p className="mt-1">HISTOPATHOLOGY: Invasive Ductal Carcinoma, NST</p>
                  <p>HISTOLOGIC GRADE: Nottingham Grade 2 (Score 6/9)</p>
                  <p className="mt-1 text-teal font-semibold">
                    BIOMARKER PROFILE (IHC): ER: Pos (90%), PR: Pos (75%), HER2: 1+, Ki-67: 18%
                  </p>
                </div>

                {/* Interactive Biomarker Trigger Buttons */}
                <div className="mt-6">
                  <span className="text-[12px] font-semibold text-forest block mb-2.5">
                    Click an extracted biomarker to view translation:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {demoBiomarkers.map((bm) => {
                      const isSelected = activeItem.id === bm.id;
                      return (
                        <button
                          key={bm.id}
                          type="button"
                          onClick={() => setActiveItem(bm)}
                          className={`rounded-lg border px-3 py-1.5 text-[12.5px] font-medium transition-all ${
                            isSelected
                              ? "border-forest bg-forest text-white-soft shadow-xs"
                              : "border-forest/15 bg-white-soft text-forest/80 hover:border-forest/30 hover:bg-ivory/50"
                          }`}
                        >
                          {bm.tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom CTA to Full Tool */}
              <div className="mt-8 pt-6 border-t border-forest/8 flex items-center justify-between">
                <div>
                  <span className="text-[11.5px] font-bold uppercase tracking-wider text-teal block">
                    Have your own report?
                  </span>
                  <span className="text-[13px] text-blue-gray">
                    Upload or paste terms for complete translation.
                  </span>
                </div>
                <Button href="/reports" variant="primary" className="px-4 py-2 text-[13px]">
                  Open Decoder →
                </Button>
              </div>
            </div>

            {/* Right: Live Plain-Language Translation & Doctor Questions */}
            <div className="p-6 md:p-8 bg-white-soft">
              <div className="flex items-center justify-between pb-3 border-b border-forest/8">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal block">
                    {activeItem.category}
                  </span>
                  <h3 className="heading-sans-ui mt-0.5 text-forest">
                    {activeItem.tag}
                  </h3>
                </div>
                <span className="rounded-md bg-forest/6 px-2.5 py-1 text-[11px] font-semibold text-forest">
                  Decoded
                </span>
              </div>

              {/* Plain-Language Explanation */}
              <div className="mt-5">
                <span className="text-meta-ui text-forest block">
                  What this means in plain language:
                </span>
                <p className="mt-2 text-[14.5px] leading-relaxed text-forest/90">
                  {activeItem.plainLanguage}
                </p>
              </div>

              {/* Questions for Oncologist */}
              <div className="mt-6 rounded-xl border border-forest/10 bg-ivory/40 p-4">
                <span className="text-meta-ui text-coral-deep block">
                  Questions to discuss with your oncologist:
                </span>
                <ul className="mt-2.5 space-y-2 text-[13.5px] text-forest/90">
                  {activeItem.oncologistQuestions.map((q, qIdx) => (
                    <li key={qIdx} className="flex items-start gap-2 leading-snug">
                      <span className="text-coral-deep font-bold mt-0.5">·</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Secondary Navigation */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-[13px]">
                <Link
                  href="/ai?task=appointment"
                  className="font-semibold text-teal hover:text-forest transition-colors flex items-center gap-1"
                >
                  <span>Add questions to appointment prep list</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/cancer-types/breast-cancer"
                  className="text-warm-gray hover:text-forest transition-colors underline"
                >
                  Explore Breast Cancer Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
