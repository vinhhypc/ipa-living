"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, CreditCard } from "lucide-react";

import { cn } from "@/lib/utils";
import { localImage } from "@/lib/images";
import { routes } from "@/lib/routes";
import { IpaLivingMark } from "@/components/brand/ipaliving-mark";

const HERO_SLIDES = [
  {
    id: 1,
    image: localImage(
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1600&auto=format&fit=crop",
    ),
    title: "Gia đình 3 thế hệ sống khỏe trọn vẹn",
  },
  {
    id: 2,
    image: localImage(
      "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1600&auto=format&fit=crop",
    ),
    title: "Hành trình gắn kết gia đình & thiên nhiên",
  },
  {
    id: 3,
    image: localImage(
      "https://images.unsplash.com/photo-1609234656388-0ff363383899?q=80&w=1600&auto=format&fit=crop",
    ),
    title: "Tận hưởng cuộc sống bình an & hạnh phúc",
  },
  {
    id: 4,
    image: localImage(
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
    ),
    title: "Cùng IPA Living kiến tạo tương lai thịnh vượng",
  },
];

export function HeroSection() {
  const [index, setIndex] = useState(0);
  const count = HERO_SLIDES.length;
  const go = useCallback(
    (next: number) => setIndex(() => (next + count) % count),
    [count],
  );

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const timer = window.setInterval(() => go(index + 1), 6000);
    return () => window.clearInterval(timer);
  }, [index, go]);

  return (
    <section
      id="hero-section"
      aria-roledescription="carousel"
      className="h-hero relative flex min-h-140 w-full items-center overflow-hidden border-b border-neutral-200 bg-neutral-50 py-16 text-neutral-900 sm:min-h-160 sm:py-0"
    >
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            aria-hidden={idx !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none",
              idx === index ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-right lg:object-center"
            />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-neutral-50 via-neutral-50/90 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-50/80 via-transparent to-neutral-50/20" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-5 pb-16 sm:space-y-6 sm:pb-0 xl:max-w-4xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-neutral-200/90 bg-white/90 px-4 py-1.5 shadow-sm backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-brand-green" />
            <span className="h-2 w-2 rounded-full bg-brand-gold" />
            <span className="h-2 w-2 rounded-full bg-brand-bluegray" />
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-700 sm:text-sm">
              Hệ Sinh Thái Wellbeing Việt Nam
            </span>
          </p>

          <div className="space-y-3">
            <h1>
              <IpaLivingMark className="h-16 w-auto sm:h-20 md:h-24" />
              <span className="sr-only">IPA Living</span>
            </h1>

            <p className="max-w-[18ch] font-display text-2xl font-bold leading-tight tracking-tight text-neutral-800 sm:max-w-none sm:text-2xl sm:leading-snug lg:text-3xl">
              Người bạn đồng hành cho cuộc sống trọn vẹn
            </p>
          </div>

          <p className="border-l-4 border-brand-green pl-4 text-sm leading-relaxed text-neutral-600 sm:text-base lg:text-lg">
            Hệ sinh thái toàn diện kết hợp:{" "}
            <strong className="font-semibold text-brand-green">
              AnVie (Sức Khỏe)
            </strong>{" "}
            ·{" "}
            <strong className="font-semibold text-brand-gold">
              VNDGO (Thịnh Vượng)
            </strong>{" "}
            ·{" "}
            <strong className="font-semibold text-brand-bluegray">
              PTICare (Bảo An)
            </strong>
            .
          </p>

          <div className="flex flex-col flex-wrap items-start gap-3 pt-2 sm:flex-row sm:items-center">
            <Link
              href={routes.veIpaLiving}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-brand-green-dark hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0 sm:w-auto sm:text-sm"
            >
              <span>Khám phá hệ sinh thái</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Link
                href={`${routes.diemCham}#workshop`}
                className="inline-flex flex-1 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-neutral-300 bg-white px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-900 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-neutral-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0 sm:flex-initial sm:text-sm"
              >
                <Calendar className="h-4 w-4 shrink-0 text-brand-gold" />
                <span>Tham gia workshop</span>
              </Link>
              <Link
                href={`${routes.dOne}#member`}
                className="inline-flex flex-1 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-neutral-300 bg-white px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-900 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-neutral-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0 sm:flex-initial sm:text-sm"
              >
                <CreditCard className="h-4 w-4 shrink-0 text-brand-green" />
                <span>Đăng ký hội viên - D-ONE</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Ảnh trước"
        className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200/80 bg-white/80 text-neutral-800 shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 motion-reduce:transition-none sm:left-8 sm:flex sm:h-14 sm:w-14"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Ảnh tiếp theo"
        className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200/80 bg-white/80 text-neutral-800 shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 motion-reduce:transition-none sm:right-8 sm:flex sm:h-14 sm:w-14"
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 sm:bottom-6 sm:left-auto sm:right-12 sm:translate-x-0">
        <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 py-2 shadow-md backdrop-blur-md">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setIndex(idx)}
              aria-label={`Chuyển đến ảnh ${idx + 1}`}
              aria-current={idx === index}
              className={cn(
                "h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 motion-reduce:transition-none",
                idx === index
                  ? "w-8 bg-brand-gold"
                  : "w-2.5 bg-neutral-300 hover:bg-neutral-500",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
