"use client";

import { useState } from "react";
import { indianCities, specialists, specialties } from "@/lib/data";
import { Button } from "@/components/ui/button";

const steps = ["Specialty", "City & Doctor", "Consultation Type", "Date & Time", "Patient Details", "Confirmation"] as const;

export function AppointmentStepper() {
  const [step, setStep] = useState(0);
  const [specialty, setSpecialty] = useState(specialties[0]);
  const [city, setCity] = useState("Bengaluru");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(specialists[0].id);
  const [mode, setMode] = useState("In-Person Consultation");
  const [date, setDate] = useState("2026-08-28");
  const [time, setTime] = useState("10:30 AM");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);

  const activeDoctor = specialists.find((d) => d.id === selectedDoctorId) || specialists[0];
  const progress = ((step + 1) / steps.length) * 100;

  const matchingDoctors = specialists.filter(
    (d) => (city === "All Cities" || d.city === city) && (specialty === "All Specialties" || d.role === specialty)
  );
  const availableDoctors = matchingDoctors.length > 0
    ? matchingDoctors
    : specialists.filter((d) => city === "All Cities" || d.city === city);

  function next() {
    if (step === steps.length - 1) {
      setDone(true);
      return;
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="overflow-hidden rounded-[32px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)] md:p-8">
        {/* Progress Bar */}
        <div className="h-1.5 overflow-hidden rounded-full bg-ivory">
          <div
            className="h-full bg-gradient-to-r from-forest via-teal to-cobalt transition-[width] duration-320 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 label text-warm-gray">
          Step {String(step + 1).padStart(2, "0")} of {steps.length} · <span className="text-forest font-semibold">{steps[step]}</span>
        </p>

        {done ? (
          <div className="py-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 text-[28px] mb-4">
              ✓
            </div>
            <span className="label text-emerald-700">Request Registered</span>
            <h2 className="editorial-serif mt-2 text-[2.6rem] text-forest">Consultation Request Prepared</h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-blue-gray">
              Your appointment request with <strong className="text-forest">{activeDoctor.name}</strong> at <strong className="text-forest">{activeDoctor.hospital}</strong> ({city}) has been summarized below.
            </p>
            <div className="mt-6 rounded-2xl bg-ivory p-5 border border-forest/10 text-[14px]">
              <p className="font-semibold text-forest">Appointment Details Summary:</p>
              <ul className="mt-2 space-y-1 text-ink/80">
                <li>• Doctor: {activeDoctor.name} ({activeDoctor.role})</li>
                <li>• Hospital: {activeDoctor.hospital}, {activeDoctor.city}</li>
                <li>• Mode: {mode}</li>
                <li>• Date & Time: {date} at {time}</li>
                <li>• Patient: {name || "Demographic Record"} ({phone || "+91 XXXXX XXXXX"})</li>
              </ul>
            </div>
            <p className="mt-4 text-[12px] text-warm-gray">
              Note: This is a demonstration preview flow for product evaluation.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/ai" variant="coral">Ask AI Visit Prep Questions</Button>
              <Button href="/reports" variant="ghost" className="text-forest">Upload Pathology Report</Button>
            </div>
          </div>
        ) : (
          <div className="mt-6 min-h-[260px]">
            {step === 0 ? (
              <Fieldset legend="Select Primary Oncology Specialty">
                <div className="grid gap-2 sm:grid-cols-2">
                  {specialties.map((item) => (
                    <Choice key={item} selected={specialty === item} onSelect={() => setSpecialty(item)}>
                      {item}
                    </Choice>
                  ))}
                </div>
              </Fieldset>
            ) : null}

            {step === 1 ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-semibold text-forest mb-1">Select City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="h-12 w-full rounded-2xl border border-forest/15 bg-ivory px-4 text-forest text-[14px] outline-none"
                  >
                    {indianCities.filter(c => c !== "All Cities").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <Fieldset legend="Select Specialist">
                  <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                    {availableDoctors.map((doc) => (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => setSelectedDoctorId(doc.id)}
                        className={`w-full rounded-2xl p-3.5 text-left transition-all ${
                          selectedDoctorId === doc.id
                            ? "bg-forest text-white-soft shadow-md"
                            : "bg-ivory text-forest hover:bg-mint/40"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-[15px]">{doc.name}</p>
                            <p className={`text-[12px] ${selectedDoctorId === doc.id ? "text-mint" : "text-warm-gray"}`}>
                              {doc.hospital} · {doc.city}
                            </p>
                          </div>
                          <span className={`text-[12px] font-medium px-2 py-0.5 rounded-full ${selectedDoctorId === doc.id ? "bg-white-soft/20 text-white-soft" : "bg-forest/10 text-forest"}`}>
                            {doc.consultationFee}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </Fieldset>
              </div>
            ) : null}

            {step === 2 ? (
              <Fieldset legend="Select Consultation Type">
                {["In-Person Hospital Visit", "Video Teleconsultation", "Second Opinion Case Review"].map((item) => (
                  <Choice key={item} selected={mode === item} onSelect={() => setMode(item)}>
                    {item}
                  </Choice>
                ))}
              </Fieldset>
            ) : null}

            {step === 3 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[14px] font-medium text-forest">Preferred Consultation Date</span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-2 h-12 w-full rounded-2xl bg-ivory border border-forest/15 px-4 text-forest outline-none"
                  />
                </label>
                <div>
                  <span className="text-[14px] font-medium text-forest mb-2 block">Preferred Time Slot</span>
                  <div className="grid grid-cols-2 gap-2">
                    {["09:30 AM", "11:30 AM", "02:30 PM", "04:30 PM"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={`h-11 rounded-xl text-[13px] font-medium transition-colors ${
                          time === t ? "bg-forest text-white-soft" : "bg-ivory text-forest hover:bg-mint/40"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {step === 4 ? (
              <div className="space-y-4">
                <label className="block">
                  <span className="text-[14px] font-medium text-forest">Patient Full Name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 h-12 w-full rounded-2xl bg-ivory border border-forest/15 px-4 text-forest outline-none"
                    placeholder="e.g. Anish Sharma"
                  />
                </label>
                <label className="block">
                  <span className="text-[14px] font-medium text-forest">Contact Phone Number</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 h-12 w-full rounded-2xl bg-ivory border border-forest/15 px-4 text-forest outline-none"
                    placeholder="+91 98765 43210"
                  />
                </label>
                <label className="block">
                  <span className="text-[14px] font-medium text-forest">Brief Reason / Diagnosis Notes</span>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1 w-full rounded-2xl bg-ivory border border-forest/15 p-3 text-[14px] text-forest outline-none"
                    placeholder="e.g. First consultation regarding breast core biopsy report..."
                  />
                </label>
              </div>
            ) : null}

            {step === 5 ? (
              <div>
                <h3 className="editorial-serif text-[1.8rem] text-forest">Review Consultation Summary</h3>
                <p className="mt-2 text-[14px] text-blue-gray">
                  Please review the details below before submitting your consultation request:
                </p>
                <div className="mt-4 rounded-2xl bg-ivory p-5 space-y-2 text-[14px] border border-forest/10">
                  <p><strong>Doctor:</strong> {activeDoctor.name} ({activeDoctor.role})</p>
                  <p><strong>Hospital:</strong> {activeDoctor.hospital}, {activeDoctor.city}</p>
                  <p><strong>Mode:</strong> {mode}</p>
                  <p><strong>Date & Time:</strong> {date} at {time}</p>
                  <p><strong>Patient Name:</strong> {name || "Not specified"}</p>
                  <p><strong>Phone:</strong> {phone || "Not specified"}</p>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {!done ? (
          <div className="mt-8 flex items-center justify-between border-t border-forest/10 pt-4">
            {step > 0 ? (
              <Button variant="ghost" className="text-forest" onClick={back}>
                ← Back
              </Button>
            ) : <div />}
            <Button onClick={next} variant="coral" className="px-6 py-2.5 text-[14px]">
              {step === steps.length - 1 ? "Submit Consultation Request" : "Continue →"}
            </Button>
          </div>
        ) : null}
      </div>

      {/* Right Summary Card */}
      <aside className="h-fit rounded-[32px] bg-forest p-6 text-white-soft shadow-xl">
        <span className="label text-mint">Consultation Summary</span>
        <h3 className="editorial-serif mt-2 text-[1.8rem] text-white-soft">Overview</h3>

        <div className="mt-6 space-y-3.5 text-[13.5px]">
          <Row label="Specialty" value={specialty} />
          <Row label="Doctor" value={activeDoctor.name} />
          <Row label="Hospital" value={activeDoctor.hospital} />
          <Row label="City" value={city} />
          <Row label="Mode" value={mode} />
          <Row label="Date" value={date} />
          <Row label="Time" value={time} />
          <Row label="Est. Fee" value={activeDoctor.consultationFee} />
        </div>
      </aside>
    </div>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="text-[18px] font-semibold text-forest mb-3">{legend}</legend>
      <div className="flex flex-col gap-2">{children}</div>
    </fieldset>
  );
}

function Choice({
  selected,
  onSelect,
  children,
}: {
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-2xl px-4 py-3 text-left text-[14.5px] font-medium transition-all ${
        selected
          ? "bg-forest text-white-soft shadow-md"
          : "bg-ivory text-forest hover:bg-mint/40"
      }`}
    >
      {children}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white-soft/10 pb-2.5">
      <dt className="text-white-soft/60">{label}</dt>
      <dd className="font-medium text-right text-white-soft">{value || "—"}</dd>
    </div>
  );
}
