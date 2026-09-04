"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { DASHBOARD_COOKIE, MOCK_CREDENTIALS } from "@/lib/dashboard/constants";

export type LoginState = { error?: string };

/**
 * MOCK login: so khớp với `MOCK_CREDENTIALS` (admin / admin). Khi có API thật,
 * thay phần so khớp bằng lời gọi xác thực và lưu token vào cookie.
 */
export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/dashboard");

  if (
    username !== MOCK_CREDENTIALS.username ||
    password !== MOCK_CREDENTIALS.password
  ) {
    return { error: "Sai tài khoản hoặc mật khẩu." };
  }

  const store = await cookies();
  store.set(DASHBOARD_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect(next.startsWith("/dashboard") ? next : "/dashboard");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(DASHBOARD_COOKIE);
  redirect("/dashboard/login");
}
