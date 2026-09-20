"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { navLinks, site } from "@/lib/utils";
import { motionTokens } from "@/lib/motion";
import { MobileProfileDrawer } from "@/components/mobile-profile-drawer";

const mobileQuickNav = [
  { href: "/", label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/dashboard/journey", label: "Journey", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" },
  { href: "/ai", label: "AI", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { href: "/reports", label: "Reports", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { href: "/specialists", label: "Care", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
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
    <>
      {/* Top Floating Desktop/Tablet Header */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div
          className={`pointer-events-auto mx-auto mt-2.5 w-[min(1240px,calc(100%-24px))] transition-[background-color,box-shadow,border-color,backdrop-filter] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            floating
              ? "rounded-full border border-forest/10 bg-[#f6f1e8]/92 shadow-[0_4px_20px_rgba(8,40,40,0.06)] backdrop-blur-lg"
              : "rounded-full border border-transparent bg-transparent"
          }`}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-2 sm:px-5">
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

              {/* Patient Portal Link */}
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
              {/* Core Action: Talk to ONCO-AID */}
              <Link
                href="/ai"
                className={`hidden items-center gap-1.5 rounded-full px-4 py-1.5 text-[12.5px] font-semibold tracking-wide transition-all sm:inline-flex ${
                  darkHero
                    ? "border border-cyan/40 bg-cyan/15 text-cyan hover:bg-cyan/25"
                    : "border border-forest/20 bg-forest/8 text-forest hover:bg-forest/15 font-bold"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
                Talk to ONCO-AID
              </Link>

              {/* Find Care Button */}
              <Button
                href="/appointments"
                variant={darkHero ? "coral" : "primary"}
                className="hidden sm:inline-flex px-4 py-2 text-[13px] font-semibold"
              >
                Find Care
              </Button>

              {/* Mobile Profile Trigger (Top-Right) */}
              <button
                type="button"
                onClick={() => setProfileOpen(true)}
                aria-label="Open Profile and Settings"
                className={`inline-flex items-center justify-center h-8 w-8 rounded-full font-bold text-[11px] tracking-wide lg:hidden transition-transform active:scale-95 ${
                  darkHero
                    ? "bg-white-soft/15 text-mint border border-white-soft/20"
                    : "bg-forest/10 text-forest border border-forest/15"
                }`}
              >
                AM
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                type="button"
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full lg:hidden transition-colors ${
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

        {/* Mobile Slide-down Drawer */}
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
                      Patient Command Center · Demo
                    </span>
                    <span className="font-serif text-[20px] text-white-soft font-medium">
                      Demo Patient Care Dashboard
                    </span>
                  </div>
                  <span className="text-mint text-[18px]">→</span>
                </Link>

                {/* Navigation Links */}
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

              {/* Actions Bottom */}
              <div className="space-y-3 pt-6 border-t border-white-soft/12">
                <Link
                  href="/ai"
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan/40 bg-cyan/15 py-3.5 text-[15px] font-semibold text-cyan"
                >
                  <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
                  Talk to ONCO-AID →
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

      {/* Mobile Floating Restrained Bottom Bar (Visible on mobile/tablet screens lg:hidden) */}
      {!open && (
        <nav
          aria-label="Mobile Quick Navigation"
          className="fixed inset-x-0 bottom-2.5 z-40 lg:hidden pointer-events-none px-3"
        >
          <div className="pointer-events-auto mx-auto max-w-[340px] rounded-2xl border border-forest/10 bg-[#f6f1e8]/92 p-1 shadow-[0_4px_16px_rgba(8,40,40,0.08)] backdrop-blur-lg">
            <div className="flex items-center justify-around">
              {mobileQuickNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex flex-col items-center justify-center min-w-[48px] min-h-[40px] rounded-xl px-2 py-0.5 text-[10px] font-medium transition-colors ${
                      isActive
                        ? "text-forest font-semibold bg-forest/8"
                        : "text-forest/70 hover:text-forest hover:bg-forest/4"
                    }`}
                  >
                    <svg
                      className="h-3.5 w-3.5 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={isActive ? 2.1 : 1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d={item.icon} />
                    </svg>
                    <span className="mt-0.5 tracking-tight">{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-forest" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Profile & Settings Drawer */}
      <MobileProfileDrawer isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
