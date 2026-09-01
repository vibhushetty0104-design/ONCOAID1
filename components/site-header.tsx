"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
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

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeMenu]);

  const floating = scrolled || open;
  const darkHero = tone === "dark" && !floating;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={`pointer-events-auto mx-auto mt-3 w-[min(1240px,calc(100%-24px))] transition-[background-color,box-shadow,border-color,backdrop-filter] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          floating
            ? "rounded-full border border-forest/12 bg-[#f6f1e8]/92 shadow-[0_12px_32px_rgba(8,40,40,0.1)] backdrop-blur-xl"
            : "rounded-full border border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            aria-label="ONCO-AID Homepage"
            className={`text-[15px] font-bold tracking-[0.18em] transition-opacity hover:opacity-90 ${
              darkHero ? "text-white-soft" : "text-forest"
            }`}
          >
            {site.name}
          </Link>

          {/* Informational Navigation */}
          <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Primary Navigation">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[12.5px] font-semibold tracking-[0.12em] uppercase transition-colors duration-180 relative py-1 ${
                    darkHero
                      ? active
                        ? "text-mint font-bold"
                        : "text-white-soft/85 hover:text-white-soft"
                      : active
                        ? "text-forest font-bold"
                        : "text-forest/75 hover:text-forest"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span
                      className={`absolute bottom-0 inset-x-0 h-0.5 rounded-full ${
                        darkHero ? "bg-mint" : "bg-forest"
                      }`}
                    />
                  )}
                </Link>
              );
            })}

            {/* Patient Portal / Command Center Link */}
            <Link
              href="/dashboard"
              className={`text-[12px] font-bold tracking-[0.14em] uppercase flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors ${
                pathname === "/dashboard"
                  ? "bg-emerald-500/20 text-emerald-900 font-bold"
                  : darkHero
                    ? "text-mint hover:bg-white-soft/10"
                    : "text-teal bg-teal/8 hover:bg-teal/15 hover:text-forest"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Portal</span>
            </Link>
          </nav>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Core Action: Ask ONCO-AID */}
            <Link
              href="/ai"
              className={`hidden items-center gap-1.5 rounded-full px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-wider transition-all sm:inline-flex ${
                darkHero
                  ? "border border-cyan/40 bg-cyan/15 text-cyan hover:bg-cyan/25"
                  : "border border-forest/20 bg-forest/8 text-forest hover:bg-forest/15 font-bold"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
              Ask AI
            </Link>

            {/* Find Care Button */}
            <Button
              href="/appointments"
              variant={darkHero ? "coral" : "primary"}
              className="hidden sm:inline-flex px-4 py-2 text-[13px] font-semibold"
            >
              Find Care
            </Button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden transition-colors ${
                darkHero ? "text-white-soft hover:bg-white-soft/10" : "text-forest hover:bg-forest/10"
              }`}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-px w-5 bg-current transition-transform duration-180 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-5 bg-current transition-opacity duration-180 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-5 bg-current transition-transform duration-180 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
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
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: motionTokens.normal, ease: motionTokens.easeOutSoft }}
            className="pointer-events-auto fixed inset-0 z-40 bg-[#082828]/98 px-6 pt-24 pb-8 text-white-soft backdrop-blur-2xl lg:hidden flex flex-col justify-between overflow-y-auto"
          >
            <div className="space-y-6">
              {/* Patient Command Center Highlight */}
              <Link
                href="/dashboard"
                onClick={closeMenu}
                className="rounded-2xl border border-mint/30 bg-mint/10 p-4 text-white-soft flex items-center justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-mint block">
                    Patient Command Center
                  </span>
                  <span className="font-serif text-[20px] text-white-soft font-medium">
                    Arjun Mehta&apos;s Care Dashboard
                  </span>
                </div>
                <span className="text-mint text-[18px]">→</span>
              </Link>

              {/* Informational Navigation Links */}
              <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation Links">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`rounded-2xl px-3.5 py-3 text-2xl font-serif tracking-tight transition-colors ${
                        active
                          ? "bg-white-soft/15 text-mint font-medium"
                          : "text-white-soft/90 hover:bg-white-soft/10 hover:text-white-soft"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Actions Drawer Bottom */}
            <div className="space-y-3 pt-6 border-t border-white-soft/12">
              <Link
                href="/ai"
                onClick={closeMenu}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan/40 bg-cyan/15 py-3.5 text-[15px] font-semibold text-cyan"
              >
                <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
                Ask ONCO-AID Assistant →
              </Link>
              <Button
                href="/appointments"
                variant="coral"
                onClick={closeMenu}
                className="w-full justify-center py-3.5 text-[15px] font-semibold"
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
