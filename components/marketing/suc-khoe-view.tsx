import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ChevronRight,
  Compass,
  Heart,
  Store,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { localImage } from "@/lib/images";
import { routes } from "@/lib/routes";

type PillarTone = "emerald" | "sky" | "purple";

const PILLAR_TONE: Record<
  PillarTone,
  { card: string; iconBg: string; badge: string; label: string; cta: string; dot: string }
> = {
  emerald: {
    card: "border-emerald-200/80",
    iconBg: "bg-emerald-700",
    badge: "border-emerald-200 bg-emerald-100 text-emerald-900",
    label: "text-emerald-800",
    cta: "bg-emerald-800 hover:bg-emerald-900",
    dot: "bg-emerald-600",
  },
  sky: {
    card: "border-sky-200/80",
    iconBg: "bg-sky-700",
    badge: "border-sky-200 bg-sky-100 text-sky-900",
    label: "text-sky-800",
    cta: "bg-sky-800 hover:bg-sky-900",
    dot: "bg-sky-600",
  },
  purple: {
    card: "border-purple-200/80",
    iconBg: "bg-purple-700",
    badge: "border-purple-200 bg-purple-100 text-purple-900",
    label: "text-purple-800",
    cta: "bg-purple-800 hover:bg-purple-900",
    dot: "bg-purple-600",
  },
};

type Pillar = {
  tone: PillarTone;
  icon: LucideIcon;
  badge: string;
  name: string;
  label: string;
  href: string;
  ctaLabel: string;
  intro: string;
  items: { title: string; desc: string }[];
};

const PILLARS: Pillar[] = [
  {
    tone: "emerald",
    icon: Store,
    badge: "Trụ 1 · Tiêu Dùng",
    name: "AnVie Gobio",
    label: "Tiêu Dùng Thuận Tự Nhiên",
    href: routes.anvieGobio,
    ctaLabel: "Xem chi tiết AnVie Gobio",
    intro:
      "Mỗi sản phẩm được xem xét từ nguồn nguyên liệu, cách chế biến đến giá trị mang lại trong đời sống, dựa trên các chuẩn NAO và GAO của AnVie.",
    items: [
      {
        title: "1. AnVie Gobio Portfolio (Hệ sản phẩm Bio)",
        desc: "Danh mục Gobio phân theo hệ Bio — chăm trọn không gian sống: Bếp Bio (ăn) · Nhà Bio (nhà) · I'm Bio (thân) · Mẹ Bio (mẹ & bé), cùng bộ quà tặng Vietcharm Collection.",
      },
      {
        title: "2. Gobio Shop",
        desc: "Hàng thương mại chọn lọc & Cửa hàng trực tuyến / tại trạm Dstation.",
      },
      {
        title: "3. Tủ Sách Phương Bối",
        desc: "Kho tàng tri thức dưỡng sinh, nếp sống thuần khiết & y học cổ truyền.",
      },
    ],
  },
  {
    tone: "sky",
    icon: Compass,
    badge: "Trụ 2 · Trải Nghiệm",
    name: "AnVie Health",
    label: "Nơi bạn chạm vào nếp sống AnVie",
    href: routes.anvieHealth,
    ctaLabel: "Xem chi tiết AnVie Health",
    intro:
      "AnVie Health đưa bạn chạm vào nếp sống AnVie qua một bữa ăn, một hành trình kết nối và một chốn để trở về.",
    items: [
      {
        title: "1. F&B Trải Nghiệm",
        desc: "Hoa Vị – Không gian ẩm thực Việt & Dstation Bistro – Điểm hẹn kết nối ba nếp sống.",
      },
      {
        title: "2. CBX (Connect · Balance · Experience)",
        desc: "Những hành trình kết nối, cân bằng và trải nghiệm cùng cộng đồng bản địa.",
      },
      {
        title: "3. CDA — Club des Amis",
        desc: "Không gian trải nghiệm và nghỉ dưỡng, nơi mỗi người chậm lại, kết nối với tự nhiên và tìm về trạng thái cân bằng.",
      },
      {
        title: "4. Workshop Trải Nghiệm",
        desc: "Chuỗi 10 gói workshop thực hành nếp sống khỏe & trải nghiệm chuyên sâu cùng chuyên gia.",
      },
    ],
  },
  {
    tone: "purple",
    icon: Activity,
    badge: "Trụ 3 · Chăm Sóc Sức Khỏe",
    name: "AnVie Life",
    label: "Chăm sóc sức khỏe chủ động",
    href: routes.anvieLife,
    ctaLabel: "Xem chi tiết AnVie Life",
    intro:
      "AnVie Life đồng hành cùng bạn chăm sóc sức khỏe chủ động, thông qua tri thức nếp sống và mạng lưới tư vấn sức khỏe đáng tin cậy.",
    items: [
      {
        title: "1. AnVie Academy",
        desc: "Không gian học tập và trao truyền tri thức, giúp mỗi người hiểu mình và chủ động nuôi dưỡng một nếp sống khỏe.",
      },
      {
        title: "2. Chuỗi phòng khám",
        desc: "Mạng lưới tư vấn sức khỏe gia đình - đồng hành cùng mỗi người trong theo dõi, dự phòng và xây dựng nếp sống phù hợp với nhu cầu sức khỏe.",
      },
    ],
  },
];

