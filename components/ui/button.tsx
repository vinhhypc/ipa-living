import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-interactive duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
  {
    variants: {
      variant: {
        default:
          "bg-primary-600 text-white shadow-sm hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-lg active:scale-95",
        secondary:
          "border border-neutral-200 bg-white text-neutral-900 shadow-sm hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-lg active:scale-95",
        ghost:
          "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 active:scale-95",
        accent:
          "bg-accent text-white shadow-sm hover:opacity-90 hover:shadow-lg active:scale-95",
        "accent-outline":
          "border border-accent-30 bg-transparent text-accent hover:bg-accent-8 active:scale-95",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        lg: "h-12 px-6 py-3",
        sm: "h-9 px-3.5 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

/**
 * Render nút theo style shadcn đã ánh xạ sang token của hệ IPA Living.
 */
export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      type={type}
      {...props}
    />
  );
}
