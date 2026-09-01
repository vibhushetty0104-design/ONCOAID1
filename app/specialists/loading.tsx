export default function SpecialistsLoading() {
  return (
    <main id="main" className="container-page pb-24 pt-8 animate-pulse">
      {/* Intro skeleton */}
      <div className="max-w-2xl space-y-3">
        <div className="h-4 w-32 rounded-full bg-forest/10" />
        <div className="h-10 w-3/4 rounded-2xl bg-forest/15" />
        <div className="h-4 w-full rounded-lg bg-forest/8" />
      </div>

      {/* Filter bar skeleton */}
      <div className="mt-8 flex flex-wrap gap-3 border-b border-forest/10 pb-6">
        <div className="h-12 w-48 rounded-2xl bg-forest/8" />
        <div className="h-12 w-48 rounded-2xl bg-forest/8" />
        <div className="h-12 w-64 rounded-2xl bg-forest/8" />
      </div>

      {/* Specialist cards skeleton */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-[28px] border border-forest/10 bg-white-soft/70 p-6 space-y-4"
          >
            <div className="flex justify-between">
              <div className="h-4 w-28 rounded-full bg-forest/10" />
              <div className="h-4 w-16 rounded-full bg-forest/10" />
            </div>
            <div className="h-7 w-48 rounded-xl bg-forest/15" />
            <div className="h-4 w-36 rounded-lg bg-forest/8" />
            <div className="h-16 w-full rounded-2xl bg-forest/5 pt-2" />
            <div className="flex gap-2 pt-2">
              <div className="h-9 w-32 rounded-full bg-forest/10" />
              <div className="h-9 w-24 rounded-full bg-forest/8" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