const NETWORK = [
  {
    step: 1,
    tone: "emerald" as const,
    title: "Ghé mua",
    caption: "Gobio Shop · Delivie Bistro",
    href: routes.anvieGobio,
    ctaLabel: "Xem danh mục sản phẩm",
    image: localImage(
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600",
    ),
    alt: "Ghé mua tại Gobio Shop và Delivie Bistro",
  },
  {
    step: 2,
    tone: "amber" as const,
    title: "Ăn tại chỗ",
    caption: "Chuỗi nhà hàng Hoa Vị",
    href: routes.anvieHealth,
    ctaLabel: "Xem menu & địa điểm",
    image: localImage(
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600",
    ),
    alt: "Chuỗi nhà hàng Hoa Vị",
  },
  {
    step: 3,
    tone: "sky" as const,
    title: "Trở về",
    caption:
      "CBX & CDA — Club des Amis: không gian trải nghiệm và nghỉ dưỡng, nơi mỗi người chậm lại và tìm về trạng thái cân bằng.",
    href: routes.anvieHealth,
    ctaLabel: "Xem chương trình trải nghiệm",
    image: localImage(
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
    ),
    alt: "CBX và CDA — Club des Amis",
  },
  {
    step: 4,
    tone: "purple" as const,
    title: "Học & đồng hành",
    caption: "AnVie Academy · Phòng khám",
    href: routes.anvieLife,
    ctaLabel: "Xem khóa học & bác sĩ",
    image: localImage(
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
    ),
    alt: "AnVie Academy và chuỗi phòng khám",
  },
];

const NETWORK_TONE = {
  emerald: { chip: "bg-emerald-700", link: "text-emerald-800 hover:text-emerald-950", title: "group-hover:text-emerald-800" },
  amber: { chip: "bg-amber-700", link: "text-amber-800 hover:text-amber-950", title: "group-hover:text-amber-800" },
  sky: { chip: "bg-sky-700", link: "text-sky-800 hover:text-sky-950", title: "group-hover:text-sky-800" },
  purple: { chip: "bg-purple-700", link: "text-purple-800 hover:text-purple-950", title: "group-hover:text-purple-800" },
};

const HERO_IMAGE = localImage(
  "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1800&q=85",
);

