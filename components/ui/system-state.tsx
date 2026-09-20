"use client";

import React from "react";
import Link from "next/link";

interface ActionProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  primaryAction?: ActionProps;
  secondaryAction?: ActionProps;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-dashed border-forest/15 bg-white-soft/50 ${className}`}>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/8 text-forest mb-3.5 shadow-2xs">
        {icon || (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
            <path d="M13 2v7h7" />
          </svg>
        )}
      </div>

      <h3 className="font-serif text-[17px] font-medium text-forest">
        {title}
      </h3>

      <p className="text-[13px] text-blue-gray mt-1 max-w-sm leading-relaxed">
        {description}
      </p>

      {(primaryAction || secondaryAction) && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          {primaryAction && (
            primaryAction.href ? (
              <Link
                href={primaryAction.href}
                className="rounded-full bg-forest px-4 py-2 text-[12.5px] font-medium text-white shadow-2xs hover:bg-forest-mid active:scale-[0.99]"
              >
                {primaryAction.label}
              </Link>
            ) : (
              <button
                type="button"
                onClick={primaryAction.onClick}
                className="rounded-full bg-forest px-4 py-2 text-[12.5px] font-medium text-white shadow-2xs hover:bg-forest-mid active:scale-[0.99]"
              >
                {primaryAction.label}
              </button>
            )
          )}

          {secondaryAction && (
            secondaryAction.href ? (
              <Link
                href={secondaryAction.href}
                className="rounded-full border border-forest/20 bg-ivory px-4 py-2 text-[12.5px] font-medium text-forest hover:bg-white-soft"
              >
                {secondaryAction.label}
              </Link>
            ) : (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                className="rounded-full border border-forest/20 bg-ivory px-4 py-2 text-[12.5px] font-medium text-forest hover:bg-white-soft"
              >
                {secondaryAction.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

interface LoadingStateProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function LoadingState({
  title = "Loading clinical data...",
  subtitle = "Synthesizing validated oncology guidance",
  className = "",
}: LoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-forest/10 bg-white-soft ${className}`}>
      {/* Biological Waveform Pulse */}
      <div className="relative flex h-14 w-28 items-center justify-center rounded-2xl bg-[#082221] p-3 text-mint border border-mint/20 shadow-inner mb-4">
        <svg viewBox="0 0 80 28" fill="none" className="h-full w-full stroke-mint">
          <path
            d="M 2 14 Q 12 14 18 14 T 26 6 T 36 22 T 46 14 T 54 8 T 64 16 T 72 14 L 78 14"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="animate-pulse"
          />
        </svg>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-cyan animate-ping" />
      </div>

      <h3 className="font-serif text-[16.5px] font-medium text-forest">
        {title}
      </h3>

      <p className="text-[12.5px] text-teal font-medium mt-0.5">
        {subtitle}
      </p>
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  description?: string;
  retryAction?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Unable to load health record",
  description = "We encountered a temporary network glitch. Your data remains secure.",
  retryAction,
  className = "",
}: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-rose-200 bg-rose-50/50 ${className}`}>
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-700 mb-3">
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>

      <h3 className="font-serif text-[16px] font-medium text-rose-950">
        {title}
      </h3>

      <p className="text-[12.5px] text-rose-800/80 mt-1 max-w-xs leading-relaxed">
        {description}
      </p>

      {retryAction && (
        <button
          type="button"
          onClick={retryAction}
          className="mt-4 rounded-full bg-rose-900 px-4 py-1.5 text-[12px] font-medium text-white shadow-2xs hover:bg-rose-950"
        >
          Try Again
        </button>
      )}

      <p className="mt-4 border-t border-rose-200/60 pt-3 text-[11px] text-rose-900/60">
        If this is an urgent clinical symptom, contact your hospital care team directly.
      </p>
    </div>
  );
}

interface SuccessStateProps {
  title: string;
  description: string;
  detailBadge?: string;
  nextAction?: ActionProps;
  className?: string;
}

export function SuccessState({
  title,
  description,
  detailBadge,
  nextAction,
  className = "",
}: SuccessStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-emerald-200 bg-emerald-50/50 ${className}`}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white mb-3 shadow-2xs">
        <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>

      {detailBadge && (
        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10.5px] font-semibold text-emerald-800 mb-1.5">
          {detailBadge}
        </span>
      )}

      <h3 className="font-serif text-[17px] font-medium text-emerald-950">
        {title}
      </h3>

      <p className="text-[13px] text-emerald-900/80 mt-1 max-w-sm leading-relaxed">
        {description}
      </p>

      {nextAction && (
        nextAction.href ? (
          <Link
            href={nextAction.href}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-800 px-5 py-2 text-[12.5px] font-medium text-white shadow-2xs hover:bg-emerald-900"
          >
            <span>{nextAction.label}</span>
            <span>→</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={nextAction.onClick}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-800 px-5 py-2 text-[12.5px] font-medium text-white shadow-2xs hover:bg-emerald-900"
          >
            <span>{nextAction.label}</span>
            <span>→</span>
          </button>
        )
      )}
    </div>
  );
}
