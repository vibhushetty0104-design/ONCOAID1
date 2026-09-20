"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CancerItem {
  slug: string;
  name: string;
  category: string;
  summary: string;
}

interface SpecialistItem {
  id: string;
  name: string;
  role: string;
  hospital: string;
  city: string;
}

interface Props {
  item: CancerItem;
  specialists: SpecialistItem[];
}

type TabType = "overview" | "symptoms" | "staging" | "treatment" | "questions";

export function MobileCancerDetail({ item, specialists }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [copiedQuestion, setCopiedQuestion] = useState<string | null>(null);

  const tabs: { id: TabType; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "symptoms", label: "Symptoms" },
    { id: "staging", label: "Staging" },
    { id: "treatment", label: "Treatment" },
    { id: "questions", label: "Questions" },
  ];

  function handleCopyQuestion(q: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(q);
      setCopiedQuestion(q);
      setTimeout(() => setCopiedQuestion(null), 2000);
    }
  }

  return (
    <div className="md:hidden space-y-4">
      {/* Back Link */}
      <Link
        href="/cancer-types"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-forest hover:text-forest-mid py-1"
      >
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        <span>Back to Knowledge Library</span>
      </Link>

      {/* Screen 10 Hero Card */}
      <div className="rounded-2xl border border-forest/10 bg-white-soft p-4 shadow-xs">
        <span className="rounded-md bg-forest/8 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-forest">
          {item.category} Oncology
        </span>

        <h1 className="font-serif text-[24px] font-medium text-forest mt-1.5 leading-snug">
          {item.name}
        </h1>

        <p className="text-[13px] text-blue-gray mt-1 leading-relaxed">
          {item.summary}
        </p>

        {/* Quick Facts Bar (3 stats) */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-forest/8 pt-3 text-center">
          <div className="rounded-xl bg-ivory p-2 border border-forest/5">
            <span className="text-[10px] uppercase font-bold text-warm-gray block">Incidence</span>
            <span className="text-[12px] font-semibold text-forest mt-0.5 block leading-tight">High in India</span>
          </div>
          <div className="rounded-xl bg-ivory p-2 border border-forest/5">
            <span className="text-[10px] uppercase font-bold text-warm-gray block">Detection</span>
            <span className="text-[12px] font-semibold text-teal mt-0.5 block leading-tight">Biopsy + IHC</span>
          </div>
          <div className="rounded-xl bg-ivory p-2 border border-forest/5">
            <span className="text-[10px] uppercase font-bold text-warm-gray block">Goal</span>
            <span className="text-[12px] font-semibold text-forest mt-0.5 block leading-tight">Curative/Control</span>
          </div>
        </div>
      </div>

      {/* Tabbed Content Navigation (Swipeable Pills) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-[12.5px] font-medium transition-all ${
                isSelected
                  ? "bg-forest text-white shadow-2xs"
                  : "bg-white-soft text-forest/70 border border-forest/10 hover:bg-ivory"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel */}
      <div className="rounded-2xl border border-forest/10 bg-white-soft p-4 shadow-xs min-h-[220px]">
        {activeTab === "overview" && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-teal">
              Biological Overview
            </h2>
            <p className="text-[13.5px] leading-relaxed text-ink/85 font-sans">
              {item.name} begins when abnormal cells in {item.category.toLowerCase()} tissue proliferate uncontrollably. Treatment strategies depend heavily on cellular differentiation and molecular biomarker receptors.
            </p>
            <div className="rounded-xl bg-ivory p-3 border border-forest/6 text-[12.5px] text-forest">
              <strong className="block font-semibold mb-0.5">Next Important Step:</strong>
              Do not start systemic therapy before histopathology report markers and staging scans are finalized by your tumor board.
            </div>
          </div>
        )}

        {activeTab === "symptoms" && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-teal">
              Common Signs & Symptoms
            </h2>
            <ul className="space-y-2 text-[13px] text-ink/85">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-coral mt-1.5 shrink-0" />
                <span>Unexplained localized painless swelling, lump, or thickening.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-coral mt-1.5 shrink-0" />
                <span>Persistent fatigue or unexpected weight reduction over 3 months.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-coral mt-1.5 shrink-0" />
                <span>Localized discomfort, skin dimpling, or texture alterations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-coral mt-1.5 shrink-0" />
                <span>Changes in organ function or abnormal bleeding episodes.</span>
              </li>
            </ul>
          </div>
        )}

        {activeTab === "staging" && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-teal">
              Staging Breakdown (TNM Framework)
            </h2>
            <div className="space-y-2 text-[12.5px]">
              <div className="rounded-xl bg-ivory p-2.5 border border-forest/6">
                <strong className="text-forest font-semibold block">Stage I (Early)</strong>
                <span className="text-blue-gray">Small, localized lesion confined to original tissue layer.</span>
              </div>
              <div className="rounded-xl bg-ivory p-2.5 border border-forest/6">
                <strong className="text-forest font-semibold block">Stage II & III (Locally Advanced)</strong>
                <span className="text-blue-gray">Larger primary tumor with spread to nearby regional lymph nodes.</span>
              </div>
              <div className="rounded-xl bg-ivory p-2.5 border border-forest/6">
                <strong className="text-forest font-semibold block">Stage IV (Metastatic)</strong>
                <span className="text-blue-gray">Involvement of distant organs requiring systemic precision therapy.</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "treatment" && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-teal">
              Multi-Disciplinary Treatment
            </h2>
            <div className="space-y-2 text-[12.5px]">
              <div className="rounded-xl bg-forest/5 p-2.5 border border-forest/8">
                <strong className="text-forest font-semibold block">Surgical Oncology</strong>
                <span className="text-ink/80">Curative resection, lumpectomy, or organ-sparing excision.</span>
              </div>
              <div className="rounded-xl bg-forest/5 p-2.5 border border-forest/8">
                <strong className="text-forest font-semibold block">Systemic Therapies</strong>
                <span className="text-ink/80">Targeted oral kinase pills, immunotherapy, or daycare chemotherapy.</span>
              </div>
              <div className="rounded-xl bg-forest/5 p-2.5 border border-forest/8">
                <strong className="text-forest font-semibold block">Radiation Therapy</strong>
                <span className="text-ink/80">High-precision IMRT, IGRT, or stereotactic radiosurgery.</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "questions" && (
          <div className="space-y-2.5 animate-in fade-in duration-200">
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-teal">
              Doctor Visit Questions
            </h2>
            {[
              `What is the exact histological subtype and grade of my ${item.name}?`,
              "Are all immunohistochemistry (IHC) or molecular markers complete?",
              "Will we consider surgery first or neoadjuvant systemic therapy first?",
              "What supportive medication protocol is in place for side-effect control?",
            ].map((q, qIdx) => (
              <div
                key={qIdx}
                className="flex items-start justify-between gap-2 rounded-xl bg-ivory p-2.5 border border-forest/6 text-[12.5px]"
              >
                <span className="text-forest italic">&ldquo;{q}&rdquo;</span>
                <button
                  type="button"
                  onClick={() => handleCopyQuestion(q)}
                  className="shrink-0 text-[11px] font-medium text-teal hover:underline"
                >
                  {copiedQuestion === q ? "Copied ✓" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Specialists Mini-Row */}
      {specialists && specialists.length > 0 && (
        <div className="rounded-2xl border border-forest/10 bg-white-soft p-4 shadow-xs">
          <span className="text-[11.5px] font-bold uppercase tracking-wider text-warm-gray block mb-2">
            Specialists in {item.category}
          </span>
          <div className="space-y-2">
            {specialists.map((doc) => (
              <Link
                key={doc.id}
                href={`/specialists/${doc.id}`}
                className="flex items-center justify-between rounded-xl bg-ivory p-2.5 border border-forest/6 hover:border-forest/20"
              >
                <div>
                  <span className="text-[13px] font-medium text-forest block">{doc.name}</span>
                  <span className="text-[11px] text-blue-gray">{doc.role} · {doc.city}</span>
                </div>
                <span className="text-[11.5px] font-medium text-teal">Profile →</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Fixed Action Bar at Bottom */}
      <div className="sticky bottom-20 pt-1 z-20 space-y-2">
        <Link
          href={`/ai?prompt=Explain%20diagnosis%20and%20treatment%20for%20${encodeURIComponent(item.name)}`}
          className="flex items-center justify-center gap-2 w-full rounded-2xl bg-forest py-3.5 px-4 text-[14px] font-medium text-white shadow-xl hover:bg-forest-mid active:scale-[0.99] transition-all"
        >
          <span>Ask AI About {item.name}</span>
          <span>→</span>
        </Link>
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/specialists"
            className="flex items-center justify-center rounded-xl border border-forest/20 bg-white-soft py-2.5 text-[12.5px] font-medium text-forest shadow-xs active:bg-ivory"
          >
            Find Specialists
          </Link>
          <Link
            href="/reports"
            className="flex items-center justify-center rounded-xl border border-forest/20 bg-white-soft py-2.5 text-[12.5px] font-medium text-forest shadow-xs active:bg-ivory"
          >
            Decode Report
          </Link>
        </div>
      </div>
    </div>
  );
}
