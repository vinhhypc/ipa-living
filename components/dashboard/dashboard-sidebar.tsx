"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

import { cn } from "@/lib/utils";
import { FORM_LIST } from "@/lib/forms/catalog";
import { groupStyle } from "@/components/dashboard/group-meta";

type Props = {
  counts: Record<string, number>;
  onNavigate?: () => void;
};

const GROUP_ORDER = ["Workshop", "PTI", "D-One", "D-Care", "Tuyển dụng"] as const;

export function DashboardSidebar({ counts, onNavigate }: Props) {
  const pathname = usePathname();

  const grouped = GROUP_ORDER.map((group) => ({
    group,
    forms: FORM_LIST.filter((f) => f.group === group),
  })).filter((g) => g.forms.length > 0);

  return (
    <nav className="flex h-full flex-col gap-1 bg-gradient-to-b from-brand-navy to-brand-navy-light p-3 text-sm text-slate-200">
      <SidebarLink
        href="/dashboard"
        active={pathname === "/dashboard"}
        onNavigate={onNavigate}
      >
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
            pathname === "/dashboard"
              ? "bg-brand-navy text-white"
              : "bg-white/10 text-slate-300",
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
        </span>
        <span className="font-semibold">Tổng quan</span>
      </SidebarLink>

      {grouped.map(({ group, forms }) => {
        const style = groupStyle(group);
        const Icon = style.icon;
        return (
          <div key={group} className="mt-4 first:mt-2">
            <p className="mb-1 flex items-center gap-1.5 px-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Icon className={cn("h-3.5 w-3.5", style.onDark)} />
              {group}
            </p>
            {forms.map((form) => {
              const href = `/dashboard/${form.code}`;
              const active = pathname === href;
              return (
                <SidebarLink
                  key={form.code}
                  href={href}
                  active={active}
                  onNavigate={onNavigate}
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs",
                      active
                        ? style.solid
                        : cn("bg-white/10", style.onDark),
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 flex-1 truncate">{form.name}</span>
                  <span
                    className={cn(
                      "shrink-0 rounded-md px-1.5 py-0.5 text-xs font-semibold tabular-nums",
                      active
                        ? "bg-white/25 text-white"
                        : "bg-white/10 text-slate-300",
                    )}
                  >
                    {counts[form.code] ?? 0}
                  </span>
                </SidebarLink>
              );
            })}
          </div>
        );
      })}

      <div className="mt-auto flex items-center gap-2.5 rounded-xl bg-white/5 p-2.5 ring-1 ring-white/10">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gold text-xs font-bold text-white">
          AD
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-white">admin</p>
          <p className="truncate text-xs text-slate-400">Quản trị viên</p>
        </div>
      </div>
    </nav>
  );
}

function SidebarLink({
  href,
  active,
  onNavigate,
  children,
}: {
  href: string;
  active: boolean;
  onNavigate?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors",
        active
          ? "bg-white text-brand-navy shadow-sm"
          : "text-slate-300 hover:bg-white/10 hover:text-white",
      )}
    >
      {children}
    </Link>
  );
}
