import Link from "next/link";
import { specialists } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export function HumanCare() {
  // Pull the 3 Bengaluru oncologists
  const bengaluruSpecialists = specialists.filter((s) => s.city === "Bengaluru").slice(0, 3);

  return (
    <section className="border-t border-forest/10 bg-ivory py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-forest/60">
              Bengaluru Launch · Clinical Network
            </p>
            <h2 className="heading-serif-section mt-2.5 text-forest">
              The human side of care.
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-forest/75">
              AI can help you understand. People provide care. Connect with experienced, verified oncology specialists across premier cancer centers in Bengaluru.
            </p>
          </div>
        </Reveal>

        {/* Clean Editorial List with Hairline Divider Rows */}
        <div className="mt-12 divide-y divide-forest/12 border-y border-forest/12">
          {bengaluruSpecialists.map((specialist) => (
            <div
              key={specialist.id}
              className="group py-6 md:py-8 transition-colors hover:bg-forest/[0.015]"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Specialist Information */}
                <div className="max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11.5px] font-semibold uppercase tracking-wider text-forest/60">
                      {specialist.role}
                    </span>
                    <span className="text-forest/30">·</span>
                    <span className="text-[12px] text-forest/70">{specialist.hospital}</span>
                  </div>

                  <h3 className="editorial-serif mt-1 text-[22px] md:text-[24px] text-forest">
                    {specialist.name}
                  </h3>

                  <p className="mt-1 text-[13.5px] text-forest/80">
                    {specialist.degree}
                  </p>

                  <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-forest/65">
                    <span>
                      <strong className="font-medium text-forest/80">Languages:</strong>{" "}
                      {specialist.languages.join(", ")}
                    </span>
                    <span>·</span>
                    <span>
                      <strong className="font-medium text-forest/80">Focus:</strong>{" "}
                      {specialist.focus}
                    </span>
                  </div>
                </div>

                {/* Consultation Actions */}
                <div className="flex items-center gap-3 pt-2 md:pt-0">
                  <Link
                    href={`/specialists/${specialist.id}`}
                    className="inline-flex items-center justify-center rounded border border-forest/20 bg-white-soft px-4 py-2 text-[13px] font-medium text-forest transition-colors hover:border-forest hover:bg-forest hover:text-white-soft"
                  >
                    View Profile
                  </Link>
                  <Link
                    href={`/appointments?specialist=${specialist.id}`}
                    className="inline-flex items-center justify-center rounded bg-forest px-4 py-2 text-[13px] font-medium text-white-soft transition-opacity hover:opacity-90"
                  >
                    Consult →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Directory Navigation Footer */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[13.5px] text-forest/75">
          <p>
            Launching initially in Bengaluru across Manipal Hospitals, HCG Cancer Centre, and Narayana Health.
          </p>
          <Link
            href="/specialists"
            className="font-semibold text-forest underline hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            Explore all specialists across India →
          </Link>
        </div>
      </div>
    </section>
  );
}
