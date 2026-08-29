import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Doctor home" };

export default function DoctorPage() {
  return (
    <main id="main" className="container-page pb-24">
      <PageIntro eyebrow="Doctor" title="A professional workspace, still calm.">
        Profile, availability, and appointments will be authorized server-side. This shell is not a
        live clinic tool yet.
      </PageIntro>
      <Button href="/login" className="mt-10">
        Sign in
      </Button>
    </main>
  );
}
