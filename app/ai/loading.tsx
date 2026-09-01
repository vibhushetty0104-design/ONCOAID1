export default function AILoading() {
  return (
    <main id="main" className="container-page pb-24 pt-8 animate-pulse">
      <div className="max-w-2xl space-y-3">
        <div className="h-4 w-32 rounded-full bg-forest/10" />
        <div className="h-10 w-3/4 rounded-2xl bg-forest/15" />
        <div className="h-4 w-full rounded-lg bg-forest/8" />
      </div>

      <div className="mt-8">
        <div className="h-[520px] rounded-[32px] bg-[#0a1f1e]/40 p-8 space-y-6 border border-forest/15">
          <div className="flex justify-between border-b border-forest/10 pb-4">
            <div className="h-4 w-48 rounded-full bg-mint/20" />
            <div className="h-6 w-36 rounded-xl bg-amber-500/10" />
          </div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            <div className="h-16 rounded-2xl bg-forest/15" />
            <div className="h-16 rounded-2xl bg-forest/15" />
            <div className="h-16 rounded-2xl bg-forest/15" />
            <div className="h-16 rounded-2xl bg-forest/15" />
          </div>
          <div className="h-48 rounded-2xl bg-forest/10" />
        </div>
      </div>
    </main>
  );
}
