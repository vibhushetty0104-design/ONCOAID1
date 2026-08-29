import { notFound } from "next/navigation";
import { PlaceholderNote } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { specialists } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return specialists.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const person = specialists.find((s) => s.id === id);
  return { title: person ? `${person.name} | ONCO-AID Specialist` : "Specialist Profile" };
}

export default async function SpecialistProfilePage({ params }: Props) {
  const { id } = await params;
  const person = specialists.find((s) => s.id === id);
  if (!person) notFound();

  return (
    <main id="main" className="container-page pb-24 pt-28 md:pt-32">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[13px] text-warm-gray">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <Link href="/specialists" className="hover:text-forest">Specialists</Link>
        <span>/</span>
        <span className="text-forest font-medium">{person.name}</span>
      </nav>

      {/* Main Hero Header Card */}
      <div className="overflow-hidden rounded-[32px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)] md:p-10">
        <div className="grid gap-8 md:grid-cols-[280px_1fr] items-start">
          {/* Portrait Box */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-gradient-to-br from-forest via-teal to-indigo p-6 text-white-soft flex flex-col justify-between shadow-lg">
            <span className="rounded-full bg-amber-500/20 border border-amber-400/30 px-3 py-1 text-[11px] uppercase tracking-wider text-amber-200 self-start font-medium">
              Demo Clinician Profile
            </span>
            <div>
              <div className="h-16 w-16 rounded-full bg-white-soft/10 backdrop-blur-md flex items-center justify-center text-[24px] font-bold text-white-soft mb-3">
                {person.name.split(" ").map(n => n[0]).join("")}
              </div>
              <p className="text-[12px] uppercase tracking-widest text-mint-deep">{person.role}</p>
              <p className="text-[18px] font-serif font-medium">{person.name}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-forest/8 px-3.5 py-1 text-[12px] font-semibold text-forest uppercase tracking-wider">
                {person.role}
              </span>
              <span className="rounded-full bg-cobalt/10 px-3 py-1 text-[12px] font-medium text-cobalt">
                📍 {person.city}
              </span>
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[12px] font-medium text-amber-700">
                ★ {person.rating}
              </span>
            </div>

            <h1 className="editorial-serif mt-4 text-[clamp(2.4rem,5vw,4.2rem)] text-forest leading-tight">
              {person.name}
            </h1>
            <p className="mt-2 text-[16px] font-medium text-warm-gray">{person.degree}</p>

            <div className="mt-6 grid gap-4 rounded-2xl bg-ivory p-5 md:grid-cols-3">
              <div>
                <span className="text-[12px] text-warm-gray uppercase tracking-wider block">Hospital Affiliation</span>
                <p className="text-[15px] font-semibold text-forest mt-0.5">{person.hospital}</p>
              </div>
              <div>
                <span className="text-[12px] text-warm-gray uppercase tracking-wider block">Clinical Experience</span>
                <p className="text-[15px] font-semibold text-forest mt-0.5">{person.experience}</p>
              </div>
              <div>
                <span className="text-[12px] text-warm-gray uppercase tracking-wider block">Consultation Fee</span>
                <p className="text-[15px] font-semibold text-cobalt mt-0.5">{person.consultationFee}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-[14px] font-semibold uppercase tracking-wider text-warm-gray">Clinical Biography</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-ink/85">{person.bio}</p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-[13px] font-medium text-warm-gray">Languages Spoken:</span>
              {person.languages.map((lang) => (
                <span key={lang} className="rounded-md bg-forest/5 px-2.5 py-1 text-[13px] text-forest font-medium">
                  {lang}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/appointments" variant="coral" className="px-8 py-3.5 text-[15px]">
                Request Consultation with {person.name.split(" ")[1] || person.name}
              </Button>
              <Button href="/ai" variant="ghost" className="text-forest">
                Ask AI About Treatment Options →
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Areas & Patient Notice Grid */}
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="rounded-[28px] border border-forest/10 bg-white-soft p-7 shadow-[var(--shadow-card)]">
          <h2 className="editorial-serif text-[2rem] text-forest">Specialized Focus Areas</h2>
          <p className="mt-2 text-[15px] text-blue-gray">
            Primary tumor types and treatment protocols managed by {person.name}:
          </p>
          <ul className="mt-6 space-y-3">
            {person.focus.split(", ").map((item) => (
              <li key={item} className="flex items-center gap-3 text-[15px] text-ink font-medium">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint/50 text-forest text-[12px] font-bold">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[28px] border border-forest/10 bg-forest p-7 text-white-soft shadow-[var(--shadow-card)]">
          <p className="label text-mint">Patient Guidance & Transparency</p>
          <h2 className="editorial-serif mt-3 text-[2rem]">Preparing for Your Visit</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white-soft/80">
            When seeing an oncologist, bringing organized pathology reports, DICOM CD/scans, prior treatment summaries, and insurance documents ensures maximum time for clinical discussion.
          </p>
          <p className="mt-6 rounded-2xl border border-white-soft/20 bg-white-soft/10 p-4 text-[13px] text-white-soft/90">
            {person.note}
          </p>
        </div>
      </div>
    </main>
  );
}
