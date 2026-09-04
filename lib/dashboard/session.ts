import { cookies } from "next/headers";

import { DASHBOARD_COOKIE } from "@/lib/dashboard/constants";

export { DASHBOARD_COOKIE, MOCK_CREDENTIALS } from "@/lib/dashboard/constants";

/** Đọc trạng thái đăng nhập từ cookie (dùng trong Server Component / action). */
export async function isDashboardAuthed(): Promise<boolean> {
  const store = await cookies();
  return store.get(DASHBOARD_COOKIE)?.value === "1";
}
