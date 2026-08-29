import { site } from "@/lib/utils";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: site.namePlain,
    url: site.url,
    description: site.description,
    about: { "@type": "MedicalCondition", name: "Cancer" },
    audience: { "@type": "Patient" },
    disclaimer:
      "Educational information only. ONCO-AID does not provide medical diagnosis or replace a licensed clinician.",
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
