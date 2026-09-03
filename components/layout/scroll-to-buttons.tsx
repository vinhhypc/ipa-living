"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Cặp nút nổi góc phải dưới: cuộn lên đầu / xuống cuối trang.
 * - Nút "lên đầu" hiện khi đã cuộn quá ~0.6 màn hình.
 * - Nút "xuống cuối" hiện khi chưa ở gần đáy trang.
 */
export function ScrollToButtons() {
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(false);

  useEffect(() => {
    const update = () => {
      const { scrollY, innerHeight } = window;
      const docHeight = document.documentElement.scrollHeight;
      setShowTop(scrollY > innerHeight * 0.6);
      setShowBottom(scrollY + innerHeight < docHeight - innerHeight * 0.6);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollTo = (top: number) => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  if (!showTop && !showBottom) return null;

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-2 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={() => scrollTo(0)}
        aria-label="Cuộn lên đầu trang"
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-700 shadow-lg backdrop-blur-md transition-all hover:bg-white hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 motion-reduce:transition-none",
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => scrollTo(document.documentElement.scrollHeight)}
        aria-label="Cuộn xuống cuối trang"
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-700 shadow-lg backdrop-blur-md transition-all hover:bg-white hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 motion-reduce:transition-none",
          showBottom
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        <ArrowDown className="h-5 w-5" />
      </button>
    </div>
  );
}
