"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/utils";

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ivory text-forest pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 md:pb-24">
      <div className="container-page relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
          {/* Left: Editorial Narrative */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.24em] text-warm-gray">
                CANCER CARE · BENGALURU
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="editorial-serif mt-5 text-[clamp(2.6rem,6.8vw,4.8rem)] leading-[1.04] text-forest font-normal tracking-tight"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Cancer care,
              <span className="block italic text-forest/90">made clearer.</span>
            </motion.h1>

            {/* Supporting 3-line message */}
            <motion.p
              className="mt-6 text-[16px] sm:text-[17.5px] md:text-[19px] text-blue-gray font-sans leading-relaxed"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Understand your diagnosis.<br />
              Find the right care.<br />
              Know what comes next.
            </motion.p>

            {/* Single Primary CTA */}
            <motion.div
              className="mt-8 flex items-center gap-4"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/care"
                className="inline-flex items-center gap-2.5 rounded-full bg-forest px-7 py-3.5 text-[14.5px] font-medium text-white shadow-xs hover:bg-forest-mid active:scale-[0.99] transition-all"
              >
                <span>Start here</span>
                <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Right: Subtle Care Signal Signature (Calm & Alive) */}
          <motion.div
            className="relative hidden lg:flex flex-col items-center justify-center p-6"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <div className="w-full max-w-md relative">
              <svg viewBox="0 0 400 120" fill="none" className="w-full h-28 overflow-visible">
                <defs>
                  <linearGradient id="heroSignalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#082828" stopOpacity="0.12" />
                    <stop offset="40%" stopColor="#2A6D65" stopOpacity="0.7" />
                    <stop offset="70%" stopColor="#E06D53" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#082828" stopOpacity="0.1" />
                  </linearGradient>

                  <radialGradient id="heroDotGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFA085" stopOpacity="1" />
                    <stop offset="50%" stopColor="#E06D53" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#E06D53" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Subtle base wave */}
                <path
                  d="M 0 60 C 50 60, 80 30, 140 30 C 200 30, 230 85, 290 85 C 340 85, 370 60, 400 60"
                  stroke="rgba(8, 40, 40, 0.08)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                {/* Flowing Care Signal line */}
                <path
                  d="M 0 60 C 50 60, 80 30, 140 30 C 200 30, 230 85, 290 85 C 340 85, 370 60, 400 60"
                  stroke="url(#heroSignalGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Quiet pulsing signal marker */}
                <g transform="translate(250, 78)">
                  <circle r="10" fill="url(#heroDotGlow)" className="animate-pulse opacity-70" />
                  <circle r="3" fill="#FFFDF8" />
                  <circle r="1.5" fill="#E06D53" />
                </g>
              </svg>

              <p className="text-center text-[11px] uppercase tracking-[0.24em] text-warm-gray/60 mt-3 font-medium">
                CARE SIGNAL · CLINICAL ORIENTATION
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
