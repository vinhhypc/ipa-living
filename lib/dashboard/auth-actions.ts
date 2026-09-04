"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  DASHBOARD_COOKIE,
  DASHBOARD_USER_COOKIE,
} from "@/lib/dashboard/constants";
import { loginToDrm } from "@/lib/dashboard/drm-auth";

export type LoginState = { error?: string };

/**
 * Đăng nhập dashboard = đăng nhập DRM bằng đúng tài khoản người dùng nhập.
 * Lấy được token → lưu vào cookie phiên (httpOnly) để các call log dùng.
 */
export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/dashboard");

  if (!username || !password) {
    return { error: "Vui lòng nhập tài khoản và mật khẩu." };
  }

  let token: string;
  try {
    token = await loginToDrm(username, password);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Đăng nhập thất bại.",
    };
  }

  const store = await cookies();
  const opts = {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 8,
  };
  store.set(DASHBOARD_COOKIE, token, opts);
  store.set(DASHBOARD_USER_COOKIE, username, opts);

  redirect(next.startsWith("/dashboard") ? next : "/dashboard");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(DASHBOARD_COOKIE);
  store.delete(DASHBOARD_USER_COOKIE);
  redirect("/dashboard/login");
}
