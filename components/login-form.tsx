"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const [tab, setTab] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("arjun.mehta@example.com");
  const [password, setPassword] = useState("••••••••••••");
  const [name, setName] = useState("Arjun Mehta");
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 600);
  }

  function handleDemoLogin() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 400);
  }

  return (
    <div className="w-full max-w-md rounded-[32px] border border-forest/10 bg-white-soft p-6 shadow-[var(--shadow-card)] sm:p-8">
      {/* Tab Switcher */}
      <div className="flex rounded-2xl bg-ivory p-1 border border-forest/8 mb-6" role="tablist" aria-label="Authentication mode">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "signin"}
          onClick={() => setTab("signin")}
          className={`flex-1 rounded-xl py-2 text-[13px] font-semibold transition-all ${
            tab === "signin"
              ? "bg-forest text-white-soft shadow-xs"
              : "text-forest/70 hover:text-forest"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "signup"}
          onClick={() => setTab("signup")}
          className={`flex-1 rounded-xl py-2 text-[13px] font-semibold transition-all ${
            tab === "signup"
              ? "bg-forest text-white-soft shadow-xs"
              : "text-forest/70 hover:text-forest"
          }`}
        >
          Create Account
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "forgot"}
          onClick={() => setTab("forgot")}
          className={`flex-1 rounded-xl py-2 text-[13px] font-semibold transition-all ${
            tab === "forgot"
              ? "bg-forest text-white-soft shadow-xs"
              : "text-forest/70 hover:text-forest"
          }`}
        >
          Reset
        </button>
      </div>

      {tab === "signin" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="signin-email" className="block text-[12px] font-bold uppercase tracking-wider text-warm-gray mb-1.5">
              Email Address
            </label>
            <input
              id="signin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-2xl border border-forest/15 bg-ivory px-4 text-[14px] text-forest outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/20"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="signin-password" className="block text-[12px] font-bold uppercase tracking-wider text-warm-gray">
                Password
              </label>
              <button
                type="button"
                onClick={() => setTab("forgot")}
                className="text-[12px] text-teal hover:underline font-medium"
              >
                Forgot?
              </button>
            </div>
            <input
              id="signin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full rounded-2xl border border-forest/15 bg-ivory px-4 text-[14px] text-forest outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/20"
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-full justify-center py-3 text-[14px] mt-2" disabled={loading}>
            {loading ? "Accessing Secure Portal..." : "Sign In to ONCO-AID"}
          </Button>

          {/* Quick Demo Login CTA */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full rounded-2xl border border-coral/30 bg-coral/10 py-3 text-[13.5px] font-bold text-coral-deep hover:bg-coral/20 transition-all flex items-center justify-center"
            >
              Sign In as Demo Patient (Arjun Mehta)
            </button>
          </div>

          {/* Google Auth UI */}
          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-forest/10" />
            </div>
            <span className="relative bg-white-soft px-3 text-[12px] text-warm-gray">Or continue with</span>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-forest/15 bg-ivory py-2.5 text-[13.5px] font-medium text-forest hover:bg-mint/30 transition-colors"
          >
            <span>Google Account (Demo)</span>
          </button>
        </form>
      )}

      {tab === "signup" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="signup-name" className="block text-[12px] font-bold uppercase tracking-wider text-warm-gray mb-1.5">
              Full Name
            </label>
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Arjun Mehta"
              className="h-12 w-full rounded-2xl border border-forest/15 bg-ivory px-4 text-[14px] text-forest outline-none focus:border-cobalt"
              required
            />
          </div>
          <div>
            <label htmlFor="signup-email" className="block text-[12px] font-bold uppercase tracking-wider text-warm-gray mb-1.5">
              Email Address
            </label>
            <input
              id="signup-email"
              type="email"
              placeholder="name@example.com"
              className="h-12 w-full rounded-2xl border border-forest/15 bg-ivory px-4 text-[14px] text-forest outline-none focus:border-cobalt"
              required
            />
          </div>
          <div>
            <label htmlFor="signup-password" className="block text-[12px] font-bold uppercase tracking-wider text-warm-gray mb-1.5">
              Create Password
            </label>
            <input
              id="signup-password"
              type="password"
              placeholder="••••••••••••"
              className="h-12 w-full rounded-2xl border border-forest/15 bg-ivory px-4 text-[14px] text-forest outline-none focus:border-cobalt"
              required
            />
          </div>
          <Button type="submit" variant="coral" className="w-full justify-center py-3 text-[14px] mt-2">
            Create Patient Account →
          </Button>
        </form>
      )}

      {tab === "forgot" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setResetSent(true);
            setTimeout(() => {
              setResetSent(false);
              setTab("signin");
            }, 3000);
          }}
          className="space-y-4"
        >
          <p className="text-[13.5px] text-blue-gray">
            Enter your email address and we will send you a secure link to reset your credentials.
          </p>
          {resetSent && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-500/30 p-3 text-[13px] text-emerald-800 font-medium">
              Password reset link sent to your email.
            </div>
          )}
          <div>
            <label htmlFor="forgot-email" className="block text-[12px] font-bold uppercase tracking-wider text-warm-gray mb-1.5">
              Email Address
            </label>
            <input
              id="forgot-email"
              type="email"
              defaultValue="arjun.mehta@example.com"
              className="h-12 w-full rounded-2xl border border-forest/15 bg-ivory px-4 text-[14px] text-forest outline-none focus:border-cobalt"
              required
            />
          </div>
          <Button type="submit" variant="primary" className="w-full justify-center py-3 text-[14px]">
            Send Reset Link
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-[12px] leading-relaxed text-warm-gray">
        Patient privacy is strictly protected under Indian Digital Personal Data Protection (DPDP) and DISHA guidelines.
      </p>
    </div>
  );
}
