import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/**
 * Render surface card dùng lại cho section marketing và teaser content.
 */
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-neutral-200 bg-white shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Render phần tiêu đề của card với khoảng cách nhất quán theo token.
 */
export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-3 p-6", className)} {...props} />;
}

/**
 * Render nội dung chính của card.
 */
export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

/**
 * Render chân card cho CTA hoặc meta thông tin phụ.
 */
export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-between p-6 pt-0", className)}
      {...props}
    />
  );
}

/**
 * Render tiêu đề semantic cho card.
 */
export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-display text-xl font-semibold tracking-tight text-neutral-950",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Render mô tả phụ cho card.
 */
export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm leading-6 text-neutral-600", className)}
      {...props}
    />
  );
}
