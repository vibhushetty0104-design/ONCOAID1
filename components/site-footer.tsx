import Link from "next/link";
import { navLinks, site } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="bg-[#071318] text-white-soft">
      <div className="container-page grid gap-12 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="text-[18px] font-bold tracking-[0.16em] text-cyan">{site.name}</p>
          <p className="mt-2 text-[15px] text-white-soft/90 font-serif italic">Cancer care, clarified for India.</p>
          <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-white-soft/70">
            A patient-first healthcare platform helping people understand cancer, prepare for care and find the right specialists.
          </p>
        </div>

        <div>
          <h4 className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-cyan mb-4">Platform</h4>
          <nav className="flex flex-col gap-2.5 text-[14px] text-white-soft/80" aria-label="Footer platform navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-cyan">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h4 className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-cyan mb-4">Key Tools</h4>
          <nav className="flex flex-col gap-2.5 text-[14px] text-white-soft/80" aria-label="Footer tools navigation">
            <Link href="/reports" className="transition-colors hover:text-cyan">
              Pathology Report Decoder
            </Link>
            <Link href="/ai" className="transition-colors hover:text-cyan">
              Clinical Assistant
            </Link>
            <Link href="/specialists" className="transition-colors hover:text-cyan">
              Specialist Directory
            </Link>
            <Link href="/appointments" className="transition-colors hover:text-cyan">
              Consultations & Scheduling
            </Link>
            <Link href="/resources" className="transition-colors hover:text-cyan">
              Patient Guides & Resources
            </Link>
          </nav>
        </div>

        <div>
          <h4 className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-cyan mb-4">Clinical Safety</h4>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-[12.5px] leading-relaxed text-amber-100">
            <p className="font-semibold mb-1 text-amber-200">Notice: Educational Information Only</p>
            ONCO-AID does not provide diagnostic services, medical prescriptions, or replace direct clinician evaluation. For urgent medical concerns, contact your nearest hospital or emergency helpline.
          </div>
          <p className="mt-3 text-[12.5px] text-white-soft/60">
            National Emergency Helpline: <strong className="text-white-soft font-semibold">112</strong>
          </p>
        </div>
      </div>

      <div className="container-page flex flex-col gap-3 border-t border-white-soft/10 py-6 text-[13px] text-white-soft/60 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {site.name}. All rights reserved.</p>
        <p>Built with restraint, clinical safety, and precision for Indian healthcare.</p>
      </div>
    </footer>
  );
}
