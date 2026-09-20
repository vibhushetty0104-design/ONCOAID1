"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface CinematicIntroProps {
  onComplete?: () => void;
  forcePlay?: boolean;
}

export function CinematicIntro({ onComplete, forcePlay = false }: CinematicIntroProps) {
  const [hasSeenIntro, setHasSeenIntro] = useState<boolean | null>(null);
  const [stage, setStage] = useState<"idle" | "brand" | "typing" | "complete" | "exiting" | "hidden">("idle");
  
  // Typed text state
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorFading, setCursorFading] = useState(false);

  // Progress bars (1, 2, 3)
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

  // Complete and exit intro
  const finishIntro = useCallback(() => {
    clearAllTimeouts();
    try {
      localStorage.setItem("oncoaid_intro_seen", "true");
    } catch {
      // Graceful fallback if localStorage is disabled
    }
    setStage("exiting");
    setTimeout(() => {
      setStage("hidden");
      document.body.classList.remove("intro-active");
      if (onComplete) onComplete();
    }, 600);
  }, [clearAllTimeouts, onComplete]);

  // Initial check for returning visitor
  useEffect(() => {
    let seen = false;
    try {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("intro") === "replay" || forcePlay) {
        seen = false;
      } else {
        seen = localStorage.getItem("oncoaid_intro_seen") === "true";
      }
    } catch {
      seen = false;
    }

    setHasSeenIntro(seen);

    if (seen && !forcePlay) {
      setStage("hidden");
      if (onComplete) onComplete();
      return;
    }

    // Lock body scroll during intro
    document.body.classList.add("intro-active");
    setStage("brand");

    // Keyboard listener (Escape to skip)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        finishIntro();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("intro-active");
      clearAllTimeouts();
    };
  }, [forcePlay, onComplete, finishIntro, clearAllTimeouts]);

  // Main animation orchestration sequence
  useEffect(() => {
    if (stage !== "brand") return;

    if (reduceMotion) {
      // Reduced motion: show final static state immediately, then finish
      setLine1("Cancer care,");
      setLine2("made clearer.");
      setActiveProgressIndex(3);
      setDotProgress(0.7);
      setCursorFading(true);
      addTimeout(() => {
        finishIntro();
      }, 1500);
      return;
    }

    // Step 1: Start typing after brand reveal (~600ms)
    addTimeout(() => {
      setStage("typing");

      const target1 = "Cancer care,";
      const target2 = "made clearer.";
      const charDelay = 65; // 65ms per char

      // Type line 1
      target1.split("").forEach((char, idx) => {
        addTimeout(() => {
          setLine1(target1.slice(0, idx + 1));
        }, idx * charDelay);
      });

      const line1Duration = target1.length * charDelay;
      const pauseBetweenLines = 260; // pause briefly

      // Type line 2
      target2.split("").forEach((char, idx) => {
        addTimeout(() => {
          setLine2(target2.slice(0, idx + 1));
        }, line1Duration + pauseBetweenLines + idx * charDelay);
      });

      const totalTypingTime = line1Duration + pauseBetweenLines + target2.length * charDelay;

      // When typing completes:
      addTimeout(() => {
        // Cursor blinks 3 times then fades
        let blinks = 0;
        const blinkInterval = setInterval(() => {
          setCursorVisible((prev) => !prev);
          blinks++;
          if (blinks >= 6) {
            clearInterval(blinkInterval);
            setCursorFading(true);
          }
        }, 220);
      }, totalTypingTime);

      // Care Signal & Progress step sequence
      // Bar 1 lights up
      addTimeout(() => {
        setActiveProgressIndex(1);
      }, totalTypingTime * 0.4);

      // Bar 2 lights up
      addTimeout(() => {
        setActiveProgressIndex(2);
      }, totalTypingTime * 0.75);

      // Bar 3 lights up
      addTimeout(() => {
        setActiveProgressIndex(3);
      }, totalTypingTime + 300);

      // Hold for ~400ms after completion, then transition
      addTimeout(() => {
        finishIntro();
      }, totalTypingTime + 1200);

    }, 650);

  }, [stage, reduceMotion, addTimeout, finishIntro]);

  // Care Signal travelling dot coordinate calculator
  useEffect(() => {
    if (stage !== "typing" && stage !== "complete") return;

    let startTime = performance.now();
    const duration = 2800; // time to glide along the wave
    let reqId: number;

    const animateDot = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDotProgress(progress);

      if (pathRef.current) {
        try {
          const pathLen = pathRef.current.getTotalLength();
          // Dot travels from 15% to 68% of the path length (center focus)
          const targetDist = pathLen * (0.12 + progress * 0.54);
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

  if (hasSeenIntro === null || stage === "hidden") {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-intro"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === "exiting" ? 0 : 1, y: stage === "exiting" ? -8 : 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden bg-[#041514] text-[#F5EFE6] select-none"
        style={{
          background:
            "radial-gradient(circle at 50% 46%, rgba(14, 52, 50, 0.72) 0%, rgba(4, 21, 20, 0.98) 75%, #031110 100%)",
        }}
        onClick={finishIntro}
      >
          {/* Subtle Skip Button (Top-Right) */}
          <div className="absolute top-5 right-6 z-20">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                finishIntro();
              }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-wider text-white/50 hover:bg-white/10 hover:text-white/80 transition-all"
            >
              Skip ✕
            </button>
          </div>

          {/* ============================================================ */}
          {/* TOP SECTION: BRAND WORDMARK & SUB-TAG                       */}
          {/* ============================================================ */}
          <header className="pt-12 md:pt-16 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-sans text-[14px] md:text-[16px] font-medium uppercase tracking-[0.38em] text-[#F5EFE6] pl-[0.38em]">
                O N C O — A I D
              </h1>
              <p className="mt-2 text-[9.5px] md:text-[11px] font-medium uppercase tracking-[0.28em] text-[#A0B8B0]/65 pl-[0.28em]">
                CLARITY FOR WHAT COMES NEXT
              </p>
            </motion.div>
          </header>

          {/* ============================================================ */}
          {/* CENTER SECTION: TYPOGRAPHIC REVEAL & CARE SIGNAL WAVEFORM    */}
          {/* ============================================================ */}
          <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-4">
            {/* Real Character-by-Character Typographic Reveal */}
            <div className="text-center min-h-[120px] md:min-h-[160px] flex flex-col items-center justify-center">
              <div className="editorial-serif text-[clamp(2.4rem,7vw,4.5rem)] font-normal text-[#F5EFE6] leading-[1.08] tracking-tight">
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
                className="w-full h-14 md:h-16 overflow-visible"
                aria-hidden="true"
              >
                <defs>
                  {/* Waveform flowing gradient */}
                  <linearGradient id="careSignalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1B4A45" stopOpacity="0.2" />
                    <stop offset="30%" stopColor="#2A6D65" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#E06D53" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#2A6D65" stopOpacity="0.15" />
                  </linearGradient>

                  {/* Soft radiant glow for signal pulse point */}
                  <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFA085" stopOpacity="1" />
                    <stop offset="40%" stopColor="#E06D53" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#E06D53" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Background Guide Line (very faint) */}
                <path
                  d="M 0 35 C 60 35, 90 20, 150 20 C 210 20, 240 50, 300 50 C 360 50, 390 24, 450 24 C 510 24, 540 42, 600 42"
                  stroke="rgba(42, 109, 101, 0.18)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                {/* Animated Biological Waveform Path */}
                <motion.path
                  ref={pathRef}
                  d="M 0 35 C 60 35, 90 20, 150 20 C 210 20, 240 50, 300 50 C 360 50, 390 24, 450 24 C 510 24, 540 42, 600 42"
                  stroke="url(#careSignalGrad)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Traveling Signal Pulse Point */}
                {dotProgress > 0 && (
                  <g transform={`translate(${dotCoords.x}, ${dotCoords.y})`}>
                    {/* Outer radiant glow aura */}
                    <circle r="12" fill="url(#dotGlow)" className="animate-pulse" />
                    {/* Inner core particle */}
                    <circle r="3.5" fill="#FFF1EB" />
                    <circle r="1.8" fill="#E06D53" />
                  </g>
                )}
              </svg>
            </div>

            {/* Loading Text & Minimalist Three-Bar Indicator */}
            <div className="mt-6 flex flex-col items-center gap-3">
              <p className="text-[9.5px] md:text-[10.5px] uppercase tracking-[0.3em] text-[#A0B8B0]/55 pl-[0.3em]">
                LOADING A BRIGHTER TOMORROW
              </p>

              {/* Three Minimalist Progress Bars: ━━━  ━━━  ━━━ */}
              <div className="flex items-center gap-2" aria-hidden="true">
                {[1, 2, 3].map((idx) => {
                  const isFilled = activeProgressIndex >= idx;
                  return (
                    <div
                      key={idx}
                      className={`h-[2px] w-7 md:w-9 rounded-full transition-all duration-500 ${
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
          <footer className="pb-6 md:pb-8 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
            {/* Bottom-Left: Location Anchor */}
            <div className="flex items-center gap-1.5 text-[9px] md:text-[10.5px] uppercase tracking-[0.22em] text-[#A0B8B0]/50 pl-[0.22em]">
              <svg className="h-3 w-3 text-coral/70 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>INDIA, FOR A HEALTHIER TOMORROW</span>
            </div>

            {/* Bottom-Right: Principles Anchor */}
            <div className="text-[9px] md:text-[10.5px] uppercase tracking-[0.22em] text-[#A0B8B0]/50 pl-[0.22em]">
              PEOPLE · KNOWLEDGE · PROGRESS
            </div>
          </footer>
        </motion.div>
    </AnimatePresence>
  );
}
