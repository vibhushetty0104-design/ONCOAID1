"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { brand } from "@/lib/brand";

interface CareMilestone {
  id: string;
  step: string;
  title: string;
  detail: string;
  status: "completed" | "active" | "upcoming";
  tag: string;
}

const milestones: CareMilestone[] = [
  {
    id: "m1",
    step: "01",
    title: "Diagnostic Evaluation",
    detail: "Initial consultation, clinical imaging & tissue biopsy",
    status: "completed",
    tag: "Completed",
  },
  {
    id: "m2",
    step: "02",
    title: "Pathology & Biomarkers",
    detail: "Histology, ER/PR/HER2 profiling & plain-language translation",
    status: "active",
    tag: "Active · You Are Here",
  },
  {
    id: "m3",
    step: "03",
    title: "Specialist Consultation",
    detail: "Multidisciplinary evaluation with treating oncology team",
    status: "upcoming",
    tag: "Upcoming",
  },
  {
    id: "m4",
    step: "04",
    title: "Treatment Planning",
    detail: "Tumor board review, clinical protocol & sequencing",
    status: "upcoming",
    tag: "Upcoming",
  },
  {
    id: "m5",
    step: "05",
    title: "Active Treatment",
    detail: "Systemic therapy, surgical care, or radiation sessions",
    status: "upcoming",
    tag: "Next stage",
  },
  {
    id: "m6",
    step: "06",
    title: "Follow-up & Recovery",
    detail: "Surveillance, symptom support & survivorship wellness",
    status: "upcoming",
    tag: "Long term",
  },
];

