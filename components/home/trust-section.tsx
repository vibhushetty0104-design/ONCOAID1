import { Reveal } from "@/components/reveal";

const pillars = ["Clinically reviewed", "Privacy minded", "Patient first", "Specialist-led care"];

export function TrustSection() {
  return (
    <section className="bg-forest py-24 text-white-soft md:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
        <Reveal>
          <p className="label text-mint-deep">Built around trust</p>
          <h2 className="editorial-serif mt-4 text-[clamp(2.2rem,5vw,4.4rem)]">
            Clear information.
            <span className="block italic">Human care.</span>
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white-soft/72">
            Patient-first by design, with space for clinically reviewed content, privacy-conscious
            experiences, and pathways that never pretend AI replaces your care team. Evidence-informed
            resources will sit here as they are approved — we do not invent outcomes or statistics.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="flex h-full flex-col justify-center gap-8">
            {pillars.map((item) => (
              <li key={item} className="label text-mint">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
