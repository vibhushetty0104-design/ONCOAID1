import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin" };

export default function AdminPage() {
  return (
    <main id="main" className="container-page pb-24">
      <PageIntro eyebrow="Admin" title="Secure administration.">
        Content review, user roles, and clinical publishing will require server-side authorization.
        Nothing administrative is exposed to the client.
      </PageIntro>
      <Button href="/login" className="mt-10">
        Sign in
      </Button>
    </main>
  );
}
