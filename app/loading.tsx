export default function RootLoading() {
  return (
    <div className="container-page min-h-[70vh] py-28 md:py-36 animate-pulse">
      <div className="max-w-3xl space-y-6">
        <div className="h-6 w-32 rounded-full bg-forest/10" />
        <div className="h-12 w-3/4 rounded-2xl bg-forest/10" />
        <div className="h-5 w-full max-w-xl rounded-xl bg-forest/8" />
        <div className="h-5 w-2/3 rounded-xl bg-forest/8" />
        <div className="flex gap-4 pt-4">
          <div className="h-12 w-36 rounded-full bg-forest/15" />
          <div className="h-12 w-36 rounded-full bg-forest/8" />
        </div>
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-48 rounded-[28px] border border-forest/8 bg-white-soft/60 p-6 space-y-4"
          >
            <div className="h-4 w-20 rounded-full bg-forest/10" />
            <div className="h-6 w-4/5 rounded-xl bg-forest/10" />
            <div className="h-4 w-full rounded-lg bg-forest/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
