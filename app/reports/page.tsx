import { PageIntro } from "@/components/page-intro";
import { ReportViewer } from "@/components/report-viewer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports",
  description: "A fictional report that turns pathology language into plain language.",
};

export default function ReportsPage() {
  return (
    <main id="main" className="container-page pb-24">
      <PageIntro eyebrow="Reports" title="Your report shouldn't feel like another language.">
        Open a sample excerpt, then select a highlighted term. Explanations are educational and
        invented for this prototype — they are not your results.
      </PageIntro>
      <div className="mt-12">
        <ReportViewer />
      </div>
    </main>
  );
}
