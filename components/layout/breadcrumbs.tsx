import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

type Variant = "bar" | "overlay-light" | "overlay-dark";

function CrumbList({ items, variant }: { items: Crumb[]; variant: Variant }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs",
        variant === "overlay-dark" && "[text-shadow:0_1px_3px_rgb(0_0_0/0.55)]",
        variant === "overlay-light" &&
          "[text-shadow:0_1px_2px_rgb(255_255_255/0.7)]",
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-x-1.5">
            {index > 0 && (
              <ChevronRight
                className={cn(
                  "h-3.5 w-3.5 shrink-0",
                  variant === "overlay-dark"
                    ? "text-white/60"
                    : "text-neutral-400",
                )}
                aria-hidden
              />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className={cn(
                  "font-medium transition-colors",
                  variant === "overlay-dark"
                    ? "text-white/80 hover:text-white"
                    : "text-neutral-500 hover:text-neutral-900",
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? "page" : undefined}
                className={cn(
                  "font-bold",
                  variant === "overlay-dark"
                    ? isLast
                      ? "text-white"
                      : "text-white/80"
                    : isLast
                      ? "text-neutral-900"
                      : "text-neutral-500",
                )}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

/**
 * Breadcrumb đầu trang con.
 * - `variant="bar"` (mặc định): dải trắng `border-b`, không sticky, ngay dưới header.
 * - `variant="overlay-light"`: trong suốt, canh tuyệt đối trong `<section>` hero
 *   `hero-bleed` nền sáng (left-wash) — chữ tối.
 * - `variant="overlay-dark"`: như trên nhưng hero nền tối — chữ sáng.
 * `trailing` (chỉ dạng bar): nội dung canh phải (chip phân loại, hotline…).
 */
export function Breadcrumbs({
  items,
  trailing,
  variant = "bar",
  className,
}: {
  items: Crumb[];
  trailing?: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  if (variant !== "bar") {
    return (
      <div
        className={cn("absolute inset-x-0 top-4 z-20", className)}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CrumbList items={items} variant={variant} />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("border-b border-neutral-200 bg-white", className)}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-6 lg:px-8">
        <CrumbList items={items} variant="bar" />
        {trailing}
      </div>
    </div>
  );
}
