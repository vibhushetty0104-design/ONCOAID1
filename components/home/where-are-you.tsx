"use client";

import Link from "next/link";

const pathways = [
  {
    title: "I have a report",
    subtitle: "Decode pathology, biomarkers, and clinical terminology into plain language",
    href: "/reports",
  },
  {
    title: "I need a specialist",
    subtitle: "Find verified surgical, medical, and radiation oncologists in Bengaluru",
    href: "/specialists",
  },
  {
    title: "I don't know what's next",
    subtitle: "Step-by-step orientation through diagnostics, staging, and tumor board review",
    href: "/care/diagnosed",
  },
  {
    title: "I'm supporting someone",
    subtitle: "Practical checklists, questions for appointments, and care coordination",
    href: "/care/supporting",
  },
];

export function WhereAreYou() {
  return (
    <section className="bg-ivory py-16 sm:py-20 md:py-24 border-t border-forest/8">
      <div className="container-page max-w-4xl">
        {/* Section Heading */}
        <div className="mb-10 md:mb-14">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-warm-gray block mb-3">
            ORIENTATION
          </span>
          <h2 className="editorial-serif text-[30px] sm:text-[36px] md:text-[42px] font-normal text-forest tracking-tight">
            Where are you right now?
          </h2>
        </div>

        {/* Editorial Text-Based Navigation Rows */}
        <div className="divide-y divide-forest/10 border-y border-forest/10">
          {pathways.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group flex items-center justify-between py-6 md:py-8 text-forest transition-colors hover:bg-forest/[0.02] px-2 sm:px-4 -mx-2 sm:-mx-4"
            >
              <div className="pr-6 min-w-0">
                <span className="block text-[19px] sm:text-[22px] md:text-[26px] font-normal text-forest group-hover:text-teal group-hover:translate-x-1.5 transition-transform duration-200">
                  {item.title}
                </span>
                <span className="block text-[13px] sm:text-[14px] text-blue-gray mt-1 leading-relaxed font-sans">
                  {item.subtitle}
                </span>
              </div>

              <div className="shrink-0 flex items-center justify-center text-forest/40 group-hover:text-teal group-hover:translate-x-1.5 transition-all duration-200">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M5 12h14" strokeLinecap="round" />
                  <path d="M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
