import { LoginForm } from "@/components/login-form";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Patient Sign In | ONCO-AID",
  description: "Secure patient and clinical navigation portal for oncology care.",
};

export default function LoginPage() {
  return (
    <main id="main" className="min-h-[92svh] flex items-center justify-center py-20 px-4 sm:px-6">
      <div className="container-page max-w-5xl grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        {/* Left Side: Brand Story & Reassurance */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white-soft px-3.5 py-1 text-[12px] font-semibold text-teal uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Patient & Caregiver Portal
          </div>

          <h1 className="editorial-serif text-[clamp(2.5rem,5.5vw,4.6rem)] text-forest leading-[1.05]">
            A calmer place for your care journey.
          </h1>

          <p className="text-[17px] leading-relaxed text-blue-gray max-w-lg">
            Sign in to track your 8-stage care milestones, review decoded pathology reports, manage hospital consultations, and access personalized oncologist briefings.
          </p>

          <div className="grid gap-3 pt-2 text-[14px] text-ink/85">
            <div className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint text-forest font-bold text-[11px]">✓</span>
              <span>Encrypted pathology & biopsy report storage</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint text-forest font-bold text-[11px]">✓</span>
              <span>Step-by-step milestone guidance between visits</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint text-forest font-bold text-[11px]">✓</span>
              <span>Direct access to Indian specialist directory & booking</span>
            </div>
          </div>

          <div className="pt-4 text-[13px] text-warm-gray">
            <Link href="/" className="text-teal font-medium hover:underline">
              ← Return to public website
            </Link>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="flex justify-center">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
