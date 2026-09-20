import Link from "next/link";
import { specialists } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

const tones = [
  "from-[#1a3f3c] to-[#082828]",
  "from-[#0f3a38] to-[#163f3c]",
  "from-[#082828] to-[#1b2c3a]",
  "from-[#163f3c] to-[#1e3432]",
];

export function SpecialistsPreview() {
  const featured = specialists[0];
  const rest = specialists.slice(1, 4);

  return (
    <section className="bg-white-soft py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="label text-teal">Specialist Directory</p>
              <h2 className="heading-serif-section mt-3 text-forest">
                Find the right specialist for your care.
              </h2>
              <p className="mt-2.5 text-[15px] text-blue-gray max-w-2xl">
                Explore oncology specialists across India by specialty, location and area of expertise.
              </p>
            </div>
            <Button href="/specialists" variant="primary" className="text-[13.5px]">
              View All Specialists →
            </Button>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Link
            href={`/specialists/${featured.id}`}
            className="group relative min-h-[400px] overflow-hidden rounded-2xl bg-forest text-white-soft shadow-sm transition-all duration-200 hover:border-forest/40"
          >
            <div className="absolute inset-0 bg-[#0c3130]" />
            <div className="relative flex h-full min-h-[400px] flex-col justify-between p-7 md:p-8">
              <div className="flex items-center justify-between">
                <span className="label text-mint">{featured.role}</span>
                <span className="rounded-md bg-white-soft/10 px-2.5 py-0.5 text-[11px] text-mint">
                  Demo Profile · {featured.city}
                </span>
              </div>

              <div>
                <p className="text-meta-ui text-mint-deep">
                  {featured.degree}
                </p>
                <h3 className="editorial-serif mt-2 text-[2.2rem] leading-tight">{featured.name}</h3>
                <p className="mt-2 text-[14px] text-white-soft/90 font-medium">{featured.hospital}</p>
                <p className="mt-3 max-w-md text-white-soft/80 text-[13.5px] leading-relaxed line-clamp-2">{featured.focus}</p>
                <div className="mt-5 flex items-center gap-2 text-[13.5px] font-semibold text-mint group-hover:translate-x-1 transition-transform">
                  <span>Read Profile & Consult</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </Link>

          <div className="flex flex-col justify-between gap-3">
            {rest.map((person, index) => (
              <Link
                key={person.id}
                href={`/specialists/${person.id}`}
                className="group grid grid-cols-[68px_1fr] gap-4 rounded-xl border border-forest/8 bg-ivory p-4 transition-all duration-200 hover:border-forest/20 shadow-xs"
              >
                <div className="h-16 rounded-lg bg-forest text-mint flex items-center justify-center font-bold text-[18px]">
                  {person.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-teal uppercase tracking-wider">{person.role}</span>
                    <span className="text-[11.5px] text-warm-gray">• {person.city}</span>
                  </div>
                  <h3 className="text-[17px] font-semibold tracking-tight text-forest group-hover:text-teal transition-colors">
                    {person.name}
                  </h3>
                  <p className="text-[12.5px] text-blue-gray line-clamp-1">{person.hospital}</p>
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
