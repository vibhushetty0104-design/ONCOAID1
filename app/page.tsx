import { HomeHero } from "@/components/home/hero";
import { WhereAreYou } from "@/components/home/where-are-you";
import { PatientJourney } from "@/components/home/patient-journey";
import { ProductDemonstration } from "@/components/home/product-demonstration";
import { AIPreview } from "@/components/home/ai-preview";
import { HumanCare } from "@/components/home/human-care";
import { TrustSection } from "@/components/home/trust-section";
import { JsonLd } from "@/components/json-ld";

export default function HomePage() {
  return (
    <main id="main" className="min-h-screen">
      <JsonLd />

      {/* 1. DEEP FOREST HERO: Editorial Typing, Restored Living Care Signal & Cursor Proximity */}
      <HomeHero />

      {/* 2. WARM IVORY ORIENTATION: "Where are you right now?" Typographic Rows */}
      <WhereAreYou />

      {/* 3. SAGE / MINT JOURNEY: 8-Stage Living Continuous Pathway with Progressive Disclosure */}
      <PatientJourney />

      {/* 4. WARM IVORY REPORT EXPERIENCE: Realistic Pathology Decoder Workstation */}
      <ProductDemonstration />

      {/* 5. DEEP FOREST AI EXPERIENCE: Care Companion & Biological Waveform Thinking */}
      <AIPreview />

      {/* 6. WARM IVORY SPECIALISTS: Bengaluru Launch Oncologists */}
      <HumanCare />

      {/* 7. DEEP FOREST TRUST & GOVERNANCE: Capabilities, Explicit Boundaries & DPDP Privacy */}
      <TrustSection />
    </main>
  );
}
