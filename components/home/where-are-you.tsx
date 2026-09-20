import Link from "next/link";
import { Reveal } from "@/components/reveal";

const orientationRows = [
  {
    title: "I have a report",
    detail: "Decode pathology, biomarkers (ER, PR, HER2, Ki-67) and clinical shorthand",
    href: "/reports",
    tag: "Pathology Decoder",
  },
  {
    title: "I need a specialist",
    detail: "Find verified oncology specialists across premier cancer institutes in Bengaluru",
    href: "/specialists",
    tag: "Clinician Directory",
  },
  {
    title: "I don't know what's next",
    detail: "Understand diagnostics, staging scans, tumor board reviews and treatment sequencing",
    href: "/care/diagnosed",
    tag: "Care Pathways",
  },
  {
    title: "I'm supporting someone",
    detail: "Practical consultation questions, second opinion guidance and caregiver coordination",
    href: "/resources",
    tag: "Caregiver Guide",
  },
];

export function WhereAreYou() {
  return (
    <section className="border-b border-forest/10 bg-[#FAF7F2] py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-forest/60 block">
              Orientation · Patient Navigation
            </span>
            <h2 className="heading-serif-section mt-2 text-forest">
              Where are you right now?
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-forest/75">
              Every cancer journey is distinct. Choose where you currently stand to receive tailored clinical context, relevant terminology, and immediate next steps.
            </p>
          </div>
        </Reveal>

        {/* Editorial Horizontal Rows with Hairline Dividers & Micro-Interactions */}
        <div className="mt-12 divide-y divide-forest/12 border-y border-forest/12">
          {orientationRows.map((row) => (
            <Link
              key={row.title}
              href={row.href}
              className="group relative flex flex-col md:flex-row md:items-center md:justify-between py-6 md:py-7 px-3 -mx-3 transition-all duration-200 hover:bg-forest/[0.03] hover:pl-5"
            >
              {/* Left Subtle Animated Accent Line on Hover */}
              <div className="absolute left-0 inset-y-0 w-1 bg-[#E88970] scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center rounded-r" />

              <div className="max-w-2xl">
                <div className="flex items-center gap-2.5">
                  <h3 className="editorial-serif text-[22px] md:text-[25px] text-forest group-hover:text-forest/90 transition-colors">
                    {row.title}
                  </h3>
                  <span className="rounded bg-forest/6 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-forest/60">
                    {row.tag}
                  </span>
                </div>
                <p className="mt-1 text-[14px] leading-relaxed text-forest/75">
                  {row.detail}
                </p>
              </div>

              <div className="mt-3 md:mt-0 flex items-center gap-2 text-[14px] font-semibold text-forest group-hover:text-[#B84A39] transition-colors">
                <span className="hidden md:inline text-[13px] opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore
                </span>
                <span className="text-[18px] transition-transform duration-200 group-hover:translate-x-1.5">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
