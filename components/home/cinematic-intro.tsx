"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface CinematicIntroProps {
  onComplete?: () => void;
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [stage, setStage] = useState<"idle" | "brand" | "typing" | "complete" | "exiting" | "hidden">("brand");
  
  // Typed text state
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorFading, setCursorFading] = useState(false);

  // Progress dashes (1, 2, 3)
  const [activeProgressIndex, setActiveProgressIndex] = useState(0);

  // Signal dot position along SVG path (0 to 1)
  const [dotProgress, setDotProgress] = useState(0);

  const reduceMotion = useReducedMotion();
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const pathRef = useRef<SVGPathElement>(null);
  const [dotCoords, setDotCoords] = useState<{ x: number; y: number }>({ x: 30, y: 35 });

  const addTimeout = useCallback((fn: () => void, delay: number) => {
    const t = setTimeout(fn, delay);
    timeoutsRef.current.push(t);
    return t;
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  // Complete and exit intro immediately
  const finishIntro = useCallback(() => {
    clearAllTimeouts();
    setStage("exiting");
    setTimeout(() => {
      setStage("hidden");
      document.body.classList.remove("intro-active");
      if (onComplete) onComplete();
    }, 450);
  }, [clearAllTimeouts, onComplete]);

  // Initial mount: plays EVERY TIME (no permanent localStorage skip)
  useEffect(() => {
    document.body.classList.add("intro-active");
    setStage("brand");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        finishIntro();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("intro-active");
      clearAllTimeouts();
    };
  }, [finishIntro, clearAllTimeouts]);

  // Animation orchestration: total ~2.2-2.6 seconds
  useEffect(() => {
    if (stage !== "brand") return;

    if (reduceMotion) {
      // Reduced motion: show final static state immediately, hold briefly, then exit
      setLine1("Cancer care,");
      setLine2("made clearer.");
      setActiveProgressIndex(3);
      setDotProgress(0.7);
      setCursorFading(true);
      addTimeout(() => {
        finishIntro();
      }, 1200);
      return;
    }

    // Step 1: Start typing after brand reveal (~300ms)
    addTimeout(() => {
      setStage("typing");

      const target1 = "Cancer care,";
      const target2 = "made clearer.";
      const charDelay = 48; // crisp 48ms per character

      // Type line 1 (12 chars * 48ms = ~576ms)
      target1.split("").forEach((char, idx) => {
        addTimeout(() => {
          setLine1(target1.slice(0, idx + 1));
        }, idx * charDelay);
      });

      const line1Duration = target1.length * charDelay;
      const pauseBetweenLines = 160; // short breath

      // Type line 2 (13 chars * 48ms = ~624ms)
      target2.split("").forEach((char, idx) => {
        addTimeout(() => {
          setLine2(target2.slice(0, idx + 1));
        }, line1Duration + pauseBetweenLines + idx * charDelay);
      });

      const totalTypingTime = line1Duration + pauseBetweenLines + target2.length * charDelay;

      // Progress dashes sequence (━━━  ━━━  ━━━)
      addTimeout(() => setActiveProgressIndex(1), totalTypingTime * 0.35);
      addTimeout(() => setActiveProgressIndex(2), totalTypingTime * 0.7);
      addTimeout(() => setActiveProgressIndex(3), totalTypingTime + 150);

      // Cursor fadeout after 2 blinks
      addTimeout(() => {
        setCursorFading(true);
      }, totalTypingTime + 200);

      // Settle and transition into homepage (~2.4s total)
      addTimeout(() => {
        finishIntro();
      }, totalTypingTime + 650);

    }, 320);

  }, [stage, reduceMotion, addTimeout, finishIntro]);

  // Care Signal travelling dot coordinate calculator
  useEffect(() => {
    if (stage !== "typing" && stage !== "complete") return;

    let startTime = performance.now();
    const duration = 1800; // glides smoothly across the curve
    let reqId: number;

    const animateDot = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDotProgress(progress);

      if (pathRef.current) {
        try {
          const pathLen = pathRef.current.getTotalLength();
          // Dot travels from 15% to 68% of the path length
          const targetDist = pathLen * (0.15 + progress * 0.52);
          const point = pathRef.current.getPointAtLength(targetDist);
          setDotCoords({ x: point.x, y: point.y });
        } catch {
          // Graceful fallback
        }
      }

      if (progress < 1) {
        reqId = requestAnimationFrame(animateDot);
      }
    };

    reqId = requestAnimationFrame(animateDot);
    return () => cancelAnimationFrame(reqId);
  }, [stage]);

  if (stage === "hidden") {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-intro"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === "exiting" ? 0 : 1, y: stage === "exiting" ? -8 : 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden bg-[#041514] text-[#F5EFE6] select-none cursor-pointer"
        style={{
          background:
            "radial-gradient(circle at 50% 46%, rgba(14, 52, 50, 0.72) 0%, rgba(4, 21, 20, 0.98) 75%, #031110 100%)",
        }}
        onClick={finishIntro}
        role="button"
        tabIndex={0}
        aria-label="Skip intro sequence"
      >
        {/* ============================================================ */}
        {/* TOP SECTION: BRAND WORDMARK & SUB-TAG                       */}
        {/* ============================================================ */}
        <header className="pt-12 md:pt-16 text-center px-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-sans text-[13.5px] md:text-[15.5px] font-medium uppercase tracking-[0.38em] text-[#F5EFE6] pl-[0.38em]">
              O N C O — A I D
            </h1>
            <p className="mt-2 text-[9.5px] md:text-[10.5px] font-medium uppercase tracking-[0.28em] text-[#A0B8B0]/65 pl-[0.28em]">
              CLARITY FOR WHAT COMES NEXT
            </p>
          </motion.div>
        </header>

        {/* ============================================================ */}
        {/* CENTER SECTION: TYPOGRAPHIC REVEAL & CARE SIGNAL WAVEFORM    */}
        {/* ============================================================ */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-4 pointer-events-none">
          {/* Real Character-by-Character Typographic Reveal */}
          <div className="text-center min-h-[110px] md:min-h-[150px] flex flex-col items-center justify-center">
            <div className="editorial-serif text-[clamp(2.3rem,6.5vw,4.2rem)] font-normal text-[#F5EFE6] leading-[1.08] tracking-tight">
              <span className="block">
                {line1}
                {!line2 && cursorVisible && !cursorFading && (
                  <span className="inline-block text-[#E06D53] font-light ml-0.5 animate-pulse">
                    |
                  </span>
                )}
              </span>
              <span className="block italic text-[#F5EFE6]">
                {line2}
                {line2 && cursorVisible && !cursorFading && (
                  <span className="inline-block text-[#E06D53] font-light not-italic ml-1">
                    |
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Biological Waveform (Care Signal) SVG Animation */}
          <div className="w-full max-w-lg md:max-w-xl mx-auto mt-6 md:mt-8 relative px-4">
            <svg
              viewBox="0 0 600 70"
              fill="none"
              className="w-full h-12 md:h-15 overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="careSignalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1B4A45" stopOpacity="0.2" />
                  <stop offset="30%" stopColor="#2A6D65" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#E06D53" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#2A6D65" stopOpacity="0.15" />
                </linearGradient>

                <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFA085" stopOpacity="1" />
                  <stop offset="40%" stopColor="#E06D53" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#E06D53" stopOpacity="0" />
                </radialGradient>
              </defs>

              <path
                d="M 0 35 C 60 35, 90 20, 150 20 C 210 20, 240 50, 300 50 C 360 50, 390 24, 450 24 C 510 24, 540 42, 600 42"
                stroke="rgba(42, 109, 101, 0.18)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              <motion.path
                ref={pathRef}
                d="M 0 35 C 60 35, 90 20, 150 20 C 210 20, 240 50, 300 50 C 360 50, 390 24, 450 24 C 510 24, 540 42, 600 42"
                stroke="url(#careSignalGrad)"
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              />

              {dotProgress > 0 && (
                <g transform={`translate(${dotCoords.x}, ${dotCoords.y})`}>
                  <circle r="11" fill="url(#dotGlow)" className="animate-pulse" />
                  <circle r="3.5" fill="#FFF1EB" />
                  <circle r="1.8" fill="#E06D53" />
                </g>
              )}
            </svg>
          </div>

          {/* Loading Text & Minimalist Three-Bar Indicator */}
          <div className="mt-6 flex flex-col items-center gap-2.5">
            <p className="text-[9.5px] md:text-[10.5px] uppercase tracking-[0.3em] text-[#A0B8B0]/55 pl-[0.3em]">
              LOADING A BRIGHTER TOMORROW
            </p>

            <div className="flex items-center gap-2" aria-hidden="true">
              {[1, 2, 3].map((idx) => {
                const isFilled = activeProgressIndex >= idx;
                return (
                  <div
                    key={idx}
                    className={`h-[2px] w-7 md:w-9 rounded-full transition-all duration-400 ${
                      isFilled
                        ? "bg-[#E06D53] shadow-[0_0_8px_rgba(224,109,83,0.6)]"
                        : "bg-[#1B4A45]/40"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </main>

        {/* ============================================================ */}
        {/* BOTTOM METADATA BAR                                         */}
        {/* ============================================================ */}
        <footer className="pb-6 md:pb-8 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left pointer-events-none">
          <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-[#A0B8B0]/50 pl-[0.22em]">
            <svg className="h-3 w-3 text-coral/70 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>INDIA, FOR A HEALTHIER TOMORROW</span>
          </div>

          <div className="text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-[#A0B8B0]/50 pl-[0.22em]">
            PEOPLE · KNOWLEDGE · PROGRESS
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}
