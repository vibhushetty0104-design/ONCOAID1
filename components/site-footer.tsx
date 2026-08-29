import Link from "next/link";
import { navLinks, site } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="bg-[#071318] text-white-soft">
      <div className="container-page grid gap-12 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="text-[17px] font-bold tracking-[0.18em] text-cyan">{site.name}</p>
          <p className="mt-2 text-[14px] text-white-soft/80 font-serif italic">Cancer care, clarified for India.</p>
          <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-white-soft/60">
            ONCO-AID is a clinical intelligence & educational support platform. We empower patients and families with clear pathology insights, specialized doctor matching, and appointment readiness.
          </p>
        </div>

        <div>
          <h4 className="text-[12px] font-semibold tracking-[0.18em] uppercase text-cyan mb-4">Platform</h4>
          <nav className="flex flex-col gap-2.5 text-[14px] text-white-soft/80" aria-label="Footer platform">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-cyan">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h4 className="text-[12px] font-semibold tracking-[0.18em] uppercase text-cyan mb-4">Key Tools</h4>
          <nav className="flex flex-col gap-2.5 text-[14px] text-white-soft/80" aria-label="Footer tools">
            <Link href="/reports" className="transition-colors hover:text-cyan">
              📄 Pathology Report Decoder
            </Link>
            <Link href="/ai" className="transition-colors hover:text-cyan">
              🤖 ONCO-AID AI Assistant
            </Link>
            <Link href="/specialists" className="transition-colors hover:text-cyan">
              🏥 Indian Specialist Directory
            </Link>
            <Link href="/appointments" className="transition-colors hover:text-cyan">
              📅 Book Consultation Request
            </Link>
            <Link href="/resources" className="transition-colors hover:text-cyan">
              📚 Patient Journal & Guides
            </Link>
          </nav>
        </div>

        <div>
          <h4 className="text-[12px] font-semibold tracking-[0.18em] uppercase text-cyan mb-4">Clinical Safety</h4>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-[12px] leading-relaxed text-amber-200">
            <p className="font-semibold mb-1">⚠️ Educational Notice</p>
            ONCO-AID does not provide diagnostic services, medical prescriptions, or replace direct clinician evaluation. For urgent medical concerns, contact your nearest hospital or emergency helpline.
          </div>
          <p className="mt-3 text-[12px] text-white-soft/50">
            National Emergency Helpline: <strong className="text-white-soft">112</strong>
          </p>
        </div>
      </div>

      <div className="container-page flex flex-col gap-3 border-t border-white-soft/10 py-6 text-[13px] text-white-soft/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {site.name}. All rights reserved.</p>
        <p>Built with restraint, clinical safety, and precision for Indian healthcare.</p>
      </div>
    </footer>
  );
}
