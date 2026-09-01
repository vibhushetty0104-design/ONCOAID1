export default function AppointmentsLoading() {
  return (
    <main id="main" className="container-page pb-24 pt-8 animate-pulse">
      <div className="max-w-2xl space-y-3">
        <div className="h-4 w-36 rounded-full bg-forest/10" />
        <div className="h-10 w-3/4 rounded-2xl bg-forest/15" />
        <div className="h-4 w-full rounded-lg bg-forest/8" />
      </div>

      <div className="mt-8 flex gap-2 border-b border-forest/10 pb-4">
        <div className="h-10 w-36 rounded-full bg-forest/15" />
        <div className="h-10 w-44 rounded-full bg-forest/8" />
        <div className="h-10 w-32 rounded-full bg-forest/8" />
      </div>

      <div className="mt-8">
        <div className="rounded-[32px] border border-forest/12 bg-white-soft/70 p-8 space-y-6">
          <div className="flex justify-between">
            <div className="space-y-2">
              <div className="h-4 w-28 rounded-full bg-forest/10" />
              <div className="h-8 w-56 rounded-xl bg-forest/15" />
              <div className="h-4 w-40 rounded-lg bg-forest/8" />
            </div>
            <div className="h-10 w-32 rounded-xl bg-forest/10" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="h-20 rounded-2xl bg-forest/6" />
            <div className="h-20 rounded-2xl bg-forest/6" />
            <div className="h-20 rounded-2xl bg-forest/6" />
          </div>
        </div>
      </div>
    </main>
  );
}
