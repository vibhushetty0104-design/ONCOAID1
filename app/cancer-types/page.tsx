"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { cancerCategories, cancerTypes } from "@/lib/data";
import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";

export default function CancerTypesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof cancerCategories)[number]>("All");

  const filtered = useMemo(() => {
    return cancerTypes.filter((item) => {
      const matchesCat = category === "All" || item.category === category;
      const matchesQ =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.summary.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQ;
    });
  }, [category, query]);

  return (
    <main id="main" className="container-page pb-24 pt-8">
      <PageIntro
        eyebrow="Condition Directory"
        title="Explore Cancer Types & Staging Pathways"
      >
        Every cancer originates in specific tissues with unique molecular markers, staging criteria, and treatment sequences. Browse our evidence-based guides below.
      </PageIntro>

      {/* Search & Categories */}
      <div className="mt-10 rounded-[28px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)]">
        <div className="flex flex-col gap-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by cancer name, organ site, or keyword (e.g. Breast, Lung, Biomarkers)..."
            className="h-13 w-full rounded-2xl border border-forest/15 bg-ivory px-5 text-[15px] text-forest outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/20"
          />

          <div className="flex gap-2 overflow-x-auto pb-1" role="listbox" aria-label="Cancer categories">
            {cancerCategories.map((item) => (
              <button
                key={item}
                type="button"
                role="option"
                aria-selected={category === item}
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                  category === item
                    ? "bg-forest text-white-soft shadow-sm"
                    : "bg-ivory text-forest hover:bg-mint/40 border border-forest/5"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="mt-8 flex items-center justify-between text-[14px] text-blue-gray">
        <p>
          Showing <span className="font-semibold text-forest">{filtered.length}</span> cancer types
        </p>
        {query || category !== "All" ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="text-cobalt hover:underline"
          >
            Reset filters
          </button>
        ) : null}
      </div>

      {/* Grid of Cancer Types */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div
            key={item.slug}
            className="group flex flex-col justify-between rounded-[28px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)] transition-all duration-320 hover:border-cobalt/40 hover:shadow-lg"
          >
            <div>
              <span className="label text-warm-gray text-[11px]">{item.category}</span>
              <h2 className="mt-2 font-serif text-[1.8rem] text-forest group-hover:text-cobalt transition-colors">
                {item.name}
              </h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-blue-gray">
                {item.summary}
              </p>
            </div>

            <div className="mt-6 border-t border-forest/5 pt-4 space-y-2.5">
              <Link
                href={`/cancer-types/${item.slug}`}
                className="flex items-center justify-between text-[14px] font-semibold text-teal hover:text-forest transition-colors"
              >
                <span>Read Clinical Guide</span>
                <span>→</span>
              </Link>
              <div className="flex items-center gap-3 text-[12px] text-warm-gray">
                <Link href="/reports" className="hover:text-forest underline">
                  Decode Report
                </Link>
                <span>•</span>
                <Link href="/specialists" className="hover:text-forest underline">
                  Matched Oncologists
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 rounded-[28px] border border-dashed border-forest/20 bg-ivory p-12 text-center">
          <p className="font-serif text-[1.8rem] text-forest">No conditions found</p>
          <p className="mt-2 text-[14px] text-blue-gray">Try adjusting your search terms or category filter.</p>
        </div>
      )}
    </main>
  );
}
