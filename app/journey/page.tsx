import { PatientJourneyView } from "@/components/patient/patient-journey-view";
import { PageIntro } from "@/components/page-intro";
import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Patient Care Journey Map | ONCO-AID",
  description:
    "Interactive 8-stage clinical oncology care roadmap from diagnostic biopsy to tumor board, treatment, and survivorship.",
};

export default function PublicJourneyPage() {
  return (
    <main id="main" className="min-h-screen bg-[#EDF4EF] py-24 md:py-28 text-forest">
      <div className="container-page max-w-6xl">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-[13px] text-forest/65">
          <Link href="/" className="hover:text-forest underline">Home</Link>
          <span>/</span>
          <span className="text-forest font-semibold">Patient Care Journey</span>
        </nav>

        <PageIntro
          eyebrow="Clinical Milestone Navigation"
          title="The 8-Stage Oncology Care Pathway"
        >
          Cancer care is a sequence of clinical milestones. Track what is completed, understand your active stage, and prepare targeted questions for your multidisciplinary oncology team.
        </PageIntro>

        <div className="mt-10">
          <PatientJourneyView />
        </div>
      </div>
    </main>
  );
}
