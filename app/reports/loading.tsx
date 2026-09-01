export default function ReportsLoading() {
  return (
    <main id="main" className="container-page pb-24 pt-8 animate-pulse">
      <div className="max-w-2xl space-y-3">
        <div className="h-4 w-32 rounded-full bg-forest/10" />
        <div className="h-10 w-3/4 rounded-2xl bg-forest/15" />
        <div className="h-4 w-full rounded-lg bg-forest/8" />
      </div>

      <div className="mt-8 flex gap-3 border-b border-forest/10 pb-4">
        <div className="h-10 w-48 rounded-xl bg-forest/10" />
        <div className="h-10 w-48 rounded-xl bg-forest/10" />
        <div className="h-10 w-48 rounded-xl bg-forest/10" />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="h-96 rounded-[32px] border border-forest/10 bg-white-soft/70 p-8 space-y-4">
          <div className="h-4 w-36 rounded-full bg-forest/10" />
          <div className="h-8 w-60 rounded-xl bg-forest/15" />
          <div className="h-32 w-full rounded-2xl bg-forest/6" />
        </div>
        <div className="h-96 rounded-[32px] bg-forest/15 p-8 space-y-4">
          <div className="h-4 w-28 rounded-full bg-forest/20" />
          <div className="h-8 w-48 rounded-xl bg-forest/20" />
          <div className="h-28 w-full rounded-2xl bg-forest/10" />
        </div>
      </div>
    </main>
  );
}
