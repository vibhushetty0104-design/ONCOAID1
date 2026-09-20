import { AIInterface } from "@/components/ai-interface";
import { PageIntro } from "@/components/page-intro";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clinical Assistant | ONCO-AID",
  description: "Understand medical terms, prepare questions for your care team, and make sense of your next steps.",
};

export default function AIPage() {
  return (
    <main id="main" className="bg-indigo pb-20 md:pb-24 pt-3 md:pt-8">
      <div className="container-page">
        <div className="hidden md:block">
          <PageIntro invert eyebrow="Clinical Assistant" title="Your questions deserve clarity.">
            Understand medical terms, prepare questions for your care team, and make sense of your next steps. ONCO-AID provides educational guidance and does not replace clinician evaluation.
          </PageIntro>
        </div>
        <div className="mt-1 md:mt-12">
          <AIInterface />
        </div>
      </div>
    </main>
  );
}
