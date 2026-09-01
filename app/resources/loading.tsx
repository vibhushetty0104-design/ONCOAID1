export default function ResourcesLoading() {
  return (
    <main id="main" className="container-page pb-24 pt-8 animate-pulse">
      <div className="max-w-2xl space-y-3">
        <div className="h-4 w-28 rounded-full bg-forest/10" />
        <div className="h-10 w-3/4 rounded-2xl bg-forest/15" />
        <div className="h-4 w-full rounded-lg bg-forest/8" />
      </div>

      <div className="mt-8 space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-[28px] border border-forest/10 bg-white-soft/70 p-6 space-y-3"
          >
            <div className="flex justify-between">
              <div className="h-4 w-20 rounded-full bg-forest/10" />
              <div className="h-4 w-16 rounded-full bg-forest/10" />
            </div>
            <div className="h-6 w-3/5 rounded-xl bg-forest/15" />
            <div className="h-10 w-full rounded-lg bg-forest/6" />
          </div>
        ))}
      </div>
    </main>
  );
}
