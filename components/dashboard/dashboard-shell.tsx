"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, PanelLeft, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { FORM_CATALOG, isFormCode } from "@/lib/forms/catalog";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { LogoutButton } from "@/components/dashboard/logout-button";

const STORAGE_KEY = "ipa_dash_sidebar";

export function DashboardShell({
  counts,
  children,
}: {
  counts: Record<string, number>;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) setOpen(saved === "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function toggle() {
    setMobileOpen((v) => !v);
    setOpen((v) => {
      const next = !v;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const currentCode = pathname.split("/")[2];
  const currentForm =
    currentCode && isFormCode(currentCode) ? FORM_CATALOG[currentCode] : null;

  return (
    <div className="flex h-screen flex-col bg-slate-100/70 text-slate-900">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-3 sm:px-4">
        <button
          type="button"
          onClick={toggle}
          aria-label="Ẩn/hiện thanh bên"
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <PanelLeft className="h-5 w-5" />
        </button>

        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-navy text-xs font-black text-white">
            IPA
          </span>
          <span className="hidden font-display text-sm font-bold text-slate-800 sm:block">
            Living Admin
          </span>
        </Link>

        <nav className="ml-1 hidden items-center gap-1.5 text-sm text-slate-400 md:flex">
          <ChevronRight className="h-4 w-4" />
          <Link href="/dashboard" className="hover:text-slate-700">
            Dashboard
          </Link>
          {currentForm ? (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-slate-700">
                {currentForm.name}
              </span>
            </>
          ) : null}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="hidden rounded-lg px-2.5 py-1.5 text-sm text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:block"
          >
            ← Về trang chính
          </Link>
          <LogoutButton />
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside
          className={cn(
            "hidden shrink-0 overflow-hidden bg-brand-navy transition-[width] duration-200 ease-out lg:block",
            open ? "w-72" : "w-0",
          )}
        >
          <div className="scrollbar-slim h-full w-72 overflow-y-auto">
            <DashboardSidebar counts={counts} />
          </div>
        </aside>

        {mobileOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="scrollbar-slim absolute left-0 top-0 h-full w-72 max-w-xs overflow-y-auto shadow-xl">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Đóng"
                className="absolute right-3 top-3 z-10 rounded-lg p-1.5 text-slate-300 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <DashboardSidebar
                counts={counts}
                onNavigate={() => setMobileOpen(false)}
              />
            </aside>
          </div>
        ) : null}

        <main className="scrollbar-slim min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
