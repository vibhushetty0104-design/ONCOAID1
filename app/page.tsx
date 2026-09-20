import { CinematicIntro } from "@/components/home/cinematic-intro";
import { HomeHero } from "@/components/home/hero";
import { WhereAreYou } from "@/components/home/where-are-you";
import { ProductDemonstration } from "@/components/home/product-demonstration";
import { HumanCare } from "@/components/home/human-care";
import { TrustSection } from "@/components/home/trust-section";
import { JsonLd } from "@/components/json-ld";

export default function HomePage() {
  return (
    <main id="main" className="min-h-screen bg-ivory">
      <JsonLd />

      {/* Opening Cinematic Sequence (Plays on every visit, click/tap anywhere to skip) */}
      <CinematicIntro />

      {/* Hero Section */}
      <HomeHero />

      {/* Where Are You Right Now? - Pure Typographic Navigation */}
      <WhereAreYou />

      {/* Realistic Product Demonstration - Pathology Report Decoder */}
      <ProductDemonstration />

      {/* Human Care - Bengaluru Launch Geography */}
      <HumanCare />

      {/* Clinical Governance, Trust, Boundaries & Privacy */}
      <TrustSection />
    </main>
  );
}
