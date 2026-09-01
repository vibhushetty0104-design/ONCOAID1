"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CancerTypesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Cancer Types Error:", error);
  }, [error]);

  return (
    <main id="main" className="container-page flex min-h-[70vh] flex-col items-center justify-center py-28 text-center">
      <div className="max-w-xl rounded-[32px] border border-forest/10 bg-white-soft p-8 shadow-[var(--shadow-card)] md:p-12">
        <span className="label text-forest">Directory Notice</span>
        <h1 className="editorial-serif mt-3 text-[2.4rem] text-forest">
          Could not load cancer condition guides.
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-blue-gray">
          We encountered an issue loading condition guides. Please retry or search our specialist directory.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => reset()} variant="primary" className="px-6 py-2.5 text-[14px]">
            Retry Directory
          </Button>
          <Link
            href="/specialists"
            className="rounded-full border border-forest/15 bg-ivory px-5 py-2.5 text-[14px] font-medium text-forest hover:bg-forest/5 transition-colors"
          >
            Find Specialists
          </Link>
        </div>
      </div>
    </main>
  );
}
