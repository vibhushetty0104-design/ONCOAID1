"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error securely for diagnostics
    console.error("ONCO-AID Route Error:", error);
  }, [error]);

  return (
    <main id="main" className="container-page flex min-h-[70vh] flex-col items-center justify-center py-28 text-center">
      <div className="max-w-xl rounded-[32px] border border-forest/10 bg-white-soft p-8 shadow-[var(--shadow-card)] md:p-12">
        <span className="label text-coral">Service Notice</span>
        <h1 className="editorial-serif mt-3 text-[2.6rem] text-forest">
          We couldn&apos;t load this page.
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-blue-gray">
          An unexpected issue occurred while retrieving this section of ONCO-AID. Your saved records and active pathways remain secure.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => reset()} variant="primary" className="px-6 py-2.5 text-[14px]">
            Try loading again
          </Button>
          <Link
            href="/"
            className="rounded-full border border-forest/15 bg-ivory px-5 py-2.5 text-[14px] font-medium text-forest hover:bg-forest/5 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>

        <p className="mt-6 text-[12px] text-warm-gray">
          If you require urgent medical assistance, please contact your hospital or emergency services (112).
        </p>
      </div>
    </main>
  );
}
