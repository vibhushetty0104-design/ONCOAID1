import Link from "next/link";
import { specialists } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

const tones = [
  "from-[#1a3f3c] to-[#082828]",
  "from-[#14162e] to-[#163f3c]",
  "from-[#0f3a38] to-[#1b2c3a]",
  "from-[#163f3c] to-[#2a1f38]",
];

export function SpecialistsPreview() {
  const featured = specialists[0];
  const rest = specialists.slice(1, 4);

  return (
    <section className="bg-white-soft py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="label text-teal">Indian Specialist Directory</p>
              <h2 className="editorial-serif mt-3 max-w-3xl text-[clamp(2.2rem,5vw,4.4rem)] text-forest">
                Find the specialists shaping your care.
              </h2>
            </div>
            <Button href="/specialists" variant="primary">
              View All 10+ Specialists →
            </Button>
          </div>
          <p className="mt-4 text-[14px] text-warm-gray">
            Sample clinician profiles across Bengaluru, Mumbai, Chennai, New Delhi, Hyderabad & Pune.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Link
            href={`/specialists/${featured.id}`}
            className="group relative min-h-[440px] overflow-hidden rounded-[32px] bg-forest text-white-soft shadow-xl transition-all duration-320 hover:shadow-2xl"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${tones[0]} transition-transform duration-[680ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(215,236,227,0.18),transparent_42%)]" />
            <div className="relative flex h-full min-h-[440px] flex-col justify-between p-8 md:p-10">
              <div className="flex items-center justify-between">
                <span className="label text-mint">{featured.role}</span>
                <span className="rounded-full bg-white-soft/10 px-3 py-1 text-[12px] text-mint">
                  📍 {featured.city}
                </span>
              </div>

              <div>
                <p className="text-[13px] tracking-[0.14em] uppercase text-mint-deep font-semibold">
                  {featured.degree}
                </p>
                <h3 className="editorial-serif mt-2 text-[3rem] leading-none">{featured.name}</h3>
                <p className="mt-3 text-[14px] text-white-soft/80">{featured.hospital}</p>
                <p className="mt-4 max-w-md text-white-soft/72 line-clamp-2">{featured.focus}</p>
                <div className="mt-6 flex items-center gap-2 text-[14px] font-medium text-cyan group-hover:translate-x-1 transition-transform">
                  <span>Read Profile & Consult</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </Link>

          <div className="flex flex-col justify-between gap-4">
            {rest.map((person, index) => (
              <Link
                key={person.id}
                href={`/specialists/${person.id}`}
                className="group grid grid-cols-[80px_1fr] gap-4 rounded-[24px] border border-forest/8 bg-ivory p-4 transition-all duration-320 hover:-translate-y-0.5 hover:border-cobalt/30 hover:shadow-md"
              >
                <div className={`h-20 rounded-[18px] bg-gradient-to-br ${tones[index + 1]} flex items-center justify-center font-bold text-white-soft text-[20px]`}>
                  {person.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-semibold text-teal uppercase tracking-wider">{person.role}</span>
                    <span className="text-[12px] text-warm-gray">• {person.city}</span>
                  </div>
                  <h3 className="text-[20px] font-medium tracking-tight text-forest group-hover:text-cobalt transition-colors">
                    {person.name}
                  </h3>
                  <p className="text-[13px] text-blue-gray line-clamp-1">{person.hospital}</p>
                </div>
              </Link>
            ))}

            <Link
              href="/specialists"
              className="group flex items-center justify-center gap-2 rounded-2xl border border-dashed border-forest/20 p-4 text-[15px] font-medium text-forest transition-colors hover:bg-forest/5"
            >
              <span>Explore all clinicians across India</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
