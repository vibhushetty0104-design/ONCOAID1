"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { motionTokens } from "@/lib/motion";

type Msg = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  provider?: string;
  cached?: boolean;
  doctorQuestions?: string[];
  suggestedFollowUps?: string[];
};

const taskCategories = [
  {
    id: "report",
    label: "Understand a Report",
    badge: "Pathology & Staging",
    prompts: [
      "Decode pathology report markers (ER, PR, HER2, EGFR)",
      "What does histological grade 2 mean in my biopsy?",
      "Explain what TNM staging shorthand (pT2 N0 M0) means",
    ],
  },
  {
    id: "appointment",
    label: "Prepare for an Appointment",
    badge: "Doctor Visit Prep",
    prompts: [
      "What questions should I ask my oncologist at my first visit?",
      "How do I prepare for my upcoming chemotherapy session?",
      "What records and scans should I bring to a second opinion?",
    ],
  },
  {
    id: "journey",
    label: "Understand My Journey",
    badge: "Treatment Pathways",
    prompts: [
      "What is the difference between radiation therapy and chemotherapy?",
      "How does a multi-disciplinary tumor board make decisions?",
      "What does systemic targeted therapy versus immunotherapy mean?",
    ],
  },
  {
    id: "question",
    label: "Ask a Question",
    badge: "Clinical Clarification",
    prompts: [
      "Explain my diagnosis in simple words",
      "What support & diet guidelines are safe during treatment?",
      "How do second opinions work in Indian cancer hospitals?",
    ],
  },
];

/**
 * Biological Waveform Thinking State:
 * Serene, clinical, calm waveform animation representing ONCO-AID processing.
 */
function BiologicalWaveformThinking() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-mint/20 bg-forest-mid/60 p-4 text-[14px] text-mint">
      <div className="relative flex h-6 w-16 items-center justify-center shrink-0">
        <svg
          viewBox="0 0 64 24"
          fill="none"
          className="h-full w-full stroke-mint"
          aria-hidden="true"
        >
          <path
            d="M 2 12 Q 10 12 16 12 T 24 5 T 32 19 T 40 12 T 48 8 T 56 12 L 62 12"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse opacity-85"
          />
        </svg>
        <span className="absolute right-0 h-1.5 w-1.5 rounded-full bg-cyan animate-ping" />
      </div>
      <div className="flex flex-col">
        <span className="text-[13.5px] font-medium text-white-soft">
          Structuring plain-language clinical insights...
        </span>
        <span className="text-[11px] text-white-soft/60">
          Synthesizing terminology and consultation questions
        </span>
      </div>
    </div>
  );
}

