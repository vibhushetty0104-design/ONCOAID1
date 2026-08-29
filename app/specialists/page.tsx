"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { indianCities, specialists, specialties } from "@/lib/data";
import { Button } from "@/components/ui/button";

const cancerFilterOptions = [
  "All Cancers",
  "Breast Cancers",
  "Gastrointestinal & Colorectal",
  "Head & Neck Cancers",
  "Blood Cancers & Lymphoma",
  "Lung Cancer",
  "Gynecologic Cancers",
  "Brain & Neuro Tumors",
  "Prostate & Urologic",
];

export default function SpecialistsPage() {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedCancer, setSelectedCancer] = useState("All Cancers");

  const filteredSpecialists = useMemo(() => {
    return specialists.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.hospital.toLowerCase().includes(search.toLowerCase()) ||
        doc.focus.toLowerCase().includes(search.toLowerCase()) ||
        doc.city.toLowerCase().includes(search.toLowerCase());
      
      const matchesCity = selectedCity === "All Cities" || doc.city === selectedCity;
      const matchesSpecialty =
        selectedSpecialty === "All Specialties" || doc.role === selectedSpecialty;

      const matchesCancer =
        selectedCancer === "All Cancers" ||
        (selectedCancer === "Breast Cancers" && doc.focus.toLowerCase().includes("breast")) ||
        (selectedCancer === "Gastrointestinal & Colorectal" && (doc.focus.toLowerCase().includes("gastrointestinal") || doc.focus.toLowerCase().includes("colorectal"))) ||
        (selectedCancer === "Head & Neck Cancers" && doc.focus.toLowerCase().includes("head")) ||
        (selectedCancer === "Blood Cancers & Lymphoma" && (doc.focus.toLowerCase().includes("leukemia") || doc.focus.toLowerCase().includes("lymphoma"))) ||
        (selectedCancer === "Lung Cancer" && doc.focus.toLowerCase().includes("lung")) ||
        (selectedCancer === "Gynecologic Cancers" && (doc.focus.toLowerCase().includes("ovarian") || doc.focus.toLowerCase().includes("cervical"))) ||
        (selectedCancer === "Brain & Neuro Tumors" && (doc.focus.toLowerCase().includes("brain") || doc.focus.toLowerCase().includes("glioma") || doc.focus.toLowerCase().includes("neuro"))) ||
        (selectedCancer === "Prostate & Urologic" && (doc.focus.toLowerCase().includes("prostate") || doc.focus.toLowerCase().includes("bladder")));

      return matchesSearch && matchesCity && matchesSpecialty && matchesCancer;
    });
  }, [search, selectedCity, selectedSpecialty, selectedCancer]);

  return (
    <main id="main" className="container-page pb-24 pt-8">
      <PageIntro
        eyebrow="Indian Specialist Directory"
        title="Find the Oncologists Behind Your Care"
      >
        Filter by cancer type, specialty, and hospital location across Bengaluru, Mumbai, New Delhi, Chennai, Hyderabad, and Pune.
      </PageIntro>

      {/* Prominent Clinical Safety Notice */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-4 text-[13px] text-amber-900">
        <span className="text-[16px]">⚠️</span>
        <div>
          <strong className="font-semibold">Demo Clinician Profiles:</strong> Profiles displayed below contain synthetic demo records designed for platform development and evaluation. They do not constitute live clinical appointments or diagnostic commitments.
        </div>
      </div>

      {/* 4-Field Filter Matrix */}
      <div className="mt-8 rounded-[28px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Search Input */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-warm-gray mb-1.5">
              Search Clinician / Hospital
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g. Dr. Rao, Manipal..."
              className="h-12 w-full rounded-2xl border border-forest/15 bg-ivory px-3.5 text-[14px] text-forest outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/20"
            />
          </div>

          {/* Cancer Type Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-warm-gray mb-1.5">
              Filter by Cancer Type
            </label>
            <select
              value={selectedCancer}
              onChange={(e) => setSelectedCancer(e.target.value)}
              className="h-12 w-full rounded-2xl border border-forest/15 bg-ivory px-3.5 text-[14px] text-forest outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/20"
            >
              {cancerFilterOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Specialty Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-warm-gray mb-1.5">
              Filter by Specialty
            </label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="h-12 w-full rounded-2xl border border-forest/15 bg-ivory px-3.5 text-[14px] text-forest outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/20"
            >
              <option value="All Specialties">All Specialties</option>
              {specialties.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-warm-gray mb-1.5">
              Filter by City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="h-12 w-full rounded-2xl border border-forest/15 bg-ivory px-3.5 text-[14px] text-forest outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/20"
            >
              {indianCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="mt-8 flex items-center justify-between text-[14px] text-blue-gray">
        <p>
          Showing <span className="font-semibold text-forest">{filteredSpecialists.length}</span> specialists
        </p>
        {search || selectedCity !== "All Cities" || selectedSpecialty !== "All Specialties" || selectedCancer !== "All Cancers" ? (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedCity("All Cities");
              setSelectedSpecialty("All Specialties");
              setSelectedCancer("All Cancers");
            }}
            className="text-cobalt hover:underline text-[13px]"
          >
            Reset all filters
          </button>
        ) : null}
      </div>

      {/* Specialist Cards Grid */}
      <div className="mt-6 space-y-6">
        {filteredSpecialists.length > 0 ? (
          filteredSpecialists.map((person) => (
            <div
              key={person.id}
              className="group relative overflow-hidden rounded-[28px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)] transition-all duration-320 hover:border-cobalt/40 hover:shadow-lg md:p-8"
            >
              <div className="grid gap-6 md:grid-cols-[1fr_260px] items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-forest/8 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-forest">
                      {person.role}
                    </span>
                    <span className="rounded-full bg-cobalt/10 px-3 py-1 text-[11px] font-semibold text-cobalt">
                      📍 {person.city}
                    </span>
                    <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-800">
                      Demo Profile
                    </span>
                  </div>

                  <h2 className="editorial-serif mt-3 text-[2.2rem] text-forest group-hover:text-cobalt transition-colors">
                    {person.name}
                  </h2>
                  <p className="text-[14px] font-medium text-warm-gray mt-0.5">{person.degree}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-[14px] text-blue-gray">
                    <p>🏥 <strong className="text-forest">{person.hospital}</strong></p>
                    <p>⏳ {person.experience}</p>
                    <p>💬 Speaks: {person.languages.join(", ")}</p>
                  </div>

                  <p className="mt-4 text-[14.5px] leading-relaxed text-ink/80 max-w-2xl">
                    <strong className="text-forest">Focus & Specialization:</strong> {person.focus}
                  </p>
                </div>

                {/* Right Action Box */}
                <div className="flex flex-col justify-between rounded-2xl bg-ivory p-5 border border-forest/5 text-center">
                  <div>
                    <span className="text-[11px] text-warm-gray uppercase tracking-wider block font-semibold">
                      Est. Consultation
                    </span>
                    <p className="text-[22px] font-semibold text-forest my-1">{person.consultationFee}</p>
                    <p className="text-[12px] text-emerald-700 font-medium">In-person & Video options</p>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Link
                      href={`/specialists/${person.id}`}
                      className="block w-full rounded-full bg-forest px-4 py-2.5 text-[13.5px] font-medium text-white-soft transition-colors hover:bg-forest-mid text-center"
                    >
                      View Profile & Bio
                    </Link>
                    <Button href="/appointments" variant="coral" className="w-full justify-center py-2 text-[13.5px]">
                      Book Consultation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-[28px] border border-dashed border-forest/20 bg-ivory p-12 text-center">
            <h3 className="editorial-serif text-[2rem] text-forest">No clinicians matched your exact filters</h3>
            <p className="mt-2 text-blue-gray">Try broadening your cancer type, city, or specialty selection.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCity("All Cities");
                setSelectedSpecialty("All Specialties");
                setSelectedCancer("All Cancers");
              }}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-forest px-6 py-2.5 text-[14px] text-white-soft"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
