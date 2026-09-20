"use client";

import Link from "next/link";
import { demoPatient } from "@/lib/demo-patient";
import { Button } from "@/components/ui/button";

export function MobileHomeDashboard() {
  return (
    <div className="md:hidden min-h-screen bg-ivory text-ink px-4 pt-20 pb-24 space-y-6">
      {/* 1. Greeting & Patient Orientation */}
      <div className="flex items-center justify-between border-b border-forest/10 pb-4">
        <div>
          <span className="text-meta-ui text-teal">Patient Care Orientation</span>
          <h1 className="heading-sans-ui text-[22px] text-forest mt-0.5">
            Welcome, {demoPatient.name.split(" ")[0]}
          </h1>
          <p className="text-[12.5px] text-blue-gray">
            Primary: {demoPatient.diagnosisSummary.split("(")[0].trim()}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-forest/8 px-2 py-0.5 text-[11px] font-semibold text-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Stage 02
          </span>
          <span className="text-[10px] text-warm-gray mt-1">ABHA Active</span>
        </div>
      </div>

      {/* Quick Search / Ask AI Input Bar */}
      <Link
        href="/ai"
        className="flex items-center justify-between rounded-xl border border-forest/15 bg-white-soft px-4 py-3 text-[13.5px] text-blue-gray shadow-xs transition-colors hover:border-forest/30"
      >
        <span className="flex items-center gap-2.5">
          <svg className="h-4 w-4 stroke-teal" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Ask anything about your diagnosis or care...</span>
        </span>
        <span className="text-teal font-semibold text-[12px]">Ask AI →</span>
      </Link>

      {/* 2. Current Journey State (Care Signal) */}
      <div className="rounded-2xl border border-forest/12 bg-forest p-5 text-white-soft shadow-xs">
        <div className="flex items-center justify-between border-b border-white-soft/12 pb-3">
          <div>
            <span className="text-meta-ui text-mint block">
              Care Signal · Active Trajectory
            </span>
            <h2 className="text-[17px] font-semibold text-white-soft mt-0.5">
              Stage 02: Pathology & Biomarkers
            </h2>
          </div>
          <span className="rounded-md bg-white-soft/12 px-2 py-0.5 text-[11px] font-medium text-mint">
            25% Complete
          </span>
        </div>

        {/* Milestone Steps Mini Progress Stem */}
        <div className="mt-3.5 space-y-2 text-[12.5px]">
          <div className="flex items-center gap-2 text-white-soft/80">
            <span className="text-emerald-400 font-bold">✓</span>
            <span className="line-through text-white-soft/50">Imaging Scans & Biopsy Sampling</span>
          </div>
          <div className="flex items-center gap-2 text-white-soft font-semibold">
            <span className="text-coral font-bold animate-pulse">●</span>
            <span>Histology & Biomarker Decode (Active)</span>
          </div>
          <div className="flex items-center gap-2 text-white-soft/60">
            <span className="text-white-soft/30">○</span>
            <span>Specialist Consultation & Care Planning</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white-soft/12 flex items-center justify-between text-[12px]">
          <span className="text-white-soft/60">Next: Oncologist consultation</span>
          <Link
            href="/dashboard/journey"
            className="text-mint font-semibold hover:underline flex items-center gap-1"
          >
            Full Timeline →
          </Link>
        </div>
      </div>

      {/* 3. One Primary Action */}
      <div className="rounded-2xl border border-coral/30 bg-coral/10 p-5">
        <span className="text-meta-ui text-coral-deep block">Recommended Priority Task</span>
        <h3 className="heading-sans-ui text-[18px] text-forest mt-1">
          Understand My Biopsy Report
        </h3>
        <p className="mt-1 text-[13.5px] leading-relaxed text-forest/85">
          Translate ER/PR, HER2, histological grade, and staging shorthand into plain language with targeted doctor questions.
        </p>
        <div className="mt-4">
          <Button href="/reports" variant="coral" className="w-full justify-center py-2.5 text-[14px] font-semibold">
            Open Report Decoder →
          </Button>
        </div>
      </div>

      {/* 4. Quick Actions (4 Clean Touch Targets) */}
      <div>
        <span className="text-meta-ui text-warm-gray block mb-3">
          Quick Patient Actions
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          <Link
            href="/reports"
            className="flex flex-col justify-between rounded-xl border border-forest/10 bg-white-soft p-3.5 shadow-xs transition-colors hover:border-forest/25"
          >
            <span className="text-[20px]">📄</span>
            <div className="mt-2">
              <span className="block text-[14px] font-semibold text-forest leading-tight">
                Decode Report
              </span>
              <span className="block text-[11px] text-blue-gray mt-0.5">
                Biopsy, IHC, Scans
              </span>
            </div>
          </Link>

          <Link
            href="/ai?task=appointment"
            className="flex flex-col justify-between rounded-xl border border-forest/10 bg-white-soft p-3.5 shadow-xs transition-colors hover:border-forest/25"
          >
            <span className="text-[20px]">💬</span>
            <div className="mt-2">
              <span className="block text-[14px] font-semibold text-forest leading-tight">
                Doctor Questions
              </span>
              <span className="block text-[11px] text-blue-gray mt-0.5">
                Oncologist visit prep
              </span>
            </div>
          </Link>

          <Link
            href="/specialists"
            className="flex flex-col justify-between rounded-xl border border-forest/10 bg-white-soft p-3.5 shadow-xs transition-colors hover:border-forest/25"
          >
            <span className="text-[20px]">🩺</span>
            <div className="mt-2">
              <span className="block text-[14px] font-semibold text-forest leading-tight">
                Find Specialist
              </span>
              <span className="block text-[11px] text-blue-gray mt-0.5">
                Bengaluru & top centers
              </span>
            </div>
          </Link>

          <Link
            href="/dashboard/journey"
            className="flex flex-col justify-between rounded-xl border border-forest/10 bg-white-soft p-3.5 shadow-xs transition-colors hover:border-forest/25"
          >
            <span className="text-[20px]">🗺️</span>
            <div className="mt-2">
              <span className="block text-[14px] font-semibold text-forest leading-tight">
                Care Timeline
              </span>
              <span className="block text-[11px] text-blue-gray mt-0.5">
                8-stage navigation
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* 5. Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-meta-ui text-warm-gray">Recent Clinical Activity</span>
          <Link href="/reports" className="text-[12px] font-medium text-teal hover:underline">
            All Documents
          </Link>
        </div>
        <div className="rounded-xl border border-forest/8 bg-white-soft p-4 shadow-xs">
          <div className="flex items-center justify-between text-[11px] text-warm-gray">
            <span className="font-semibold uppercase text-teal">Surgical Pathology Excerpt</span>
            <span>Aug 14, 2026</span>
          </div>
          <h4 className="text-[14.5px] font-semibold text-forest mt-1">
            Left Breast Core Needle Biopsy
          </h4>
          <p className="text-[12px] text-blue-gray mt-1">
            Invasive Ductal Carcinoma, Grade 2 · ER+ (90%), PR+ (75%), HER2 1- (Negative)
          </p>
          <div className="mt-3 pt-2.5 border-t border-forest/6 flex items-center justify-between">
            <span className="text-[11.5px] text-emerald-700 font-medium">✓ Decoded in plain language</span>
            <Link href="/reports" className="text-[12px] font-semibold text-teal hover:underline">
              View Decode →
            </Link>
          </div>
        </div>
      </div>

      {/* 6. Cancer Knowledge Hub Shortcut */}
      <div className="rounded-xl border border-forest/8 bg-ivory-deep p-4">
        <div className="flex items-center justify-between">
          <span className="text-meta-ui text-forest">Cancer Knowledge Library</span>
          <Link href="/cancer-types" className="text-[12px] font-semibold text-teal hover:underline">
            View All →
          </Link>
        </div>
        <p className="text-[12.5px] text-blue-gray mt-1">
          Evidence-based guides on staging, biomarkers, and treatment protocols.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["Breast", "Lung", "Colorectal", "Head & Neck"].map((c) => (
            <Link
              key={c}
              href={`/cancer-types/${c.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
              className="rounded-md border border-forest/10 bg-white-soft px-2.5 py-1 text-[11.5px] font-medium text-forest hover:bg-white-soft/80"
            >
              {c}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
