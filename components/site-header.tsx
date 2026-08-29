"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { navLinks, site } from "@/lib/utils";
import { motionTokens } from "@/lib/motion";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const tone = pathname === "/" || pathname === "/ai" ? "dark" : "light";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const floating = scrolled || open;
  const darkHero = tone === "dark" && !floating;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={`pointer-events-auto mx-auto mt-3 w-[min(1240px,calc(100%-24px))] transition-[background-color,box-shadow,border-color,backdrop-filter] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          floating
            ? "rounded-full border border-forest/10 bg-ivory/85 shadow-[var(--shadow-nav)] backdrop-blur-xl"
            : "rounded-full border border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className={`text-[15px] font-bold tracking-[0.18em] transition-opacity hover:opacity-90 ${
              darkHero ? "text-white-soft" : "text-forest"
            }`}
          >
            {site.name}
          </Link>

          {/* Informational Navigation */}
          <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors duration-180 ${
                    darkHero
                      ? active
                        ? "text-mint font-bold"
                        : "text-white-soft/80 hover:text-white-soft"
                      : active
                        ? "text-forest font-bold"
                        : "text-forest/70 hover:text-forest"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Patient Portal / Dashboard Link */}
            <Link
              href="/dashboard"
              className={`text-[12px] font-bold tracking-[0.14em] uppercase flex items-center gap-1.5 transition-colors ${
                darkHero ? "text-mint hover:text-white-soft" : "text-teal hover:text-forest"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Portal</span>
            </Link>
          </nav>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Core Action: Ask ONCO-AID */}
            <Link
              href="/ai"
              className={`hidden items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-wider transition-all sm:inline-flex ${
                darkHero
                  ? "border border-cyan/30 bg-cyan/10 text-cyan hover:bg-cyan/20"
                  : "border border-forest/15 bg-forest/5 text-forest hover:bg-forest/10"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
              Ask AI
            </Link>

            {/* Find Care Button */}
            <Button
              href="/appointments"
              variant={darkHero ? "coral" : "primary"}
              className="hidden sm:inline-flex px-4 py-2 text-[13px]"
            >
              Find Care
            </Button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
                darkHero ? "text-white-soft" : "text-forest"
              }`}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-px w-5 bg-current transition-transform duration-180 ${open ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-5 bg-current transition-opacity duration-180 ${open ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  className={`absolute left-0 h-px w-5 bg-current transition-transform duration-180 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionTokens.normal, ease: motionTokens.easeOutSoft }}
            className="pointer-events-auto fixed inset-0 z-40 bg-forest/98 px-6 pt-24 pb-8 text-white-soft backdrop-blur-xl lg:hidden flex flex-col justify-between"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-white-soft/10 px-4 py-3 text-xl font-serif tracking-tight text-mint flex items-center justify-between"
              >
                <span>Patient Portal (Arjun Mehta)</span>
                <span>→</span>
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-2.5 text-2xl font-serif tracking-tight text-white-soft hover:bg-white-soft/10"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Actions Drawer Bottom */}
            <div className="space-y-3 pt-6 border-t border-white-soft/10">
              <Link
                href="/ai"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan/40 bg-cyan/10 py-3.5 text-[15px] font-semibold text-cyan"
              >
                <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
                Ask ONCO-AID Assistant →
              </Link>
              <Button
                href="/appointments"
                variant="coral"
                onClick={() => setOpen(false)}
                className="w-full justify-center py-3.5 text-[15px]"
              >
                Find Care & Specialists
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
