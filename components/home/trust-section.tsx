import { Reveal } from "@/components/reveal";
import { brand } from "@/lib/brand";

export function TrustSection() {
  return (
    <section className="border-t border-white-soft/10 bg-[#063B36] py-20 md:py-28 text-white-soft">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-mint block">
              Clinical Governance · Safety Boundaries
            </span>
            <h2 className="heading-serif-section mt-2.5 text-white-soft">
              Built on clinical restraint, trust, and patient boundaries.
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-white-soft/80">
              ONCO—AID is designed to bring clarity to an overwhelming experience. We adhere to strict clinical boundaries, evidenced consensus frameworks, and robust patient data protection.
            </p>
          </div>
        </Reveal>

        {/* 2-Column Comparison Grid: Capabilities vs Strict Boundaries */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Column 1: What ONCO-AID Can Help With */}
          <div className="rounded-lg border border-white-soft/15 bg-white-soft/[0.04] p-6 md:p-8 backdrop-blur-xs">
            <div className="flex items-center justify-between border-b border-white-soft/10 pb-4">
              <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-mint">
                Scope of Assistance
              </span>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-300 border border-emerald-400/30">
                Permitted Use
              </span>
            </div>
            <h3 className="heading-sans-ui mt-4 text-[18px] text-white-soft">
              What ONCO—AID can help with
            </h3>
            <ul className="mt-4 space-y-3.5 text-[14px] leading-relaxed text-white-soft/85">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-mint text-[10px] font-bold text-[#042422]">
                  ✓
                </span>
                <span>
                  <strong className="text-white-soft">Report Translation:</strong> Explaining dense histology, receptor biomarkers (ER, PR, HER2, Ki-67), and staging terms from your pathology documents.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-mint text-[10px] font-bold text-[#042422]">
                  ✓
                </span>
                <span>
                  <strong className="text-white-soft">Consultation Preparation:</strong> Generating evidence-grounded questions tailored to your diagnosis for discussions with your oncologist.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-mint text-[10px] font-bold text-[#042422]">
                  ✓
                </span>
                <span>
                  <strong className="text-white-soft">Care Pathway Navigation:</strong> Helping you and your family anticipate next steps—from initial biopsy to tumor board review and adjuvant therapy.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-mint text-[10px] font-bold text-[#042422]">
                  ✓
                </span>
                <span>
                  <strong className="text-white-soft">Specialist Discovery:</strong> Finding verified oncologists and accredited cancer centers in Bengaluru and across India.
                </span>
              </li>
            </ul>
          </div>

          {/* Column 2: Explicit Boundaries */}
          <div className="rounded-lg border border-[#E88970]/30 bg-[#E88970]/[0.06] p-6 md:p-8 backdrop-blur-xs">
            <div className="flex items-center justify-between border-b border-[#E88970]/20 pb-4">
              <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-[#E88970]">
                Clinical Guardrails
              </span>
              <span className="rounded bg-[#E88970]/20 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#E88970] border border-[#E88970]/40">
                Strict Boundaries
              </span>
            </div>
            <h3 className="heading-sans-ui mt-4 text-[18px] text-white-soft">
              What ONCO—AID does NOT do
            </h3>
            <ul className="mt-4 space-y-3.5 text-[14px] leading-relaxed text-white-soft/85">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E88970] text-[10px] font-bold text-[#042422]">
                  ✕
                </span>
                <span>
                  <strong className="text-white-soft">ONCO—AID does not diagnose:</strong> We do not interpret symptoms to determine malignancy or deliver definitive diagnostic determinations.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E88970] text-[10px] font-bold text-[#042422]">
                  ✕
                </span>
                <span>
                  <strong className="text-white-soft">ONCO—AID does not prescribe:</strong> We do not recommend drug dosages, prescribe medication regimens, or adjust ongoing treatment plans.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E88970] text-[10px] font-bold text-[#042422]">
                  ✕
                </span>
                <span>
                  <strong className="text-white-soft">ONCO—AID does not replace a clinician:</strong> No algorithmic tool can substitute for an in-person evaluation by your surgical, medical, or radiation oncologist.
                </span>
              </li>
            </ul>

            <div className="mt-6 rounded border border-[#E88970]/20 bg-[#042422]/60 p-3.5 text-[12.5px] text-white-soft/80">
              <strong className="text-white-soft">Emergency Care:</strong> For acute symptoms, severe pain, post-operative complications, or emergencies, contact your treating hospital directly or dial <strong>112</strong> immediately.
            </div>
          </div>
        </div>

        {/* Governance, Privacy & Review Metadata Row */}
        <div className="mt-10 grid gap-6 rounded-lg border border-white-soft/12 bg-white-soft/[0.03] p-6 md:grid-cols-3">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-mint block">
              Data Privacy & Protection
            </span>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white-soft/75">
              Aligned with India&apos;s Digital Personal Data Protection (DPDP) Act. Reports are processed securely; personal health information is never sold or used to train public models.
            </p>
          </div>

          <div>
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-mint block">
              Clinical Review Standards
            </span>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white-soft/75">
              Educational modules and report explanations are grounded in consensus guidelines from {brand.governance.frameworks}, reviewed by qualified oncologists.
            </p>
          </div>

          <div>
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-mint block">
              Verification Cadence
            </span>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white-soft/75">
              <strong className="text-white-soft font-semibold">Last clinically reviewed: {brand.governance.lastReviewed}.</strong> Regular updates ensure alignment with the latest clinical evidence and drug approvals in India.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
