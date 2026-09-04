import Link from "next/link";
import { ArrowUpRight, Inbox, Layers, TrendingUp, TriangleAlert } from "lucide-react";

import { FORM_LIST } from "@/lib/forms/catalog";
import { fetchSubmissionCounts } from "@/lib/dashboard/drm-log";
import { groupStyle } from "@/components/dashboard/group-meta";

export const dynamic = "force-dynamic";

export default async function DashboardOverviewPage() {
  const { counts, error } = await fetchSubmissionCounts();
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  const top = [...FORM_LIST].sort(
    (a, b) => (counts[b.code] ?? 0) - (counts[a.code] ?? 0),
  )[0];
  const groupCount = new Set(FORM_LIST.map((f) => f.group)).size;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Tổng quan
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Tổng hợp lượt gửi từ tất cả form marketing.
          </p>
        </div>
        <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600">
          Nguồn: DRM log
        </span>
      </div>

      {error ? (
        <p className="flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-800">
          <TriangleAlert className="h-4 w-4 shrink-0" />
          {error}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          className="from-brand-navy to-brand-navy-light"
          icon={<Inbox className="h-5 w-5" />}
          label="Tổng lượt gửi"
          value={total.toLocaleString("vi-VN")}
        />
        <StatCard
          className="from-emerald-500 to-teal-600"
          icon={<Layers className="h-5 w-5" />}
          label="Số loại form"
          value={`${FORM_LIST.length}`}
          hint={`${groupCount} nhóm sản phẩm`}
        />
        <StatCard
          className="from-amber-500 to-orange-500"
          icon={<TrendingUp className="h-5 w-5" />}
          label="Form nhiều nhất"
          value={`${counts[top.code] ?? 0}`}
          hint={top.name}
        />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-slate-500">
          Tất cả form
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {FORM_LIST.map((form) => {
            const style = groupStyle(form.group);
            const Icon = style.icon;
            return (
              <Link
                key={form.code}
                href={`/dashboard/${form.code}`}
                className={`group relative overflow-hidden rounded-2xl border border-t-4 border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${style.border}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm ${style.solid}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-slate-500" />
                </div>
                <p
                  className={`mt-3 text-xs font-semibold uppercase tracking-wider ${style.text}`}
                >
                  {form.group}
                </p>
                <p className="mt-0.5 line-clamp-2 min-h-10 font-semibold text-slate-800">
                  {form.name}
                </p>
                <div className="mt-3 flex items-end justify-between border-t border-slate-100 pt-3">
                  <span className="font-mono text-xs text-slate-400">
                    {form.publicPath}
                  </span>
                  <span
                    className={`rounded-lg px-2 py-0.5 text-xl font-bold tabular-nums ${style.soft}`}
                  >
                    {counts[form.code] ?? 0}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  className,
  icon,
  label,
  value,
  hint,
}: {
  className: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br p-5 text-white shadow-sm ${className}`}
    >
      <div className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-white/10" />
      <div className="relative flex items-center gap-2 text-white/80">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="relative mt-2 text-3xl font-bold tracking-tight">{value}</p>
      {hint ? (
        <p className="relative mt-1 truncate text-xs text-white/70">{hint}</p>
      ) : null}
    </div>
  );
}
