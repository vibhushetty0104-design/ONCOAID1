"use client";

import { useState } from "react";
import Link from "next/link";
import { demoPatient, demoAppointments, demoSavedReports } from "@/lib/demo-patient";
import { specialists } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function PatientProfilePage() {
  const [city, setCity] = useState(demoPatient.city);
  const [emergencyContact, setEmergencyContact] = useState(demoPatient.emergencyContact);
  const [savedSuccess, setSavedSuccess] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  }

  const savedSpecialistObj = specialists[0]; // Dr. Ananya Rao

  return (
    <main id="main" className="container-page pb-24 pt-28 md:pt-32">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-forest/10 pb-6">
        <div>
          <span className="label text-teal">Patient Profile & Settings</span>
          <h1 className="editorial-serif mt-2 text-[clamp(2.4rem,5vw,4.2rem)] text-forest leading-none">
            {demoPatient.name}
          </h1>
          <p className="mt-2 text-[15px] text-blue-gray">
            Manage your personal clinical record, preferred cancer hospital, and saved care team.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-full border border-forest/15 bg-white-soft px-5 py-2.5 text-[14px] font-medium text-forest hover:bg-ivory transition-colors"
          >
            ← Back to Dashboard
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-forest/8 px-4 py-2.5 text-[13px] font-semibold text-forest hover:bg-forest/15 transition-colors"
          >
            Switch Account / Logout
          </Link>
        </div>
      </div>

      {savedSuccess && (
        <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-500/30 p-4 text-[14px] text-emerald-800 font-medium animate-fadeIn">
          ✓ Patient profile preferences saved successfully.
        </div>
      )}

      {/* Main Grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left Column: Personal Info & Editable Settings */}
        <div className="space-y-8">
          {/* Clinical Demographics Card */}
          <div className="rounded-[32px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)] md:p-8">
            <span className="label text-coral">Clinical Demographics</span>
            <h2 className="editorial-serif mt-1 text-[2rem] text-forest">Personal Information</h2>

            <div className="mt-6 grid gap-4 rounded-2xl bg-ivory p-5 text-[14px] sm:grid-cols-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-warm-gray block">Full Name</span>
                <p className="font-semibold text-forest mt-0.5">{demoPatient.name}</p>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-warm-gray block">Age & Gender</span>
                <p className="font-semibold text-forest mt-0.5">{demoPatient.age} years · {demoPatient.gender}</p>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-warm-gray block">Blood Group</span>
                <p className="font-semibold text-forest mt-0.5">{demoPatient.bloodGroup}</p>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-warm-gray block">Digital Health ID</span>
                <p className="font-semibold text-forest mt-0.5">{demoPatient.healthId}</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-forest/5 p-4 border border-forest/10 text-[14px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal block">Documented Diagnosis</span>
              <p className="font-semibold text-forest mt-1">{demoPatient.diagnosisSummary}</p>
              <p className="text-[12px] text-warm-gray mt-1">Current Milestone: Stage 03 (Pathology & Diagnosis)</p>
            </div>
          </div>

          {/* Preferences & Contact Form */}
          <form onSubmit={handleSave} className="rounded-[32px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)] md:p-8">
            <span className="label text-teal">Care Contact & Location</span>
            <h2 className="editorial-serif mt-1 text-[2rem] text-forest">Preferences</h2>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-forest mb-1.5">
                  Preferred Healthcare City
                </label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-forest/15 bg-ivory px-4 text-[14px] text-forest outline-none focus:border-cobalt"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-forest mb-1.5">
                  Primary Hospital Affiliation
                </label>
                <input
                  defaultValue={demoPatient.primaryHospital}
                  className="h-12 w-full rounded-2xl border border-forest/15 bg-ivory px-4 text-[14px] text-forest outline-none focus:border-cobalt"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-forest mb-1.5">
                  Emergency Caregiver Contact
                </label>
                <input
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-forest/15 bg-ivory px-4 text-[14px] text-forest outline-none focus:border-cobalt"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="mt-6">
              Save Preferences
            </Button>
          </form>
        </div>

        {/* Right Column: Saved Specialists & Appointment History */}
        <div className="space-y-6">
          {/* Saved Specialist Card */}
          <div className="rounded-[28px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <span className="label text-teal">Primary Care Team</span>
              <Link href="/specialists" className="text-[12px] font-semibold text-teal hover:underline">
                Change Specialist
              </Link>
            </div>

            <h3 className="editorial-serif mt-2 text-[1.8rem] text-forest">
              {savedSpecialistObj.name}
            </h3>
            <p className="text-[13.5px] font-medium text-warm-gray">{savedSpecialistObj.role}</p>
            <p className="text-[13px] text-blue-gray mt-1">{savedSpecialistObj.hospital}</p>

            <div className="mt-4 flex flex-wrap gap-2 text-[12px]">
              <span className="rounded-full bg-forest/8 px-3 py-1 font-medium text-forest">
                {savedSpecialistObj.city}
              </span>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-medium text-emerald-800">
                Primary Oncologist
              </span>
            </div>

            <div className="mt-6 border-t border-forest/8 pt-4">
              <Link
                href={`/specialists/${savedSpecialistObj.id}`}
                className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-teal hover:underline"
              >
                <span>View Full Doctor Credentials & Biography</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Appointment History */}
          <div className="rounded-[28px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)]">
            <span className="label text-warm-gray">Consultation History</span>
            <h3 className="editorial-serif mt-1 text-[1.8rem] text-forest">All Visits</h3>

            <div className="mt-4 space-y-3">
              {demoAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="rounded-2xl bg-ivory p-4 text-[13px] border border-forest/5 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-forest text-[14px]">{apt.doctorName}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        apt.status === "Confirmed"
                          ? "bg-emerald-500/15 text-emerald-800"
                          : "bg-forest/10 text-forest"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-warm-gray">{apt.specialty} · {apt.hospital}</p>
                  <p className="text-forest font-medium pt-1">📅 {apt.date} at {apt.time}</p>
                </div>
              ))}
            </div>

            <Button href="/appointments" variant="coral" className="mt-5 w-full justify-center text-[13.5px]">
              Request New Consultation
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
