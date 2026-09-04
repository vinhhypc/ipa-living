const WIDTHS = ["w-full", "w-11/12", "w-10/12", "w-full", "w-9/12", "w-11/12"];

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-28 animate-pulse rounded-2xl bg-slate-200" />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-4 py-3">
          <div className="h-8 w-64 max-w-full animate-pulse rounded-lg bg-slate-100" />
        </div>
        <div className="space-y-3 p-4">
          {WIDTHS.map((w, i) => (
            <div
              key={i}
              className={`h-6 animate-pulse rounded bg-slate-100 ${w}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
