import { PatientJourneyView } from "@/components/patient/patient-journey-view";
import { PageIntro } from "@/components/page-intro";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Patient Journey Map | ONCO-AID",
  description: "Visual 8-stage oncology care journey for orientation, diagnostics, and appointments.",
};

export default function PatientJourneyPage() {
  return (
    <main id="main" className="container-page pb-24 pt-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-[13px] text-warm-gray">
        <Link href="/dashboard" className="hover:text-forest">Dashboard</Link>
        <span>/</span>
        <span className="text-forest font-medium">Patient Journey</span>
      </nav>

      <PageIntro
        eyebrow="Care Milestones"
        title="Your 8-Stage Oncology Journey Map"
      >
        Track what is completed, understand your current milestone, and see what discussions are on the horizon.
      </PageIntro>

      <div className="mt-8">
        <PatientJourneyView />
      </div>
    </main>
  );
}
