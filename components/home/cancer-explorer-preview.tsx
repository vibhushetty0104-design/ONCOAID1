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
    <section className="bg-ivory-deep py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <span className="label text-teal">Discovery Hub</span>
            <span className="text-[12px] text-warm-gray">• 16+ Conditions Mapped</span>
          </div>
          <h2 className="heading-serif-section mt-3 text-forest">
            Understand your cancer type.
            <span className="block italic font-serif">Explore staging, diagnostics & care.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-blue-gray">
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
              className="h-12 w-full rounded-xl border border-forest/15 bg-white-soft px-4 text-[14.5px] text-forest placeholder-forest/40 outline-none transition-shadow duration-180 focus:border-cobalt focus:shadow-[0_0_0_3px_rgba(47,91,255,0.16)]"
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
                className={`shrink-0 rounded-lg px-3.5 py-1.5 text-[12.5px] font-medium transition-all duration-180 ${
                  category === item
                    ? "bg-forest text-white-soft shadow-xs"
                    : "bg-white-soft text-forest/75 hover:bg-white-soft/90 border border-forest/8"
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
                <div className="group flex h-full flex-col justify-between rounded-xl border border-forest/8 bg-white-soft p-5 shadow-xs transition-all duration-200 hover:border-forest/20">
                  <div>
                    <span className="text-meta-ui text-warm-gray">{item.category}</span>
                    <h3 className="heading-sans-ui mt-1.5 text-[18px] text-forest group-hover:text-teal transition-colors">
                      {item.name}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-blue-gray line-clamp-3">
                      {item.summary}
                    </p>
                  </div>

                  {/* Next Step Action Buttons */}
                  <div className="mt-5 border-t border-forest/6 pt-3 space-y-1.5">
                    <Link
                      href={`/cancer-types/${item.slug}`}
                      className="flex items-center justify-between text-[13px] font-semibold text-teal hover:text-forest transition-colors"
                    >
                      <span>Open Complete Guide</span>
                      <span>→</span>
                    </Link>
                    <div className="flex items-center gap-2.5 text-[11.5px] text-warm-gray">
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
          <div className="rounded-xl border border-dashed border-forest/20 bg-white-soft p-10 text-center mt-6">
            <p className="font-serif text-[1.4rem] text-forest">No matching cancer types found</p>
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
