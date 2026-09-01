export default function CancerTypesLoading() {
  return (
    <main id="main" className="container-page pb-24 pt-8 animate-pulse">
      <div className="max-w-2xl space-y-3">
        <div className="h-4 w-32 rounded-full bg-forest/10" />
        <div className="h-10 w-3/4 rounded-2xl bg-forest/15" />
        <div className="h-4 w-full rounded-lg bg-forest/8" />
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-forest/10 pb-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-9 w-24 rounded-full bg-forest/8" />
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-[28px] border border-forest/10 bg-white-soft/70 p-6 space-y-3"
          >
            <div className="h-4 w-20 rounded-full bg-forest/10" />
            <div className="h-6 w-36 rounded-xl bg-forest/15" />
            <div className="h-12 w-full rounded-lg bg-forest/6" />
          </div>
        ))}
      </div>
    </main>
  );
}
