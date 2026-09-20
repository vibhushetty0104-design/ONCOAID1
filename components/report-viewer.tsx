"use client";

import { useState } from "react";
import Link from "next/link";
import { reportTerms, sampleReports, SampleReportItem } from "@/lib/data";
import { Button } from "@/components/ui/button";

interface KeyFinding {
  label: string;
  value: string;
  category: "histology" | "biomarker" | "staging";
}

const reportKeyFindings: Record<string, KeyFinding[]> = {
  "rep-breast": [
    { label: "Histological Type", value: "Invasive Ductal Carcinoma, Grade 2", category: "histology" },
    { label: "Hormone Receptors", value: "ER+ (90%), PR+ (80%)", category: "biomarker" },
    { label: "HER2 Oncoprotein", value: "HER2 Negative (1+)", category: "biomarker" },
    { label: "Pathologic Staging", value: "pT2 N0 M0 (Tumor 2-5cm, Nodes negative)", category: "staging" },
  ],
  "rep-blood": [
    { label: "Hemoglobin", value: "13.4 g/dL (Normal)", category: "biomarker" },
    { label: "Neutrophil Count", value: "4,300 /uL (Robust)", category: "biomarker" },
    { label: "Platelet Count", value: "245,000 /uL (Optimal)", category: "biomarker" },
    { label: "Renal Creatinine", value: "0.88 mg/dL (Normal)", category: "staging" },
  ],
  "rep-imaging": [
    { label: "Lesion Axis", value: "Left Breast 11 o'clock axis", category: "histology" },
    { label: "Lesion Size", value: "2.4 x 1.8 cm discrete nodule", category: "staging" },
    { label: "BI-RADS Classification", value: "Category 4C (High suspicion)", category: "biomarker" },
    { label: "Axillary Nodes", value: "Morphologically normal hilum", category: "staging" },
  ],
  "rep-discharge": [
    { label: "Procedure Completed", value: "14G Core Needle Biopsy", category: "histology" },
    { label: "Specimens Collected", value: "4 intact tissue cores", category: "biomarker" },
    { label: "Immediate Outcome", value: "Hemostasis intact, no hematoma", category: "staging" },
    { label: "Lab Dispatch", value: "Direct courier to NABL histopathology", category: "histology" },
  ],
  "rep-lung": [
    { label: "Histological Type", value: "Non-Small Cell Lung Carcinoma (NSCLC)", category: "histology" },
    { label: "Genomic Driver", value: "EGFR Exon 19 Deletion Detected", category: "biomarker" },
    { label: "Rearrangements", value: "ALK & ROS1 Negative", category: "biomarker" },
    { label: "Disease Extent", value: "Localized right upper lobe thoracic lesion", category: "staging" },
  ],
  "rep-colon": [
    { label: "Histological Type", value: "Adenocarcinoma (Sigmoid colon)", category: "histology" },
    { label: "Mismatch Repair (MMR)", value: "Microsatellite Stable (MSS)", category: "biomarker" },
    { label: "Surgical Margins", value: "Clear / Resected margins negative", category: "histology" },
    { label: "Depth of Invasion", value: "Confined mucosal involvement", category: "staging" },
  ],
};

const categoryTabs = [
  { id: "all", label: "All Reports" },
  { id: "pathology", label: "Pathology" },
  { id: "blood", label: "Blood Tests" },
  { id: "imaging", label: "Imaging" },
  { id: "discharge", label: "Discharge" },
] as const;

type FilterCat = "all" | "pathology" | "blood" | "imaging" | "discharge";

