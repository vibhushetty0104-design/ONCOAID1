"use client";

import { useState } from "react";
import Link from "next/link";
import { patientJourneyStages, demoPatient } from "@/lib/demo-patient";

export function PatientJourneyView() {
  const [selectedStageId, setSelectedStageId] = useState<string>("03");
  const [mobileExpandedStageId, setMobileExpandedStageId] = useState<string>("03");

  const selectedStage =
    patientJourneyStages.find((s) => s.id === selectedStageId) || patientJourneyStages[2];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Overview Card */}
      <div className="rounded-2xl md:rounded-[28px] border border-forest/10 bg-white-soft p-5 md:p-8 shadow-[var(--shadow-card)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-forest/10 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="label text-teal">Care Pathway</span>
              <span className="rounded-full bg-forest/8 px-2.5 py-0.5 text-[11px] font-medium text-warm-gray">
                Verified Clinical Timeline
              </span>
            </div>
            <h2 className="editorial-serif mt-2 text-2xl md:text-[2.2rem] text-forest">
              {demoPatient.name}&apos;s Care Journey
            </h2>
            <p className="mt-1 text-[13.5px] md:text-[14.5px] text-blue-gray">
              Primary Diagnosis: <strong className="text-forest font-medium">{demoPatient.diagnosisSummary}</strong>
            </p>
          </div>

          <div className="inline-flex items-center justify-between md:flex-col md:items-end rounded-xl md:rounded-2xl border border-teal/20 bg-teal/10 px-4 py-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal block">
              Current Active Milestone
            </span>
            <span className="font-serif text-[16px] md:text-[18px] font-medium text-forest">
              Stage 03 · Pathology & Diagnosis
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP VIEW: Horizontal 8-Stage Milestone Stepper (hidden on mobile) */}
        {/* ============================================================ */}
        <div className="hidden md:block mt-8">
          <p className="text-[12px] font-bold uppercase tracking-wider text-warm-gray mb-4">
            Progress through Care (8 Core Milestones)
          </p>

          <div className="grid grid-cols-8 gap-2">
            {patientJourneyStages.map((stage) => {
              const isSelected = selectedStageId === stage.id;
              const isCurrent = stage.status === "current";
              const isCompleted = stage.status === "completed";

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`group relative flex flex-col justify-between rounded-2xl p-3 text-left transition-all duration-200 border ${
                    isSelected
                      ? "border-forest bg-forest text-white-soft shadow-md scale-[1.02]"
                      : isCurrent
                        ? "border-coral/60 bg-coral/10 text-forest"
                        : isCompleted
                          ? "border-emerald-600/20 bg-emerald-50 text-forest"
                          : "border-forest/8 bg-ivory text-forest/70 hover:border-forest/20"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-[11px] font-bold ${
                        isSelected
                          ? "text-mint"
                          : isCurrent
                            ? "text-coral"
                            : isCompleted
                              ? "text-emerald-700"
                              : "text-warm-gray"
                      }`}
                    >
                      {stage.number}
                    </span>

                    <span className="text-[13px] font-bold">
                      {isCompleted ? "✓" : isCurrent ? "●" : "○"}
                    </span>
                  </div>

                  <span
                    className={`mt-3 block text-[12.5px] font-medium leading-snug line-clamp-2 ${
                      isSelected ? "text-white-soft" : "text-forest"
                    }`}
                  >
                    {stage.title}
                  </span>

                  <span
                    className={`mt-2 text-[10.5px] font-semibold uppercase tracking-wider ${
                      isSelected
                        ? "text-mint font-bold"
                        : isCurrent
                          ? "text-coral font-bold"
                          : isCompleted
                            ? "text-emerald-800 font-bold"
                            : "text-warm-gray"
                    }`}
                  >
                    {isCurrent ? "Current" : isCompleted ? "Done" : "Upcoming"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE VIEW: Vertical Interactive Timeline (md:hidden)       */}
      {/* ============================================================ */}
      <div className="md:hidden space-y-3">
        <div className="flex items-center justify-between px-1 mb-2">
          <span className="text-[12px] font-bold uppercase tracking-wider text-warm-gray">
            Step-by-Step Pathway
          </span>
          <span className="text-[12px] font-medium text-blue-gray">
            Tap any node to view details
          </span>
        </div>

        <div className="relative pl-4 space-y-0">
          {/* Vertical Timeline Spine Line */}
          <div 
            className="absolute left-[29px] top-6 bottom-8 w-[2px] bg-forest/15 -z-0"
            aria-hidden="true" 
          />

          {patientJourneyStages.map((stage, idx) => {
            const isExpanded = mobileExpandedStageId === stage.id;
            const isCurrent = stage.status === "current";
            const isCompleted = stage.status === "completed";

            return (
              <div key={stage.id} className="relative z-10 pb-4">
                <div className="flex items-start gap-3.5">
                  {/* Timeline Node Icon Button */}
                  <button
                    type="button"
                    onClick={() => setMobileExpandedStageId(isExpanded ? "" : stage.id)}
                    aria-label={`Milestone ${stage.number}: ${stage.title}`}
                    className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      isCurrent
                        ? "border-coral bg-coral text-white shadow-md ring-4 ring-coral/20"
                        : isCompleted
                          ? "border-emerald-600 bg-emerald-600 text-white"
                          : "border-forest/20 bg-ivory text-warm-gray hover:border-forest/40"
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : isCurrent ? (
                      <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                    ) : (
                      <span className="text-[11px] font-bold">{stage.number}</span>
                    )}
                  </button>

                  {/* Stage Summary / Accordion Header Card */}
                  <div className="flex-1 min-w-0">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setMobileExpandedStageId(isExpanded ? "" : stage.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setMobileExpandedStageId(isExpanded ? "" : stage.id);
                        }
                      }}
                      className={`cursor-pointer rounded-2xl border transition-all p-4 ${
                        isCurrent
                          ? "border-coral/40 bg-coral/5 shadow-xs"
                          : isExpanded
                            ? "border-forest/20 bg-white-soft shadow-xs"
                            : "border-forest/10 bg-white-soft hover:border-forest/20"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              isCurrent
                                ? "bg-coral/15 text-coral font-bold"
                                : isCompleted
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-forest/5 text-warm-gray"
                            }`}
                          >
                            {isCurrent ? "Current Active" : isCompleted ? "Completed" : "Upcoming"}
                          </span>
                          {stage.dateCompleted && (
                            <span className="text-[11px] text-warm-gray">
                              {stage.dateCompleted}
                            </span>
                          )}
                        </div>

                        <svg
                          className={`h-4 w-4 text-warm-gray transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-forest" : ""
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>

                      <h3 className="font-serif text-[17px] font-medium text-forest mt-1.5 leading-snug">
                        Stage {stage.number} · {stage.title}
                      </h3>

                      <p className="text-[13px] text-blue-gray mt-1 line-clamp-2 leading-relaxed">
                        {stage.description}
                      </p>

                      {/* IN-PLACE EXPANDED CONTENT (Progressive Disclosure) */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-forest/10 space-y-4 animate-in fade-in duration-200">
                          {/* 1. What Happens Here */}
                          <div>
                            <h4 className="text-[11px] font-bold uppercase tracking-wider text-teal">
                              What Happens Here
                            </h4>
                            <p className="mt-1 text-[13px] text-ink/85 leading-relaxed bg-ivory rounded-xl p-3 border border-forest/6">
                              {stage.whatHappensHere}
                            </p>
                          </div>

                          {/* 2. What You May Need (Checklist) */}
                          {stage.whatYouMayNeed && stage.whatYouMayNeed.length > 0 && (
                            <div>
                              <h4 className="text-[11px] font-bold uppercase tracking-wider text-forest">
                                What You May Need (Checklist)
                              </h4>
                              <ul className="mt-1.5 space-y-1.5">
                                {stage.whatYouMayNeed.map((item, iIdx) => (
                                  <li key={iIdx} className="flex items-start gap-2 text-[12.5px] text-ink/80">
                                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                                      ✓
                                    </span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* 3. Questions to Ask Your Doctor */}
                          {stage.questionsForDoctor && stage.questionsForDoctor.length > 0 && (
                            <div>
                              <h4 className="text-[11px] font-bold uppercase tracking-wider text-teal">
                                Questions to Ask Doctor
                              </h4>
                              <div className="mt-1.5 space-y-1.5">
                                {stage.questionsForDoctor.map((q, qIdx) => (
                                  <div
                                    key={qIdx}
                                    className="rounded-xl bg-forest/5 p-2.5 text-[12.5px] text-forest italic border border-forest/8"
                                  >
                                    &ldquo;{q}&rdquo;
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 4. Documents on File / Review */}
                          {stage.keyDocuments && stage.keyDocuments.length > 0 && (
                            <div>
                              <h4 className="text-[11px] font-bold uppercase tracking-wider text-warm-gray">
                                Documents
                              </h4>
                              <div className="mt-1.5 space-y-1">
                                {stage.keyDocuments.map((doc, dIdx) => (
                                  <div
                                    key={dIdx}
                                    className="flex items-center justify-between rounded-lg bg-ivory px-3 py-2 text-[12px] border border-forest/6"
                                  >
                                    <span className="font-medium text-forest truncate pr-2">{doc}</span>
                                    <span className="shrink-0 text-[10.5px] font-semibold text-emerald-700">
                                      On File
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 5. One Primary Action Button */}
                          {stage.actionLabel && stage.actionHref && (
                            <div className="pt-2">
                              <Link
                                href={stage.actionHref}
                                className="flex items-center justify-center gap-2 w-full rounded-xl bg-forest py-3 px-4 text-[13.5px] font-medium text-white shadow-xs hover:bg-forest-mid transition-colors min-h-[44px]"
                              >
                                <span>{stage.actionLabel}</span>
                                <span aria-hidden="true">→</span>
                              </Link>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* DESKTOP DETAIL PANEL (hidden on mobile, shown on md+)        */}
      {/* ============================================================ */}
      <div className="hidden md:grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left Stage Deep Dive */}
        <div className="rounded-[32px] border border-forest/10 bg-white-soft p-8 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between border-b border-forest/10 pb-4">
            <div>
              <span className="label text-teal">
                Milestone {selectedStage.number} · {selectedStage.status.toUpperCase()}
              </span>
              <h3 className="editorial-serif mt-1 text-[2.2rem] text-forest">
                {selectedStage.title}
              </h3>
            </div>
            {selectedStage.dateCompleted && (
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[12px] font-medium text-emerald-800">
                Completed on {selectedStage.dateCompleted}
              </span>
            )}
          </div>

          <p className="mt-4 text-[16px] leading-relaxed text-ink/85 font-sans">
            {selectedStage.description}
          </p>

          {/* Plain language explanation */}
          <div className="mt-6 rounded-2xl bg-teal/5 p-5 border border-teal/15">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-teal">
              What Happens Here
            </h4>
            <p className="mt-2 text-[14.5px] text-forest leading-relaxed">
              {selectedStage.whatHappensHere}
            </p>
          </div>

          {/* Checklist */}
          {selectedStage.whatYouMayNeed && selectedStage.whatYouMayNeed.length > 0 && (
            <div className="mt-6 rounded-2xl bg-ivory p-5 border border-forest/8">
              <h4 className="text-[12.5px] font-bold uppercase tracking-wider text-forest">
                What You May Need
              </h4>
              <ul className="mt-3 space-y-2 text-[14.5px] text-ink/85">
                {selectedStage.whatYouMayNeed.map((item, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2.5">
                    <span className="font-bold text-forest mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Questions to Ask Care Team */}
          <div className="mt-6 rounded-2xl bg-forest/5 p-5 border border-forest/10">
            <h4 className="text-[12.5px] font-bold uppercase tracking-wider text-teal">
              Questions to Ask Your Oncology Team
            </h4>
            <ul className="mt-3 space-y-2.5 text-[14.5px] text-ink/85 italic">
              {selectedStage.questionsForDoctor.map((q, qIdx) => (
                <li key={qIdx} className="rounded-xl bg-white-soft p-3 border border-forest/5 shadow-2xs">
                  &ldquo;{q}&rdquo;
                </li>
              ))}
            </ul>
          </div>

          {/* Primary Action Button */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {selectedStage.actionLabel && selectedStage.actionHref && (
              <Link
                href={selectedStage.actionHref}
                className="rounded-full bg-forest px-6 py-3 text-[14px] font-medium text-white hover:bg-forest-mid transition-colors"
              >
                {selectedStage.actionLabel} →
              </Link>
            )}
            <Link
              href="/ai?task=appointment"
              className="rounded-full border border-forest/20 bg-ivory px-5 py-3 text-[14px] font-medium text-forest hover:bg-mint/40 transition-colors"
            >
              Prepare for Consultation
            </Link>
          </div>
        </div>

        {/* Right Stage Key Documents & Support */}
        <div className="space-y-6">
          <div className="rounded-[28px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)]">
            <span className="label text-warm-gray">Key Stage Records</span>
            <h4 className="editorial-serif mt-2 text-[1.6rem] text-forest">
              Documents for Milestone {selectedStage.number}
            </h4>

            {selectedStage.keyDocuments.length > 0 ? (
              <div className="mt-4 space-y-2.5">
                {selectedStage.keyDocuments.map((doc, dIdx) => (
                  <div
                    key={dIdx}
                    className="flex items-center justify-between rounded-xl bg-ivory p-3 text-[13.5px] border border-forest/5"
                  >
                    <span className="font-medium text-forest">{doc}</span>
                    <span className="text-[12px] text-emerald-700 font-semibold">On File</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-[13.5px] text-blue-gray italic">
                No active documents required yet for this milestone.
              </p>
            )}
          </div>

          {/* Clinical Navigation Safety Guidance */}
          <div className="rounded-[28px] bg-forest p-6 text-white-soft shadow-lg">
            <span className="label text-mint">Patient Navigation Reminder</span>
            <h4 className="editorial-serif mt-2 text-[1.6rem]">You Don&apos;t Walk Alone</h4>
            <p className="mt-3 text-[14px] leading-relaxed text-white-soft/80">
              Cancer care unfolds one verified step at a time. Do not rush to treatment decisions until pathology subtyping and clinical staging discussions with your tumor board are complete.
            </p>
            <div className="mt-5 border-t border-white-soft/10 pt-4 flex items-center justify-between text-[12px] text-white-soft/60">
              <span>Primary Hospital: {demoPatient.primaryHospital.split(",")[0]}</span>
              <Link href="/specialists" className="text-mint hover:underline">
                Find Team →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
