"use client";

import Link from "next/link";
import {
  demoPatient,
  demoAppointments,
  demoSavedReports,
  demoSavedResources,
  demoNotifications,
  patientJourneyStages,
} from "@/lib/demo-patient";
import { Button } from "@/components/ui/button";

export default function PatientDashboardPage() {
  const nextAppointment = demoAppointments[0];
  const currentStage = patientJourneyStages[2]; // Stage 03

  return (
    <main id="main" className="container-page pb-24 pt-28 md:pt-32">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-forest/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="label text-teal">Patient Command Center</span>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
              Active Patient Record
            </span>
          </div>
          <h1 className="editorial-serif mt-2 text-[clamp(2.4rem,5vw,4.2rem)] text-forest leading-none">
            Good morning, {demoPatient.name.split(" ")[0]}
          </h1>
          <p className="mt-2 text-[16px] text-blue-gray">
            Here is where things stand with your care journey today.
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/dashboard/journey"
            className="rounded-full border border-forest/15 bg-white-soft px-4 py-2 text-[13px] font-medium text-forest hover:bg-ivory transition-colors"
          >
            Full Journey Map →
          </Link>
          <Link
            href="/appointments"
            className="rounded-full border border-forest/15 bg-white-soft px-4 py-2 text-[13px] font-medium text-forest hover:bg-ivory transition-colors"
          >
            My Appointments
          </Link>
          <Link
            href="/patient"
            className="rounded-full bg-forest px-4 py-2 text-[13px] font-medium text-white-soft hover:bg-forest-mid transition-colors"
          >
            Patient Profile
          </Link>
        </div>
      </div>

      {/* Grid Layout: Main Stream + Side Panel */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Left Column: Primary Clinical Stream */}
        <div className="space-y-8">
          {/* SECTION A: CURRENT CARE JOURNEY STATUS */}
          <div className="rounded-[32px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)] md:p-8">
            <div className="flex items-center justify-between">
              <span className="label text-coral">Where You Are Today</span>
              <span className="text-[12px] font-semibold text-warm-gray">Stage 03 of 08</span>
            </div>

            <div className="mt-3 flex flex-wrap items-baseline gap-3">
              <h2 className="editorial-serif text-[2.2rem] text-forest">
                {currentStage.title}
              </h2>
              <span className="rounded-full bg-coral/10 px-3 py-1 text-[12px] font-semibold text-coral-deep">
                Active Milestone
              </span>
            </div>

            <p className="mt-2 text-[15px] leading-relaxed text-ink/80">
              {currentStage.description}
            </p>

            {/* Visual Mini Stepper */}
            <div className="mt-6 border-t border-forest/8 pt-5">
              <div className="grid grid-cols-4 gap-2 text-center text-[12px]">
                <div className="rounded-xl bg-emerald-50 p-2.5 border border-emerald-500/20 text-emerald-900">
                  <span className="font-bold block">01. Consult</span>
                  <p className="text-[11px] text-emerald-800 font-semibold">Done</p>
                </div>
                <div className="rounded-xl bg-emerald-50 p-2.5 border border-emerald-500/20 text-emerald-900">
                  <span className="font-bold block">02. Biopsy</span>
                  <p className="text-[11px] text-emerald-800 font-semibold">Done</p>
                </div>
                <div className="rounded-xl bg-forest text-white-soft p-2.5 shadow-sm">
                  <span className="font-bold block">03. Pathology</span>
                  <p className="text-[11px] text-mint font-semibold">Current</p>
                </div>
                <div className="rounded-xl bg-ivory p-2.5 border border-forest/8 text-forest/70">
                  <span className="font-medium block">04. Staging</span>
                  <p className="text-[11px] text-warm-gray font-semibold">Next</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between text-[13px]">
              <span className="text-blue-gray">Pathology subtyping: ER+ (90%), HER2- (1+)</span>
              <Link href="/dashboard/journey" className="font-semibold text-teal hover:underline">
                Explore All 8 Milestones →
              </Link>
            </div>
          </div>

          {/* SECTION B: IMMEDIATE NEXT STEP */}
          <div className="relative overflow-hidden rounded-[32px] border-2 border-forest bg-[#0a2321] p-6 text-white-soft shadow-xl md:p-8">
            <div className="flex items-center justify-between">
              <span className="label text-mint">Your Primary Next Step</span>
              <span className="rounded-full bg-coral px-3 py-0.5 text-[11px] font-bold text-white-soft uppercase tracking-wider">
                Priority
              </span>
            </div>

            <h3 className="editorial-serif mt-3 text-[2.2rem] text-white-soft leading-tight">
              Prepare Questions for Dr. Ananya Rao
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white-soft/85 max-w-xl">
              Your consultation at Manipal Hospital is in 2 days. Review your ER/PR pathology breakdown and generate your personalized doctor checklist before entering the clinic.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button href="/ai?task=appointment" variant="coral" className="px-6 py-3 text-[14px]">
                Generate Doctor Checklist with AI →
              </Button>
              <Button href="/reports" variant="ghost" className="text-white-soft text-[14px]">
                Review Decoded Biopsy
              </Button>
            </div>
          </div>

          {/* SECTION C: UPCOMING APPOINTMENT CARD */}
          <div className="rounded-[32px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)] md:p-8">
            <div className="flex items-center justify-between border-b border-forest/10 pb-4">
              <div>
                <span className="label text-teal">Upcoming Consultation</span>
                <h3 className="editorial-serif mt-1 text-[1.8rem] text-forest">
                  {nextAppointment.doctorName}
                </h3>
                <p className="text-[13.5px] font-medium text-warm-gray">{nextAppointment.specialty}</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[12px] font-semibold text-emerald-800">
                {nextAppointment.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 rounded-2xl bg-ivory p-4 text-[14px] sm:grid-cols-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-warm-gray block">Date & Time</span>
                <p className="font-semibold text-forest mt-0.5">{nextAppointment.date} at {nextAppointment.time}</p>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-warm-gray block">Hospital & Location</span>
                <p className="font-semibold text-forest mt-0.5">{nextAppointment.hospital}</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-forest/10 bg-forest/5 p-3.5 text-[13px] text-ink/80">
              <strong className="text-forest">Doctor Note:</strong> {nextAppointment.prepNotes}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-2">
              <Link href="/appointments" className="text-[13.5px] font-semibold text-teal hover:underline">
                View All Appointments & History ({demoAppointments.length}) →
              </Link>
              <Button href="/ai?task=appointment" variant="coral" className="text-[13.5px]">
                Prepare for this Visit
              </Button>
            </div>
          </div>

          {/* SECTION D: RECENT CLINICAL ACTIVITY */}
          <div className="rounded-[32px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)]">
            <span className="label text-warm-gray">Activity Stream</span>
            <h3 className="editorial-serif mt-1 text-[1.8rem] text-forest">Recent Care Actions</h3>

            <div className="mt-4 divide-y divide-forest/8">
              <div className="py-3 flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint/60 text-forest font-bold text-[11px]">01</span>
                <div>
                  <p className="text-[14px] font-semibold text-forest">Left Breast Tissue Core Biopsy report decoded</p>
                  <p className="text-[12px] text-warm-gray">14 Aug 2026 · Biomarkers identified as ER+ (90%), PR+ (80%), HER2- (1+)</p>
                </div>
              </div>
              <div className="py-3 flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coral/20 text-coral font-bold text-[11px]">02</span>
                <div>
                  <p className="text-[14px] font-semibold text-forest">Consultation scheduled with Dr. Ananya Rao</p>
                  <p className="text-[12px] text-warm-gray">16 Aug 2026 · Confirmed for 28 Aug at Manipal Hospital, Bengaluru</p>
                </div>
              </div>
              <div className="py-3 flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20 text-teal font-bold text-[11px]">03</span>
                <div>
                  <p className="text-[14px] font-semibold text-forest">Prepared 3 questions for upcoming medical oncology visit</p>
                  <p className="text-[12px] text-warm-gray">Saved to personal appointment briefing sheet</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Actions & Saved Records Locker */}
        <div className="space-y-6">
          {/* SECTION E: QUICK TASK ACTIONS */}
          <div className="rounded-[28px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)]">
            <span className="label text-teal">Healthcare Actions</span>
            <h3 className="editorial-serif mt-1 text-[1.6rem] text-forest">Quick Tools</h3>

            <div className="mt-4 grid gap-2.5">
              <Link
                href="/reports"
                className="group flex items-center justify-between rounded-2xl bg-ivory p-3.5 text-[14px] font-medium text-forest hover:bg-mint/40 transition-colors border border-forest/5"
              >
                <span>Understand a Report</span>
                <span className="text-teal group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
              <Link
                href="/ai?task=appointment"
                className="group flex items-center justify-between rounded-2xl bg-ivory p-3.5 text-[14px] font-medium text-forest hover:bg-mint/40 transition-colors border border-forest/5"
              >
                <span>Prepare for Appointment</span>
                <span className="text-teal group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
              <Link
                href="/ai"
                className="group flex items-center justify-between rounded-2xl bg-ivory p-3.5 text-[14px] font-medium text-forest hover:bg-mint/40 transition-colors border border-forest/5"
              >
                <span>Talk to ONCO-AID</span>
                <span className="text-teal group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
              <Link
                href="/specialists"
                className="group flex items-center justify-between rounded-2xl bg-ivory p-3.5 text-[14px] font-medium text-forest hover:bg-mint/40 transition-colors border border-forest/5"
              >
                <span>Find Specialists</span>
                <span className="text-teal group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* SECTION F: SAVED REPORTS & RECORDS */}
          <div className="rounded-[28px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <span className="label text-warm-gray">Medical Documents</span>
              <Link href="/reports" className="text-[12px] font-semibold text-teal hover:underline">
                Upload New
              </Link>
            </div>
            <h3 className="editorial-serif mt-1 text-[1.6rem] text-forest">Saved Reports</h3>

            <div className="mt-4 space-y-3">
              {demoSavedReports.map((rep) => (
                <div
                  key={rep.id}
                  className="rounded-2xl bg-ivory p-4 text-[13px] border border-forest/5 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-forest text-[13.5px] line-clamp-1">{rep.title}</p>
                    <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                      Decoded
                    </span>
                  </div>
                  <p className="text-warm-gray">{rep.facility} · {rep.date}</p>
                  <p className="text-ink/80 text-[12px] pt-1 font-medium">{rep.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION G: NOTIFICATIONS & ALERTS */}
          <div className="rounded-[28px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)]">
            <span className="label text-warm-gray">Care Alerts</span>
            <h3 className="editorial-serif mt-1 text-[1.6rem] text-forest">Notifications</h3>

            <div className="mt-4 space-y-3">
              {demoNotifications.map((notif) => (
                <Link
                  key={notif.id}
                  href={notif.actionHref}
                  className="block rounded-2xl bg-ivory p-3.5 text-[13px] border border-forest/5 hover:border-forest/20 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-forest">{notif.title}</p>
                    <span className="text-[11px] text-warm-gray">{notif.date}</span>
                  </div>
                  <p className="mt-1 text-blue-gray text-[12.5px] leading-relaxed">{notif.message}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* SAVED ARTICLES */}
          <div className="rounded-[28px] bg-forest p-6 text-white-soft shadow-lg">
            <span className="label text-mint">Saved Reading</span>
            <h4 className="editorial-serif mt-1 text-[1.6rem]">Patient Guides</h4>
            <div className="mt-4 space-y-2">
              {demoSavedResources.map((res) => (
                <Link
                  key={res.slug}
                  href={`/resources/${res.slug}`}
                  className="block rounded-xl bg-white-soft/8 p-3 text-[13px] text-white-soft hover:bg-white-soft/15 transition-colors"
                >
                  <p className="font-medium text-white-soft line-clamp-1">{res.title}</p>
                  <span className="text-[11px] text-mint">{res.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
