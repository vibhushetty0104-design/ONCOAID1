"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { HeroAliveSignal } from "@/components/home/hero-alive-signal";
import { motionTokens } from "@/lib/motion";

export function HomeHero() {
  const reduce = useReducedMotion();
  const d = reduce ? 0 : undefined;

  return (
    <section className="relative overflow-hidden bg-forest text-white-soft">
      {/* Subtle, restrained radial depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_15%,rgba(127,212,208,0.08),transparent_50%),radial-gradient(ellipse_at_80%_85%,rgba(20,22,46,0.3),transparent_60%)]" />

      {/* Alive, interactive clinical data flow signal */}
      <HeroAliveSignal />

      {/* Ample top spacing so headline is never crowded by fixed navbar */}
      <div className="container-page relative min-h-[90svh] flex flex-col justify-center pb-20 pt-36 sm:pt-44 lg:pt-48 lg:pb-32">
        <div className="max-w-4xl relative z-10">
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-white-soft/12 bg-white-soft/6 px-4 py-1.5 backdrop-blur-sm"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionTokens.normal, delay: d ?? 0.15, ease: motionTokens.easeOutSoft }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-mint-deep">
              Clinical Intelligence & Navigation Platform
            </span>
          </motion.div>

          {/* Main Editorial Headline */}
          <motion.h1
            className="editorial-serif mt-6 text-[clamp(2.75rem,7.5vw,5.8rem)] leading-[0.98] text-white-soft tracking-tight"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionTokens.slow, delay: d ?? 0.25, ease: motionTokens.easeOutSoft }}
          >
            Cancer care is complicated.
            <span className="mt-3 block font-serif italic text-mint">
              Understanding your path shouldn&apos;t be.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="mt-8 max-w-2xl text-[18px] leading-relaxed text-white-soft/80 sm:text-[20px]"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionTokens.slow, delay: d ?? 0.45, ease: motionTokens.easeOutSoft }}
          >
            ONCO-AID translates pathology reports into plain language, helps you prepare questions for your oncology team, and matches you with verified specialists across India.
          </motion.p>

          {/* Primary Action Row with Core Ask ONCO-AID Launcher */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionTokens.fast, delay: d ?? 0.65, ease: motionTokens.easeOutSoft }}
          >
            {/* Core Task Action: Ask ONCO-AID */}
            <Button
              href="/ai"
              variant="coral"
              className="px-7 py-3.5 text-[15px] font-medium shadow-md transition-transform hover:scale-[1.02]"
            >
              Ask ONCO-AID Assistant →
            </Button>

            {/* Find Care CTA */}
            <Button
              href="/specialists"
              variant="ghost"
              className="border border-white-soft/20 bg-white-soft/6 px-6 py-3.5 text-[15px] text-white-soft hover:bg-white-soft/12"
            >
              Find Specialists
            </Button>

            {/* Patient Portal / Dashboard Shortcut */}
            <Button
              href="/dashboard"
              variant="ghost"
              className="px-5 py-3.5 text-[15px] text-mint hover:text-white-soft"
            >
              Patient Portal →
            </Button>
          </motion.div>

          {/* Quick Task Launcher Pills */}
          <motion.div
            className="mt-12 border-t border-white-soft/10 pt-8"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: motionTokens.slow, delay: d ?? 0.85, ease: motionTokens.easeOutSoft }}
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white-soft/50">
              Immediate Starting Points
            </p>
            <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
              <a
                href="/reports"
                className="group inline-flex items-center gap-2 rounded-full border border-white-soft/12 bg-white-soft/5 px-4 py-2 text-[13px] text-white-soft/85 transition-all hover:border-cyan/40 hover:bg-white-soft/10"
              >
                <span>📄 Understand my biopsy or pathology report</span>
                <span className="text-cyan transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="/ai?task=appointment"
                className="group inline-flex items-center gap-2 rounded-full border border-white-soft/12 bg-white-soft/5 px-4 py-2 text-[13px] text-white-soft/85 transition-all hover:border-cyan/40 hover:bg-white-soft/10"
              >
                <span>📝 Prepare questions for my oncologist</span>
                <span className="text-cyan transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="/dashboard/journey"
                className="group inline-flex items-center gap-2 rounded-full border border-white-soft/12 bg-white-soft/5 px-4 py-2 text-[13px] text-white-soft/85 transition-all hover:border-cyan/40 hover:bg-white-soft/10"
              >
                <span>🛤️ View Patient 8-Stage Journey</span>
                <span className="text-cyan transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
