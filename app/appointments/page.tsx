"use client";

import { useState } from "react";
import Link from "next/link";
import { AppointmentStepper } from "@/components/appointment-stepper";
import { PageIntro } from "@/components/page-intro";
import { demoAppointments, demoPatient } from "@/lib/demo-patient";
import { Button } from "@/components/ui/button";

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "new" | "past">("upcoming");

  const upcomingApts = demoAppointments.filter((a) => a.status === "Confirmed");
  const pastApts = demoAppointments.filter((a) => a.status === "Completed");

  return (
    <main id="main" className="container-page pb-24 pt-8">
      <PageIntro
        eyebrow="Consultations & Scheduling"
        title="Manage Your Oncology Appointments"
      >
        Track confirmed clinic visits, prepare personalized question lists, and request second opinion consultations with leading Indian specialists.
      </PageIntro>

      {/* Tabs Switcher */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-forest/10 pb-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("upcoming")}
            className={`rounded-full px-5 py-2 text-[14px] font-semibold transition-all ${
              activeTab === "upcoming"
                ? "bg-forest text-white-soft shadow-sm"
                : "bg-white-soft text-forest hover:bg-ivory"
            }`}
          >
            Upcoming Visits ({upcomingApts.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("new")}
            className={`rounded-full px-5 py-2 text-[14px] font-semibold transition-all ${
              activeTab === "new"
                ? "bg-forest text-white-soft shadow-sm"
                : "bg-white-soft text-forest hover:bg-ivory"
            }`}
          >
            + Schedule New Consultation
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("past")}
            className={`rounded-full px-5 py-2 text-[14px] font-semibold transition-all ${
              activeTab === "past"
                ? "bg-forest text-white-soft shadow-sm"
                : "bg-white-soft text-forest hover:bg-ivory"
            }`}
          >
            Past History ({pastApts.length})
          </button>
        </div>

        <Link
          href="/dashboard"
          className="text-[13.5px] font-semibold text-teal hover:underline"
        >
          ← Return to Patient Dashboard
        </Link>
      </div>

      {/* Tab 1: Upcoming Appointments */}
      {activeTab === "upcoming" && (
        <div className="mt-8 space-y-6">
          {upcomingApts.map((apt) => (
            <div
              key={apt.id}
              className="rounded-[32px] border border-forest/12 bg-white-soft p-6 shadow-[var(--shadow-card)] md:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-forest/10 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="label text-teal">{apt.specialty}</span>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                      {apt.status}
                    </span>
                  </div>
                  <h2 className="editorial-serif mt-2 text-[2.2rem] text-forest">
                    {apt.doctorName}
                  </h2>
                  <p className="text-[14px] text-warm-gray mt-0.5">{apt.hospital}, {apt.city}</p>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-warm-gray block">
                    Mode & Room
                  </span>
                  <p className="font-semibold text-forest mt-0.5">{apt.mode}</p>
                  <p className="text-[12px] text-blue-gray">{apt.room}</p>
                </div>
              </div>

              {/* Consultation Details Matrix */}
              <div className="mt-6 grid gap-4 rounded-2xl bg-ivory p-5 text-[14px] sm:grid-cols-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-warm-gray block">Date & Time</span>
                  <p className="font-semibold text-forest mt-0.5 text-[15px]">{apt.date}</p>
                  <p className="text-blue-gray text-[13px]">{apt.time}</p>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-warm-gray block">Patient Record</span>
                  <p className="font-semibold text-forest mt-0.5 text-[15px]">{demoPatient.name}</p>
                  <p className="text-blue-gray text-[13px]">ABHA: {demoPatient.healthId.split(" ")[1]}</p>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-warm-gray block">Consultation Fee</span>
                  <p className="font-semibold text-forest mt-0.5 text-[15px]">{apt.fee}</p>
                  <p className="text-emerald-700 text-[12px] font-medium">Cashless TPA Approved</p>
                </div>
              </div>

              {/* Prep Instructions */}
              <div className="mt-5 rounded-2xl bg-forest/5 p-4 border border-forest/10 text-[13.5px]">
                <strong className="text-forest">Visit Preparation Checklist:</strong>
                <p className="text-ink/85 mt-1">{apt.prepNotes}</p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-3">
                  <Button href="/ai?task=appointment" variant="coral" className="text-[14px]">
                    Prepare Questions for Visit →
                  </Button>
                  <Button href="/reports" variant="ghost" className="text-forest text-[14px]">
                    View Decoded Reports
                  </Button>
                </div>

                <p className="text-[12px] text-warm-gray">
                  Hospital Helpdesk: +91 80 2502 4444
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Schedule New Consultation */}
      {activeTab === "new" && (
        <div className="mt-8">
          <AppointmentStepper />
        </div>
      )}

      {/* Tab 3: Past History */}
      {activeTab === "past" && (
        <div className="mt-8 space-y-4">
          {pastApts.map((apt) => (
            <div
              key={apt.id}
              className="rounded-[28px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-forest/8 pb-3">
                <div>
                  <span className="label text-warm-gray">{apt.specialty}</span>
                  <h3 className="editorial-serif mt-1 text-[1.8rem] text-forest">{apt.doctorName}</h3>
                </div>
                <span className="rounded-full bg-forest/10 px-3 py-1 text-[11px] font-bold text-forest uppercase">
                  Completed on {apt.date}
                </span>
              </div>
              <p className="mt-3 text-[14px] text-blue-gray">
                Hospital: <strong className="text-forest">{apt.hospital}</strong> ({apt.city}) · {apt.prepNotes}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
