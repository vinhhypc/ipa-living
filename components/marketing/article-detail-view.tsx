import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Heart,
  Shield,
  Sparkles,
  TrendingUp,
  User,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ARTICLES } from "@/lib/data";
import { routes } from "@/lib/routes";
import type { Article, Tower } from "@/lib/types";
import { ArticleActions } from "@/components/marketing/article-actions";

const TOWER_META: Record<
  Tower,
  {
    label: string;
    brand: string;
    badge: string;
    href: string;
    icon: LucideIcon;
  }
> = {
  "suc-khoe": {
    label: "Sức Khỏe",
    brand: "AnVie — Sống Khỏe Tự Nhiên",
    badge: "bg-brand-green text-white",
    href: routes.sucKhoe,
    icon: Heart,
  },
  "thinh-vuong": {
    label: "Thịnh Vượng",
    brand: "VNDGO — Tích Sản & Đầu Tư",
    badge: "bg-brand-gold text-white",
    href: routes.thinhVuong,
    icon: TrendingUp,
  },
  "bao-an": {
    label: "Bảo An",
    brand: "PTICare — Phòng Vệ & Bảo Hiểm",
    badge: "bg-brand-bluegray text-white",
    href: routes.baoAn,
    icon: Shield,
  },
};

const PRACTICE_POINTS = [
  "Xác định rõ hiện trạng và mục tiêu cụ thể cho gia đình bạn.",
  "Thiết lập kỷ luật cá nhân với các bước đi nhỏ nhưng bền bỉ mỗi ngày.",
  "Kết nối cùng các Bạn Đồng Hành (Client Advisor) để được cố vấn lộ trình chuẩn xác.",
];

