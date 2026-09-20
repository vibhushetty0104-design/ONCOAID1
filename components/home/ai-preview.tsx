"use client";

import { useState } from "react";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { Reveal } from "@/components/reveal";

interface PromptStarter {
  id: string;
  title: string;
  query: string;
  category: string;
  sampleReply: {
    summary: string;
    clinicalTerms: { term: string; explanation: string }[];
    questionsForDoctor: string[];
    disclaimer: string;
  };
}

const promptStarters: PromptStarter[] = [
  {
    id: "diagnosis",
    title: "Explain my diagnosis",
    query: "Can you explain what Invasive Ductal Carcinoma Grade 2 means in plain language?",
    category: "Pathology Understanding",
    sampleReply: {
      summary:
        "Invasive Ductal Carcinoma (IDC) means abnormal cells originated in the breast milk ducts and have begun to extend into surrounding breast tissue. 'Grade 2' (moderately differentiated) indicates the cells look somewhat different from healthy cells and are dividing at an intermediate pace.",
      clinicalTerms: [
        { term: "Invasive", explanation: "Cells have moved beyond the duct wall into adjacent tissue; guides systemic evaluation." },
        { term: "Grade 2", explanation: "Intermediate growth speed; slower than Grade 3 but requires targeted clinical protocol." },
      ],
      questionsForDoctor: [
        "What are my hormone receptor (ER/PR) and HER2 results for this specimen?",
        "Will a whole-body PET-CT or MRI scan be recommended before finalizing therapy?",
      ],
      disclaimer: "Educational guidance only. Discuss all findings with your treating oncologist.",
    },
  },
  {
    id: "doctor-questions",
    title: "Prepare questions for my doctor",
    query: "What questions should I ask my oncologist at my first treatment consultation?",
    category: "Consultation Preparation",
    sampleReply: {
      summary:
        "Your first visit with a medical or surgical oncologist establishes the overall roadmap. Arrive with a companion and focus on three domains: exact staging, the intent of treatment (curative vs. preventive), and the sequencing of surgery versus chemotherapy.",
      clinicalTerms: [
        { term: "Tumor Board Review", explanation: "Multi-specialist consensus meeting to agree on treatment sequence." },
        { term: "Neoadjuvant", explanation: "Treatment given before primary surgery to shrink the tumor." },
      ],
      questionsForDoctor: [
        "Has my case been reviewed by a multidisciplinary tumor board?",
        "What is the goal of our first treatment phase, and what is the expected timeline?",
        "Who is my primary clinical emergency contact if fever develops between appointments?",
      ],
      disclaimer: "Educational guidance only. Discuss all findings with your treating oncologist.",
    },
  },
  {
    id: "report",
    title: "Help me understand my report",
    query: "What does ER/PR positive and HER2 negative mean in my IHC biomarker panel?",
    category: "Biomarker Decoding",
    sampleReply: {
      summary:
        "This is a common and favorable biomarker profile (often referred to as Luminal-like). ER/PR positive means the tumor cells grow in response to hormones, making endocrine therapies highly effective. HER2 negative means the cancer is not driven by HER2 overexpression.",
      clinicalTerms: [
        { term: "ER / PR Positive", explanation: "Receptors present; sensitive to hormone-blocking medications like Tamoxifen." },
        { term: "HER2 Negative", explanation: "Does not require HER2-targeted biological drugs like Trastuzumab." },
      ],
      questionsForDoctor: [
        "Will I benefit from a genomic recurrence risk test (like CanAssist Breast or Oncotype DX)?",
        "When would hormone therapy begin relative to surgery or radiation?",
      ],
      disclaimer: "Educational guidance only. Discuss all findings with your treating oncologist.",
    },
  },
  {
    id: "next-steps",
    title: "What happens next?",
    query: "What are the immediate next steps after getting a confirmed biopsy result?",
    category: "Care Navigation",
    sampleReply: {
      summary:
        "The period following a biopsy involves three sequential steps: 1) Staging imaging (CT or PET-CT) to verify localized status, 2) Comprehensive blood panels and cardiac baseline if chemotherapy is anticipated, and 3) Multidisciplinary consultation to choose between upfront surgery or neoadjuvant therapy.",
      clinicalTerms: [
        { term: "Baseline Workup", explanation: "Tests ensuring your heart, kidneys, and bone marrow tolerate treatment safely." },
        { term: "Staging Scan", explanation: "Imaging confirming the exact clinical extent of disease." },
      ],
      questionsForDoctor: [
        "Which staging scan is recommended for my subtype?",
        "How quickly do we need to start treatment after staging is complete?",
      ],
      disclaimer: "Educational guidance only. Discuss all findings with your treating oncologist.",
    },
  },
];

