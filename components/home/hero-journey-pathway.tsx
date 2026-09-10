"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";

interface MilestoneNode {
  step: string;
  label: string;
  detail: string;
  status: "completed" | "active" | "upcoming";
  tag: string;
}

const milestones: MilestoneNode[] = [
  {
    step: "01",
    label: "Diagnostic Evaluation",
    detail: "Imaging scans, biopsy & histological tissue evaluation",
    status: "completed",
    tag: "Completed",
  },
  {
    step: "02",
    label: "Pathology & Biomarkers",
    detail: "Receptor profiling, staging verification & plain-language decode",
    status: "active",
    tag: "Active milestone",
  },
  {
    step: "03",
    label: "Specialist Consultation",
    detail: "Surgical, medical or radiation oncologist evaluation",
    status: "upcoming",
    tag: "Upcoming",
  },
  {
    step: "04",
    label: "Multidisciplinary Care Plan",
    detail: "Tumor board review, treatment sequencing & support preparation",
    status: "upcoming",
    tag: "Next milestone",
  },
];

const mobileTrajectorySteps = [
  { label: "Understand", active: true },
  { label: "Prepare", active: false },
  { label: "Find Care", active: false },
  { label: "Treat", active: false },
  { label: "Recover", active: false },
  { label: "Follow Up", active: false },
];

export function HeroJourneyPathway() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setOffset({ x: x * 12, y: y * 12 });
    };

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reduce]);

  return (
    <div>
      {/* Mobile Responsive Version (Visible on Mobile & Tablet) */}
      <div className="lg:hidden w-full mt-8 rounded-[24px] border border-white-soft/14 bg-[#082221]/95 p-5 text-white-soft shadow-[0_16px_40px_rgba(4,20,20,0.35)]">
        <div className="flex items-center justify-between border-b border-white-soft/10 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-mint block">
              ONCO-AID Care Signal
            </span>
            <span className="text-[13px] font-semibold text-white-soft mt-0.5 block">
              STAGE 02 OF 08 · Understanding your diagnosis
            </span>
          </div>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
            Active Trajectory
          </span>
        </div>

        {/* Mobile Trajectory Flow Chips */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11.5px]">
          {mobileTrajectorySteps.map((s, idx) => (
            <div key={s.label} className="flex items-center shrink-0 gap-1.5">
              <span
                className={`rounded-lg px-2.5 py-1 font-medium transition-colors ${
                  s.active
                    ? "bg-mint text-forest font-bold"
                    : "bg-white-soft/6 text-white-soft/60 border border-white-soft/10"
                }`}
              >
                {s.label}
              </span>
              {idx < mobileTrajectorySteps.length - 1 && (
                <span className="text-white-soft/30 text-[10px]">→</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-white-soft/10 pt-2.5 text-[12px]">
          <span className="text-white-soft/50 text-[11px]">Example Care Pathway</span>
          <Link
            href="/dashboard/journey"
            className="text-mint font-medium hover:underline flex items-center gap-1"
          >
            Explore 8-Stage Map →
          </Link>
        </div>
      </div>

      {/* Desktop Version with Subtle Perspective Hover (Visible on lg+) */}
      <div
        ref={containerRef}
        className="relative hidden lg:block w-full max-w-[500px] xl:max-w-[540px] ml-auto transition-transform duration-500 ease-out"
        style={{
          transform: reduce
            ? "none"
            : `perspective(1000px) rotateY(${offset.x * 0.35}deg) rotateX(${-offset.y * 0.35}deg) translate3d(${offset.x * 0.25}px, ${offset.y * 0.25}px, 0)`,
        }}
      >
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute -inset-2 rounded-[40px] bg-gradient-to-b from-cyan/15 via-mint/10 to-transparent blur-2xl opacity-60" />

        {/* Main Panel */}
        <div className="relative overflow-hidden rounded-[32px] border border-white-soft/14 bg-[#082221]/92 p-6 xl:p-8 backdrop-blur-xl shadow-[0_24px_60px_rgba(4,20,20,0.45)]">
          {/* Panel Header */}
          <div className="flex items-center justify-between border-b border-white-soft/10 pb-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mint block">
                ONCO-AID Care Signal
              </span>
              <p className="font-serif text-[18px] text-white-soft font-normal mt-0.5">
                Living Care Trajectory
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Active Trajectory</span>
            </div>
          </div>

          {/* Milestone Pathway List */}
          <div className="relative mt-6 space-y-4">
            {/* Vertical Connecting Line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-emerald-400/80 via-cyan/60 to-white-soft/20" />

            {milestones.map((item) => {
              const isCompleted = item.status === "completed";
              const isActive = item.status === "active";

              return (
                <div
                  key={item.step}
                  className={`relative flex items-start gap-4 rounded-2xl p-3.5 transition-all duration-300 border ${
                    isActive
                      ? "border-mint/30 bg-white-soft/8 shadow-md"
                      : "border-transparent bg-transparent hover:bg-white-soft/4"
                  }`}
                >
                  {/* Milestone Node Dot */}
                  <div
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[12px] font-bold transition-all ${
                      isCompleted
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                        : isActive
                          ? "bg-cyan/20 text-cyan border border-cyan/60 shadow-[0_0_12px_rgba(127,212,208,0.4)] animate-pulse"
                          : "bg-white-soft/6 text-white-soft/50 border border-white-soft/15"
                    }`}
                  >
                    {isCompleted ? "✓" : item.step}
                  </div>

                  {/* Milestone Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4
                        className={`text-[14px] font-medium truncate ${
                          isActive ? "text-white-soft font-semibold" : "text-white-soft/90"
                        }`}
                      >
                        {item.label}
                      </h4>
                      <span
                        className={`text-[10.5px] font-semibold uppercase tracking-wider shrink-0 px-2 py-0.5 rounded ${
                          isActive
                            ? "bg-coral/20 text-coral"
                            : isCompleted
                              ? "bg-emerald-500/15 text-emerald-300"
                              : "bg-white-soft/6 text-white-soft/50"
                        }`}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <p className="mt-1 text-[12.5px] text-white-soft/70 truncate">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Panel Footer Action */}
          <div className="mt-6 flex items-center justify-between border-t border-white-soft/10 pt-4 text-[12.5px]">
            <span className="text-white-soft/60">Stage 02 of 08 in progress · Example</span>
            <Link
              href="/dashboard/journey"
              className="font-medium text-mint hover:text-white-soft hover:underline flex items-center gap-1 transition-colors"
            >
              <span>Explore 8-Stage Map</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
