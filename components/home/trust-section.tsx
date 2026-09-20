import { Reveal } from "@/components/reveal";

const trustPillars = [
  {
    title: "Clinical Decision Support Boundaries",
    summary:
      "All AI and navigation outputs operate strictly as educational support. ONCO-AID does not issue autonomous diagnoses, prescribe systemic regimens, or replace certified multidisciplinary tumor boards.",
    tag: "Clinical Safety",
  },
  {
    title: "India Healthcare & Data Sovereignty",
    summary:
      "Engineered with client-server isolation aligned with the Digital Personal Data Protection (DPDP) Act and DISHA standards. Clinical questions and uploaded reports are processed without commercial data harvesting.",
    tag: "Data Privacy",
  },
  {
    title: "Evidence-Grounded Knowledge",
    summary:
      "Educational guidance is grounded in established oncology consensus frameworks (including Indian Council of Medical Research, NCCN, and ESMO clinical guidelines adapted for Indian care settings).",
    tag: "Evidence Standard",
  },
];

export function TrustSection() {
  return (
    <section className="bg-forest py-24 text-white-soft md:py-32 border-t border-white-soft/10">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <span className="label text-mint-deep">Clinical Governance & Trust</span>
            <span className="text-[12px] text-white-soft/50">• Safety Standards</span>
          </div>
          <h2 className="editorial-serif mt-4 max-w-3xl text-[clamp(2.2rem,5vw,4.4rem)] text-white-soft">
            Clear information.
            <span className="block italic">Human care.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[16.5px] leading-relaxed text-white-soft/75">
            Trust is earned through transparency, clinical restraint, and respect for patient privacy. We do not make claims of revolutionary algorithms or invent outcomes.
          </p>
        </Reveal>

        {/* 3 Structured Governance Columns */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {trustPillars.map((pillar, idx) => (
            <Reveal key={pillar.title} delay={idx * 0.08}>
              <div className="flex h-full flex-col justify-between rounded-[24px] border border-white-soft/12 bg-white-soft/5 p-6 backdrop-blur-xs transition-colors hover:border-white-soft/25">
                <div>
                  <span className="rounded-full bg-white-soft/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-mint">
                    {pillar.tag}
                  </span>
                  <h3 className="font-serif mt-4 text-[22px] leading-snug text-white-soft">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-white-soft/78 font-sans">
                    {pillar.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-white-soft/10 pt-3 text-[11.5px] text-white-soft/50">
                  ONCO-AID Standard of Care · India
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
