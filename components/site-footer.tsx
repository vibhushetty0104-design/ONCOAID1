import Link from "next/link";
import { site } from "@/lib/utils";

const footerLinks = [
  { label: "Find Care", href: "/specialists" },
  { label: "Cancer Knowledge", href: "/cancer-types" },
  { label: "Patient Journey", href: "/journey" },
  { label: "Report Decoder", href: "/reports" },
  { label: "AI Companion", href: "/ai" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Care", href: "/terms" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-forest/10 bg-forest text-white-soft py-16">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Brand & Purpose */}
          <div className="max-w-md">
            <span className="text-[15px] font-bold tracking-[0.2em] text-white-soft">
              ONCO—AID
            </span>
            <p className="mt-2 text-[15px] font-serif italic text-white-soft/90">
              Cancer care, clarified for India.
            </p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-white-soft/65">
              A clinical decision-support and educational platform helping patients and families understand diagnoses, find verified specialists, and prepare for treatment.
            </p>
          </div>

          {/* Quiet Linear Links */}
          <div>
            <nav
              aria-label="Footer Navigation"
              className="flex flex-wrap gap-x-6 gap-y-3 text-[13.5px] text-white-soft/80"
            >
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-white-soft hover:underline underline-offset-4"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 rounded border border-white-soft/10 bg-white-soft/5 p-3.5 text-[12px] leading-relaxed text-white-soft/60 max-w-lg">
              <strong className="text-white-soft/80 font-medium">Notice: </strong>
              ONCO-AID provides educational guidance only. It does not diagnose, prescribe, or replace consultation with your oncologist. For emergencies, contact your treating hospital or dial 112.
            </div>
          </div>
        </div>

        {/* Quiet Bottom Line */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-white-soft/10 pt-6 text-[12px] text-white-soft/45">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p>Bengaluru, India · DPDP Aligned · ICMR / NCCN Grounded</p>
        </div>
      </div>
    </footer>
  );
}
