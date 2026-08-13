import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase",
  {
    variants: {
      variant: {
        neutral: "bg-neutral-100 text-neutral-700",
        health: "bg-health-50 text-health-700",
        wealth: "bg-wealth-50 text-wealth-700",
        protection: "bg-protection-50 text-protection-700",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

/**
 * Render badge semantic cho theme sức khỏe, thịnh vượng và bảo an.
 */
export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
