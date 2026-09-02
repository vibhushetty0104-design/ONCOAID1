"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { HeroAliveSignal } from "@/components/home/hero-alive-signal";
import { HeroJourneyPathway } from "@/components/home/hero-journey-pathway";
import { motionTokens } from "@/lib/motion";

export function HomeHero() {
  const reduce = useReducedMotion();
  const d = reduce ? 0 : undefined;

  return (
    <section className="relative overflow-hidden bg-forest text-white-soft">
      {/* Subtle, restrained radial depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_15%,rgba(127,212,208,0.08),transparent_50%),radial-gradient(ellipse_at_80%_85%,rgba(20,22,46,0.3),transparent_60%)]" />

      {/* Alive, interactive clinical data flow signal canvas */}
      <HeroAliveSignal />

      {/* Ample top spacing so headline is never crowded by fixed navbar */}
      <div className="container-page relative min-h-[90svh] flex flex-col justify-center pb-20 pt-36 sm:pt-40 lg:pt-44 lg:pb-28">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 xl:gap-14 items-center relative z-10">
          {/* Left Column: Core Positioning & Actions */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-white-soft/14 bg-white-soft/6 px-4 py-1.5 backdrop-blur-sm"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionTokens.normal, delay: d ?? 0.1, ease: motionTokens.easeOutSoft }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-mint">
                Clinical Navigation · India
              </span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.h1
              className="editorial-serif mt-6 text-[clamp(2.6rem,5.8vw,4.8rem)] leading-[1.02] text-white-soft tracking-tight"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionTokens.slow, delay: d ?? 0.2, ease: motionTokens.easeOutSoft }}
            >
              Cancer care,
              <span className="mt-2 block font-serif italic text-mint">
                made easier to navigate.
              </span>
            </motion.h1>

            {/* Supporting copy */}
            <motion.p
              className="mt-6 text-[17.5px] leading-relaxed text-white-soft/85 sm:text-[19px] max-w-xl"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionTokens.slow, delay: d ?? 0.35, ease: motionTokens.easeOutSoft }}
            >
              Understand your diagnosis. Prepare for what&apos;s next. Find the right care &mdash; with clear, clinically reviewed information built for patients and families in India.
            </motion.p>

            {/* Primary Action Row */}
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionTokens.fast, delay: d ?? 0.5, ease: motionTokens.easeOutSoft }}
            >
              <Button
                href="/reports"
                variant="coral"
                className="px-7 py-3.5 text-[14.5px] font-semibold shadow-md transition-transform hover:scale-[1.02]"
              >
                Understand my report
              </Button>

              <Button
                href="/specialists"
                variant="ghost"
                className="border border-white-soft/22 bg-white-soft/6 px-6 py-3.5 text-[14.5px] text-white-soft hover:bg-white-soft/12 font-medium"
              >
                Find a specialist
              </Button>

              <Link
                href="/dashboard/journey"
                className="px-3 py-2 text-[14.5px] text-mint hover:text-white-soft font-medium transition-colors"
              >
                Explore the patient journey →
              </Link>
            </motion.div>

            {/* Contextual Starting Points (no emojis, clean typography) */}
            <motion.div
              className="mt-10 border-t border-white-soft/10 pt-6"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: motionTokens.slow, delay: d ?? 0.65, ease: motionTokens.easeOutSoft }}
            >
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white-soft/50 mb-3">
                Immediate Starting Points
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                <Link
                  href="/reports"
                  className="group inline-flex items-center gap-2 rounded-full border border-white-soft/14 bg-white-soft/6 px-4 py-1.5 text-[13px] text-white-soft/90 transition-all hover:border-cyan/40 hover:bg-white-soft/10"
                >
                  <span>Biopsy & pathology decode</span>
                  <span className="text-cyan transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
                <Link
                  href="/ai?task=appointment"
                  className="group inline-flex items-center gap-2 rounded-full border border-white-soft/14 bg-white-soft/6 px-4 py-1.5 text-[13px] text-white-soft/90 transition-all hover:border-cyan/40 hover:bg-white-soft/10"
                >
                  <span>Questions for your oncologist</span>
                  <span className="text-cyan transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
                <Link
                  href="/care"
                  className="group inline-flex items-center gap-2 rounded-full border border-white-soft/14 bg-white-soft/6 px-4 py-1.5 text-[13px] text-white-soft/90 transition-all hover:border-cyan/40 hover:bg-white-soft/10"
                >
                  <span>Care pathways</span>
                  <span className="text-cyan transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Living Clinical Signal / Journey Visualization */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: motionTokens.slow, delay: d ?? 0.3, ease: motionTokens.easeOutSoft }}
          >
            <HeroJourneyPathway />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
