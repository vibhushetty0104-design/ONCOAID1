"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { patientJourneyStages, type JourneyStage } from "@/lib/demo-patient";
import { Reveal } from "@/components/reveal";

export function PatientJourney() {
  const reduce = useReducedMotion();
  // Stage 03 is the current "Active" demo stage (Pathology & Diagnosis)
  const [activeStageId, setActiveStageId] = useState<string>("03");

  return (
    <section id="journey" className="border-b border-forest/10 bg-[#EDF4EF] py-20 md:py-28 text-forest">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-forest/70 block">
              Patient Care Pathway · 8 Clinical Milestones
            </span>
            <h2 className="heading-serif-section mt-2 text-forest">
              A continuous path from confusion to recovery.
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-forest/80">
              Cancer care unfolds across sequential stages. ONCO—AID maps each milestone so you know what questions to ask, what records to bring, and what comes next.
            </p>
          </div>
        </Reveal>

        {/* Legend for Journey States */}
        <div className="mt-8 flex flex-wrap items-center gap-5 text-[12.5px] text-forest/75">
          <div className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white-soft">
              ✓
            </span>
            <span>Completed milestones</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#E88970] text-[10px] font-bold text-[#042422] animate-pulse">
              ●
            </span>
            <span className="font-semibold text-forest">Current stage (You are here)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-forest/30 bg-forest/10 text-[10px] text-forest/50">
              ○
            </span>
            <span>Upcoming milestones</span>
          </div>
        </div>

        {/* Living Vertical Pathway with One Continuous Line */}
        <div className="relative mt-12 pl-6 sm:pl-10 md:pl-12">
          {/* Continuous Vertical Timeline Line */}
          <div
            aria-hidden="true"
            className="absolute left-[18px] sm:left-[26px] md:left-[30px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-emerald-600 via-[#E88970] to-forest/20"
          />

          <div className="space-y-6">
            {patientJourneyStages.map((stage: JourneyStage) => {
              const isCompleted = stage.status === "completed";
              const isCurrent = stage.id === "03"; // Stage 03 is current active
              const isExpanded = activeStageId === stage.id;

              return (
                <div
                  key={stage.id}
                  className={`group relative rounded-lg border transition-all duration-200 ${
                    isCurrent
                      ? "border-[#E88970]/60 bg-white-soft shadow-sm ring-1 ring-[#E88970]/30"
                      : isExpanded
                        ? "border-forest/25 bg-white-soft shadow-xs"
                        : "border-forest/12 bg-white-soft/80 hover:border-forest/25 hover:bg-white-soft"
                  }`}
                >
                  {/* Milestone Node on the Continuous Line */}
                  <div
                    className={`absolute -left-[30px] sm:-left-[38px] md:-left-[42px] top-6 z-10 flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] font-bold transition-transform ${
                      isCompleted
                        ? "bg-emerald-600 text-white-soft shadow-xs"
                        : isCurrent
                          ? "bg-[#E88970] text-[#042422] shadow-[0_0_12px_rgba(232,137,112,0.6)] ring-4 ring-[#EDF4EF] scale-110"
                          : "border border-forest/30 bg-[#EDF4EF] text-forest/60"
                    }`}
                  >
                    {isCompleted ? "✓" : stage.number}
                  </div>

                  {/* Node Header Row */}
                  <button
                    type="button"
                    onClick={() => setActiveStageId(isExpanded ? "" : stage.id)}
                    aria-expanded={isExpanded}
                    className="flex w-full items-start justify-between p-5 md:p-6 text-left"
                  >
                    <div className="pr-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[11.5px] font-semibold text-forest/60 uppercase">
                          Stage {stage.number}
                        </span>
                        <span className="text-forest/30">·</span>
                        <span
                          className={`rounded px-2 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-wider ${
                            isCurrent
                              ? "bg-[#E88970]/20 text-[#B84A39]"
                              : isCompleted
                                ? "bg-emerald-600/15 text-emerald-800"
                                : "bg-forest/8 text-forest/60"
                          }`}
                        >
                          {isCurrent ? "Active Stage · You Are Here" : isCompleted ? "Completed" : "Upcoming"}
                        </span>
                      </div>

                      <h3 className="editorial-serif mt-1 text-[21px] md:text-[23px] text-forest">
                        {stage.title}
                      </h3>

                      <p className="mt-1 text-[14px] leading-relaxed text-forest/75 max-w-2xl">
                        {stage.description}
                      </p>
                    </div>

                    <span
                      className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-forest/15 text-[14px] text-forest/70 transition-transform duration-200 ${
                        isExpanded ? "rotate-90 bg-forest text-white-soft border-forest" : ""
                      }`}
                    >
                      →
                    </span>
                  </button>

                  {/* Progressively Disclosed Detail Panel */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="content"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="border-t border-forest/10 bg-[#FAF7F2]/60 px-5 pb-6 pt-4 md:px-6"
                      >
                        <div className="grid gap-6 md:grid-cols-2">
                          {/* Column A: What happens & What you need */}
                          <div className="space-y-4">
                            <div>
                              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-forest/60 block">
                                What happens at this stage
                              </span>
                              <p className="mt-1 text-[13.5px] leading-relaxed text-forest/85">
                                {stage.whatHappensHere}
                              </p>
                            </div>

                            <div>
                              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-forest/60 block">
                                Documents & preparations you may need
                              </span>
                              <ul className="mt-1.5 space-y-1 text-[13px] text-forest/80">
                                {stage.whatYouMayNeed.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-[#E88970] font-bold">—</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Column B: Questions for Oncologist & Actions */}
                          <div className="space-y-4">
                            <div>
                              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B84A39] block">
                                Questions to ask your oncologist
                              </span>
                              <ul className="mt-1.5 space-y-1 text-[13px] text-forest/85">
                                {stage.questionsForDoctor.map((q, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-[#B84A39] font-bold">?</span>
                                    <span>{q}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="pt-2 flex flex-wrap items-center gap-3">
                              <Link
                                href={stage.actionHref || "/journey"}
                                className="inline-flex items-center gap-1.5 rounded bg-forest px-4 py-2 text-[13px] font-semibold text-white-soft transition-opacity hover:opacity-90"
                              >
                                <span>{stage.actionLabel || "Explore Stage Details"}</span>
                                <span>→</span>
                              </Link>
                              <Link
                                href="/ai?task=appointment"
                                className="text-[12.5px] font-medium text-forest underline hover:opacity-80"
                              >
                                Add to doctor visit checklist
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Journey Footer */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-forest/12 pt-6 text-[13.5px] text-forest/80">
          <p>
            Stages 01–08 represent standard clinical progression across major oncology care centers in India.
          </p>
          <Link
            href="/journey"
            className="font-semibold text-forest underline hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            Explore full patient pathway interactive map →
          </Link>
        </div>
      </div>
    </section>
  );
}