export function AIPreview() {
  const [activePrompt, setActivePrompt] = useState<PromptStarter>(promptStarters[0]);

  return (
    <section className="relative overflow-hidden bg-[#063B36] py-20 md:py-28 text-white-soft border-b border-white-soft/10">
      {/* Ambient Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 left-10 h-[400px] w-[400px] rounded-full bg-mint/10 blur-[130px]"
      />

      <div className="container-page relative z-10">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-mint font-semibold text-[11.5px] tracking-[0.2em] uppercase">
                <span>{brand.companion.name}</span>
                <span className="text-white-soft/40">·</span>
                <span className="text-white-soft/75">{brand.companion.systemName}</span>
              </div>
              <h2 className="heading-serif-section mt-3 text-white-soft">
                Ask anything. Understand clearly.
              </h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-white-soft/80">
                A calm, intelligent care guide grounded in clinical oncology consensus. Decode medical terms, organize questions for your doctor, and understand what to expect next.
              </p>
            </div>

            {/* 7th Biological Waveform Processing Visual */}
            <div className="flex items-center gap-3 rounded-md border border-white-soft/15 bg-white-soft/6 px-4 py-2 text-[12.5px] text-mint">
              <div className="h-4 w-12 shrink-0">
                <svg viewBox="0 0 80 24" fill="none" className="h-full w-full stroke-mint" aria-hidden="true">
                  <path
                    d="M 2 12 Q 15 12 20 12 T 28 4 T 38 20 T 48 12 T 58 6 T 68 14 L 78 12"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-pulse"
                  />
                </svg>
              </div>
              <span className="font-mono text-[11.5px] tracking-wide text-white-soft/90">
                AI Processing · Waveform Active
              </span>
            </div>
          </div>
        </Reveal>

        {/* Prompt Starter Chips */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {promptStarters.map((item) => {
            const isSelected = activePrompt.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActivePrompt(item)}
                className={`rounded-md px-4 py-2 text-[13px] font-medium transition-all ${
                  isSelected
                    ? "bg-[#E88970] text-[#042422] font-semibold shadow-xs"
                    : "border border-white-soft/15 bg-white-soft/6 text-white-soft/80 hover:border-white-soft/30 hover:bg-white-soft/10"
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>

        {/* Conversation Demonstration Workstation */}
        <div className="mt-8 overflow-hidden rounded-lg border border-white-soft/15 bg-[#042422]/90 shadow-[0_20px_50px_rgba(2,16,14,0.4)] backdrop-blur-md">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white-soft/10 px-5 py-3 text-[12px]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-semibold text-white-soft">
                {brand.companion.name} · Clinical Guidance Session
              </span>
            </div>
            <span className="font-mono text-[11px] text-white-soft/60 uppercase tracking-wider">
              Prompt: {activePrompt.category}
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* User Query Message */}
            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white-soft/15 text-[11px] font-bold text-white-soft">
                You
              </div>
              <div className="rounded-lg bg-white-soft/10 px-4 py-2.5 text-[14.5px] text-white-soft font-medium max-w-xl">
                {activePrompt.query}
              </div>
            </div>

            {/* Assistant Structured Reply */}
            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint/20 text-[11px] font-bold text-mint border border-mint/40">
                AI
              </div>
              <div className="flex-1 max-w-3xl space-y-4">
                {/* Plain-language Summary */}
                <p className="text-[15px] leading-relaxed text-white-soft/90 font-normal">
                  {activePrompt.sampleReply.summary}
                </p>

                {/* Highlighted Clinical Terms */}
                <div className="grid gap-2 sm:grid-cols-2 pt-1">
                  {activePrompt.sampleReply.clinicalTerms.map((term, tIdx) => (
                    <div
                      key={tIdx}
                      className="rounded border border-white-soft/12 bg-white-soft/5 p-3 text-[13px] leading-snug"
                    >
                      <strong className="text-mint block mb-0.5">{term.term}</strong>
                      <span className="text-white-soft/75">{term.explanation}</span>
                    </div>
                  ))}
                </div>

                {/* Questions for the Doctor */}
                <div className="rounded-md border border-[#E88970]/30 bg-[#E88970]/10 p-4 text-[13.5px]">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E88970] block">
                    Questions to discuss with your oncologist
                  </span>
                  <ul className="mt-2 space-y-1.5 text-white-soft/90">
                    {activePrompt.sampleReply.questionsForDoctor.map((q, qIdx) => (
                      <li key={qIdx} className="flex items-start gap-2">
                        <span className="text-[#E88970] font-bold">·</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Restrained Clinical Disclaimer */}
                <p className="text-[12px] text-white-soft/50 italic">
                  Notice: {activePrompt.sampleReply.disclaimer}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white-soft/10 bg-white-soft/[0.03] px-6 py-4">
            <span className="text-[13px] text-white-soft/75">
              Have specific questions about your scans, staging, or treatment options?
            </span>
            <Link
              href="/ai"
              className="inline-flex items-center gap-1.5 rounded bg-mint px-4 py-2 text-[13px] font-semibold text-[#042422] transition-opacity hover:opacity-90 whitespace-nowrap"
            >
              <span>Open Care Companion</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
