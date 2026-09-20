"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { motionTokens } from "@/lib/motion";
import { brand } from "@/lib/brand";

export type CompanionState =
  | "idle"
  | "listening"
  | "thinking"
  | "explaining"
  | "ready"
  | "success"
  | "needs_clinician"
  | "unavailable";

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

const suggestedPrompts = [
  "Explain my diagnosis",
  "Prepare questions for my doctor",
  "Help me understand my report",
  "What happens next?",
];

const starterQuestions = [
  {
    title: "Explain my pathology report",
    desc: "Understand ER/PR, HER2, Ki-67 and tumor grade in plain terms",
    prompt: "Can you explain what ER/PR positive and HER2 negative mean in simple words?",
  },
  {
    title: "Questions for my oncologist",
    desc: "Generate 5 critical questions for your next consultation",
    prompt: "What are the 5 most important questions I should ask my oncologist before finalizing my treatment plan?",
  },
  {
    title: "Understanding next steps",
    desc: "Learn what happens after receiving an initial biopsy diagnosis",
    prompt: "What are the typical next steps after getting a confirmed cancer biopsy result?",
  },
];

/**
 * Biological Waveform Thinking State:
 * Serene, clinical, calm waveform animation representing AI processing / understanding.
 * (Not measuring patient biological vitals - purely digital care understanding)
 */
function BiologicalWaveformThinking() {
  return (
    <div className="flex items-center gap-3.5 rounded-xl border border-mint/25 bg-[#042422]/90 p-4 text-[13.5px] text-mint shadow-inner backdrop-blur-md">
      <div className="relative flex h-6 w-16 items-center justify-center shrink-0">
        <svg
          viewBox="0 0 80 28"
          fill="none"
          className="h-full w-full stroke-mint"
          aria-hidden="true"
        >
          <path
            d="M 2 14 Q 12 14 18 14 T 26 6 T 36 22 T 46 14 T 54 8 T 64 16 T 72 14 L 78 14"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse opacity-90"
          />
        </svg>
        <span className="absolute right-0.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-mint animate-ping" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[13px] font-medium text-white-soft truncate">
          Synthesizing plain-language clinical insights...
        </span>
        <span className="text-[11.5px] text-white-soft/60 truncate">
          Consulting validated oncology reference guidelines (ICMR · NCCN)
        </span>
      </div>
    </div>
  );
}

