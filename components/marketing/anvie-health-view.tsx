"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Coffee,
  Compass,
  Palmtree,
  Sparkles,
  Utensils,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { WORKSHOPS } from "@/lib/data";
import { localImage } from "@/lib/images";
import { routes } from "@/lib/routes";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WorkshopCard } from "@/components/marketing/workshop-card";

type TabId = "fb" | "cbx" | "cda" | "workshops";

const TABS: { id: TabId; label: string; icon: LucideIcon }[] = [
  {
    id: "fb",
    label: "1. Ẩm Thực F&B (Hoa Vị & Dstation Bistro)",
    icon: Utensils,
  },
  {
    id: "cbx",
    label: "2. CBX (Connect · Balance · Experience)",
    icon: Compass,
  },
  { id: "cda", label: "3. CDA — Club des Amis", icon: Palmtree },
  { id: "workshops", label: "4. Workshop Trải Nghiệm", icon: Sparkles },
];

const img = (id: string) =>
  localImage(
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`,
  );

const FB_CARDS = [
  {
    badge: "Hoa Vị",
    icon: Utensils,
    tone: "bg-amber-100 text-amber-900",
    title: "Chuỗi Nhà Hàng Ẩm Thực Hoa Vị",
    desc: "Hoa Vị - không gian ẩm thực Việt gìn giữ vị thật từ nguyên liệu bản địa đúng mùa, trong tinh thần Lành & Thật - Mộc & Mùa.",
    image: img("1555396273-367ea4eb4db5"),
    alt: "Không gian nhà hàng ẩm thực Hoa Vị",
    cta: "Xem địa điểm nhà hàng Hoa Vị",
    ctaClass: "bg-amber-700 hover:bg-amber-800",
  },
  {
    badge: "Dstation Bistro",
    icon: Coffee,
    tone: "bg-sky-100 text-sky-900",
    title: "Dstation Bistro",
    desc: "Dstation Bistro - không gian ẩm thực và kết nối ba nếp sống AnVie - VNDGO - PTICare.",
    image: img("1554118811-1e0d58224f24"),
    alt: "Không gian Dstation Bistro",
    cta: "Khám phá Trạm Dstation Bistro",
    ctaClass: "bg-sky-800 hover:bg-sky-900",
  },
];

const CBX_CARDS = [
  {
    tag: "Connect (Kết Nối)",
    tagTone: "bg-emerald-100 text-emerald-900",
    title: "Về Nguồn Bản Địa",
    image: img("1544816155-12df9643f363"),
    alt: "Kết nối về nguồn nông nghiệp bản địa",
  },
  {
    tag: "Balance (Cân Bằng)",
    tagTone: "bg-sky-100 text-sky-900",
    title: "Tái Tạo Thân Tâm",
    image: img("1506126613408-eca07ce68773"),
    alt: "Tái tạo thân tâm và cân bằng nội tại",
  },
  {
    tag: "Experience (Trải Nghiệm)",
    tagTone: "bg-purple-100 text-purple-900",
    title: "Nếp Sống Tự Nhiên",
    image: img("1509440159596-0249088772ff"),
    alt: "Trải nghiệm nếp sống tự nhiên",
  },
];

const CDA_ITEMS = [
  {
    icon: Sparkles,
    tone: "bg-purple-100 text-purple-800",
    title: "Trải nghiệm Workshop",
    desc: "Tham gia các workshop thực hành chuyên sâu về ẩm thực dưỡng sinh, trà di sản Shan Tuyết, làm bánh mì men sống và giải pháp sinh học thảo mộc cùng chuyên gia.",
  },
  {
    icon: Compass,
    tone: "bg-emerald-100 text-emerald-800",
    title: "Trải nghiệm hoạt động bản địa",
    desc: "Hòa mình cùng thiên nhiên, tìm hiểu văn hóa nông nghiệp bản địa, thu hái nguyên liệu tự nhiên và kết nối sâu sắc cùng cộng đồng.",
  },
];

const CDA_IMG = img("1540555700478-4be289fbecef");

export function AnvieHealthView({ initialTab = "fb" }: { initialTab?: TabId }) {
  const [tab, setTab] = useState<TabId>(initialTab);

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800">
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: routes.home },
          { label: "Tháp Sức Khỏe AnVie", href: routes.sucKhoe },
          { label: "AnVie Health" },
        ]}
        trailing={
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase text-sky-900">
            AnVie Health · Trải Nghiệm
          </span>
        }
      />

      <section className="relative overflow-hidden bg-sky-950 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-700 bg-sky-900/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-300">
              <Compass className="h-3.5 w-3.5" />
              Nơi bạn chạm vào nếp sống AnVie
            </span>
            <h1 className="font-display text-3xl font-black tracking-tight text-white sm:text-5xl">
              AnVie Health
            </h1>
            <p className="max-w-2xl text-sm font-light leading-relaxed text-sky-100 sm:text-base">
              AnVie Health đưa bạn chạm vào nếp sống AnVie qua một bữa ăn, một
              hành trình kết nối, một không gian nghỉ dưỡng và các buổi workshop
              trải nghiệm thực hành.
            </p>
          </div>
          <div className="space-y-2 rounded-2xl border border-white/20 bg-white/10 p-5 text-xs backdrop-blur-md lg:col-span-4">
            <span className="block font-bold uppercase text-sky-300">
              4 Không Gian Trải Nghiệm
            </span>
            <p className="font-light leading-relaxed text-sky-100">
              1. <strong>Hoa Vị & Dstation Bistro</strong>: Ẩm thực thực dưỡng &
              điểm hẹn kết nối.
              <br />
              2. <strong>CBX</strong>: Hành trình kết nối, cân bằng & trải
              nghiệm.
              <br />
              3. <strong>CDA — Club des Amis</strong>: Không gian nghỉ dưỡng cân
              bằng.
              <br />
              4. <strong>Workshop Trải Nghiệm</strong>: Chuỗi 10 gói thực hành.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div
          role="tablist"
          aria-label="Không gian trải nghiệm AnVie Health"
          className="mb-8 flex flex-wrap gap-2 border-b border-neutral-200 pb-4"
        >
          {TABS.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(item.id)}
                className={cn(
                  "flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                  active
                    ? "bg-sky-900 text-white shadow-sm"
                    : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {tab === "fb" ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {FB_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="flex flex-col justify-between space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="space-y-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase",
                        card.tone,
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {card.badge}
                    </span>
                    <h2 className="font-display text-2xl font-black text-neutral-900">
                      {card.title}
                    </h2>
                    <p className="text-xs font-light leading-relaxed text-neutral-600 sm:text-sm">
                      {card.desc}
                    </p>
                    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-neutral-100 shadow-sm">
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <Link
                    href={routes.diemCham}
                    className={cn(
                      "mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                      card.ctaClass,
                    )}
                  >
                    <span>{card.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        ) : null}

        {tab === "cbx" ? (
          <div className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="border-b border-neutral-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                Trải Nghiệm 02
              </span>
              <h2 className="mt-1 font-display text-2xl font-black text-neutral-900 sm:text-3xl">
                CBX — Connect · Balance · Experience
              </h2>
              <p className="mt-1 text-xs font-light leading-relaxed text-neutral-600 sm:text-sm">
                Hành trình kết nối, cân bằng và trải nghiệm cùng cộng đồng bản
                địa, để mỗi người được đón tiếp, sẻ chia và tìm thấy cảm giác
                thuộc về.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {CBX_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="group flex flex-col justify-between space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 transition-all hover:shadow-md"
                >
                  <div className="space-y-2">
                    <span
                      className={cn(
                        "inline-block rounded-full px-2.5 py-0.5 text-xs font-bold uppercase",
                        card.tagTone,
                      )}
                    >
                      {card.tag}
                    </span>
                    <h3 className="font-display text-base font-bold text-neutral-900">
                      {card.title}
                    </h3>
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-neutral-200/80 bg-neutral-100 shadow-sm">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {tab === "cda" ? (
          <div className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="border-b border-neutral-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-800">
                Trải Nghiệm 03
              </span>
              <h2 className="mt-1 font-display text-2xl font-black text-neutral-900 sm:text-3xl">
                CDA — Club des Amis
              </h2>
              <p className="mt-1 text-xs font-light leading-relaxed text-neutral-600 sm:text-sm">
                Club des Amis: không gian trải nghiệm và nghỉ dưỡng, nơi mỗi
                người chậm lại, kết nối với tự nhiên và tìm về trạng thái cân
                bằng.
              </p>
            </div>
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="space-y-5 lg:col-span-7">
                <div className="space-y-4">
                  {CDA_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="space-y-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 sm:p-5"
                      >
                        <p className="flex items-center gap-2">
                          <span className={cn("rounded-lg p-1", item.tone)}>
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="font-display text-sm font-bold text-neutral-900 sm:text-base">
                            {item.title}
                          </span>
                        </p>
                        <p className="text-xs font-light leading-relaxed text-neutral-600 sm:text-sm">
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href={routes.dCare}
                    className="rounded-xl bg-purple-800 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-purple-900"
                  >
                    Đăng ký tư vấn gói trải nghiệm CDA
                  </Link>
                  <button
                    type="button"
                    onClick={() => setTab("workshops")}
                    className="rounded-xl border border-purple-200 bg-white px-5 py-2.5 text-xs font-bold text-purple-900 transition-all hover:bg-neutral-100"
                  >
                    Khám phá các gói Workshop &rarr;
                  </button>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-neutral-100 shadow-md">
                  <Image
                    src={CDA_IMG}
                    alt="CDA Club des Amis retreat"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {tab === "workshops" ? (
          <div className="space-y-10">
            <div className="space-y-3 rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-sm sm:p-10">
              <span className="block text-xs font-bold uppercase tracking-widest text-brand-gold">
                Lịch Workshop &amp; Lớp trải nghiệm
              </span>
              <h2 className="font-display text-2xl font-black leading-tight text-neutral-900 sm:text-3xl lg:text-4xl">
                Thay đổi bắt đầu từ những trải nghiệm thực hành
              </h2>
              <p className="mx-auto max-w-3xl text-xs font-light leading-relaxed text-neutral-600 sm:text-sm md:text-base">
                Đăng ký tham gia ngay các workshop định kỳ tại Dstation để cùng
                chuyên gia chăm sóc sức khỏe tế bào, học làm bánh men sống Bếp
                nhà Delivie, thưởng thức trà đạo thảo mộc và hoạch định tài
                chính tương lai.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {WORKSHOPS.map((ws) => (
                <WorkshopCard key={ws.id} workshop={ws} />
              ))}
            </div>
            <div className="space-y-3 rounded-3xl border border-neutral-200/90 bg-white p-8 shadow-sm sm:p-10">
              <span className="block text-xs font-bold uppercase tracking-widest text-emerald-700">
                Cộng đồng gắn kết
              </span>
              <p className="text-sm font-light leading-relaxed text-neutral-700 sm:text-base">
                Mỗi workshop mang đến nhiều hơn một buổi học. Bạn sẽ gặp những
                người đang sống với điều họ chia sẻ: người nghệ nhân trà, thợ
                làm bánh men sống Bếp nhà Delivie, cố vấn dinh dưỡng Anvie hay
                chuyên gia tài chính gia sản VNDGO.
              </p>
              <Link
                href={routes.triThuc}
                className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 transition-colors hover:text-emerald-950 sm:text-sm"
              >
                <span>Khám phá bài viết Góc Tri Thức</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
