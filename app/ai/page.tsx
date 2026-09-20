import { AIInterface } from "@/components/ai-interface";
import { PageIntro } from "@/components/page-intro";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clinical Assistant | ONCO-AID",
  description: "Understand medical terms, prepare questions for your care team, and make sense of your next steps.",
};

export default function AIPage() {
  return (
    <main id="main" className="min-h-screen bg-[#063B36] text-white-soft pb-28 pt-20 md:pt-28">
      <div className="container-page max-w-5xl">
        <div className="hidden md:block mb-8">
          <PageIntro invert eyebrow="Care Companion · ONCO—AID AI" title="Your questions deserve clarity.">
            Understand medical terms, prepare targeted questions for your oncologist visits, and make sense of your care milestones. ONCO—AID provides educational guidance grounded in clinical oncology consensus.
          </PageIntro>
        </div>
        <div className="mt-2">
          <AIInterface />
        </div>
      </div>
    </main>
  );
}
