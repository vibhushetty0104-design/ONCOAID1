"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cancerCategories, cancerTypes } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { motionTokens } from "@/lib/motion";

export function CancerExplorerPreview() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof cancerCategories)[number]>("All");
  const reduce = useReducedMotion();
  const searchId = useId();

  const results = useMemo(() => {
    return cancerTypes.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.summary.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const visible = results.slice(0, 6);

  return (
    <section className="bg-ivory-deep py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <span className="label text-teal">Discovery Hub</span>
            <span className="text-[12px] text-warm-gray">• 16+ Conditions Mapped</span>
          </div>
          <h2 className="editorial-serif mt-3 max-w-3xl text-[clamp(2.2rem,5vw,4.4rem)] text-forest">
            Understand your cancer type.
            <span className="block italic font-serif">Explore staging, diagnostics & care.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-blue-gray">
            Each cancer has distinct biology, testing protocols, and treatment sequences. Filter by category or search by term to find specific guidance.
          </p>
        </Reveal>

        {/* Search & Category Pills */}
        <div className="mt-10 flex flex-col gap-4">
          <label className="sr-only" htmlFor={searchId}>
            Search cancer types
          </label>
          <div className="relative">
            <input
              id={searchId}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by cancer type or symptom (e.g., Breast, Lung, Lymphoma, Colon)..."
              className="h-14 w-full rounded-2xl border border-forest/15 bg-white-soft px-5 text-[15px] text-forest placeholder-forest/40 outline-none transition-shadow duration-180 focus:border-cobalt focus:shadow-[0_0_0_3px_rgba(47,91,255,0.16)]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-warm-gray hover:text-forest"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" role="listbox" aria-label="Cancer categories">
            {cancerCategories.map((item) => (
              <button
                key={item}
                type="button"
                role="option"
                aria-selected={category === item}
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-180 ${
                  category === item
                    ? "bg-forest text-white-soft shadow-sm"
                    : "bg-white-soft text-forest/75 hover:bg-white-soft/80 border border-forest/5"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item) => (
              <motion.div
                key={item.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: motionTokens.normal, ease: motionTokens.easeOutSoft }}
              >
                <div className="group flex h-full flex-col justify-between rounded-[28px] border border-forest/8 bg-white-soft p-6 shadow-[var(--shadow-card)] transition-all duration-320 hover:border-cobalt/30 hover:shadow-lg">
                  <div>
                    <span className="label text-warm-gray text-[11px]">{item.category}</span>
                    <h3 className="mt-2 font-serif text-[1.8rem] leading-tight text-forest group-hover:text-cobalt transition-colors">
                      {item.name}
                    </h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-blue-gray line-clamp-3">
                      {item.summary}
                    </p>
                  </div>

                  {/* Next Step Action Buttons */}
                  <div className="mt-6 border-t border-forest/5 pt-4 space-y-2">
                    <Link
                      href={`/cancer-types/${item.slug}`}
                      className="flex items-center justify-between text-[13.5px] font-semibold text-teal hover:text-forest transition-colors"
                    >
                      <span>Open Complete Guide</span>
                      <span>→</span>
                    </Link>
                    <div className="flex items-center gap-3 text-[12px] text-warm-gray">
                      <Link href="/reports" className="hover:text-forest underline">
                        Decode Reports
                      </Link>
                      <span>•</span>
                      <Link href="/specialists" className="hover:text-forest underline">
                        Find Specialists
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visible.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-forest/20 bg-white-soft p-12 text-center mt-6">
            <p className="font-serif text-[1.8rem] text-forest">No matching cancer types found</p>
            <p className="mt-2 text-[14px] text-blue-gray">Try a different search keyword or select &quot;All&quot;.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="mt-4 rounded-full bg-forest px-5 py-2 text-[13px] text-white-soft"
            >
              Reset Filters
            </button>
          </div>
        ) : null}

        <div className="mt-10 flex items-center justify-between">
          <p className="text-[13px] text-warm-gray">
            Showing {visible.length} of {results.length} matched conditions
          </p>
          <Button href="/cancer-types" variant="primary" className="text-[14px]">
            Browse All {cancerTypes.length} Cancer Types →
          </Button>
        </div>
      </div>
    </section>
  );
}