export function CareSignal() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse tracking for 3D tilt and proximity
  const [mousePos, setMousePos] = useState<{ x: number; y: number; relX: number; relY: number }>({
    x: 0,
    y: 0,
    relX: 0.5,
    relY: 0.5,
  });
  const [activeHoverNode, setActiveHoverNode] = useState<string | null>(null);

  // Canvas biological waveform animation
  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      time += 0.015;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const mx = mousePos.relX;
      const my = mousePos.relY;

      // 3 subtle biological flow lines
      const waveLines = [
        { color: "rgba(127, 212, 208, 0.18)", yRatio: 0.35, amp: 14, freq: 0.004, speed: 1.0 },
        { color: "rgba(215, 236, 227, 0.12)", yRatio: 0.52, amp: 18, freq: 0.003, speed: 0.8 },
        { color: "rgba(232, 137, 112, 0.14)", yRatio: 0.68, amp: 12, freq: 0.005, speed: 1.2 },
      ];

      waveLines.forEach((line) => {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1.2;

        for (let x = 0; x <= w; x += 5) {
          const distToMouse = Math.abs(x / w - mx);
          const mouseLift = Math.exp(-distToMouse * 3.5) * (my - 0.5) * 25;

          const wave =
            Math.sin(x * line.freq + time * line.speed) * line.amp +
            Math.cos(x * line.freq * 1.8 - time * 0.6) * (line.amp * 0.4);

          const y = h * line.yRatio + wave + mouseLift;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [reduce, mousePos.relX, mousePos.relY]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({
      x,
      y,
      relX: Math.max(0, Math.min(1, x / rect.width)),
      relY: Math.max(0, Math.min(1, y / rect.height)),
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0, relX: 0.5, relY: 0.5 });
    setActiveHoverNode(null);
  }, []);

  // 3D perspective tilt calculation
  const tiltX = reduce ? 0 : (mousePos.relY - 0.5) * -7;
  const tiltY = reduce ? 0 : (mousePos.relX - 0.5) * 7;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full transition-transform duration-300 ease-out"
      style={{
        transform: reduce
          ? "none"
          : `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
      }}
    >
      {/* Container Frame */}
      <div className="relative overflow-hidden rounded-xl border border-white-soft/15 bg-[#042422]/90 p-5 sm:p-7 shadow-[0_20px_50px_rgba(2,16,14,0.5)] backdrop-blur-md">
        {/* Living Waveform Background Canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
        />

        {/* Top Care Signal Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-white-soft/10 pb-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mint">
              Care Signal · Living Care Trajectory
            </span>
            <p className="font-serif text-[17px] text-white-soft mt-0.5 font-normal">
              Stage 02 of 06 · Active Pathway
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Responsive</span>
          </div>
        </div>

        {/* Trajectory Milestones List */}
        <div className="relative z-10 mt-6 space-y-3">
          {/* Vertical Connecting Line with Dynamic Curve */}
          <div
            className="absolute left-[17px] top-3 bottom-3 w-[2px] transition-all duration-200"
            style={{
              background: `linear-gradient(to bottom, #7FD4D0 0%, #7FD4D0 30%, #E88970 45%, rgba(245,240,230,0.2) 75%, rgba(245,240,230,0.1) 100%)`,
              transform: `translateX(${(mousePos.relX - 0.5) * 4}px)`,
            }}
          />

          {milestones.map((item, idx) => {
            const isCompleted = item.status === "completed";
            const isActive = item.status === "active";
            const isHovered = activeHoverNode === item.id;

            // Compute distance to mouse for subtle proximity effect
            const nodeY = (idx + 0.5) / milestones.length;
            const distY = Math.abs(mousePos.relY - nodeY);
            const proximity = Math.max(0, 1 - distY * 3);

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveHoverNode(item.id)}
                className={`group relative flex items-start gap-3.5 rounded-lg p-2.5 transition-all duration-200 border ${
                  isActive
                    ? "border-mint/35 bg-white-soft/[0.08] shadow-[0_0_15px_rgba(127,212,208,0.12)]"
                    : isHovered
                      ? "border-white-soft/20 bg-white-soft/[0.05]"
                      : "border-transparent bg-transparent hover:bg-white-soft/[0.03]"
                }`}
                style={{
                  transform: reduce
                    ? "none"
                    : `translateX(${proximity * 4}px) scale(${1 + proximity * 0.015})`,
                }}
              >
                {/* Milestone Node Circle */}
                <div
                  className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11.5px] font-bold transition-all ${
                    isCompleted
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/50"
                      : isActive
                        ? "bg-[#E88970]/25 text-[#E88970] border border-[#E88970] shadow-[0_0_14px_rgba(232,137,112,0.4)] ring-2 ring-[#E88970]/20 animate-pulse"
                        : "bg-white-soft/8 text-white-soft/50 border border-white-soft/15"
                  }`}
                >
                  {isCompleted ? "✓" : item.step}
                </div>

                {/* Milestone Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`text-[13.5px] truncate ${
                        isActive
                          ? "font-semibold text-white-soft"
                          : "font-medium text-white-soft/85"
                      }`}
                    >
                      {item.title}
                    </h4>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider shrink-0 px-2 py-0.5 rounded ${
                        isActive
                          ? "bg-[#E88970]/25 text-[#E88970] font-bold"
                          : isCompleted
                            ? "bg-emerald-500/15 text-emerald-300"
                            : "bg-white-soft/8 text-white-soft/45"
                      }`}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <p className="mt-0.5 text-[12px] text-white-soft/65 leading-snug line-clamp-1">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trajectory Callout */}
        <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white-soft/10 pt-3.5 text-[12px]">
          <span className="text-white-soft/60">
            Interactive Care Pathway · Proximity responsive
          </span>
          <Link
            href="/journey"
            className="font-medium text-mint hover:text-white-soft hover:underline flex items-center gap-1 transition-colors"
          >
            <span>Explore 8-Stage Map</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Compact Mobile Care Signal Visual
 */
export function MobileCareSignal() {
  return (
    <div className="w-full rounded-lg border border-white-soft/15 bg-[#042422]/90 p-4 text-white-soft shadow-md backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white-soft/10 pb-2.5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-mint block">
            Care Signal · Trajectory
          </span>
          <span className="text-[12.5px] font-medium text-white-soft mt-0.5 block">
            Stage 02 of 06 · Understanding Diagnosis
          </span>
        </div>
        <span className="rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-300 border border-emerald-400/25">
          Active
        </span>
      </div>

      {/* 3 Active Milestone Steps */}
      <div className="mt-3 space-y-2 text-[12px]">
        <div className="flex items-center gap-2 text-emerald-300">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold border border-emerald-400/40">✓</span>
          <span className="truncate">01 Diagnostic Evaluation (Completed)</span>
        </div>
        <div className="flex items-center gap-2 text-[#E88970] font-semibold bg-white-soft/6 p-1.5 rounded">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E88970]/30 text-[10px] font-bold border border-[#E88970] animate-pulse">02</span>
          <span className="truncate">02 Pathology & Biomarkers (You Are Here)</span>
        </div>
        <div className="flex items-center gap-2 text-white-soft/50">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white-soft/10 text-[10px] font-bold border border-white-soft/20">03</span>
          <span className="truncate">03 Specialist Consultation (Upcoming)</span>
        </div>
      </div>

      <div className="mt-3 border-t border-white-soft/10 pt-2 flex items-center justify-between text-[11px]">
        <span className="text-white-soft/50">8 Clinical Stages Total</span>
        <Link href="/journey" className="text-mint font-medium hover:underline">
          View All Stages →
        </Link>
      </div>
    </div>
  );
}