export function SucKhoeView() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800">
      {/* Hero */}
      <section className="overflow-hidden border-b border-neutral-200 bg-neutral-50 py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex min-h-130 items-center overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-lg lg:min-h-144">
            <div className="absolute inset-0">
              <Image
                src={HERO_IMAGE}
                alt="Sống Khỏe AnVie — ẩm thực và nếp sống tự nhiên"
                fill
                priority
                sizes="100vw"
                className="object-cover object-right"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-transparent sm:bg-gradient-to-r sm:via-white/90" />
            </div>

            <div className="relative z-10 max-w-2xl space-y-5 px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
              <h1 className="font-display text-4xl font-black leading-tight tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
                Tháp Sức Khỏe <span className="text-brand-green-dark">AnVie</span>
              </h1>
              <p className="font-display text-xs font-bold uppercase tracking-widest text-brand-green-dark sm:text-sm lg:text-base">
                Một nếp sống · Một bản đồ · Một gia tài Việt
              </p>
              <p className="text-sm font-light leading-relaxed text-neutral-700 sm:text-base lg:text-lg">
                AnVie gìn giữ nếp nhà Việt, di sản thiên nhiên và gia tài trí tuệ
                bản địa của người Việt — qua nếp sống thuận tự nhiên.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={routes.anvieGobio}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-green-dark px-7 py-3.5 text-xs font-bold tracking-wide text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-brand-green-dark hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0 sm:text-sm"
                >
                  <span>Khám phá AnVie</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#pillars-overview"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/95 px-7 py-3.5 text-xs font-semibold tracking-wide text-neutral-900 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0 sm:text-sm"
                >
                  Tư vấn giải pháp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 pillars */}
      <section
        id="pillars-overview"
        className="scroll-mt-24 border-b border-neutral-200 bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-3 text-center">
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-800">
              Hệ thống kiến trúc AnVie
            </span>
            <h2 className="font-display text-2xl font-black text-neutral-900 sm:text-4xl">
              3 Trụ Cột Nếp Sống Khỏe &amp; Trọn Vẹn
            </h2>
            <p className="text-sm font-light leading-relaxed text-neutral-600 sm:text-base">
              Mỗi trụ cột đảm nhận một sứ mệnh riêng biệt, kết nối liền mạch từ
              sản phẩm tiêu dùng hằng ngày đến những trải nghiệm thực tế và dịch
              vụ chăm sóc sức khỏe gia đình trọn đời.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {PILLARS.map((pillar) => {
              const tone = PILLAR_TONE[pillar.tone];
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.name}
                  className={cn(
                    "flex flex-col justify-between gap-6 rounded-3xl border-2 bg-neutral-50 p-6 transition-all hover:shadow-lg sm:p-8",
                    tone.card,
                  )}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-sm",
                          tone.iconBg,
                        )}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <span
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-bold uppercase",
                          tone.badge,
                        )}
                      >
                        {pillar.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-2xl font-black text-neutral-900">
                        {pillar.name}
                      </h3>
                      <p
                        className={cn(
                          "mt-0.5 text-xs uppercase tracking-wide",
                          tone.label,
                        )}
                      >
                        {pillar.label}
                      </p>
                    </div>

                    <p className="text-xs font-light leading-relaxed text-neutral-600 sm:text-sm">
                      {pillar.intro}
                    </p>

                    <div className="space-y-2 border-t border-neutral-200/80 pt-2">
                      {pillar.items.map((item) => (
                        <div
                          key={item.title}
                          className="space-y-1 rounded-xl border border-neutral-200 bg-white p-3"
                        >
                          <p className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
                            <span
                              className={cn(
                                "h-1.5 w-1.5 rounded-full",
                                tone.dot,
                              )}
                            />
                            <span>{item.title}</span>
                          </p>
                          <p className="pl-3 text-xs leading-relaxed text-neutral-500">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={pillar.href}
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                      tone.cta,
                    )}
                  >
                    <span>{pillar.ctaLabel}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AnVie Network */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-3 text-center">
            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase text-emerald-800">
              AnVie Network
            </span>
            <h2 className="font-display text-2xl font-black text-neutral-900 sm:text-3xl">
              AnVie Network — Những điểm chạm đưa nếp sống AnVie đến gần hơn với
              bạn.
            </h2>
            <p className="text-xs font-light text-neutral-600 sm:text-sm">
              Dù bạn muốn mua sắm thực phẩm lành sạch, thưởng thức bữa ăn ngon,
              trở về với thiên nhiên hay tìm kiếm bác sĩ tư vấn, AnVie luôn sẵn
              sàng đồng hành.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {NETWORK.map((item) => {
              const tone = NETWORK_TONE[item.tone];
              return (
                <article
                  key={item.step}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-neutral-100">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                      <span
                        className={cn(
                          "absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-xl text-sm font-bold text-white shadow-md",
                          tone.chip,
                        )}
                      >
                        {item.step}
                      </span>
                    </div>
                    <div className="space-y-2.5 p-5">
                      <h3
                        className={cn(
                          "font-display text-base font-bold text-neutral-900 transition-colors",
                          tone.title,
                        )}
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs font-light leading-relaxed text-neutral-600">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-1">
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex items-center gap-1 rounded text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                        tone.link,
                      )}
                    >
                      <span>{item.ctaLabel}</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-900 py-14 text-white">
        <div className="mx-auto max-w-7xl space-y-6 px-4 text-center sm:px-6 lg:px-8">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-800 text-emerald-300">
            <Heart className="h-6 w-6" />
          </span>
          <h2 className="font-display text-2xl font-black text-white sm:text-4xl">
            Bắt đầu hành trình sống khỏe cùng AnVie ngay hôm nay
          </h2>
          <p className="mx-auto max-w-2xl text-xs font-light leading-relaxed text-emerald-100 sm:text-sm">
            Kết nối cùng đội ngũ chuyên gia tư vấn dinh dưỡng và chăm sóc sức
            khỏe của IPA Living để nhận thực đơn và lộ trình chăm sóc cá nhân hóa
            cho gia đình bạn.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href={routes.dCare}
              className="rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-emerald-950 shadow-md transition-all hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Đặt lịch tư vấn D-Care
            </Link>
            <Link
              href={routes.diemCham}
              className="rounded-full border border-emerald-600 bg-emerald-800 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Tìm trạm Dstation gần nhất
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
