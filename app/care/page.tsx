import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { pathways } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Care pathways",
  description: "Choose where you are in your cancer journey and enter a calmer next step.",
};

export default function CarePage() {
  return (
    <main id="main" className="container-page pb-24">
      <PageIntro eyebrow="Care" title="Start from where you actually are.">
        Care is not a straight line. These pathways are doors — each one answers a different kind of
        uncertainty.
      </PageIntro>
      <ol className="mt-14 divide-y divide-forest/10 border-y border-forest/10">
        {pathways.map((item) => (
          <li key={item.slug}>
            <Link href={item.href} className="pathway-row group flex items-baseline gap-6 py-6">
              <span className="text-[13px] text-coral">{item.number}</span>
              <span className="pathway-title text-[24px] text-forest transition-transform duration-320">
                {item.title}
              </span>
              <span className="pathway-arrow ml-auto text-forest">→</span>
            </Link>
          </li>
        ))}
      </ol>
      <div className="mt-10">
        <Button href="/appointments">Find Care</Button>
      </div>
    </main>
  );
}
