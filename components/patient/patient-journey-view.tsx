"use client";

import { useState } from "react";
import Link from "next/link";
import { patientJourneyStages, demoPatient } from "@/lib/demo-patient";

export function PatientJourneyView() {
  const [selectedStageId, setSelectedStageId] = useState<string>("03");
  const selectedStage =
    patientJourneyStages.find((s) => s.id === selectedStageId) || patientJourneyStages[2];

  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="rounded-[28px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)] md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-forest/10 pb-5">
          <div>
            <span className="label text-teal">Care Orientation</span>
            <h2 className="editorial-serif mt-1 text-[2.2rem] text-forest">
              {demoPatient.name}&apos;s Care Pathway
            </h2>
            <p className="mt-1 text-[14.5px] text-blue-gray">
              Primary Diagnosis: <strong className="text-forest">{demoPatient.diagnosisSummary}</strong>
            </p>
          </div>

          <div className="rounded-2xl border border-teal/20 bg-teal/10 px-4 py-2.5 text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal block">
              Current Active Stage
            </span>
            <span className="font-serif text-[18px] font-medium text-forest">
              Stage {selectedStage.number} · {selectedStage.title}
            </span>
          </div>
        </div>

        {/* 8-Stage Progressive Stepper Timeline */}
        <div className="mt-8">
          <p className="text-[12px] font-bold uppercase tracking-wider text-warm-gray mb-4">
            Progress through Care (8 Core Milestones)
          </p>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
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
                      ? "border-forest bg-forest text-white-soft shadow-md scale-[1.03]"
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

                    {/* Status Marker Icon */}
                    <span className="text-[13px] font-bold">
                      {isCompleted ? "✓" : isCurrent ? "●" : "○"}
                    </span>
                  </div>

                  <span
                    className={`mt-3 block text-[13px] font-medium leading-snug ${
                      isSelected ? "text-white-soft" : "text-forest"
                    }`}
                  >
                    {stage.title}
                  </span>

                  <span
                    className={`mt-2 text-[10px] font-semibold uppercase tracking-wider ${
                      isSelected
                        ? "text-white-soft/75"
                        : isCurrent
                          ? "text-coral"
                          : isCompleted
                            ? "text-emerald-700"
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

      {/* Selected Stage Detail Panel */}
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left Stage Deep Dive */}
        <div className="rounded-[32px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)] md:p-8">
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

          {/* Next Steps for this Stage */}
          <div className="mt-6 rounded-2xl bg-ivory p-5 border border-forest/8">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-forest flex items-center gap-2">
              <span className="text-coral text-[16px]">✦</span> What You May Need Next
            </h4>
            <ul className="mt-3 space-y-2 text-[14.5px] text-ink/85">
              {selectedStage.nextSteps.map((step, sIdx) => (
                <li key={sIdx} className="flex items-start gap-2.5">
                  <span className="font-bold text-forest mt-0.5">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Questions to Ask Care Team */}
          <div className="mt-6 rounded-2xl bg-forest/5 p-5 border border-forest/10">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-teal flex items-center gap-2">
              <span className="text-teal text-[16px]">💬</span> Questions to Ask Your Oncology Team
            </h4>
            <ul className="mt-3 space-y-2.5 text-[14.5px] text-ink/85 italic">
              {selectedStage.questionsForDoctor.map((q, qIdx) => (
                <li key={qIdx} className="rounded-xl bg-white-soft p-3 border border-forest/5 shadow-2xs">
                  &ldquo;{q}&rdquo;
                </li>
              ))}
            </ul>
          </div>

          {/* Actions for this stage */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/reports"
              className="rounded-full bg-forest px-5 py-2.5 text-[13.5px] font-medium text-white-soft hover:bg-forest-mid transition-colors"
            >
              Decode Pathology Reports →
            </Link>
            <Link
              href="/ai?task=appointment"
              className="rounded-full border border-forest/20 bg-ivory px-5 py-2.5 text-[13.5px] font-medium text-forest hover:bg-mint/40 transition-colors"
            >
              Ask AI for Visit Prep
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
                    <span className="font-medium text-forest">📄 {doc}</span>
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
