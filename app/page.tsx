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
import { MobileHomeDashboard } from "@/components/home/mobile-home-dashboard";
import { CinematicIntro } from "@/components/home/cinematic-intro";

export default function HomePage() {
  return (
    <main id="main">
      <JsonLd />
      {/* Cinematic Opening Sequence (First-time visitor experience) */}
      <CinematicIntro />

      {/* Dedicated Mobile Product Experience (Focused Patient Dashboard) */}
      <MobileHomeDashboard />

      {/* Editorial Healthcare Institution Presentation (Desktop & Tablet) */}
      <div className="hidden md:block">
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
      </div>
    </main>
  );
}
