import { notFound } from "next/navigation";
import { Accordion } from "@/components/accordion";
import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { cancerTypes, specialists } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return cancerTypes.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = cancerTypes.find((c) => c.slug === slug);
  return { title: item ? `${item.name} Guide | ONCO-AID` : "Cancer Guide" };
}

export default async function CancerDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = cancerTypes.find((c) => c.slug === slug);
  if (!item) notFound();

  // Find relevant specialists matching this cancer focus or role
  const relatedSpecialists = specialists.filter((s) =>
    s.focus.toLowerCase().includes(item.category.toLowerCase()) ||
    s.focus.toLowerCase().includes(item.name.toLowerCase()) ||
    (item.category === "Breast" && s.focus.includes("Breast")) ||
    (item.category === "Lung" && s.focus.includes("Lung")) ||
    (item.category === "Colorectal" && s.focus.includes("Colorectal"))
  ).slice(0, 2);

  const fallbackSpecialists = relatedSpecialists.length > 0 ? relatedSpecialists : specialists.slice(0, 2);

  return (
    <main id="main" className="container-page pb-24 pt-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[13px] text-warm-gray">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <Link href="/cancer-types" className="hover:text-forest">Cancer Types</Link>
        <span>/</span>
        <span className="text-forest font-medium">{item.name}</span>
      </nav>

      <PageIntro eyebrow={item.category} title={item.name}>
        {item.summary} This educational guide helps you understand diagnosis steps, biomarker testing, typical treatment pathways, and key questions for your oncologist.
      </PageIntro>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Accordion FAQ & Guide */}
        <div>
          <Accordion
            items={[
              {
                title: `What is ${item.name}?`,
                body: `${item.name} refers to malignant cellular growth originating in ${item.category.toLowerCase()} tissues. Exact tumor behavior depends on histological grade, receptor markers, and molecular subtyping determined via biopsy.`,
              },
              {
                title: "How is it diagnosed & evaluated?",
                body: "Evaluation typically combines physical examination, blood biomarkers, high-resolution imaging (CT, MRI, PET-CT), and a core needle biopsy or tissue resection evaluated by a surgical pathologist.",
              },
              {
                title: "What does staging mean for this cancer?",
                body: "Staging describes primary tumor size (T), lymph node involvement (N), and systemic spread (M). In modern oncology, staging is combined with genomic subtyping to tailor targeted therapies.",
              },
              {
                title: "What treatments may be considered?",
                body: "Treatment strategies may involve surgical resection, systemic medical therapies (chemotherapy, targeted oral inhibitors, immunotherapy, hormone blocking agents), and precise radiation therapy (IMRT/Proton).",
              },
              {
                title: "What key questions should I ask my doctor?",
                body: `1. What is the exact subtype and stage of my ${item.name}?\n2. Are all pathology markers (IHC/NGS) complete?\n3. What are our immediate goals for treatment (curative vs. control)?\n4. Who is my primary contact point if I develop symptoms outside clinic hours?`,
              },
            ]}
          />

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/ai" variant="coral">
              Ask AI About {item.name} →
            </Button>
            <Button href="/reports" variant="ghost" className="text-forest">
              Decode {item.name} Pathology Report
            </Button>
          </div>
        </div>

        {/* Right Sidebar: Related Indian Specialists */}
        <aside className="space-y-6">
          <div className="rounded-[28px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)]">
            <span className="label text-teal">Specialist Matching</span>
            <h3 className="editorial-serif mt-2 text-[1.8rem] text-forest">
              Oncologists specializing in {item.category}
            </h3>
            <p className="mt-2 text-[13.5px] text-blue-gray">
              Consult with leading Indian specialists for multi-disciplinary evaluation:
            </p>

            <div className="mt-4 space-y-4">
              {fallbackSpecialists.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/specialists/${doc.id}`}
                  className="group block rounded-2xl bg-ivory p-4 border border-forest/5 transition-all hover:border-cobalt/30 hover:shadow-sm"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-teal block">{doc.role}</span>
                  <h4 className="text-[17px] font-semibold text-forest group-hover:text-cobalt transition-colors mt-0.5">{doc.name}</h4>
                  <p className="text-[12px] text-warm-gray">{doc.hospital} · {doc.city}</p>
                  <p className="text-[13px] text-ink/80 mt-1 line-clamp-1">Focus: {doc.focus}</p>
                </Link>
              ))}
            </div>

            <Button href="/specialists" variant="link" className="mt-4 text-teal p-0 text-[14px]">
              Browse all specialists in India →
            </Button>
          </div>

          <div className="rounded-[28px] bg-forest p-6 text-white-soft shadow-lg">
            <p className="label text-mint">Appointment Readiness</p>
            <h3 className="editorial-serif mt-2 text-[1.8rem]">Prepare Your Visit</h3>
            <p className="mt-2 text-[14px] text-white-soft/80 leading-relaxed">
              Have your biopsy slide blocks, CT/PET scan DICOM discs, and blood work organized before your initial consultation.
            </p>
            <Button href="/appointments" variant="coral" className="mt-5 w-full justify-center text-[14px]">
              Schedule Consultation
            </Button>
          </div>
        </aside>
      </div>
    </main>
  );
}
