"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

const journeyStages = [
  {
    id: "understand",
    number: "01",
    stage: "Understand",
    title: "Make sense of your diagnosis & reports",
    description:
      "Turn complex pathology terms, histology markers (ER/PR, HER2, EGFR), and staging shorthand into plain language you and your family can grasp.",
    actions: [
      { label: "Decode pathology report", href: "/reports" },
      { label: "Explore cancer types", href: "/cancer-types" },
    ],
    highlight: "Clarity over panic: Biopsy language describes biology, not an unchangeable outcome.",
  },
  {
    id: "prepare",
    number: "02",
    stage: "Prepare",
    title: "Structure your appointment & questions",
    description:
      "Arrive at your oncologist visit with a focused list of clinical questions, treatment goals, and organized medical records.",
    actions: [
      { label: "Generate doctor questions", href: "/ai?task=appointment" },
      { label: "Appointment preparation guide", href: "/resources/questions-to-take" },
    ],
    highlight: "Shared decision-making: Asking the right questions ensures you and your clinician are aligned.",
  },
  {
    id: "find-care",
    number: "03",
    stage: "Find Care",
    title: "Connect with verified Indian specialists",
    description:
      "Find medical, surgical, and radiation oncologists matched to your specific cancer subtype across top centers in Bengaluru, Mumbai, Delhi, Chennai, Hyderabad, and Pune.",
    actions: [
      { label: "Search specialist directory", href: "/specialists" },
      { label: "Request a consultation", href: "/appointments" },
    ],
    highlight: "Multi-disciplinary approach: Care tailored by tumor boards, not a one-size-fits-all directory.",
  },
  {
    id: "move-forward",
    number: "04",
    stage: "Move Forward",
    title: "Navigate treatment & supportive life",
    description:
      "Understand what to expect between cycles, manage side effects safely at home, and access financial & insurance navigation (TPA, Ayushman Bharat).",
    actions: [
      { label: "Managing side effects at home", href: "/resources/side-effects-home-care" },
      { label: "Insurance & financial navigation", href: "/resources/between-appointments" },
    ],
    highlight: "Continuous orientation: Living between appointments with clear systems of support.",
  },
];

export function CareJourney() {
  const [activeStage, setActiveStage] = useState(0);
  const current = journeyStages[activeStage];

  return (
    <section id="framework" className="bg-forest py-20 text-white-soft md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <span className="label text-mint-deep">The Care Framework</span>
            <span className="text-[12px] text-white-soft/50">• 4 Essential Stages</span>
          </div>
          <h2 className="heading-serif-section mt-3 text-white-soft">
            A clearer path through cancer care.
          </h2>
          <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-white-soft/75">
            Care does not happen all at once. Whether you have just received a biopsy or are weighing a second opinion, orienting yourself across four clear stages helps reduce uncertainty.
          </p>
        </Reveal>

        {/* 4-Stage Quiet System Tabs */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {journeyStages.map((stg, idx) => {
            const isSelected = activeStage === idx;
            return (
              <button
                key={stg.id}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`group flex flex-col justify-between border-t-2 pt-3.5 pb-2 text-left transition-all ${
                  isSelected
                    ? "border-coral text-white-soft"
                    : "border-white-soft/20 text-white-soft/60 hover:border-white-soft/40 hover:text-white-soft/85"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-meta-ui ${isSelected ? "text-coral font-bold" : "text-white-soft/50"}`}>
                    Stage {stg.number}
                  </span>
                  <span className={`h-1.5 w-1.5 rounded-full transition-colors ${isSelected ? "bg-coral" : "bg-white-soft/20"}`} />
                </div>
                <span className={`mt-2 block text-[16px] sm:text-[17px] tracking-tight font-medium ${isSelected ? "text-white-soft font-semibold" : "text-white-soft/70"}`}>
                  {stg.stage}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Presentation Surface */}
        <div className="mt-8 rounded-2xl border border-white-soft/12 bg-white-soft/6 p-6 backdrop-blur-xs sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-meta-ui text-coral">
                  Stage {current.number} · {current.stage}
                </span>
              </div>
              <h3 className="heading-sans-ui mt-2 text-white-soft">
                {current.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white-soft/80 max-w-xl">
                {current.description}
              </p>

              {/* Action Buttons for this Stage */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {current.actions.map((act, aIdx) => (
                  <Link
                    key={act.href}
                    href={act.href}
                    className={`rounded-lg px-4 py-2 text-[13.5px] font-medium transition-all ${
                      aIdx === 0
                        ? "bg-coral text-white-soft hover:bg-coral-deep shadow-xs"
                        : "border border-white-soft/20 bg-white-soft/8 text-white-soft hover:bg-white-soft/14"
                    }`}
                  >
                    {act.label} →
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side Callout Note */}
            <div className="rounded-xl border border-white-soft/10 bg-forest/70 p-5 text-white-soft">
              <span className="text-meta-ui text-mint block">Clinical Principle</span>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-white-soft/90 italic font-serif">
                &ldquo;{current.highlight}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-white-soft/10 pt-3 text-[11.5px] text-white-soft/50">
                <span>ONCO-AID Framework</span>
                <span className="text-mint">Evidence-Based</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
