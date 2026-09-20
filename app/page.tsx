import { AIPreview } from "@/components/home/ai-preview";
import { CancerExplorerPreview } from "@/components/home/cancer-explorer-preview";
import { CareJourney } from "@/components/home/care-journey";
import { FinalCta } from "@/components/home/final-cta";
import { HomeHero } from "@/components/home/hero";
import { ProductDemonstration } from "@/components/home/product-demonstration";
import { PatientJourney } from "@/components/home/patient-journey";
import { ResourcesPreview } from "@/components/home/resources-preview";
import { SpecialistsPreview } from "@/components/home/specialists-preview";
import { JsonLd } from "@/components/json-ld";
import { TrustSection } from "@/components/home/trust-section";

export default function HomePage() {
  return (
    <main id="main">
      <JsonLd />
      <HomeHero />
      <ProductDemonstration />
      <PatientJourney />
      <CareJourney />
      <AIPreview />
      <CancerExplorerPreview />
      <SpecialistsPreview />
      <ResourcesPreview />
      <TrustSection />
      <FinalCta />
    </main>
  );
}