export function ReportViewer() {
  const [selectedReportId, setSelectedReportId] = useState("rep-breast");
  const [mobileCategory, setMobileCategory] = useState<FilterCat>("all");
  const [mobileActiveReport, setMobileActiveReport] = useState<SampleReportItem | null>(null);
  const [openTerm, setOpenTerm] = useState<string | null>(reportTerms[0].term);
  const [customReportText, setCustomReportText] = useState("");
  const [isAnalyzingCustom, setIsAnalyzingCustom] = useState(false);
  const [customAnalysis, setCustomAnalysis] = useState<string | null>(null);

  // Upload Flow State (Screen 05)
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadStep, setUploadStep] = useState<"choose" | "processing" | "complete">("choose");
  const [uploadCategory, setUploadCategory] = useState<"pathology" | "blood" | "imaging" | "discharge">("pathology");
  const [uploadProcessingStep, setUploadProcessingStep] = useState(0);

  const activeReport = sampleReports.find((r) => r.id === selectedReportId) || sampleReports[0];
  const activeTermObj = reportTerms.find((item) => item.term === openTerm) || reportTerms[0];
  const currentFindings = reportKeyFindings[selectedReportId] || reportKeyFindings["rep-breast"];

  // Filtered reports for mobile document manager
  const filteredReports = mobileCategory === "all"
    ? sampleReports
    : sampleReports.filter((r) => r.category === mobileCategory);

  function getCategoryCount(cat: FilterCat) {
    if (cat === "all") return sampleReports.length;
    return sampleReports.filter((r) => r.category === cat).length;
  }

  function getCategoryBadgeColor(cat: string) {
    switch (cat) {
      case "pathology":
        return "bg-coral/10 text-coral border-coral/20";
      case "blood":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "imaging":
        return "bg-cyan/10 text-teal border-teal/20";
      case "discharge":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-forest/5 text-forest border-forest/10";
    }
  }

  function getCategoryIcon(cat: string) {
    switch (cat) {
      case "pathology":
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            <path d="M3.27 6.96L12 12.01l8.73-5.05" />
            <path d="M12 22.08V12" />
          </svg>
        );
      case "blood":
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
          </svg>
        );
      case "imaging":
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        );
      default:
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <path d="M14 2v6h6" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        );
    }
  }

  function handleStartUpload() {
    setShowUploadModal(true);
    setUploadStep("choose");
    setUploadProcessingStep(0);
  }

  function handleTriggerSimulation() {
    setUploadStep("processing");
    setUploadProcessingStep(1);

    setTimeout(() => {
      setUploadProcessingStep(2);
      setTimeout(() => {
        setUploadProcessingStep(3);
        setTimeout(() => {
          setUploadStep("complete");
        }, 1200);
      }, 1200);
    }, 1200);
  }

  async function handleAnalyzeCustom() {
    if (!customReportText.trim()) return;
    setIsAnalyzingCustom(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Decode pathology report excerpt: "${customReportText.trim()}"`,
        }),
      });
      const data = (await res.json()) as { message: string };
      setCustomAnalysis(data.message);
    } catch {
      setCustomAnalysis(
        "Could not process document text right now. Please select one of the pre-loaded sample reports above or try again."
      );
    } finally {
      setIsAnalyzingCustom(false);
    }
  }

  return (
    <div>
      {/* ============================================================ */}
      {/* MOBILE EXPERIENCE: Medical Records Manager & Reader (md:hidden)*/}
      {/* ============================================================ */}
      <div className="md:hidden space-y-4">
        {/* IF A REPORT IS SELECTED ON MOBILE, SHOW SCREEN 06 (DETAIL READER) */}
        {mobileActiveReport ? (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Top Navigation Bar: Back Button & Actions */}
            <div className="flex items-center justify-between py-1">
              <button
                type="button"
                onClick={() => setMobileActiveReport(null)}
                className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-forest hover:text-forest-mid"
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span>Back to All Reports</span>
              </button>

              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getCategoryBadgeColor(mobileActiveReport.category)}`}>
                  {mobileActiveReport.status}
                </span>
              </div>
            </div>

            {/* Screen 06 Document Header Card */}
            <div className="rounded-2xl border border-forest/10 bg-white-soft p-4 shadow-xs">
              <div className="flex items-center gap-2">
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg border ${getCategoryBadgeColor(mobileActiveReport.category)}`}>
                  {getCategoryIcon(mobileActiveReport.category)}
                </span>
                <span className="text-[11.5px] font-bold uppercase tracking-wider text-warm-gray capitalize">
                  {mobileActiveReport.category} Record
                </span>
              </div>

              <h2 className="font-serif text-[20px] font-medium text-forest mt-2 leading-snug">
                {mobileActiveReport.title}
              </h2>

              <div className="mt-2 flex flex-col gap-1 text-[12.5px] text-blue-gray">
                <p>Date: <strong className="text-forest font-medium">{mobileActiveReport.date}</strong></p>
                <p>Facility: <strong className="text-forest font-medium">{mobileActiveReport.facility}</strong></p>
              </div>

              <div className="mt-3 pt-3 border-t border-forest/8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => alert("Viewing original verified PDF (Demonstration record)")}
                  className="text-[12.5px] font-medium text-teal hover:underline flex items-center gap-1"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <path d="M14 2v6h6" />
                  </svg>
                  <span>View Original PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert("Report summary copied to clipboard.")}
                  className="text-[12px] text-warm-gray hover:text-forest"
                >
                  Share / Export
                </button>
              </div>
            </div>

            {/* Screen 06: Key Findings Summary (Prominent Top Card) */}
            <div className="rounded-2xl border border-teal/20 bg-teal/5 p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="flex h-2 w-2 rounded-full bg-teal" />
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-teal">
                  Key Findings Summary
                </h3>
              </div>

              <p className="text-[14px] text-forest font-medium leading-relaxed">
                {mobileActiveReport.executiveSummary}
              </p>

              <div className="mt-3 rounded-xl bg-white-soft/80 p-3 border border-teal/15 text-[12.5px] text-forest/90">
                <span className="font-bold text-teal block mb-0.5">What this means for your care:</span>
                {mobileActiveReport.clinicalImpact}
              </div>
            </div>

            {/* Structured Markers Table / List */}
            {mobileActiveReport.markers && mobileActiveReport.markers.length > 0 && (
              <div className="rounded-2xl border border-forest/10 bg-white-soft p-4 shadow-xs">
                <h3 className="text-[12px] font-bold uppercase tracking-wider text-warm-gray mb-3">
                  Tested Markers & Clinical Values
                </h3>

                <div className="space-y-2.5">
                  {mobileActiveReport.markers.map((m, mIdx) => (
                    <div key={mIdx} className="rounded-xl bg-ivory p-3 border border-forest/6 text-[13px]">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-forest">{m.name}</span>
                        <span className="font-bold text-coral-deep bg-coral/10 px-2 py-0.5 rounded-md text-[12px]">
                          {m.value}
                        </span>
                      </div>
                      <div className="mt-1 text-[11.5px] text-warm-gray">
                        Normal Range: {m.normalRange}
                      </div>
                      <p className="mt-1.5 text-[12px] text-ink/80 border-t border-forest/5 pt-1.5 leading-relaxed">
                        {m.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Original Excerpt & Plain Language Decoder */}
            <div className="rounded-2xl border border-forest/10 bg-white-soft p-4 shadow-xs">
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-warm-gray mb-2">
                Report Text Excerpt
              </h3>
              <p className="text-[13.5px] leading-relaxed text-ink/85 bg-ivory rounded-xl p-3.5 border border-forest/6 font-mono text-[12.5px]">
                &ldquo;{mobileActiveReport.excerpt}&rdquo;
              </p>
            </div>

            {/* Floating / Sticky "Ask AI About This Report" Bar */}
            <div className="sticky bottom-20 pt-2 z-20">
              <Link
                href={`/ai?task=report`}
                className="flex items-center justify-between w-full rounded-2xl bg-[#082221] p-3.5 text-white-soft shadow-xl border border-mint/20 active:scale-[0.99] transition-transform"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal/20 text-mint">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[13.5px] font-semibold text-white-soft block leading-none">
                      Ask AI About This Report
                    </span>
                    <span className="text-[11px] text-white-soft/60 mt-0.5 block">
                      Get questions & second opinion prep
                    </span>
                  </div>
                </div>
                <span className="text-mint text-[18px]">→</span>
              </Link>
            </div>
          </div>
        ) : (
          /* SCREEN 04: MEDICAL RECORDS DOCUMENT MANAGEMENT */
          <div className="space-y-4">
            {/* Header with Title and Upload Trigger */}
            <div className="flex items-center justify-between px-1">
              <div>
                <span className="label text-teal">Health Records</span>
                <h2 className="font-serif text-[24px] font-medium text-forest mt-0.5">
                  My Documents
                </h2>
              </div>

              <button
                type="button"
                onClick={handleStartUpload}
                className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3.5 py-2 text-[12.5px] font-medium text-white shadow-xs active:bg-forest-mid"
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Upload</span>
              </button>
            </div>

            {/* Horizontal Segmented Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {categoryTabs.map((tab) => {
                const isSelected = mobileCategory === tab.id;
                const count = getCategoryCount(tab.id as FilterCat);
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setMobileCategory(tab.id as FilterCat)}
                    className={`shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all ${
                      isSelected
                        ? "bg-forest text-white shadow-xs"
                        : "bg-white-soft text-forest/70 border border-forest/10 hover:bg-ivory"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10.5px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-forest/8 text-warm-gray"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Document Rows (NOT Giant Cards) */}
            {filteredReports.length > 0 ? (
              <div className="space-y-2.5">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setMobileActiveReport(report)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setMobileActiveReport(report);
                      }
                    }}
                    className="cursor-pointer flex items-center justify-between rounded-2xl border border-forest/10 bg-white-soft p-3.5 shadow-2xs hover:border-forest/20 active:scale-[0.99] transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      {/* Document Type Icon + Color Accent */}
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${getCategoryBadgeColor(report.category)}`}>
                        {getCategoryIcon(report.category)}
                      </div>

                      {/* Title, Date & Facility */}
                      <div className="min-w-0">
                        <h3 className="text-[14px] font-medium text-forest truncate">
                          {report.title}
                        </h3>
                        <p className="text-[11.5px] text-blue-gray mt-0.5 truncate">
                          {report.date} · {report.facility.split(",")[0]}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge + Chevron */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-2 py-0.5 rounded-md text-[10.5px] font-semibold border ${getCategoryBadgeColor(report.category)}`}>
                        {report.status}
                      </span>
                      <svg className="h-4 w-4 text-warm-gray" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty state for category */
              <div className="rounded-2xl border border-dashed border-forest/15 bg-white-soft/50 p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-forest/8 text-forest mb-3">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <path d="M14 2v6h6" />
                  </svg>
                </div>
                <h3 className="text-[15px] font-medium text-forest">
                  No {mobileCategory} reports yet
                </h3>
                <p className="text-[12.5px] text-blue-gray mt-1 max-w-xs mx-auto">
                  Upload your report to receive a structured plain-language summary and consultation questions.
                </p>
                <button
                  type="button"
                  onClick={handleStartUpload}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-[12.5px] font-medium text-white shadow-xs"
                >
                  Upload First Report →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* SCREEN 05: UPLOAD FLOW MODAL / BOTTOM SHEET                  */}
        {/* ============================================================ */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-forest-deep/60 backdrop-blur-sm p-0 sm:p-4">
            <div className="w-full sm:max-w-lg rounded-t-[28px] sm:rounded-[28px] bg-white-soft p-5 shadow-2xl border border-forest/10 animate-in slide-in-from-bottom duration-200 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-forest/10 pb-3">
                <div>
                  <span className="label text-teal">Document Decoder</span>
                  <h3 className="font-serif text-[20px] font-medium text-forest mt-0.5">
                    Upload Medical Report
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-forest/8 text-forest hover:bg-forest/15"
                >
                  ✕
                </button>
              </div>

              {uploadStep === "choose" && (
                <div className="mt-4 space-y-4">
                  <p className="text-[13px] text-blue-gray">
                    Upload your biopsy, blood work, or imaging report. Supported formats: <strong>PDF, JPG, PNG</strong> (up to 25MB).
                  </p>

                  {/* Category Pill Selector */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-warm-gray block mb-1.5">
                      What kind of report is this?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(
                        [
                          { id: "pathology", label: "Pathology / Biopsy" },
                          { id: "blood", label: "Blood Test (CBC/LFT)" },
                          { id: "imaging", label: "Scan / Imaging" },
                          { id: "discharge", label: "Discharge Summary" },
                        ] as const
                      ).map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setUploadCategory(cat.id)}
                          className={`rounded-xl p-2.5 text-left text-[12px] font-medium border transition-all ${
                            uploadCategory === cat.id
                              ? "border-forest bg-forest text-white shadow-2xs"
                              : "border-forest/10 bg-ivory text-forest hover:border-forest/20"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3 Clear Input Methods */}
                  <div className="space-y-2.5 pt-1">
                    {/* Method 1: Camera Photo Trigger */}
                    <label className="flex items-center gap-3 rounded-2xl border border-forest/15 bg-ivory p-3.5 cursor-pointer hover:bg-mint/20 transition-all active:scale-[0.99]">
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="sr-only"
                        onChange={() => handleTriggerSimulation()}
                      />
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest text-white">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                          <circle cx="12" cy="13" r="4" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[14px] font-semibold text-forest block">
                          Take Photo of Document
                        </span>
                        <span className="text-[11.5px] text-blue-gray">
                          Use phone camera for paper reports
                        </span>
                      </div>
                    </label>

                    {/* Method 2: PDF or Image File Picker */}
                    <label className="flex items-center gap-3 rounded-2xl border border-forest/15 bg-ivory p-3.5 cursor-pointer hover:bg-mint/20 transition-all active:scale-[0.99]">
                      <input
                        type="file"
                        accept=".pdf,image/png,image/jpeg"
                        className="sr-only"
                        onChange={() => handleTriggerSimulation()}
                      />
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal text-white">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                          <path d="M14 2v6h6" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[14px] font-semibold text-forest block">
                          Choose PDF or Gallery Image
                        </span>
                        <span className="text-[11.5px] text-blue-gray">
                          Select digital lab report from device
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Security Reassurance */}
                  <div className="rounded-xl bg-forest/5 p-3 text-[11.5px] text-blue-gray flex items-start gap-2 border border-forest/8">
                    <span className="text-forest font-bold">🔒</span>
                    <span>
                      <strong>DPDP Act & HIPAA Compliant:</strong> Your health records are encrypted in transit and at rest. Reports are never shared or used to train public models.
                    </span>
                  </div>
                </div>
              )}

              {/* Upload Biological Waveform Processing State */}
              {uploadStep === "processing" && (
                <div className="py-8 text-center space-y-4">
                  {/* Waveform graphic */}
                  <div className="mx-auto flex h-16 w-32 items-center justify-center rounded-2xl bg-[#082221] p-3 text-mint border border-mint/30 shadow-inner">
                    <svg viewBox="0 0 80 28" fill="none" className="h-full w-full stroke-mint">
                      <path
                        d="M 2 14 Q 12 14 18 14 T 26 6 T 36 22 T 46 14 T 54 8 T 64 16 T 72 14 L 78 14"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>

                  <div>
                    <h4 className="font-serif text-[18px] font-medium text-forest">
                      Decoding Clinical Document...
                    </h4>
                    <p className="text-[13px] text-teal font-medium mt-1">
                      {uploadProcessingStep === 1 && "Reading document structure & lab metadata..."}
                      {uploadProcessingStep === 2 && "Identifying key clinical markers (IHC & Staging)..."}
                      {uploadProcessingStep === 3 && "Synthesizing plain-language summary & doctor questions..."}
                    </p>
                  </div>

                  <div className="w-48 mx-auto h-1.5 bg-forest/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-forest rounded-full transition-all duration-700"
                      style={{ width: `${(uploadProcessingStep / 3) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Upload Complete State */}
              {uploadStep === "complete" && (
                <div className="py-6 text-center space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-serif text-[19px] font-medium text-forest">
                      Report Decoded Successfully
                    </h4>
                    <p className="text-[13px] text-blue-gray mt-1">
                      Your clinical markers, plain-language insights, and doctor questions are ready.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setShowUploadModal(false);
                      setMobileActiveReport(sampleReports[0]);
                    }}
                    className="w-full rounded-xl bg-forest py-3 text-[14px] font-medium text-white shadow-xs"
                  >
                    View Decoded Report →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* DESKTOP EXPERIENCE: Editorial Split Document Viewer (hidden md)*/}
      {/* ============================================================ */}
      <div className="hidden md:block space-y-8">
        {/* Report Selection Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-forest/10 pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-warm-gray block">
              Select Sample Pathology Record
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {sampleReports.map((report) => (
                <button
                  key={report.id}
                  type="button"
                  onClick={() => {
                    setSelectedReportId(report.id);
                    setCustomAnalysis(null);
                  }}
                  className={`rounded-xl px-4 py-2 text-[13.5px] font-medium transition-all ${
                    selectedReportId === report.id
                      ? "bg-forest text-white-soft shadow-md"
                      : "bg-white-soft text-forest border border-forest/10 hover:bg-ivory"
                  }`}
                >
                  {report.title}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11.5px] font-semibold text-amber-900">
              Demo Reports · Fictional Data
            </span>
            <Button href="/ai" variant="coral" className="text-[13.5px] py-2 px-4">
              Ask AI Assistant →
            </Button>
          </div>
        </div>

        {/* Structured Key Findings Summary Matrix */}
        <div className="rounded-[28px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between border-b border-forest/8 pb-3">
            <span className="label text-teal">Clinical Key Findings Summary</span>
            <span className="text-[12px] text-warm-gray">Extracted from report excerpt</span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {currentFindings.map((finding, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-forest/8 bg-ivory p-3.5 transition-colors hover:border-forest/20"
              >
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-warm-gray block">
                  {finding.label}
                </span>
                <p className="mt-1 font-medium text-forest text-[14px] leading-snug">
                  {finding.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Report Document & Term Explanation Grid */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Report Document Viewer */}
          <article className="rounded-[32px] border border-forest/10 bg-white-soft p-8 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between border-b border-forest/8 pb-4">
              <div>
                <span className="label text-warm-gray">Pathology Laboratory Record</span>
                <h2 className="mt-1 font-serif text-[1.8rem] text-forest">{activeReport.title}</h2>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-800">
                Verified Record
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-[13px] text-warm-gray">
              <p>Date: <strong className="text-forest">{activeReport.date}</strong></p>
              <p>Facility: <strong className="text-forest">{activeReport.facility}</strong></p>
            </div>

            {/* Interactive Text Body */}
            <div className="mt-6 rounded-2xl bg-ivory p-6 text-[15.5px] leading-8 text-ink border border-forest/5 font-sans">
              {selectedReportId === "rep-breast" ? (
                <p>
                  Specimen labeled left breast, 11 o&apos;clock. Diagnosis:{" "}
                  <TermButton term="Invasive Ductal Carcinoma" open={openTerm} setOpen={setOpenTerm} />.
                  Biomarker analysis shows Estrogen Receptor{" "}
                  <TermButton term="ER / PR Positive" open={openTerm} setOpen={setOpenTerm} /> and{" "}
                  <TermButton term="HER2 Negative (1+)" open={openTerm} setOpen={setOpenTerm} />.
                  Pathologic stage assigned as <TermButton term="pT2 N0 M0" open={openTerm} setOpen={setOpenTerm} />.
                </p>
              ) : selectedReportId === "rep-lung" ? (
                <p>
                  CT Chest: 2.8 cm spiculated right upper lobe lesion. Histology confirms Non-Small Cell Lung Carcinoma.
                  Molecular profiling panel detects <TermButton term="EGFR Exon 19 Deletion" open={openTerm} setOpen={setOpenTerm} />.
                  ALK & ROS1 rearrangements negative. Staging scans indicate localized thoracic disease.
                </p>
              ) : (
                <p>
                  Sigmoid colon endoscopic polypectomy specimen. Histology: Adenocarcinoma. Surgical margins clear.
                  Molecular mismatch repair status: <TermButton term="Microsatellite Stable (MSS)" open={openTerm} setOpen={setOpenTerm} />.
                  Pathology staging indicates confined mucosal involvement.
                </p>
              )}
            </div>

            <p className="mt-4 text-[13px] text-blue-gray flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
              <span>Click any highlighted term above to see what it means and questions for your doctor.</span>
            </p>

            {/* Custom Report Excerpt Analyzer */}
            <div className="mt-8 border-t border-forest/10 pt-6">
              <h3 className="text-[15px] font-semibold text-forest">Translate Custom Report Excerpt</h3>
              <p className="text-[13px] text-blue-gray mt-1">
                Paste findings or scan notes for plain-language educational breakdown:
              </p>

              <textarea
                rows={3}
                value={customReportText}
                onChange={(e) => setCustomReportText(e.target.value)}
                placeholder="Paste pathology report excerpt (e.g. Moderate differentiation, margins clear, ER 95% positive...)"
                className="mt-3 w-full rounded-2xl border border-forest/15 bg-ivory p-4 text-[14px] outline-none focus:border-forest focus:ring-2 focus:ring-forest/15"
              />

              <button
                type="button"
                onClick={() => void handleAnalyzeCustom()}
                disabled={isAnalyzingCustom || !customReportText.trim()}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-[14px] font-medium text-white-soft transition-colors hover:bg-forest-mid disabled:opacity-50"
              >
                {isAnalyzingCustom ? "Analyzing Report..." : "Translate Report Excerpt →"}
              </button>

              {customAnalysis ? (
                <div className="mt-4 rounded-2xl bg-forest/5 p-5 border border-forest/15 text-[14px] leading-relaxed text-ink">
                  <p className="font-semibold text-forest mb-2">Plain-Language Translation:</p>
                  <div className="whitespace-pre-wrap">{customAnalysis}</div>
                </div>
              ) : null}
            </div>
          </article>

          {/* Right Column: Term Explanation & Doctor Questions */}
          <aside className="relative overflow-hidden rounded-[32px] bg-[#082221] p-8 text-white-soft shadow-xl">
            <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-cyan/10 blur-2xl" />

            {activeTermObj ? (
              <div>
                <div className="flex items-center justify-between border-b border-white-soft/10 pb-3">
                  <span className="label text-mint">{activeTermObj.category}</span>
                  <span className="rounded-full bg-white-soft/10 px-2.5 py-0.5 text-[11px] text-white-soft/70">
                    Educational Translation
                  </span>
                </div>

                <h3 className="mt-4 font-serif text-[2.2rem] leading-tight text-white-soft">
                  {activeTermObj.term}
                </h3>

                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="text-[12.5px] font-semibold uppercase tracking-wider text-mint">
                      What this means in plain language
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-white-soft/88 font-sans">
                      {activeTermObj.explanation}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white-soft/6 p-5 border border-white-soft/10">
                    <h4 className="text-[12.5px] font-semibold uppercase tracking-wider text-coral">
                      Questions for Your Doctor Visit
                    </h4>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-white-soft/90 italic">
                      &quot;{activeTermObj.ask}&quot;
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 border-t border-white-soft/10 pt-6">
                  <Button href="/appointments" variant="coral" className="w-full justify-center text-[14px]">
                    Book Doctor Consultation
                  </Button>
                  <Button href="/ai" variant="ghost" className="w-full justify-center text-white-soft/80 border border-white-soft/20 text-[14px]">
                    Ask AI Follow-up Questions
                  </Button>
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </div>
  );
}

function TermButton({
  term,
  open,
  setOpen,
}: {
  term: string;
  open: string | null;
  setOpen: (v: string) => void;
}) {
  const active = open === term;
  return (
    <button
      type="button"
      onClick={() => setOpen(term)}
      className={`rounded-md border-b-2 font-medium transition-all px-1.5 py-0.5 ${
        active
          ? "border-coral bg-coral/20 text-coral-deep font-semibold shadow-sm"
          : "border-teal/40 bg-teal/10 text-forest hover:bg-teal/20"
      }`}
    >
      {term}
    </button>
  );
}
