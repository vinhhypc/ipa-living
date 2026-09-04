import type { Metadata } from "next";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { fetchSubmissionCounts } from "@/lib/dashboard/drm-log";

export const metadata: Metadata = {
  title: { absolute: "Dashboard | IPA Living" },
  robots: { index: false, follow: false },
};

// Admin: luôn render mới, không cache số liệu.
export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { counts } = await fetchSubmissionCounts();

  return <DashboardShell counts={counts}>{children}</DashboardShell>;
}
