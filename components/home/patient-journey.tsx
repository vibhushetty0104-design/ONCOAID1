"use client";

import { useState } from "react";
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
  const [active, setActive] = useState<(typeof pathways)[number]["slug"]>(pathways[1].slug);
  const reduce = useReducedMotion();
  const selected = pathways.find((p) => p.slug === active) ?? pathways[0];

  return (
    <section id="journey" className="bg-ivory py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <p className="label text-teal">Your pathway</p>
          <h2 className="editorial-serif mt-4 max-w-3xl text-[clamp(2.2rem,5vw,4.4rem)] text-forest">
            Where are you in your cancer journey?
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)]">
          <ul className="flex flex-col">
            {pathways.map((item) => {
              const isActive = item.slug === active;
              return (
                <li key={item.slug}>
                  <button
                    type="button"
                    onClick={() => setActive(item.slug)}
                    onMouseEnter={() => setActive(item.slug)}
                    className={`pathway-row group flex w-full items-start gap-5 border-t border-forest/10 px-2 py-5 text-left ${
                      isActive ? "bg-white-soft/70" : "bg-transparent"
                    }`}
                    aria-pressed={isActive}
                  >
                    <span className="mt-1 w-8 text-[13px] text-coral">{item.number}</span>
                    <span className="mt-0.5 text-forest/70">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        {icons[item.slug]}
                      </svg>
                    </span>
                    <span className="flex-1">
                      <span className="pathway-title block text-[22px] font-medium tracking-tight text-forest transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:text-[26px]">
                        {item.title}
                      </span>
                      <span
                        className={`mt-1 block max-w-xl text-[15px] leading-relaxed text-blue-gray transition-opacity duration-[320ms] ${
                          isActive ? "opacity-100" : "opacity-0 md:opacity-55"
                        }`}
                      >
                        {item.description}
                      </span>
                    </span>
                    <span className="pathway-arrow mt-2 text-forest transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
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
              className="flex min-h-[320px] flex-col justify-between rounded-[28px] bg-white-soft p-8 shadow-[var(--shadow-card)] md:p-10"
            >
              <div>
                <p className="label text-coral">{selected.number}</p>
                <h3 className="editorial-serif mt-4 text-[2.2rem] leading-none text-forest">{selected.title}</h3>
                <p className="mt-5 text-[16px] leading-relaxed text-blue-gray">{selected.description}</p>
              </div>
              <Button href={selected.href} className="mt-8 self-start">
                Enter this pathway →
              </Button>
            </motion.aside>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
