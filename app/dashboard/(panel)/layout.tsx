import type { Metadata } from "next";
import { cookies } from "next/headers";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DASHBOARD_USER_COOKIE } from "@/lib/dashboard/constants";
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
  const [{ counts }, cookieStore] = await Promise.all([
    fetchSubmissionCounts(),
    cookies(),
  ]);
  const username = cookieStore.get(DASHBOARD_USER_COOKIE)?.value ?? "";

  return (
    <DashboardShell counts={counts} username={username}>
      {children}
    </DashboardShell>
  );
}
