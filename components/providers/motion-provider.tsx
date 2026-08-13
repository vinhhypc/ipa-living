"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * Wraps the app in `MotionConfig` so every `motion.*` animation ported from
 * `src-demo` automatically respects `prefers-reduced-motion` without having
 * to hand-wrap each individual animation.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
