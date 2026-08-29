import { notFound } from "next/navigation";
import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { pathways, careSteps } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

type Props = { params: Promise<{ pathway: string }> };

export async function generateStaticParams() {
  return pathways.map((p) => ({ pathway: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pathway } = await params;
  const item = pathways.find((p) => p.slug === pathway);
  return { title: item ? `${item.title} | ONCO-AID Care Pathway` : "Care Pathway" };
}

export default async function PathwayPage({ params }: Props) {
  const { pathway } = await params;
  const item = pathways.find((p) => p.slug === pathway);
  if (!item) notFound();

  return (
    <main id="main" className="container-page pb-24 pt-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[13px] text-warm-gray">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <Link href="/care" className="hover:text-forest">Care Pathways</Link>
        <span>/</span>
        <span className="text-forest font-medium">{item.title}</span>
      </nav>

      <PageIntro eyebrow={`Pathway ${item.number}`} title={item.title}>
        {item.description} This guidance is educational and intended to prepare you for shared decision-making with your oncology team.
      </PageIntro>

      {/* Structured Action Card */}
      <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] border border-forest/10 bg-white-soft p-8 shadow-[var(--shadow-card)]">
          <span className="label text-teal">Pathway Action Plan</span>
          <h2 className="editorial-serif mt-3 text-[2.2rem] text-forest">What to Focus On Right Now</h2>
          <p className="mt-3 text-[15px] text-blue-gray leading-relaxed">
            When facing uncertainty in cancer care, breaking down complex decisions into immediate, manageable steps helps you stay oriented.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-ivory p-4 border border-forest/5 flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest text-white-soft text-[13px] font-bold">1</span>
              <div>
                <h3 className="text-[15px] font-semibold text-forest">Gather & Organize All Records</h3>
                <p className="text-[14px] text-ink/80 mt-0.5">Collect core biopsy reports, IHC marker slides, PET CT DICOM CDs, and baseline blood work in one physical binder.</p>
              </div>
            </div>

            <div className="rounded-2xl bg-ivory p-4 border border-forest/5 flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cobalt text-white-soft text-[13px] font-bold">2</span>
              <div>
                <h3 className="text-[15px] font-semibold text-forest">Formulate Clinical Questions</h3>
                <p className="text-[14px] text-ink/80 mt-0.5">Write down questions regarding tumor stage, surgery timing, receptor status, and systemic treatment options.</p>
              </div>
            </div>

            <div className="rounded-2xl bg-ivory p-4 border border-forest/5 flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal text-white-soft text-[13px] font-bold">3</span>
              <div>
                <h3 className="text-[15px] font-semibold text-forest">Identify Your Multi-Disciplinary Team</h3>
                <p className="text-[14px] text-ink/80 mt-0.5">Consult with medical, surgical, and radiation oncologists before commencing major invasive interventions.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/ai" variant="coral" className="text-[14px]">
              Ask ONCO-AID AI Questions →
            </Button>
            <Button href="/specialists" variant="primary" className="text-[14px]">
              Find Indian Specialists
            </Button>
          </div>
        </div>

        {/* Right Care Steps Navigation Box */}
        <aside className="rounded-[32px] bg-forest p-8 text-white-soft shadow-xl">
          <p className="label text-mint">Framework of Care</p>
          <h2 className="editorial-serif mt-3 text-[2rem]">The 6 Steps of Cancer Care</h2>
          <div className="mt-6 space-y-4">
            {careSteps.map((step, idx) => (
              <div key={step.id} className="border-b border-white-soft/10 pb-3 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-mint">0{idx + 1}</span>
                  <h3 className="text-[16px] font-medium">{step.title}</h3>
                </div>
                <p className="text-[13px] text-white-soft/70 mt-1">{step.body}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
