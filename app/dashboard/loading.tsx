export default function DashboardLoading() {
  return (
    <main id="main" className="container-page pb-24 pt-28 md:pt-32 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-forest/10 pb-6">
        <div className="space-y-3">
          <div className="h-5 w-40 rounded-full bg-forest/10" />
          <div className="h-10 w-64 rounded-2xl bg-forest/15" />
          <div className="h-4 w-80 rounded-lg bg-forest/8" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-32 rounded-full bg-forest/10" />
          <div className="h-9 w-32 rounded-full bg-forest/10" />
        </div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="h-64 rounded-[32px] border border-forest/10 bg-white-soft/70 p-8 space-y-4">
            <div className="h-4 w-32 rounded-full bg-coral/20" />
            <div className="h-8 w-60 rounded-xl bg-forest/10" />
            <div className="h-4 w-full rounded-lg bg-forest/8" />
            <div className="h-12 w-full rounded-2xl bg-forest/6 mt-6" />
          </div>

          <div className="h-56 rounded-[32px] bg-forest/15 p-8 space-y-4">
            <div className="h-4 w-36 rounded-full bg-forest/20" />
            <div className="h-8 w-72 rounded-xl bg-forest/20" />
            <div className="h-4 w-4/5 rounded-lg bg-forest/15" />
            <div className="h-10 w-44 rounded-full bg-forest/25 mt-4" />
          </div>

          <div className="h-48 rounded-[32px] border border-forest/10 bg-white-soft/70 p-6 space-y-3">
            <div className="h-4 w-28 rounded-full bg-forest/10" />
            <div className="h-6 w-48 rounded-xl bg-forest/10" />
            <div className="h-16 w-full rounded-2xl bg-forest/6" />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="h-60 rounded-[28px] border border-forest/10 bg-white-soft/70 p-6 space-y-3">
            <div className="h-4 w-24 rounded-full bg-forest/10" />
            <div className="h-6 w-36 rounded-xl bg-forest/10" />
            <div className="space-y-2 pt-2">
              <div className="h-10 w-full rounded-xl bg-forest/6" />
              <div className="h-10 w-full rounded-xl bg-forest/6" />
              <div className="h-10 w-full rounded-xl bg-forest/6" />
            </div>
          </div>

          <div className="h-60 rounded-[28px] border border-forest/10 bg-white-soft/70 p-6 space-y-3">
            <div className="h-4 w-32 rounded-full bg-forest/10" />
            <div className="h-6 w-40 rounded-xl bg-forest/10" />
            <div className="h-24 w-full rounded-2xl bg-forest/6" />
          </div>
        </div>
      </div>
    </main>
  );
}
