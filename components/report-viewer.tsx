"use client";

import { useState } from "react";
import { reportTerms, sampleReports } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function ReportViewer() {
  const [selectedReportId, setSelectedReportId] = useState(sampleReports[0].id);
  const [openTerm, setOpenTerm] = useState<string | null>(reportTerms[0].term);
  const [customReportText, setCustomReportText] = useState("");
  const [isAnalyzingCustom, setIsAnalyzingCustom] = useState(false);
  const [customAnalysis, setCustomAnalysis] = useState<string | null>(null);

  const activeReport = sampleReports.find((r) => r.id === selectedReportId) || sampleReports[0];
  const activeTermObj = reportTerms.find((item) => item.term === openTerm) || reportTerms[0];

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
    <div className="space-y-8">
      {/* Report Selection Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-forest/10 pb-4">
        <div>
          <span className="text-[12px] font-semibold uppercase tracking-wider text-warm-gray block">
            Select Demo Report Excerpt
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
                className={`rounded-xl px-4 py-2 text-[14px] font-medium transition-all ${
                  selectedReportId === report.id
                    ? "bg-forest text-white-soft shadow-md"
                    : "bg-white-soft text-forest hover:bg-ivory"
                }`}
              >
                📄 {report.title}
              </button>
            ))}
          </div>
        </div>

        <Button
          href="/ai"
          variant="coral"
          className="text-[14px]"
        >
          Ask AI Custom Report Questions →
        </Button>
      </div>

      {/* Main Report & Explanation Grid */}
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left Column: Report Document Viewer */}
        <article className="rounded-[32px] border border-forest/10 bg-white-soft p-7 shadow-[var(--shadow-card)] md:p-10">
          <div className="flex items-center justify-between border-b border-forest/8 pb-4">
            <div>
              <span className="label text-warm-gray">Pathology Laboratory Record</span>
              <h2 className="mt-1 font-serif text-[1.8rem] text-forest">{activeReport.title}</h2>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[12px] font-medium text-emerald-700">
              Fictional Demo Report
            </span>
          </div>

          <div className="mt-4 flex flex-wrap justify-between text-[13px] text-warm-gray">
            <p>📅 Date: <strong>{activeReport.date}</strong></p>
            <p>🏛️ Facility: <strong>{activeReport.facility}</strong></p>
          </div>

          {/* Interactive Text Body */}
          <div className="mt-6 rounded-2xl bg-ivory p-6 text-[16px] leading-8 text-ink border border-forest/5 font-sans">
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

          <p className="mt-4 text-[13px] text-warm-gray italic">
            💡 Click on any highlighted medical term above to open its plain-language breakdown and questions for your doctor.
          </p>

          {/* Paste/Upload Custom Report Simulator */}
          <div className="mt-8 border-t border-forest/10 pt-6">
            <h3 className="text-[15px] font-semibold text-forest">Analyze Your Own Report Text</h3>
            <p className="text-[13px] text-blue-gray mt-1">
              Paste pathology or scan text below for immediate AI plain-language parsing:
            </p>

            <textarea
              rows={3}
              value={customReportText}
              onChange={(e) => setCustomReportText(e.target.value)}
              placeholder="Paste pathology report excerpt (e.g. Moderate differentiation, margins clear, ER 95% positive...)"
              className="mt-3 w-full rounded-2xl border border-forest/15 bg-ivory p-4 text-[14px] outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/20"
            />

            <button
              type="button"
              onClick={() => void handleAnalyzeCustom()}
              disabled={isAnalyzingCustom || !customReportText.trim()}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-[14px] font-medium text-white-soft transition-colors hover:bg-forest-mid disabled:opacity-50"
            >
              {isAnalyzingCustom ? "Analyzing Report..." : "Decode Report Excerpt →"}
            </button>

            {customAnalysis ? (
              <div className="mt-4 rounded-2xl bg-forest/5 p-5 border border-forest/15 text-[14px] leading-relaxed text-ink">
                <p className="font-semibold text-forest mb-2">AI Analysis Result:</p>
                <div className="whitespace-pre-wrap">{customAnalysis}</div>
              </div>
            ) : null}
          </div>
        </article>

        {/* Right Column: Term Explanation & Doctor Questions */}
        <aside className="relative overflow-hidden rounded-[32px] bg-[#0c1e28] p-7 text-white-soft shadow-xl md:p-8">
          <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-cyan/10 blur-2xl" />

          {activeTermObj ? (
            <div>
              <div className="flex items-center justify-between">
                <span className="label text-cyan">{activeTermObj.category}</span>
                <span className="rounded-full bg-white-soft/10 px-3 py-1 text-[11px] text-white-soft/70">
                  Plain-Language Guide
                </span>
              </div>

              <h3 className="mt-4 font-serif text-[2.2rem] leading-tight text-white-soft">
                {activeTermObj.term}
              </h3>

              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-[13px] font-semibold uppercase tracking-wider text-cyan">What this means</h4>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-white-soft/88 font-sans">
                    {activeTermObj.explanation}
                  </p>
                </div>

                <div className="rounded-2xl bg-white-soft/6 p-5 border border-white-soft/10">
                  <h4 className="text-[13px] font-semibold uppercase tracking-wider text-amber-300">
                    💡 Questions for Your Doctor Visit
                  </h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-white-soft/90 italic">
                    &quot;{activeTermObj.ask}&quot;
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-white-soft/10 pt-6">
                <Button href="/appointments" variant="coral" className="w-full justify-center text-[14px]">
                  Book Doctor Consultation
                </Button>
                <Button href="/ai" variant="ghost" className="w-full justify-center text-white-soft/80 text-[14px]">
                  Ask ONCO-AID AI Follow-up Questions
                </Button>
              </div>
            </div>
          ) : null}
        </aside>
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