export function AIInterface() {
  const [input, setInput] = useState("");
  const [activeTask, setActiveTask] = useState("report");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "init-1",
      role: "assistant",
      content:
        "Welcome to **ONCO-AID Clinical Assistant**.\n\nI am an educational guide built to help you understand pathology terminology, structure questions for your oncology team, and make sense of your care steps in clear, plain language.\n\nSelect a clinical focus area above or enter your question below.",
      timestamp: "Just now",
      provider: "ONCO-AID Clinical Assistant",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isUserScrolledUp = useRef(false);
  const reduce = useReducedMotion();

  const handleScroll = useCallback(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    isUserScrolledUp.current = scrollHeight - scrollTop - clientHeight > 60;
  }, []);

  // Container-bounded scroll (never scrolls the outer browser window)
  useEffect(() => {
    if (!isUserScrolledUp.current && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    setInput("");
    const userMsgId = `user-${Date.now()}`;
    const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const updatedMessages = [
      ...messages,
      { id: userMsgId, role: "user" as const, content, timestamp: nowStr },
    ];
    setMessages(updatedMessages);
    setLoading(true);

    // Reset user scroll lock when sending a new prompt
    isUserScrolledUp.current = false;
    setTimeout(() => {
      messagesContainerRef.current?.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 40);

    try {
      // Build conversation history payload
      const conversationHistory = updatedMessages
        .filter((m) => m.id !== "init-1")
        .slice(-4)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: content,
          taskHint: activeTask,
          conversationHistory,
        }),
      });

      const data = (await res.json()) as {
        message: string;
        provider?: string;
        cached?: boolean;
        doctorQuestions?: string[];
        suggestedFollowUps?: string[];
      };

      const assistantMsgId = `assistant-${Date.now()}`;
      setMessages((m) => [
        ...m,
        {
          id: assistantMsgId,
          role: "assistant",
          content: data.message || "No response generated.",
          timestamp: nowStr,
          provider: data.provider,
          cached: data.cached,
          doctorQuestions: data.doctorQuestions,
          suggestedFollowUps: data.suggestedFollowUps,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "The ONCO-AID educational service is temporarily unavailable. Please retry or discuss your questions directly with your healthcare provider.",
          timestamp: nowStr,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy(id: string, text: string) {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      } else if (typeof document !== "undefined") {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      }
    } catch {
      // Graceful silence
    }
  }

  const selectedCategoryObj = taskCategories.find((c) => c.id === activeTask) || taskCategories[0];

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white-soft/14 bg-[#082221] p-5 text-white-soft shadow-[var(--shadow-card)] md:p-8">
      {/* Top Header with Clinical Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white-soft/10 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-[17px] font-semibold text-white-soft">
              ONCO-AID Clinical Assistant
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active Decision Support
            </span>
          </div>
          <p className="mt-1 text-[13.5px] text-white-soft/75">
            Understand medical terms, prepare questions for your care team, and make sense of your next steps.
          </p>
        </div>

        {/* Clinical Safety Disclaimer Badge */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-[12px] text-amber-200 font-medium">
          Notice: Educational guidance only · Non-diagnostic
        </div>
      </div>

      {/* 4 Task Category Selector Tabs */}
      <div className="mt-6">
        <label className="text-[11px] font-bold uppercase tracking-wider text-white-soft/50 block mb-2">
          Select Clinical Task
        </label>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {taskCategories.map((cat) => {
            const isSelected = activeTask === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTask(cat.id)}
                className={`rounded-2xl p-3 text-left transition-all duration-200 border ${
                  isSelected
                    ? "border-mint/60 bg-forest-mid text-white-soft shadow-sm"
                    : "border-white-soft/10 bg-white-soft/5 text-white-soft/70 hover:bg-white-soft/10 hover:text-white-soft"
                }`}
              >
                <span className="block text-[10px] font-bold uppercase tracking-wider text-mint">
                  {cat.badge}
                </span>
                <span className="mt-1 block text-[14px] font-medium leading-snug">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Suggested prompts for active task */}
      <div className="mt-4 flex flex-wrap gap-2">
        {selectedCategoryObj.prompts.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => void send(item)}
            className="group flex items-center gap-2 rounded-xl border border-white-soft/10 bg-white-soft/5 px-3.5 py-2 text-[13px] text-white-soft/85 transition-all hover:border-mint/40 hover:bg-white-soft/10 text-left"
          >
            <span>{item}</span>
            <span className="text-mint opacity-0 transition-opacity group-hover:opacity-100">→</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Feed Container */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="mt-6 max-h-[460px] min-h-[240px] overflow-y-auto space-y-4 pr-1 scroll-smooth"
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionTokens.fast, ease: motionTokens.easeOutSoft }}
            className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] text-white-soft/50">
                {msg.role === "user" ? "You" : "ONCO-AID Guide"}
              </span>
              <span className="text-[11px] text-white-soft/35">• {msg.timestamp}</span>
              {msg.cached && (
                <span className="text-[10px] text-cyan/75 rounded bg-cyan/10 px-1.5 py-0.5 uppercase tracking-wider font-semibold">
                  Cached
                </span>
              )}
            </div>
            <div
              className={`group relative max-w-[92%] rounded-2xl p-4 md:max-w-[85%] ${
                msg.role === "user"
                  ? "bg-forest-mid text-white-soft border border-white-soft/15"
                  : "border border-white-soft/10 bg-white-soft/8 text-white-soft/95"
              }`}
            >
              {/* Structured Markdown Message Body */}
              <MarkdownRenderer content={msg.content} />

              {/* Follow-up Prompts if returned */}
              {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                <div className="mt-4 border-t border-white-soft/10 pt-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-mint mb-2">
                    Related follow-ups
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.suggestedFollowUps.map((fu, fIdx) => (
                      <button
                        key={fIdx}
                        type="button"
                        onClick={() => void send(fu)}
                        className="rounded-lg border border-white-soft/12 bg-white-soft/6 px-2.5 py-1 text-[12px] text-white-soft/80 hover:bg-white-soft/12 hover:text-white-soft transition-colors"
                      >
                        {fu} →
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Assistant Message Footer */}
              {msg.role === "assistant" && (
                <div className="mt-3 flex items-center justify-between border-t border-white-soft/10 pt-2 text-[12px] text-white-soft/40">
                  <span className="text-[11px] italic">{msg.provider || "ONCO-AID"}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(msg.id, msg.content)}
                    className="text-mint hover:underline font-medium transition-colors"
                  >
                    {copiedId === msg.id ? "Copied ✓" : "Copy note"}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {loading ? <BiologicalWaveformThinking /> : null}
      </div>

      {/* Input Form */}
      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <div className="relative flex items-center">
          <input
            id="ai-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="h-14 w-full rounded-2xl border border-white-soft/15 bg-white-soft/8 pl-5 pr-28 text-[15px] text-white-soft placeholder-white-soft/40 outline-none transition-all focus:border-mint focus:shadow-[0_0_0_2px_rgba(215,236,227,0.2)]"
            placeholder="Ask a question or enter a term from your notes..."
          />
          <Button
            type="submit"
            variant="coral"
            className="absolute right-2 top-2 bottom-2 px-5 py-0 h-10 text-[14px]"
            disabled={loading || !input.trim()}
          >
            {loading ? "Sending..." : "Ask AI"}
          </Button>
        </div>
      </form>

      {/* Safety Notice */}
      <div className="mt-4 flex flex-wrap items-center justify-between text-[12px] text-white-soft/50 gap-2">
        <p>
          Educational guidance only. Always review pathology and treatment options with your oncologist.
        </p>
        <a href="/reports" className="text-mint hover:underline">
          Decode full pathology report →
        </a>
      </div>
    </div>
  );
}
