"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, CreditCard } from "lucide-react";
import { animate, motion, useMotionValue, type PanInfo } from "motion/react";

import { cn } from "@/lib/utils";
import { localImage } from "@/lib/images";
import { routes } from "@/lib/routes";

const HERO_SLIDES = [
  {
    id: 1,
    image: localImage(
      "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1600&auto=format&fit=crop",
    ),
    title: "Gia đình dạo bước giữa đồng cỏ xanh",
  },
  {
    id: 2,
    image: localImage(
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1600&auto=format&fit=crop",
    ),
    title: "Cùng vào bếp chuẩn bị bữa ăn lành mạnh",
  },
  {
    id: 3,
    image: localImage(
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1600&auto=format&fit=crop",
    ),
    title: "Bàn ăn tươi xanh, tròn đầy dưỡng chất",
  },
  {
    id: 4,
    image: localImage(
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1600&auto=format&fit=crop",
    ),
    title: "Gia đình sum vầy đón hoàng hôn bình an",
  },
];

export function HeroSection() {
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const count = HERO_SLIDES.length;
  const go = useCallback(
    (next: number) => setIndex(() => (next + count) % count),
    [count],
  );

  /** Vị trí kéo ngang của lớp ảnh — snap về 0 khi thả tay. */
  const dragX = useMotionValue(0);

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    setDragging(false);
    const movedFarEnough =
      Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 400;
    if (movedFarEnough) {
      go(index + (info.offset.x < 0 ? 1 : -1));
    }
    animate(dragX, 0, { type: "spring", stiffness: 320, damping: 32 });
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    if (dragging) return;
    const timer = window.setInterval(() => go(index + 1), 6000);
    return () => window.clearInterval(timer);
  }, [index, go, dragging]);

  return (
    <section
      id="hero-section"
      aria-roledescription="carousel"
      className="hero-bleed min-h-hero-nav relative flex flex-col overflow-hidden border-b border-neutral-200 bg-neutral-50 text-neutral-900"
    >
      {/* Ảnh nền full-bleed toàn hero — kéo ngang để chuyển ảnh */}
      <motion.div
        aria-hidden
        className="absolute inset-0 cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        style={{ x: dragX }}
        onDragStart={() => setDragging(true)}
        onDragEnd={handleDragEnd}
      >
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
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
              className="object-cover object-right brightness-105 saturate-105 lg:object-center"
            />
          </div>
        ))}
      </motion.div>

      {/* Light-wash: mobile phủ từ dưới lên (chữ nằm dưới, ảnh hiện trên);
          desktop phủ mạnh nửa trái cho chữ, nửa phải để ảnh hiện rõ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-50 via-neutral-50/85 to-neutral-50/25 md:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-neutral-50 from-25% via-neutral-50/50 via-55% to-transparent to-80% md:block"
      />

      {/* Nội dung: eyebrow → tiêu đề 2 dòng → mô tả → nút (canh trái) */}
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-end px-4 sm:px-6 md:items-center lg:px-8">
        <div className="pointer-events-auto flex w-full max-w-xl flex-col items-start py-12 text-left md:max-w-lg md:py-16 lg:max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-green sm:text-sm">
            Hệ Sinh Thái Wellbeing Việt Nam
          </p>

          <h1 className="mt-4 font-display text-3xl font-black leading-tight tracking-tight text-brand-green-dark sm:text-4xl lg:text-5xl">
            Người bạn đồng hành cho{" "}
            <span className="block font-semibold text-brand-green">
              cuộc sống trọn vẹn
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base lg:text-lg">
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

          <div className="mt-8 flex w-full flex-col flex-wrap items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href={routes.veIpaLiving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-brand-green-dark hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0"
            >
              <span>Khám phá hệ sinh thái</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link
                href={`${routes.diemCham}#workshop`}
                className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-neutral-300 bg-white px-5 py-3.5 text-sm font-semibold text-neutral-900 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-neutral-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0 sm:flex-initial"
              >
                <Calendar className="h-4 w-4 shrink-0 text-brand-gold" />
                <span>Tham gia workshop</span>
              </Link>
              <Link
                href={`${routes.dOne}#member`}
                className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-neutral-300 bg-white px-5 py-3.5 text-sm font-semibold text-neutral-900 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-neutral-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0 sm:flex-initial"
              >
                <CreditCard className="h-4 w-4 shrink-0 text-brand-green" />
                <span>Đăng ký hội viên - D-ONE</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
