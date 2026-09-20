"use client";

import { useState } from "react";
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

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <span className="label text-teal">AI Guide</span>
            <span className="text-[12px] text-warm-gray">• Your Care Companion</span>
          </div>
          <h2 className="heading-serif-section mt-3 text-forest">
            Clear answers to difficult questions.
          </h2>
          <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-blue-gray">
            Understand medical terms, prepare questions for your care team, and make sense of your next steps.
          </p>
        </Reveal>

        {/* Task Grid Selection */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aiTasks.map((task) => {
            const isSelected = selectedTask.id === task.id;
            return (
              <button
                key={task.id}
                type="button"
                onClick={() => {
                  setSelectedTask(task);
                }}
                className={`flex flex-col justify-between rounded-xl border p-5 text-left transition-all ${
                  isSelected
                    ? "border-forest bg-white-soft shadow-xs"
                    : "border-forest/10 bg-white-soft/60 hover:border-forest/20 hover:bg-white-soft"
                }`}
              >
                <div>
                  <span className="text-meta-ui text-teal">
                    Task
                  </span>
                  <h3 className="heading-sans-ui mt-2 text-[17px] text-forest">
                    {task.title}
                  </h3>
                  <p className="mt-1 text-[13px] font-medium text-warm-gray">{task.subtitle}</p>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-blue-gray line-clamp-3">
                    {task.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1.5 text-[12.5px] font-semibold text-teal">
                  <span>{isSelected ? "Selected Task" : "Select Task"}</span>
                  <span>{isSelected ? "✓" : "→"}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Task Execution Spotlight Box */}
        <div className="mt-8 rounded-2xl border border-forest/12 bg-white-soft p-6 shadow-xs md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <span className="label text-teal">Active Clinical Task</span>
              <h3 className="heading-sans-ui mt-2 text-forest">
                {selectedTask.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-blue-gray max-w-xl">
                {selectedTask.description}
              </p>

              {/* Sample Prompt Box */}
              <div className="mt-5 rounded-xl bg-ivory p-4 border border-forest/8">
                <span className="text-meta-ui text-warm-gray block">
                  Suggested Task Query:
                </span>
                <p className="text-[14.5px] font-medium text-forest mt-1">
                  &ldquo;{selectedTask.examplePrompt}&rdquo;
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button href={selectedTask.href} variant="coral" className="px-5 py-2.5 text-[13.5px]">
                  {selectedTask.buttonLabel}
                </Button>
                <Button href="/ai" variant="ghost" className="text-forest text-[13.5px]">
                  Talk to ONCO-AID
                </Button>
              </div>
            </div>

            {/* Right Side Clinical Safety Notice */}
            <div className="rounded-xl bg-forest p-6 text-white-soft">
              <span className="text-meta-ui text-mint">Clinical Safety & Restraint</span>
              <h4 className="heading-sans-ui mt-2 text-white-soft">Care Companion</h4>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-white-soft/80">
                ONCO-AID is engineered strictly as an educational decision-support tool. It never claims to diagnose cancer, predict prognosis, or prescribe medications.
              </p>
              <div className="mt-5 rounded-lg border border-white-soft/12 bg-white-soft/8 p-3 text-[11.5px] text-white-soft/80">
                Private & secure: Clinical questions are processed server-side with zero data harvesting.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
