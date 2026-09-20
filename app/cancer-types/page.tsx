"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { cancerCategories, cancerTypes } from "@/lib/data";
import { PageIntro } from "@/components/page-intro";

const mostCommonPills = [
  "All",
  "Breast",
  "Lung",
  "Colorectal",
  "Cervical",
  "Prostate",
  "Head & Neck",
  "Blood Cancers",
];

export default function CancerTypesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    return cancerTypes.filter((item) => {
      const matchesCat =
        category === "All" ||
        item.category.toLowerCase().includes(category.toLowerCase()) ||
        item.name.toLowerCase().includes(category.toLowerCase());
      const matchesQ =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.summary.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQ;
    });
  }, [category, query]);

  return (
    <main id="main" className="container-page pb-20 md:pb-24 pt-4 md:pt-8">
      {/* ============================================================ */}
      {/* MOBILE EXPERIENCE: Knowledge Library List Screen (md:hidden) */}
      {/* ============================================================ */}
      <div className="md:hidden space-y-3.5">
        {/* Header */}
        <div className="px-1">
          <span className="label text-teal">Cancer Directory</span>
          <h1 className="font-serif text-[24px] font-medium text-forest mt-0.5">
            Knowledge Library
          </h1>
          <p className="text-[13px] text-blue-gray mt-1">
            Evidence-based guide to oncology subtypes, staging, and treatments.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cancers, symptoms, terms..."
            className="h-12 w-full rounded-2xl border border-forest/15 bg-white-soft pl-10 pr-4 text-[14px] text-forest placeholder:text-warm-gray outline-none focus:border-forest shadow-2xs"
          />
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-gray"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-warm-gray hover:text-forest"
            >
              ✕
            </button>
          )}
        </div>

        {/* Most Common Quick Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {mostCommonPills.map((pill) => {
            const isSelected = category === pill;
            return (
              <button
                key={pill}
                type="button"
                onClick={() => setCategory(pill)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all ${
                  isSelected
                    ? "bg-forest text-white shadow-2xs"
                    : "bg-white-soft text-forest/70 border border-forest/10 hover:bg-ivory"
                }`}
              >
                {pill}
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between px-1 text-[12px] text-blue-gray">
          <span>
            Showing <strong className="text-forest">{filtered.length}</strong> cancer types
          </span>
          {(query || category !== "All") && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="text-teal font-medium hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Clean Alphabetical List Rows (NOT Giant Cards) */}
        {filtered.length > 0 ? (
          <div className="space-y-2">
            {filtered.map((item) => (
              <Link
                key={item.slug}
                href={`/cancer-types/${item.slug}`}
                className="flex items-center justify-between rounded-2xl border border-forest/10 bg-white-soft p-3.5 shadow-2xs hover:border-forest/20 active:scale-[0.99] transition-all"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  {/* Cancer Icon / Colored Indicator */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest/8 text-forest font-serif font-bold text-[14px]">
                    {item.name[0]}
                  </div>

                  {/* Cancer Name + Subtitle */}
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-medium text-forest truncate">
                      {item.name}
                    </h3>
                    <p className="text-[11.5px] text-blue-gray truncate mt-0.5">
                      {item.category} · {item.summary.split(".")[0]}
                    </p>
                  </div>
                </div>

                {/* Right Chevron */}
                <svg className="h-4 w-4 text-warm-gray shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-forest/15 bg-white-soft/60 p-8 text-center">
            <p className="font-medium text-forest text-[15px]">No matching cancers found</p>
            <p className="text-[12.5px] text-blue-gray mt-1">
              Try a different keyword or browse all conditions.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="mt-3 rounded-full bg-forest px-4 py-2 text-[12px] font-medium text-white"
            >
              Show All Conditions
            </button>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* DESKTOP EXPERIENCE: Full Editorial Guide & Cards (hidden md) */}
      {/* ============================================================ */}
      <div className="hidden md:block">
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
                  className="block w-full rounded-full bg-forest px-4 py-2.5 text-center text-[13.5px] font-medium text-white-soft transition-colors hover:bg-forest-mid"
                >
                  Explore Staging & Care Pathway →
                </Link>
                <div className="flex items-center justify-between text-[12px] text-warm-gray px-1">
                  <span>IHC & Genomic Markers</span>
                  <span className="text-emerald-700 font-medium">Available</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
