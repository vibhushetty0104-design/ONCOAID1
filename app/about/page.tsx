import { PageIntro } from "@/components/page-intro";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main id="main" className="container-page pb-24">
      <PageIntro eyebrow="About" title="Built for the moment after the words.">
        ONCO-AID is a digital cancer-care platform. It helps people understand language, prepare for
        conversations, and find a next step. It does not replace doctors. Privacy-conscious
        experiences and clinically reviewed content are part of the product promise as the system
        matures.
      </PageIntro>
    </main>
  );
}
