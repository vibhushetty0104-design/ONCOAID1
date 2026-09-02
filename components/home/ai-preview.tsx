"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

const aiTasks = [
  {
    id: "report",
    title: "Understand a report",
    subtitle: "Decode biopsy, IHC markers & staging shorthand",
    description:
      "Translate terms like ER/PR positive, HER2 1+, pT2 N0, or EGFR mutations into plain language with specific questions for your doctor.",
    examplePrompt: "Decode pathology report markers (ER, PR, HER2, EGFR)",
    href: "/reports",
    buttonLabel: "Launch Report Decoder →",
  },
  {
    id: "appointment",
    title: "Prepare for an appointment",
    subtitle: "Generate tailored questions for your oncologist",
    description:
      "Arrive at your visit prepared with high-impact clinical questions covering staging, treatment goals, timelines, and emergency contacts.",
    examplePrompt: "What questions should I ask my oncologist at my first visit?",
    href: "/ai?task=appointment",
    buttonLabel: "Prepare Doctor Questions →",
  },
  {
    id: "journey",
    title: "Understand my journey",
    subtitle: "Navigate next clinical steps by cancer subtype",
    description:
      "Clarify what happens between biopsy, second opinion tumor boards, chemotherapy cycles, surgery, and radiation therapy.",
    examplePrompt: "What is the difference between radiation therapy and chemotherapy?",
    href: "/care",
    buttonLabel: "Explore Care Pathways →",
  },
  {
    id: "question",
    title: "Ask a medical question",
    subtitle: "Plain-language educational guidance",
    description:
      "Ask anything about oncology concepts, side effect management, hospital procedures, or dietary precautions during treatment.",
    examplePrompt: "Explain my diagnosis in simple words",
    href: "/ai",
    buttonLabel: "Open AI Assistant →",
  },
];

export function AIPreview() {
  const [selectedTask, setSelectedTask] = useState(aiTasks[0]);
  const [quickInput, setQuickInput] = useState("");

  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <span className="label text-teal">Clinical Assistant</span>
            <span className="text-[12px] text-warm-gray">• Decision Support</span>
          </div>
          <h2 className="editorial-serif mt-3 max-w-3xl text-[clamp(2.2rem,5vw,4.4rem)] text-forest">
            Clear answers to difficult questions.
          </h2>
          <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-blue-gray">
            Understand medical terms, prepare questions for your care team, and make sense of your next steps.
          </p>
        </Reveal>

        {/* Task Grid Selection */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {aiTasks.map((task) => {
            const isSelected = selectedTask.id === task.id;
            return (
              <button
                key={task.id}
                type="button"
                onClick={() => {
                  setSelectedTask(task);
                  setQuickInput(task.examplePrompt);
                }}
                className={`flex flex-col justify-between rounded-[28px] border p-6 text-left transition-all duration-300 ${
                  isSelected
                    ? "border-cobalt bg-white-soft shadow-[var(--shadow-card)] scale-[1.02]"
                    : "border-forest/8 bg-white-soft/60 hover:border-forest/20 hover:bg-white-soft"
                }`}
              >
                <div>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-teal">
                    Task
                  </span>
                  <h3 className="font-serif mt-2 text-[22px] leading-snug text-forest">
                    {task.title}
                  </h3>
                  <p className="mt-1 text-[13px] font-medium text-warm-gray">{task.subtitle}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-blue-gray line-clamp-3">
                    {task.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-[13px] font-semibold text-teal">
                  <span>{isSelected ? "Selected Task" : "Select Task"}</span>
                  <span>{isSelected ? "✓" : "→"}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Task Execution Spotlight Box */}
        <div className="mt-8 overflow-hidden rounded-[32px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)] md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <span className="label text-cobalt">Active Clinical Task</span>
              <h3 className="editorial-serif mt-2 text-[2.4rem] text-forest">
                {selectedTask.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-blue-gray max-w-xl">
                {selectedTask.description}
              </p>

              {/* Sample Prompt Pill */}
              <div className="mt-6 rounded-2xl bg-ivory p-4 border border-forest/5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-warm-gray block">
                  Suggested Task Query:
                </span>
                <p className="text-[15px] font-medium text-forest mt-1">
                  &ldquo;{selectedTask.examplePrompt}&rdquo;
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={selectedTask.href} variant="coral" className="px-6 py-3 text-[14px]">
                  {selectedTask.buttonLabel}
                </Button>
                <Button href="/ai" variant="ghost" className="text-forest text-[14px]">
                  Talk to ONCO-AID
                </Button>
              </div>
            </div>

            {/* Right Side Clinical Safety Notice */}
            <div className="rounded-[24px] bg-forest p-6 sm:p-8 text-white-soft">
              <span className="label text-mint">Clinical Safety & Restraint</span>
              <h4 className="editorial-serif mt-3 text-[1.8rem]">Educational Companion</h4>
              <p className="mt-3 text-[14px] leading-relaxed text-white-soft/80">
                ONCO-AID is engineered strictly as an educational decision-support tool. It never claims to diagnose cancer, predict prognosis, or prescribe medications.
              </p>
              <div className="mt-6 rounded-xl border border-white-soft/15 bg-white-soft/8 p-3.5 text-[12px] text-white-soft/80">
                Private & secure: Clinical questions are processed server-side with zero data harvesting.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
