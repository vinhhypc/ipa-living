import type { Metadata } from "next";
import { Suspense } from "react";

import { LoginForm } from "@/components/dashboard/login-form";

export const metadata: Metadata = {
  title: { absolute: "Đăng nhập Dashboard | IPA Living" },
  robots: { index: false, follow: false },
};

export default function DashboardLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-navy via-slate-800 to-brand-navy-light px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold text-sm font-black text-white shadow-lg">
            IPA
          </span>
          <p className="mt-3 text-lg font-bold text-white">IPA Living Admin</p>
          <p className="mt-1 text-sm text-slate-300">
            Đăng nhập khu vực quản trị
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          Dùng tài khoản đăng nhập hệ thống DRM của bạn.
        </p>
      </div>
    </div>
  );
}
