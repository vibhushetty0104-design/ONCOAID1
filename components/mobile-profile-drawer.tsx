"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { demoPatient } from "@/lib/demo-patient";

interface MobileProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileProfileDrawer({ isOpen, onClose }: MobileProfileDrawerProps) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-forest/60 backdrop-blur-sm"
          />

          {/* Slide-over Drawer Sheet */}
          <motion.aside
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex h-full w-[85%] max-w-[340px] flex-col justify-between bg-white-soft p-6 shadow-2xl overflow-y-auto"
            aria-label="Patient Profile and Settings"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-forest/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-mint font-bold text-[14px]">
                    AM
                  </div>
                  <div>
                    <h2 className="text-[15px] font-bold text-forest leading-tight">
                      {demoPatient.name}
                    </h2>
                    <span className="text-[11px] font-medium text-warm-gray">
                      Patient · {demoPatient.city}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-2 text-forest/60 hover:bg-forest/5 hover:text-forest transition-colors"
                  aria-label="Close profile drawer"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Health Identifier Card */}
              <div className="mt-4 rounded-xl border border-forest/8 bg-ivory/60 p-3.5 text-[12px]">
                <div className="flex items-center justify-between text-warm-gray">
                  <span className="font-semibold uppercase tracking-wider text-[10px]">National Health ID</span>
                  <span className="text-emerald-700 font-semibold text-[10.5px]">✓ Verified</span>
                </div>
                <p className="font-mono text-[12.5px] font-bold text-forest mt-1">
                  {demoPatient.healthId}
                </p>
                <p className="text-[11px] text-blue-gray mt-1">
                  Primary: {demoPatient.primaryHospital}
                </p>
              </div>

              {/* Quick Navigation Links */}
              <div className="mt-6 space-y-1">
                <span className="text-meta-ui text-warm-gray block px-2 mb-2">
                  Patient Services
                </span>
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[14px] font-medium text-forest hover:bg-ivory transition-colors"
                >
                  <span>Patient Portal Home</span>
                  <span className="text-warm-gray text-[12px]">→</span>
                </Link>
                <Link
                  href="/dashboard/journey"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[14px] font-medium text-forest hover:bg-ivory transition-colors"
                >
                  <span>Care Pathway Timeline</span>
                  <span className="text-warm-gray text-[12px]">→</span>
                </Link>
                <Link
                  href="/reports"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[14px] font-medium text-forest hover:bg-ivory transition-colors"
                >
                  <span>My Clinical Documents</span>
                  <span className="text-warm-gray text-[12px]">→</span>
                </Link>
                <Link
                  href="/appointments"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[14px] font-medium text-forest hover:bg-ivory transition-colors"
                >
                  <span>Appointments & Consults</span>
                  <span className="text-warm-gray text-[12px]">→</span>
                </Link>
              </div>

              {/* Settings & Accessibility */}
              <div className="mt-6 pt-5 border-t border-forest/10 space-y-1">
                <span className="text-meta-ui text-warm-gray block px-2 mb-2">
                  Preferences & Compliance
                </span>
                <div className="flex items-center justify-between px-3 py-2 text-[13px] text-forest">
                  <span>Language</span>
                  <span className="text-[12px] font-medium text-warm-gray">English (IN)</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 text-[13px] text-forest">
                  <span>Care Companion</span>
                  <span className="rounded-md bg-forest/8 px-2 py-0.5 text-[11px] font-medium text-teal">Active</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 text-[13px] text-forest">
                  <span>DPDP Compliance</span>
                  <span className="text-emerald-700 font-medium text-[11.5px]">Isolated Client</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 border-t border-forest/10 pt-4">
              <Link
                href="/about"
                onClick={onClose}
                className="block text-center text-[12.5px] font-medium text-warm-gray hover:text-forest transition-colors"
              >
                About ONCO-AID Clinical Standards
              </Link>
              <p className="mt-2 text-center text-[10.5px] text-warm-gray/70">
                Version 5.5 · India Oncology Care
              </p>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
