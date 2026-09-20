import { Reveal } from "@/components/reveal";

const governancePillars = [
  {
    category: "AI Assistance",
    question: "What the system helps with",
    description:
      "Translating dense pathology reports into patient-friendly language, preparing targeted clinical questions for oncologist consultations, and orienting families across complex multi-step care pathways.",
    status: "Active System",
  },
  {
    category: "Boundaries",
    question: "What it does not do",
    description:
      "ONCO-AID never provides autonomous medical diagnoses, does not calculate drug dosages, does not prescribe treatments, and never replaces a multidisciplinary tumor board or treating oncologist.",
    status: "Clinical Guardrails",
  },
  {
    category: "Clinical Sources",
    question: "Where information comes from",
    description:
      "Educational guidance is grounded in established oncology consensus frameworks, including the Indian Council of Medical Research (ICMR), NCCN, and ESMO clinical guidelines adapted for Indian care settings.",
    status: "Evidence Standard",
  },
  {
    category: "Review Protocols",
    question: "How information is verified",
    description:
      "Clinical content templates undergo periodic structured review. Synthetic examples and demonstration data are unambiguously flagged to ensure patients are never presented with unverified claims.",
    status: "Verification Cadence",
  },
  {
    category: "Data Privacy",
    question: "How information is handled",
    description:
      "Engineered with client-side isolation aligned with India's Digital Personal Data Protection (DPDP) Act and DISHA principles. User queries and uploaded documents are processed without commercial data harvesting.",
    status: "DPDP Aligned",
  },
];

export function TrustSection() {
  return (
    <section className="bg-forest py-20 text-white-soft md:py-28 border-t border-white-soft/10">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <span className="label text-mint-deep">Clinical Governance</span>
            <span className="text-[12px] text-white-soft/50">• Safety & Trust Standards</span>
          </div>
          <h2 className="heading-serif-section mt-3 text-white-soft">
            How ONCO-AID handles clinical information.
          </h2>
          <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-white-soft/75">
            Trust is earned through transparency, clinical restraint, and respect for patient privacy. We do not make claims of revolutionary algorithms or invent outcomes.
          </p>
        </Reveal>

        {/* Structured Governance Matrix */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-white-soft/12 bg-white-soft/4">
          <div className="grid divide-y divide-white-soft/10 md:grid-cols-2 lg:grid-cols-3 md:divide-y-0 md:divide-x">
            {governancePillars.slice(0, 3).map((pillar) => (
              <div key={pillar.category} className="p-6 md:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-meta-ui text-mint">{pillar.category}</span>
                    <span className="rounded-md bg-white-soft/8 px-2 py-0.5 text-[10.5px] text-white-soft/60">
                      {pillar.status}
                    </span>
                  </div>
                  <h3 className="heading-sans-ui mt-3 text-[17px] text-white-soft">
                    {pillar.question}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-white-soft/75">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid divide-y divide-white-soft/10 border-t border-white-soft/10 md:grid-cols-2 md:divide-y-0 md:divide-x">
            {governancePillars.slice(3).map((pillar) => (
              <div key={pillar.category} className="p-6 md:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-meta-ui text-mint">{pillar.category}</span>
                    <span className="rounded-md bg-white-soft/8 px-2 py-0.5 text-[10.5px] text-white-soft/60">
                      {pillar.status}
                    </span>
                  </div>
                  <h3 className="heading-sans-ui mt-3 text-[17px] text-white-soft">
                    {pillar.question}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-white-soft/75">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="mt-6 flex items-center justify-between text-[11.5px] text-white-soft/50 px-2">
          <span>ONCO-AID Clinical Standards &copy; 2026</span>
          <span>For Educational Patient Decision-Support Only</span>
        </div>
      </div>
    </section>
  );
}
