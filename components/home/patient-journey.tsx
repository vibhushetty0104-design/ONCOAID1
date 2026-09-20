"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { pathways } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { motionTokens } from "@/lib/motion";

const icons: Record<string, React.ReactNode> = {
  questions: (
    <path d="M12 18h.01M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2.5-3 5" stroke="currentColor" strokeWidth="1.4" />
  ),
  diagnosed: (
    <path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="1.4" />
  ),
  preparing: (
    <path d="M4 7h16M4 12h10M4 17h7" stroke="currentColor" strokeWidth="1.4" />
  ),
  treatment: (
    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.4" />
  ),
  supporting: (
    <path d="M8 14c0-2 2-4 4-4s4 2 4 4M9 9a3 3 0 1 1 6 0" stroke="currentColor" strokeWidth="1.4" />
  ),
  specialist: (
    <path d="M8 19v-2a4 4 0 0 1 8 0v2M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.4" />
  ),
  report: (
    <path d="M7 4h7l5 5v11H7V4Z M14 4v5h5" stroke="currentColor" strokeWidth="1.4" />
  ),
};

export function PatientJourney() {
  const [active, setActive] = useState<string>(pathways[1].slug);
  const reduce = useReducedMotion();
  const selected = pathways.find((p) => p.slug === active) ?? pathways[0];

  return (
    <section id="journey" className="bg-ivory py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <p className="label text-teal">Patient Navigation</p>
          <h2 className="heading-serif-section mt-3 text-forest">
            Know what comes next.
          </h2>
          <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-blue-gray">
            Cancer care can feel like a series of unfamiliar decisions. ONCO-AID helps you understand where you are, what comes next, and what to discuss with your care team.
          </p>
        </Reveal>

        {/* Mobile View: Editorial Guided Pathway Stream (De-cardified) */}
        <div className="mt-10 flex flex-col lg:hidden border-b border-forest/10">
          {pathways.map((item) => {
            const isExpanded = item.slug === active;
            return (
              <div
                key={item.slug}
                className="border-t border-forest/10 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setActive(isExpanded ? "" : item.slug)}
                  aria-expanded={isExpanded}
                  className="flex w-full items-center justify-between py-4 text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-bold text-coral w-6">{item.number}</span>
                    <span className="text-forest/70">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        {icons[item.slug]}
                      </svg>
                    </span>
                    <span className="font-serif text-[18px] font-medium text-forest">
                      {item.title}
                    </span>
                  </div>
                  <span
                    className={`text-[13px] text-forest/60 transition-transform duration-200 ${
                      isExpanded ? "rotate-90 text-coral font-bold" : ""
                    }`}
                  >
                    →
                  </span>
                </button>

                {/* Inline Expanded Details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: motionTokens.normal, ease: motionTokens.easeOutSoft }}
                      className="pb-5 pt-1 pl-9 pr-2"
                    >
                      <p className="text-[14px] leading-relaxed text-blue-gray">
                        {item.description}
                      </p>
                      <div className="mt-3.5">
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-teal hover:text-forest transition-colors"
                        >
                          <span>Enter this pathway</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Desktop View: Interactive Split-View Stream */}
        <div className="mt-14 hidden lg:grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
          <ul className="flex flex-col border-b border-forest/10">
            {pathways.map((item) => {
              const isActive = item.slug === active;
              return (
                <li key={item.slug}>
                  <button
                    type="button"
                    onClick={() => setActive(item.slug)}
                    onMouseEnter={() => setActive(item.slug)}
                    className={`pathway-row group flex w-full items-start gap-4 border-t border-forest/10 px-3 py-4 text-left transition-colors duration-200 ${
                      isActive ? "bg-white-soft/80" : "bg-transparent hover:bg-white-soft/40"
                    }`}
                    aria-pressed={isActive}
                  >
                    <span className="mt-0.5 w-6 text-[12px] font-bold text-coral">{item.number}</span>
                    <span className="mt-0.5 text-forest/70">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        {icons[item.slug]}
                      </svg>
                    </span>
                    <span className="flex-1">
                      <span className="pathway-title block text-[19px] font-medium tracking-tight text-forest transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                        {item.title}
                      </span>
                      <span
                        className={`mt-1 block max-w-xl text-[14px] leading-relaxed transition-opacity duration-[320ms] ${
                          isActive ? "text-forest font-medium opacity-100" : "text-blue-gray opacity-80"
                        }`}
                      >
                        {item.description}
                      </span>
                    </span>
                    <span
                      className={`pathway-arrow mt-1 transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive ? "text-coral font-bold translate-x-1" : "text-forest/40"
                      }`}
                    >
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <AnimatePresence mode="wait">
            <motion.aside
              key={selected.slug}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 8 }}
              transition={{ duration: motionTokens.normal, ease: motionTokens.easeOutSoft }}
              className="flex min-h-[300px] flex-col justify-between rounded-2xl border border-forest/10 bg-white-soft p-7 shadow-xs"
            >
              <div>
                <p className="text-meta-ui text-coral">{selected.number}</p>
                <h3 className="heading-sans-ui mt-3 text-forest">
                  {selected.title}
                </h3>
                <p className="mt-4 text-[14.5px] leading-relaxed text-blue-gray">
                  {selected.description}
                </p>
              </div>
              <Button href={selected.href} className="mt-6 self-start text-[13.5px]">
                Enter this pathway →
              </Button>
            </motion.aside>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