export function AIInterface() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "init-1",
      role: "assistant",
      content:
        `Welcome to the **${brand.companion.name}** (${brand.companion.systemName}).\n\nI am your educational care guide, here to help translate complex pathology terms, organize targeted questions for your oncologist visits, and explain care milestones in clear, reassuring language.\n\nHow can I help you understand your care today?`,
      timestamp: "Just now",
      provider: brand.companion.name,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const isUserScrolledUp = useRef(false);
  const reduce = useReducedMotion();

  // Derive Companion State
  const companionState: CompanionState = loading
    ? "thinking"
    : hasError
      ? "unavailable"
      : input.trim().length > 0
        ? "listening"
        : messages.length > 1
          ? "explaining"
          : "ready";

  const handleScroll = useCallback(() => {
    const el = messagesContainerRef.current || mobileContainerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    isUserScrolledUp.current = scrollHeight - scrollTop - clientHeight > 60;
  }, []);

  useEffect(() => {
    if (!isUserScrolledUp.current) {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
      if (mobileContainerRef.current) {
        mobileContainerRef.current.scrollTo({
          top: mobileContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    setInput("");
    setHasError(false);
    const userMsgId = `user-${Date.now()}`;
    const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const updatedMessages = [
      ...messages,
      { id: userMsgId, role: "user" as const, content, timestamp: nowStr },
    ];
    setMessages(updatedMessages);
    setLoading(true);

    isUserScrolledUp.current = false;
    setTimeout(() => {
      messagesContainerRef.current?.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
      mobileContainerRef.current?.scrollTo({
        top: mobileContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 40);

    try {
      const conversationHistory = updatedMessages
        .filter((m) => m.id !== "init-1")
        .slice(-4)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: content,
          taskHint: "general",
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
      setHasError(true);
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
      }
    } catch {
      // Graceful silence
    }
  }

  const isFreshConversation = messages.length <= 1;

  return (
    <div className="w-full">
      {/* ============================================================ */}
      {/* MOBILE INTERFACE (md:hidden)                                  */}
      {/* ============================================================ */}
      <div className="md:hidden flex flex-col rounded-2xl border border-white-soft/15 bg-[#042422] text-white-soft shadow-xl overflow-hidden mb-20">
        {/* Companion Header */}
        <div className="flex items-center justify-between border-b border-white-soft/10 px-4 py-3 bg-[#063B36]">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <h2 className="text-[14px] font-semibold text-white-soft leading-none">
                {brand.companion.name}
              </h2>
              <p className="text-[11px] text-white-soft/70 mt-0.5">
                {brand.companion.systemName}
              </p>
            </div>
          </div>

          {/* Biological Waveform Companion State Badge */}
          <div className="flex items-center gap-1.5 rounded-full border border-mint/25 bg-white-soft/8 px-2.5 py-1 text-[11px] text-mint">
            <svg viewBox="0 0 32 14" fill="none" className="h-3 w-6 stroke-mint" aria-hidden="true">
              <path
                d="M 1 7 Q 6 7 9 7 T 13 2 T 18 12 T 23 7 T 27 4 L 31 7"
                strokeWidth="1.8"
                strokeLinecap="round"
                className={companionState === "thinking" ? "animate-pulse" : ""}
              />
            </svg>
            <span className="capitalize text-[10.5px] font-semibold text-white-soft/90">
              {companionState}
            </span>
          </div>
        </div>

        {/* Horizontal Suggested Prompt Chips */}
        <div className="border-b border-white-soft/8 bg-[#031d1b] px-3 py-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => void send(prompt)}
                className="shrink-0 rounded-full border border-white-soft/15 bg-white-soft/8 px-3 py-1 text-[12px] font-medium text-white-soft active:bg-mint/20 active:border-mint transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Conversation Feed */}
        <div
          ref={mobileContainerRef}
          onScroll={handleScroll}
          className="flex-1 max-h-[50vh] min-h-[300px] overflow-y-auto p-4 space-y-4 scroll-smooth bg-[#042422]"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1">
                <span className="text-[11px] text-white-soft/50 font-medium">
                  {msg.role === "user" ? "You" : brand.companion.name}
                </span>
                <span className="text-[10px] text-white-soft/30">• {msg.timestamp}</span>
              </div>

              <div
                className={`group relative max-w-[92%] rounded-xl p-3.5 text-[14px] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#0A4E47] text-white-soft border border-mint/20"
                    : "border border-white-soft/12 bg-white-soft/[0.07] text-white-soft/95 shadow-xs"
                }`}
              >
                <MarkdownRenderer content={msg.content} />

                {/* Follow-up suggestions */}
                {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="mt-3 border-t border-white-soft/10 pt-2">
                    <p className="text-[10.5px] font-bold uppercase tracking-wider text-mint mb-1.5">
                      Suggested Follow-Ups
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {msg.suggestedFollowUps.map((fu, fIdx) => (
                        <button
                          key={fIdx}
                          type="button"
                          onClick={() => void send(fu)}
                          className="rounded-md bg-white-soft/6 p-2 text-left text-[12px] text-white-soft hover:bg-white-soft/12 transition-colors"
                        >
                          {fu} →
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Assistant Footer */}
                {msg.role === "assistant" && (
                  <div className="mt-2.5 flex items-center justify-between border-t border-white-soft/10 pt-2 text-[11px] text-white-soft/45">
                    <span>{brand.name} · Educational</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="text-mint hover:underline font-medium"
                    >
                      {copiedId === msg.id ? "Copied ✓" : "Copy note"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Starter Inquiries if Fresh */}
          {isFreshConversation && (
            <div className="pt-2 space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-white-soft/50 px-1">
                Suggested Questions
              </p>
              {starterQuestions.map((sq, sIdx) => (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => void send(sq.prompt)}
                  className="w-full text-left rounded-lg border border-white-soft/12 bg-white-soft/5 p-3 hover:bg-white-soft/10 transition-all"
                >
                  <span className="text-[13px] font-semibold text-mint block">
                    {sq.title}
                  </span>
                  <span className="text-[11.5px] text-white-soft/70 block mt-0.5">
                    {sq.desc}
                  </span>
                </button>
              ))}
            </div>
          )}

          {loading && <BiologicalWaveformThinking />}
        </div>

        {/* Mobile Composer */}
        <div className="border-t border-white-soft/10 bg-[#031d1b] p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="flex items-center gap-2"
          >
            <Link
              href="/reports"
              aria-label="Upload report or view documents"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white-soft/15 bg-white-soft/8 text-white-soft/80"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
              </svg>
            </Link>

            <input
              id="ai-mobile-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="h-11 flex-1 rounded-lg border border-white-soft/15 bg-white-soft/10 px-3.5 text-[14px] text-white-soft placeholder-white-soft/40 outline-none focus:border-mint"
              placeholder="Ask anything about your care..."
            />

            <Button
              type="submit"
              variant="coral"
              disabled={loading || !input.trim()}
              className="h-11 px-4 text-[13px] rounded-lg font-semibold shrink-0"
            >
              {loading ? "..." : "Send"}
            </Button>
          </form>

          <p className="text-center text-[10.5px] text-white-soft/45 mt-2">
            Non-diagnostic educational guidance · Review with your doctor
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* DESKTOP INTERFACE (hidden on mobile)                          */}
      {/* ============================================================ */}
      <div className="hidden md:block relative overflow-hidden rounded-2xl border border-white-soft/15 bg-[#042422]/95 p-8 text-white-soft shadow-[0_20px_50px_rgba(2,16,14,0.4)] backdrop-blur-md">
        {/* Header with Companion State and Biological Waveform */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white-soft/10 pb-5">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-[18px] font-semibold text-white-soft">
                {brand.companion.name}
              </h2>
              <span className="text-white-soft/40">·</span>
              <span className="text-[13px] text-mint font-mono">{brand.companion.systemName}</span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium border ${
                  companionState === "thinking"
                    ? "bg-mint/20 text-mint border-mint/40"
                    : "bg-emerald-500/20 text-emerald-300 border-emerald-400/30"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="capitalize">{companionState}</span>
              </span>
            </div>
            <p className="mt-1 text-[13.5px] text-white-soft/75">
              {brand.companion.tagline}
            </p>
          </div>

          <div className="rounded border border-white-soft/15 bg-white-soft/6 px-3.5 py-1.5 text-[12px] text-white-soft/70">
            Notice: Educational guidance only · Non-diagnostic
          </div>
        </div>

        {/* Suggested Prompts Row */}
        <div className="mt-5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white-soft/50 block mb-2">
            Suggested Prompts
          </span>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => void send(item)}
                className="group flex items-center gap-2 rounded-md border border-white-soft/12 bg-white-soft/5 px-3.5 py-2 text-[13px] text-white-soft/85 transition-all hover:border-mint/40 hover:bg-white-soft/10 text-left"
              >
                <span>{item}</span>
                <span className="text-mint opacity-0 transition-opacity group-hover:opacity-100">→</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Feed */}
        <div
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="mt-6 max-h-[480px] min-h-[260px] overflow-y-auto space-y-4 pr-1 scroll-smooth"
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionTokens.fast, ease: motionTokens.easeOutSoft }}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] text-white-soft/50 font-medium">
                  {msg.role === "user" ? "You" : brand.companion.name}
                </span>
                <span className="text-[11px] text-white-soft/35">• {msg.timestamp}</span>
              </div>
              <div
                className={`group relative max-w-[88%] rounded-xl p-4.5 text-[14.5px] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#0A4E47] text-white-soft border border-mint/25"
                    : "border border-white-soft/12 bg-white-soft/[0.06] text-white-soft/95 shadow-sm"
                }`}
              >
                <MarkdownRenderer content={msg.content} />

                {/* Suggested follow-ups */}
                {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="mt-4 border-t border-white-soft/10 pt-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-mint mb-2">
                      Related Follow-Ups
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedFollowUps.map((fu, fIdx) => (
                        <button
                          key={fIdx}
                          type="button"
                          onClick={() => void send(fu)}
                          className="rounded-md border border-white-soft/12 bg-white-soft/6 px-2.5 py-1 text-[12px] text-white-soft/80 hover:bg-white-soft/12 hover:text-white-soft transition-colors"
                        >
                          {fu} →
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {msg.role === "assistant" && (
                  <div className="mt-3 flex items-center justify-between border-t border-white-soft/10 pt-2 text-[12px] text-white-soft/40">
                    <span className="text-[11px] italic">{brand.name} · Clinical Guidance</span>
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

          {loading && <BiologicalWaveformThinking />}
        </div>

        {/* Desktop Input Composer */}
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
              className="h-13 w-full rounded-xl border border-white-soft/15 bg-white-soft/8 pl-5 pr-28 text-[14.5px] text-white-soft placeholder-white-soft/40 outline-none transition-all focus:border-mint focus:shadow-[0_0_0_2px_rgba(127,212,208,0.2)]"
              placeholder="Ask anything about your diagnosis, biopsy terms, or next steps..."
            />
            <Button
              type="submit"
              variant="coral"
              className="absolute right-2 top-2 bottom-2 px-5 py-0 h-9 text-[13.5px] font-semibold"
              disabled={loading || !input.trim()}
            >
              {loading ? "Sending..." : "Ask Companion"}
            </Button>
          </div>
        </form>

        {/* Bottom Safety Links */}
        <div className="mt-4 flex flex-wrap items-center justify-between text-[12px] text-white-soft/50 gap-2">
          <p>
            Educational guidance only. Always review pathology and treatment options with your oncologist.
          </p>
          <Link href="/reports" className="text-mint hover:underline">
            Decode full pathology report →
          </Link>
        </div>
      </div>
    </div>
  );
}
