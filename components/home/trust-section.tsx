import { Reveal } from "@/components/reveal";

export function TrustSection() {
  return (
    <section className="border-t border-forest/10 bg-[#fbf9f5] py-20 md:py-28 text-forest">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-forest/60">
              Clinical Governance & Privacy
            </p>
            <h2 className="heading-serif-section mt-2.5 text-forest">
              Built on clinical restraint, trust, and patient boundaries.
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-forest/75">
              ONCO-AID is designed to bring clarity to an overwhelming experience. We adhere to rigorous clinical boundaries and strict patient data privacy standards.
            </p>
          </div>
        </Reveal>

        {/* 2-Column Comparison Grid: Capabilities vs Strict Boundaries */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Column 1: What ONCO-AID Can Help With */}
          <div className="rounded-lg border border-forest/15 bg-white-soft p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-forest/10 pb-4">
              <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-forest/60">
                Scope of Assistance
              </span>
              <span className="rounded bg-forest/8 px-2 py-0.5 font-mono text-[11px] font-semibold text-forest">
                Permitted Use
              </span>
            </div>
            <h3 className="heading-sans-ui mt-4 text-[18px] text-forest">
              What ONCO-AID can help with
            </h3>
            <ul className="mt-4 space-y-3.5 text-[14.5px] leading-relaxed text-forest/85">
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-forest text-[10px] text-white-soft">
                  ✓
                </span>
                <span>
                  <strong>Report Translation:</strong> Explaining dense histology, receptor biomarkers (ER, PR, HER2, Ki-67), and staging terms from your pathology documents.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-forest text-[10px] text-white-soft">
                  ✓
                </span>
                <span>
                  <strong>Consultation Preparation:</strong> Generating evidence-grounded questions tailored to your diagnosis for discussions with your oncologist.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-forest text-[10px] text-white-soft">
                  ✓
                </span>
                <span>
                  <strong>Care Pathway Navigation:</strong> Helping you and your family anticipate next steps—from initial biopsy to tumor board review and adjuvant therapy.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-forest text-[10px] text-white-soft">
                  ✓
                </span>
                <span>
                  <strong>Specialist Discovery:</strong> Finding verified oncologists and accredited cancer centers in Bengaluru and across India.
                </span>
              </li>
            </ul>
          </div>

          {/* Column 2: Explicit Boundaries */}
          <div className="rounded-lg border border-[#b84a39]/25 bg-[#faf4f2] p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-[#b84a39]/20 pb-4">
              <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-[#b84a39]">
                Clinical Guardrails
              </span>
              <span className="rounded bg-[#b84a39]/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#b84a39]">
                Strict Boundaries
              </span>
            </div>
            <h3 className="heading-sans-ui mt-4 text-[18px] text-forest">
              What ONCO-AID does NOT do
            </h3>
            <ul className="mt-4 space-y-3.5 text-[14.5px] leading-relaxed text-forest/85">
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#b84a39] text-[10px] text-white-soft">
                  ✕
                </span>
                <span>
                  <strong className="text-forest">ONCO-AID does not diagnose:</strong> We do not interpret symptoms to determine malignancy or deliver definitive diagnostic determinations.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#b84a39] text-[10px] text-white-soft">
                  ✕
                </span>
                <span>
                  <strong className="text-forest">ONCO-AID does not prescribe:</strong> We do not recommend drug dosages, prescribe medication regimens, or adjust ongoing treatment plans.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#b84a39] text-[10px] text-white-soft">
                  ✕
                </span>
                <span>
                  <strong className="text-forest">ONCO-AID does not replace a clinician:</strong> No algorithmic tool can substitute for an in-person evaluation by your surgical, medical, or radiation oncologist.
                </span>
              </li>
            </ul>

            <div className="mt-6 rounded border border-[#b84a39]/20 bg-white-soft/80 p-3.5 text-[12.5px] text-forest/80">
              <strong className="text-forest">Emergency Care:</strong> For severe acute symptoms, post-operative complications, or medical emergencies, contact your hospital directly or dial <strong>112</strong> immediately.
            </div>
          </div>
        </div>

        {/* Governance, Privacy & Review Metadata Row */}
        <div className="mt-10 grid gap-6 rounded-lg border border-forest/12 bg-white-soft p-6 md:grid-cols-3">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-forest/60 block">
              Data Privacy & Protection
            </span>
            <p className="mt-2 text-[13.5px] leading-relaxed text-forest/80">
              Aligned with India&apos;s Digital Personal Data Protection (DPDP) Act. Reports are processed securely; personal health information is never sold or used to train public foundation models.
            </p>
          </div>

          <div>
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-forest/60 block">
              Clinical Review Standards
            </span>
            <p className="mt-2 text-[13.5px] leading-relaxed text-forest/80">
              Educational modules and report explanations are grounded in consensus guidelines from ICMR, NCCN, and ESMO, reviewed by qualified oncologists.
            </p>
          </div>

          <div>
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-forest/60 block">
              Verification Cadence
            </span>
            <p className="mt-2 text-[13.5px] leading-relaxed text-forest/80">
              <strong className="text-forest font-semibold">Last clinically reviewed: August 2026.</strong> Regular updates ensure alignment with the latest clinical evidence and drug approvals in India.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
