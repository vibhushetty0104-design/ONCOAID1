"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { CareSignal, MobileCareSignal } from "@/components/home/care-signal";
import { useReducedMotion } from "motion/react";

export function HomeHero() {
  const reduce = useReducedMotion();

  // Typing animation state:
  // Step 0: "ONCO—AID"
  // Step 1: pause
  // Step 2: "Cancer care,"
  // Step 3: pause
  // Step 4: "made clearer."
  // Step 5: completed (cursor fades, content reveals)
  const [typedTitle1, setTypedTitle1] = useState("");
  const [typedTitle2, setTypedTitle2] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (reduce) {
      setTypedTitle1("Cancer care,");
      setTypedTitle2("made clearer.");
      setIsTypingComplete(true);
      setCursorVisible(false);
      return;
    }

    const line1 = "Cancer care,";
    const line2 = "made clearer.";
    let currentIndex = 0;
    let timer: NodeJS.Timeout;

    // Type line 1
    const typeLine1 = () => {
      if (currentIndex <= line1.length) {
        setTypedTitle1(line1.slice(0, currentIndex));
        currentIndex++;
        timer = setTimeout(typeLine1, 45);
      } else {
        // Pause between line 1 and line 2
        currentIndex = 0;
        timer = setTimeout(typeLine2, 280);
      }
    };

    // Type line 2
    const typeLine2 = () => {
      if (currentIndex <= line2.length) {
        setTypedTitle2(line2.slice(0, currentIndex));
        currentIndex++;
        timer = setTimeout(typeLine2, 45);
      } else {
        // Complete
        timer = setTimeout(() => {
          setIsTypingComplete(true);
          setCursorVisible(false);
        }, 350);
      }
    };

    // Initial slight pause before typing starts
    timer = setTimeout(typeLine1, 200);

    return () => clearTimeout(timer);
  }, [reduce]);

  return (
    <section className="relative overflow-hidden bg-[#063B36] text-white-soft pt-28 pb-20 md:pt-36 md:pb-28 border-b border-white-soft/10">
      {/* Subtle Ambient Radial Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-10 h-[400px] w-[400px] rounded-full bg-[#E88970]/8 blur-[140px]"
      />

      <div className="container-page relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left Column: Brand, Editorial Typing Headline, Copy & CTAs */}
          <div className="flex flex-col">
            {/* Centralized Brand Eyebrow */}
            <div className="flex items-center gap-2 text-mint font-semibold text-[11.5px] tracking-[0.2em] uppercase">
              <span>{brand.name}</span>
              <span className="text-white-soft/40">·</span>
              <span className="text-white-soft/75 tracking-widest">{brand.launchCity.toUpperCase()}</span>
            </div>

            {/* Editorial Serif Headline with Precise Typing Animation */}
            <h1 className="editorial-serif mt-4 text-[2.85rem] sm:text-[3.6rem] md:text-[4.2rem] lg:text-[4.5rem] leading-[1.08] tracking-tight text-white-soft min-h-[2.3em]">
              <span className="block">{typedTitle1 || (reduce ? "Cancer care," : "")}</span>
              <span className="block text-mint-soft">
                {typedTitle2 || (reduce ? "made clearer." : "")}
                {cursorVisible && (
                  <span className="inline-block w-[3px] h-[0.85em] align-baseline bg-mint ml-1 animate-pulse" />
                )}
              </span>
            </h1>

            {/* Supporting Copy (Revealed smoothly) */}
            <div
              className={`transition-opacity duration-700 mt-6 max-w-xl ${
                isTypingComplete || reduce ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="space-y-1 text-[16px] sm:text-[17.5px] font-normal text-white-soft/85 leading-relaxed">
                <p>Understand your diagnosis.</p>
                <p>Find the right care.</p>
                <p>Know what comes next.</p>
              </div>

              <p className="mt-4 text-[14px] text-white-soft/65 leading-relaxed">
                A calm, clinical navigation platform for patients and families across Bengaluru and India. Grounded in ICMR and NCCN oncology consensus guidelines.
              </p>

              {/* Mobile-only Care Signal placement (ordered per specification) */}
              <div className="mt-7 lg:hidden">
                <MobileCareSignal />
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/care/diagnosed"
                  className="inline-flex items-center justify-center rounded-md bg-[#E88970] px-6 py-3.5 text-[14px] font-semibold text-[#042422] shadow-sm transition-all hover:bg-[#eb967f] hover:translate-x-0.5"
                >
                  <span>Start here →</span>
                </Link>

                <Link
                  href="/reports"
                  className="inline-flex items-center justify-center rounded-md border border-white-soft/25 bg-white-soft/[0.08] px-5 py-3.5 text-[14px] font-medium text-white-soft backdrop-blur-xs transition-colors hover:border-white-soft/50 hover:bg-white-soft/15"
                >
                  Decode a Report
                </Link>
              </div>

              {/* Small Immediate Starting Points */}
              <div className="mt-8 border-t border-white-soft/12 pt-4">
                <span className="text-[11px] uppercase tracking-[0.14em] text-white-soft/50 block mb-2 font-medium">
                  Immediate starting points:
                </span>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-white-soft/75">
                  <Link
                    href="/reports"
                    className="hover:text-mint hover:underline underline-offset-4 transition-colors"
                  >
                    Biopsy & Pathology Report →
                  </Link>
                  <Link
                    href="/specialists"
                    className="hover:text-mint hover:underline underline-offset-4 transition-colors"
                  >
                    Specialists in Bengaluru →
                  </Link>
                  <Link
                    href="/journey"
                    className="hover:text-mint hover:underline underline-offset-4 transition-colors"
                  >
                    8-Stage Care Pathway →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Desktop Living Care Signal (Restored & Enhanced) */}
          <div
            className={`hidden lg:block transition-opacity duration-700 ${
              isTypingComplete || reduce ? "opacity-100" : "opacity-0"
            }`}
          >
            <CareSignal />
          </div>
        </div>
      </div>
    </section>
  );
}
