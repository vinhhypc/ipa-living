import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, TriangleAlert } from "lucide-react";

import { FORM_CATALOG, isFormCode } from "@/lib/forms/catalog";
import { fetchSubmissions } from "@/lib/dashboard/drm-log";
import { SubmissionsTable } from "@/components/dashboard/submissions-table";
import { groupStyle } from "@/components/dashboard/group-meta";

// Admin: không cache, mỗi lần điều hướng vào form gọi lại DRM.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const name = isFormCode(code) ? FORM_CATALOG[code].name : "Form";
  return { title: { absolute: `${name} | Dashboard IPA Living` } };
}

export default async function FormSubmissionsPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  if (!isFormCode(code)) notFound();

  const form = FORM_CATALOG[code];
  const result = await fetchSubmissions(code);
  const style = groupStyle(form.group);
  const Icon = style.icon;

  return (
    <div className="space-y-6">
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br p-5 text-white shadow-sm sm:p-6 ${style.gradient}`}
      >
        <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-16 right-24 h-40 w-40 rounded-full bg-white/5" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30 backdrop-blur">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                {form.group}
              </p>
              <h1 className="mt-0.5 text-xl font-bold tracking-tight sm:text-2xl">
                {form.name}
              </h1>
              <p className="mt-1 font-mono text-xs text-white/70">
                {form.code} · rule #{form.ruleId}
              </p>
            </div>
          </div>

          <Link
            href={form.publicPath}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/25"
          >
            <ExternalLink className="h-4 w-4" />
            Xem form
          </Link>
        </div>
      </div>

      {result.ok ? null : (
        <p className="flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-800">
          <TriangleAlert className="h-4 w-4 shrink-0" />
          {result.error}
        </p>
      )}

      <SubmissionsTable form={form} rows={result.rows} />
    </div>
  );
}
