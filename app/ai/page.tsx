import { AIInterface } from "@/components/ai-interface";
import { PageIntro } from "@/components/page-intro";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ONCO-AID AI",
  description: "Educational AI guidance for cancer questions. Does not replace your care team.",
};

export default function AIPage() {
  return (
    <main id="main" className="bg-indigo pb-24">
      <div className="container-page">
        <PageIntro invert eyebrow="Intelligence" title="Your questions deserve clarity.">
          Ask about language, reports, and conversations. ONCO-AID AI is educational. It does not
          diagnose, and it does not replace your healthcare team.
        </PageIntro>
        <div className="mt-12">
          <AIInterface />
        </div>
      </div>
    </main>
  );
}
