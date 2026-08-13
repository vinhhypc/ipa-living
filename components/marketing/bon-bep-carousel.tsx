"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { BON_BEP_SLIDES } from "@/lib/data";

const AUTOPLAY_MS = 4000;

export function BonBepCarousel({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = BON_BEP_SLIDES.length;

  const go = useCallback(
    (next: number) => setIndex(() => (next + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const timer = window.setInterval(() => go(index + 1), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [index, paused, go]);

  const current = BON_BEP_SLIDES[index];

  return (
    <div
      className={cn(
        "group relative w-full select-none overflow-hidden rounded-2xl bg-neutral-950 sm:rounded-3xl",
        compact ? "h-64 sm:h-72" : "h-80 sm:h-96 lg:h-105",
        className,
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Bốn Bếp AnVie tại Dstation"
    >
      {BON_BEP_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-500 ease-in-out motion-reduce:transition-none",
            idx === index
              ? "z-10 opacity-100"
              : "z-0 opacity-0 pointer-events-none",
          )}
          aria-hidden={idx !== index}
        >
          <Image
            src={slide.imageUrl}
            alt={slide.title}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="scale-105 object-cover"
            priority={idx === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/40 to-neutral-950/20" />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-x-2.5 top-2.5 z-20 flex items-center justify-between">
        <span
          className={cn(
            "rounded-full border border-white/20 px-2.5 py-0.5 text-xs font-bold shadow-sm backdrop-blur-md sm:px-3 sm:py-1",
            current.badgeColor,
          )}
        >
          {current.badge}
        </span>
        <span className="rounded-full border border-white/10 bg-neutral-950/80 px-2 py-0.5 text-xs font-bold text-neutral-300 backdrop-blur-md">
          {index + 1} / {count}
        </span>
      </div>

      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Ảnh trước"
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-neutral-950/60 p-1.5 text-white/80 backdrop-blur-md transition-all hover:scale-110 hover:bg-neutral-950/90 hover:text-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 motion-reduce:transition-none sm:p-2 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Ảnh tiếp theo"
        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-neutral-950/60 p-1.5 text-white/80 backdrop-blur-md transition-all hover:scale-110 hover:bg-neutral-950/90 hover:text-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 motion-reduce:transition-none sm:p-2 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end gap-2",
          compact ? "p-3" : "p-4 sm:p-5",
        )}
      >
        <div className="max-w-xl space-y-0.5">
          <h4
            className={cn(
              "font-display font-bold text-white drop-shadow-sm",
              compact ? "text-sm sm:text-base" : "text-base sm:text-lg",
            )}
          >
            {current.title}
          </h4>
          <p
            className={cn(
              "font-light text-neutral-200 drop-shadow-sm",
              compact
                ? "line-clamp-1 text-xs leading-snug"
                : "line-clamp-2 text-xs leading-relaxed sm:text-sm",
            )}
          >
            {current.caption}
          </p>
        </div>

        <div className="no-scrollbar flex max-w-full items-center gap-1 overflow-x-auto py-0.5 sm:gap-1.5">
          {BON_BEP_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setIndex(idx)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-lg border text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                compact ? "px-2 py-0.5" : "px-2.5 py-1",
                idx === index
                  ? "border-white bg-white font-bold text-neutral-950 shadow-sm"
                  : "border-white/10 bg-neutral-900/80 text-neutral-300 hover:border-white/30 hover:bg-neutral-800",
              )}
            >
              {slide.kitchenName}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-1 pt-0.5">
          {BON_BEP_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setIndex(idx)}
              aria-label={`Chuyển tới slide ${idx + 1}`}
              aria-current={idx === index}
              className={cn(
                "h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none",
                idx === index
                  ? "w-5 bg-emerald-400"
                  : "w-1.5 bg-white/40 hover:bg-white/70",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
