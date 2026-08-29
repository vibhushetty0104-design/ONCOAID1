import { notFound } from "next/navigation";
import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { resources } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = resources.find((r) => r.slug === slug);
  return { title: item ? `${item.title} | ONCO-AID Journal` : "Resource Article" };
}

export default async function ResourceArticlePage({ params }: Props) {
  const { slug } = await params;
  const item = resources.find((r) => r.slug === slug);
  if (!item) notFound();

  return (
    <main id="main" className="container-page pb-24 pt-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[13px] text-warm-gray">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <Link href="/resources" className="hover:text-forest">Journal</Link>
        <span>/</span>
        <span className="text-forest font-medium">{item.title}</span>
      </nav>

      <PageIntro eyebrow={`${item.kind} · ${item.readTime || "5 min read"}`} title={item.title}>
        {item.excerpt}
      </PageIntro>

      <div className="mt-6 flex items-center gap-4 border-b border-forest/10 pb-6 text-[14px] text-warm-gray">
        <p>By <strong>{item.author || "ONCO-AID Medical Editorial"}</strong></p>
        <span>•</span>
        <p>{item.date || "August 2026"}</p>
        <span>•</span>
        <span className="rounded-full bg-emerald-500/10 px-3 py-0.5 text-[12px] text-emerald-700 font-medium">
          Clinically Reviewed
        </span>
      </div>

      <article className="mt-10 max-w-3xl space-y-6 text-[17.5px] leading-relaxed text-ink/90">
        <div className="rounded-2xl bg-ivory p-6 border border-forest/10 text-[15.5px] font-sans">
          <h3 className="font-semibold text-forest text-[17px] mb-2">Key Takeaways from this Guide:</h3>
          <ul className="space-y-2 text-ink/85">
            <li>1. Take time to slow down the moment — acute medical decisions are rarely required within 24 hours of receiving a report.</li>
            <li>2. Bring all raw biopsy block records, IHC immunohistochemistry slides, and DICOM CDs to your consultations.</li>
            <li>3. Ensure pre-authorization and health insurance cashless workflows are initiated early with the hospital TPA desk.</li>
          </ul>
        </div>

        <p>
          When you or a loved one receives a cancer diagnosis in India, the volume of information, family opinions, hospital visits, and clinical terms can instantly feel overwhelming. It is important to know that you do not need to memorize oncology or solve every step today.
        </p>

        <h2 className="editorial-serif text-[2.2rem] text-forest pt-4">1. Structuring the First 3 Weeks</h2>
        <p>
          The initial weeks following an abnormal biopsy or scan are dedicated to complete diagnostic staging. Modern cancer care relies on specific tumor biology — such as ER/PR and HER2 receptor status in breast cancer, or EGFR/ALK mutation testing in non-small cell lung cancer.
        </p>

        <h2 className="editorial-serif text-[2.2rem] text-forest pt-4">2. Navigating Multidisciplinary Care</h2>
        <p>
          Major cancer centers in Bengaluru, Mumbai, Chennai, Delhi, and Hyderabad utilize multidisciplinary tumor boards where medical, surgical, and radiation oncologists review complex cases together. Seeking a consultation with a comprehensive care team ensures all treatment options are weighed before embarking on surgery or chemotherapy.
        </p>

        <h2 className="editorial-serif text-[2.2rem] text-forest pt-4">3. Questions to Take With You</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>What specific tumor subtype and stage do we have documented?</li>
          <li>Are any specialized molecular tests (NGS or FISH) still pending?</li>
          <li>What are the treatment options, goals, and expected timeline?</li>
          <li>What emergency contact number do I call if side effects occur?</li>
        </ul>

        <div className="mt-12 rounded-[28px] bg-forest p-8 text-white-soft shadow-xl">
          <h3 className="editorial-serif text-[2rem]">Need Specific Answers for Your Case?</h3>
          <p className="mt-2 text-[15px] text-white-soft/80">
            Use ONCO-AID AI Assistant to decode pathology report terms or prepare a personalized question checklist for your doctor.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/ai" variant="coral" className="text-[14px]">
              Ask ONCO-AID AI →
            </Button>
            <Button href="/specialists" variant="ghost" className="text-white-soft text-[14px]">
              Find Indian Specialists
            </Button>
          </div>
        </div>
      </article>
    </main>
  );
}
