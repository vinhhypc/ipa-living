import { NextResponse, type NextRequest } from "next/server";

import { DASHBOARD_COOKIE } from "@/lib/dashboard/constants";

/**
 * Bảo vệ khu vực `/dashboard`: chưa đăng nhập -> đẩy về `/dashboard/login`.
 * Đã đăng nhập mà vào trang login -> đẩy về `/dashboard`.
 *
 * Auth hiện tại là MOCK (cookie chỉ mang giá trị cờ). Khi có API thật thì thay
 * bằng verify token ở đây + trong `lib/dashboard/auth-actions.ts`.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthed = Boolean(request.cookies.get(DASHBOARD_COOKIE)?.value);
  const isLoginPage = pathname === "/dashboard/login";

  if (!isAuthed && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthed && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
