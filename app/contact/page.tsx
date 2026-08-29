import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main id="main" className="container-page pb-24">
      <PageIntro eyebrow="Contact" title="A quieter way to reach us.">
        This contact path is a product placeholder. For medical emergencies, use local emergency
        services — not this form.
      </PageIntro>
      <Button href="mailto:hello@onco-aid.example" className="mt-10">
        Email the team
      </Button>
    </main>
  );
}
