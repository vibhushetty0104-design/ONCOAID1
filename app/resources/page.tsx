import { ResourcesPreview } from "@/components/home/resources-preview";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description: "Useful knowledge without the overwhelm.",
};

export default function ResourcesPage() {
  return (
    <main id="main" className="pt-8">
      <ResourcesPreview />
    </main>
  );
}
