import { notFound } from "next/navigation";
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

  const initials = person.name.split(" ").slice(1, 3).map(n => n[0]).join("") || "DR";

  return (
    <main id="main" className="container-page pb-20 md:pb-24 pt-4 md:pt-12">
      {/* ============================================================ */}
      {/* MOBILE EXPERIENCE: Native Specialist Profile Screen (md:hidden) */}
      {/* ============================================================ */}
      <div className="md:hidden space-y-4">
        {/* Back Link */}
        <Link
          href="/specialists"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-forest hover:text-forest-mid py-1"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span>Back to Specialists</span>
        </Link>

        {/* Profile Header Card */}
        <div className="rounded-2xl border border-forest/10 bg-white-soft p-4 shadow-xs">
          <div className="flex items-start gap-3.5">
            {/* Avatar with Verified checkmark */}
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-forest text-white font-serif font-bold text-[20px] shadow-sm">
              {initials}
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold border-2 border-white">
                ✓
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="rounded-md bg-forest/8 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-forest">
                  {person.role}
                </span>
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-700">
                  Verified
                </span>
              </div>

              <h1 className="font-serif text-[20px] font-medium text-forest mt-1 leading-snug">
                {person.name}
              </h1>

              <p className="text-[12px] text-warm-gray mt-0.5 leading-tight">
                {person.degree}
              </p>

              <p className="text-[12px] text-blue-gray mt-1 truncate">
                {person.hospital}
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-forest/8 pt-3 text-center">
            <div className="rounded-xl bg-ivory p-2 border border-forest/5">
              <span className="text-[10px] uppercase font-bold text-warm-gray block">Experience</span>
              <span className="text-[13px] font-semibold text-forest mt-0.5 block">{person.experience.split(" ")[0]} yrs</span>
            </div>
            <div className="rounded-xl bg-ivory p-2 border border-forest/5">
              <span className="text-[10px] uppercase font-bold text-warm-gray block">Rating</span>
              <span className="text-[13px] font-semibold text-amber-700 mt-0.5 block">★ {person.rating.split(" ")[0]}</span>
            </div>
            <div className="rounded-xl bg-ivory p-2 border border-forest/5">
              <span className="text-[10px] uppercase font-bold text-warm-gray block">Consultation</span>
              <span className="text-[13px] font-semibold text-forest mt-0.5 block">{person.consultationFee}</span>
            </div>
          </div>

          {/* Quick Action Row */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Link
              href="/appointments"
              className="flex flex-col items-center justify-center rounded-xl bg-forest py-2.5 px-2 text-white shadow-2xs active:bg-forest-mid"
            >
              <span className="text-[12.5px] font-medium">In-Person</span>
              <span className="text-[10px] text-white/70">At Hospital</span>
            </Link>
            <Link
              href="/appointments"
              className="flex flex-col items-center justify-center rounded-xl border border-forest/20 bg-ivory py-2.5 px-2 text-forest active:bg-forest/5"
            >
              <span className="text-[12.5px] font-medium">Video Call</span>
              <span className="text-[10px] text-warm-gray">Tele-consult</span>
            </Link>
            <Link
              href="/ai?task=appointment"
              className="flex flex-col items-center justify-center rounded-xl border border-coral/30 bg-coral/10 py-2.5 px-2 text-coral-deep active:bg-coral/20"
            >
              <span className="text-[12.5px] font-medium">2nd Opinion</span>
              <span className="text-[10px] text-coral/80">Review notes</span>
            </Link>
          </div>
        </div>

        {/* Clinical Focus Areas (Pills) */}
        <div className="rounded-2xl border border-forest/10 bg-white-soft p-4 shadow-xs">
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-warm-gray mb-2.5">
            Clinical Focus & Specialization
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {person.focus.split(", ").map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-forest/6 px-2.5 py-1 text-[12px] font-medium text-forest border border-forest/8"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Clinical Biography */}
        <div className="rounded-2xl border border-forest/10 bg-white-soft p-4 shadow-xs">
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-warm-gray mb-2">
            About {person.name.split(" ")[1] || person.name}
          </h2>
          <p className="text-[13.5px] leading-relaxed text-ink/85 font-sans">
            {person.bio}
          </p>

          <div className="mt-3 pt-3 border-t border-forest/8 flex items-center justify-between text-[12px]">
            <span className="text-warm-gray">Languages:</span>
            <span className="font-medium text-forest">{person.languages.join(", ")}</span>
          </div>
        </div>

        {/* Patient Review & Feedback Note */}
        <div className="rounded-2xl border border-teal/20 bg-teal/5 p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-amber-500">★★★★★</span>
            <span className="text-[11.5px] font-semibold text-teal">Verified Patient Reviews</span>
          </div>
          <p className="text-[13px] text-forest italic leading-relaxed">
            &ldquo;Exceptional clarity in explaining our biopsy report markers and outlining surgical options without rushing. The consultation gave our entire family reassuring confidence.&rdquo;
          </p>
          <span className="block text-[11px] text-warm-gray mt-2">
            Verified consultation via ONCO-AID Care Network
          </span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* DESKTOP EXPERIENCE: Full Editorial Profile (hidden md)       */}
      {/* ============================================================ */}
      <div className="hidden md:block">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[13px] text-warm-gray">
          <Link href="/" className="hover:text-forest">Home</Link>
          <span>/</span>
          <Link href="/specialists" className="hover:text-forest">Specialists</Link>
          <span>/</span>
          <span className="text-forest font-medium">{person.name}</span>
        </nav>

        {/* Main Hero Header Card */}
        <div className="overflow-hidden rounded-[32px] border border-forest/10 bg-white-soft p-10 shadow-[var(--shadow-card)]">
          <div className="grid gap-8 md:grid-cols-[280px_1fr] items-start">
            {/* Portrait Box */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-gradient-to-br from-forest via-teal to-indigo p-6 text-white-soft flex flex-col justify-between shadow-lg">
              <span className="rounded-full bg-amber-500/20 border border-amber-400/30 px-3 py-1 text-[11px] uppercase tracking-wider text-amber-200 self-start font-medium">
                Verified Clinician Profile
              </span>
              <div>
                <div className="h-16 w-16 rounded-full bg-white-soft/10 backdrop-blur-md flex items-center justify-center text-[24px] font-bold text-white-soft mb-3">
                  {initials}
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
                  {person.city}
                </span>
                <span className="rounded-full bg-forest/8 px-3 py-1 text-[12px] font-medium text-forest">
                  {person.rating} / 5.0
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
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest/8 text-forest text-[11px] font-bold">
                    •
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
      </div>
    </main>
  );
}