export function ArticleDetailView({ article }: { article: Article }) {
  const tower = TOWER_META[article.category] ?? TOWER_META["suc-khoe"];
  const TowerIcon = tower.icon;
  const related = ARTICLES.filter((item) => item.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 font-sans text-neutral-800">
      <div className="sticky top-16 z-30 border-b border-neutral-200 bg-white shadow-sm sm:top-20">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link
            href={routes.triThuc}
            className="group inline-flex items-center gap-2 text-xs font-bold text-neutral-600 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none" />
            <span>Quay lại Góc Tri Thức</span>
          </Link>
          <nav
            aria-label="Breadcrumb"
            className="hidden items-center gap-2 text-xs text-neutral-400 sm:flex"
          >
            <Link href={routes.home} className="hover:text-neutral-700">
              Trang chủ
            </Link>
            <span>/</span>
            <Link href={routes.triThuc} className="hover:text-neutral-700">
              Tri thức Wellbeing
            </Link>
            <span>/</span>
            <span className="max-w-[12rem] truncate font-medium text-neutral-800">
              {tower.label}
            </span>
          </nav>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 sm:pt-12">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold",
                tower.badge,
              )}
            >
              <TowerIcon className="h-3.5 w-3.5" />
              <span>Tháp {tower.label}</span>
            </span>
            <span className="text-xs font-medium text-neutral-500">
              {tower.brand}
            </span>
          </div>

          <h1 className="font-display text-2xl font-black leading-tight tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-neutral-200/80 py-4 text-xs text-neutral-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-neutral-700">
                  <User className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-bold text-neutral-900">{article.author}</p>
                  <p className="text-xs text-neutral-500">
                    Chuyên gia Wellbeing IPA Living
                  </p>
                </div>
              </div>
              <div className="hidden items-center gap-3 text-neutral-400 sm:flex">
                <span>&bull;</span>
                <span className="flex items-center">
                  <Calendar className="mr-1 h-3.5 w-3.5" />
                  {article.date}
                </span>
                <span>&bull;</span>
                <span className="flex items-center">
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  {article.readTime}
                </span>
              </div>
            </div>
            <ArticleActions />
          </div>
        </div>

        <div className="mt-8 rounded-2xl border-l-4 border-neutral-900 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-base font-medium italic leading-relaxed text-neutral-800 sm:text-lg">
            {`“${article.excerpt}”`}
          </p>
        </div>

        <div className="relative mt-8 aspect-[16/9] max-h-110 overflow-hidden rounded-3xl bg-neutral-100 shadow-md">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(min-width: 896px) 896px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-10 space-y-6 rounded-3xl border border-neutral-200/80 bg-white p-6 text-base font-light leading-relaxed text-neutral-700 shadow-sm sm:p-10 sm:text-lg">
          <p className="font-normal text-neutral-900">{article.content}</p>

          <h2 className="pt-4 font-display text-xl font-bold text-neutral-900 sm:text-2xl">
            1. Tầm quan trọng của việc hiểu đúng và hành động nhất quán
          </h2>
          <p>
            Trong nhịp sống hiện đại nhiều áp lực, việc xây dựng và duy trì thói
            quen dựa trên 3 trụ cột Wellbeing (Sức Khỏe, Thịnh Vượng, Bảo An) là
            kim chỉ nam giúp mỗi cá nhân và gia đình đạt được sự tự do và bình an
            nội tại.
          </p>
          <p>
            Không chỉ là những lời khuyên lý thuyết, các chương trình thực hành
            tại hệ sinh thái <strong>IPA Living</strong> luôn hướng đến việc
            chuyển hóa thành hành động cụ thể mỗi ngày: từ bữa ăn thực vật lành
            sạch, thói quen tích sản nhỏ đều đặn, cho đến các phương án bảo vệ
            phòng vệ chủ động trước rủi ro.
          </p>

          <div className="my-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <h3 className="mb-2 flex items-center gap-2 font-display text-base font-bold text-neutral-900">
              <Sparkles className="h-4 w-4 text-brand-gold" />
              <span>Điểm nhấn thực hành từ bài viết:</span>
            </h3>
            <ul className="space-y-2 text-sm text-neutral-700">
              {PRACTICE_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <h2 className="pt-4 font-display text-xl font-bold text-neutral-900 sm:text-2xl">
            2. Trải nghiệm thực tế tại Hệ sinh thái IPA Living
          </h2>
          <p>
            Bạn có thể trải nghiệm trực tiếp các sản phẩm, tham gia các buổi
            Workshop tương tác chuyên sâu, hoặc lắng nghe tư vấn trực tiếp 1:1 từ
            đội ngũ chuyên gia tại hệ thống Trạm điểm chạm{" "}
            <strong>Dstation</strong> trên toàn quốc.
          </p>

          <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-br from-neutral-900 to-brand-navy p-6 text-white sm:flex-row">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
                Khám phá Trụ cột {tower.label}
              </span>
              <h3 className="font-display text-lg font-bold text-white">
                Cần thêm giải pháp chuyên sâu cho gia đình bạn?
              </h3>
              <p className="text-xs text-neutral-300">
                Đội ngũ Client Advisor (CA) luôn sẵn sàng đồng hành và thiết kế
                bản đồ Wellbeing dành riêng cho bạn.
              </p>
            </div>
            <Link
              href={tower.href}
              className="shrink-0 rounded-xl bg-white px-5 py-3 text-xs font-bold uppercase tracking-widest text-neutral-900 shadow-md transition-all hover:bg-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Tìm hiểu Tháp {tower.label} &rarr;
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-5 rounded-3xl border border-neutral-200 bg-white p-6 sm:flex-row sm:items-start">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 text-neutral-400">
            <User className="h-8 w-8" />
          </span>
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
              <h3 className="font-display text-base font-bold text-neutral-900">
                {article.author}
              </h3>
              <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600">
                Tác giả chuyên môn
              </span>
            </div>
            <p className="text-xs leading-relaxed text-neutral-600">
              Cố vấn và nghiên cứu phát triển các giải pháp Wellbeing thuộc hệ
              sinh thái IPA Living, cam kết mang đến giá trị thực tiễn và bền vững
              cho cộng đồng.
            </p>
          </div>
        </div>

        <div className="mt-14 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-black text-neutral-900">
              Bài viết cùng chuyên mục &amp; liên quan
            </h2>
            <Link
              href={routes.triThuc}
              className="flex items-center gap-1 text-xs font-bold text-neutral-600 transition-colors hover:text-neutral-900"
            >
              <span>Xem tất cả</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((item) => {
              const relTower = TOWER_META[item.category] ?? TOWER_META["suc-khoe"];
              const RelIcon = relTower.icon;
              return (
                <article
                  key={item.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <div className="relative h-40 overflow-hidden bg-neutral-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 768px) 280px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <span
                      className={cn(
                        "absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold",
                        relTower.badge,
                      )}
                    >
                      <RelIcon className="h-2.5 w-2.5" />
                      <span>{relTower.label}</span>
                    </span>
                  </div>
                  <div className="flex flex-grow flex-col justify-between gap-3 p-4">
                    <div>
                      <div className="mb-1.5 flex items-center gap-2 text-xs text-neutral-400">
                        <span>{item.date}</span>
                        <span>&bull;</span>
                        <span>{item.readTime}</span>
                      </div>
                      <h3 className="line-clamp-2 font-display text-sm font-bold leading-snug text-neutral-900 transition-colors group-hover:text-emerald-700">
                        <Link
                          href={routes.article(item.id)}
                          className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                        >
                          {item.title}
                        </Link>
                      </h3>
                    </div>
                    <div className="flex items-center justify-between border-t border-neutral-100 pt-2 text-xs font-semibold text-neutral-700">
                      <span>Đọc bài</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </article>
    </div>
  );
}
