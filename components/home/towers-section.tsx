"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { localImage } from "@/lib/images";
import { routes } from "@/lib/routes";
import type { Tower } from "@/lib/types";

type SubCard = {
  label: string;
  value: string;
  tag: string;
  title: string;
  desc: string;
  bullet: string;
};

type TowerShowcase = {
  title: string;
  brand: string;
  eyebrow: string;
  hash: string;
  image: string;
  quote: string;
  accent: string;
  tab: string;
  tabText: string;
  selectedPill: string;
  cta: string;
  ctaLabel: string;
  defaultSub: number;
  subCards: SubCard[];
};

const TOWERS: Record<Tower, TowerShowcase> = {
  "suc-khoe": {
    title: "Tháp Sức Khỏe",
    brand: "AnVie",
    eyebrow: "SỐNG KHỎE · ANVIE",
    hash: "anvie",
    image: localImage(
      "https://images.unsplash.com/photo-1556911073-38141963c9e0?q=80&w=1200&auto=format&fit=crop",
    ),
    quote: "Xây nền sống khỏe từ gốc rễ.",
    accent: "text-health-700",
    tab: "bg-health-500 text-white shadow-lg",
    tabText: "text-health-50",
    selectedPill: "border-health-500 bg-health-500/10",
    cta: "bg-health-500 text-white hover:bg-health-600",
    ctaLabel: "Khám phá Tháp Sức Khỏe",
    defaultSub: 0,
    subCards: [
      {
        label: "Tiêu dùng",
        value: "AnVie Gobio",
        tag: "TIÊU DÙNG THUẬN TỰ NHIÊN",
        title: "AnVie Gobio",
        desc: "Cung cấp các sản phẩm thuần khiết cho căn bếp và tổ ấm theo chuẩn vùng trồng tự nhiên GAO và chế biến giữ nguyên phôi mầm NAO: Bếp Bio, Vietcharm, Gobio Shop và Tủ Sách Phương Bối.",
        bullet: "Căn bếp lành, mái ấm sạch và lối sống thuận tự nhiên",
      },
      {
        label: "Trải nghiệm",
        value: "AnVie Health",
        tag: "TRẢI NGHIỆM ẨM THỰC & HÀNH TRÌNH TỰ NHIÊN",
        title: "AnVie Health",
        desc: "Thiết kế các không gian ẩm thực dưỡng sinh Hoa Vị, Dstation Bistro, hành trình về nguồn nông nghiệp bản địa CBX và kỳ nghỉ dưỡng phục hồi năng lượng CDA — Club des Amis.",
        bullet:
          "Chạm vào nếp sống khỏe mạnh qua ẩm thực và trải nghiệm bản địa",
      },
      {
        label: "Cộng đồng",
        value: "AnVie Life",
        tag: "Y HỌC LỐI SỐNG & CỘNG ĐỒNG SỐNG LÀNH",
        title: "AnVie Life",
        desc: "Cộng đồng gắn kết, gieo hạt hành trình thực hành nếp sống Vui - Khỏe lành mạnh, đào tạo y học lối sống và mạng lưới chuyên gia đồng hành trọn đời.",
        bullet: "Chia sẻ thói quen sống xanh, lành mạnh & tích cực",
      },
    ],
  },
  "thinh-vuong": {
    title: "Tháp Thịnh Vượng",
    brand: "VNDIRECT",
    eyebrow: "THỊNH VƯỢNG · VNDIRECT",
    hash: "vndgo",
    image: localImage(
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    ),
    quote: "Kiến tạo thịnh vượng bền vững qua thời gian.",
    accent: "text-wealth-700",
    tab: "bg-wealth-500 text-white shadow-lg",
    tabText: "text-wealth-50",
    selectedPill: "border-wealth-500 bg-wealth-500/10",
    cta: "bg-wealth-500 text-white hover:bg-wealth-600",
    ctaLabel: "Khám phá Tháp Thịnh Vượng",
    defaultSub: 1,
    subCards: [
      {
        label: "Tích sản Hưu trí",
        value: "VNDSIP",
        tag: "TÍCH SẢN HƯU TRÍ",
        title: "VNDSIP — Tích sản Bền vững",
        desc: "Chương trình tiết kiệm đầu tư cổ phiếu và chứng chỉ quỹ định kỳ có kỷ luật, tối ưu hóa sức mạnh lãi suất kép dài hạn.",
        bullet: "Tự động hóa tích sản định kỳ và bảo đảm tài chính tương lai",
      },
      {
        label: "Quản lý Gia sản",
        value: "VNDWealth",
        tag: "QUẢN LÝ GIA SẢN",
        title: "VNDWealth — Quản lý Gia sản",
        desc: "Tư vấn phân bổ tài sản đa tầng, bảo toàn vốn và quản trị danh mục đầu tư cá nhân hóa cùng chuyên gia Client Advisor.",
        bullet: "Bảo toàn sức mua và tối ưu hóa lợi nhuận danh mục",
      },
      {
        label: "Giao dịch & Đầu tư",
        value: "VNDTrade",
        tag: "GIAO DỊCH & ĐẦU TƯ",
        title: "VNDTrade — Giao dịch Nhanh chóng",
        desc: "Nền tảng giao dịch chứng khoán chuyên nghiệp, công cụ phân tích thị trường chuyên sâu và hỗ trợ quản trị rủi ro thông minh.",
        bullet: "Nền tảng giao dịch tốc độ cao và dữ liệu thị trường sắc bén",
      },
    ],
  },
  "bao-an": {
    title: "Tháp Bảo An",
    brand: "PTI",
    eyebrow: "BẢO AN · PTI",
    hash: "pticare",
    image: localImage(
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop",
    ),
    quote: "Bảo an vững chãi cho những điều trân quý nhất.",
    accent: "text-protection-700",
    tab: "bg-protection-500 text-white shadow-lg",
    tabText: "text-protection-50",
    selectedPill: "border-protection-500 bg-protection-500/10",
    cta: "bg-protection-500 text-white hover:bg-protection-600",
    ctaLabel: "Khám phá Tháp Bảo An",
    defaultSub: 0,
    subCards: [
      {
        label: "Cứu hộ Khẩn cấp",
        value: "PTI SOS",
        tag: "CỨU HỘ & TÀI SẢN 24/7",
        title: "PTISOS — Cứu hộ 24/7 & Giám định Hiện trường",
        desc: "Mạng lưới cứu hộ phương tiện giao thông và hỗ trợ sự cố khẩn cấp trên toàn quốc, đồng hành an tâm trên mọi nẻo đường.",
        bullet: "Phản ứng nhanh 24/7 và giải quyết bồi thường số hóa",
      },
      {
        label: "Sức khỏe Gia đình",
        value: "PTI Health",
        tag: "BẢO HIỂM SỨC KHỎE TOÀN DIỆN",
        title: "PTIHealth — Bảo an Sức khỏe Toàn diện",
        desc: "Chương trình bảo hiểm sức khỏe cao cấp, bảo lãnh viện phí trực tiếp tại 600+ bệnh viện uy tín không cần dùng tiền mặt.",
        bullet:
          "Bảo lãnh viện phí 24/7 và chăm sóc y tế toàn diện cho cả gia đình",
      },
      {
        label: "Tài sản Doanh nghiệp",
        value: "PTI Commercial",
        tag: "TÀI SẢN & DOANH NGHIỆP",
        title: "PTICommercial — Bảo vệ Nguồn lực Doanh nghiệp",
        desc: "Giải pháp bảo an toàn diện cho ngôi nhà tư nhân, cơ sở kinh doanh, nhà xưởng và chuỗi cung ứng doanh nghiệp.",
        bullet: "Bảo vệ tài sản kinh doanh và an tâm phát triển vững bền",
      },
    ],
  },
};

const TOWER_ORDER: Tower[] = ["suc-khoe", "thinh-vuong", "bao-an"];

export function TowersSection() {
  const [tab, setTab] = useState<Tower>("suc-khoe");
  const [subIndex, setSubIndex] = useState(0);
  const tower = TOWERS[tab];
  const sub = tower.subCards[subIndex] ?? tower.subCards[0];

  const selectTab = (next: Tower) => {
    setTab(next);
    setSubIndex(TOWERS[next].defaultSub);
  };

  return (
    <section
      id="three-towers-intro"
      className="border-b border-neutral-200/80 bg-neutral-50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-4xl space-y-2 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-green">
            Cấu trúc 3 tháp giá trị
          </span>
          <h2 className="font-display text-2xl font-black leading-snug text-neutral-900 sm:text-3xl">
            Ba trụ cột cho một cuộc sống trọn vẹn
          </h2>
          <p className="pt-1 text-sm leading-relaxed text-neutral-600 sm:text-base">
            Sức khỏe, tài chính và sự an toàn – ba nền tảng không thể tách rời
            của một cuộc sống bền vững.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Ba tháp giá trị"
            className="flex flex-col gap-1.5 lg:col-span-2 lg:gap-2"
          >
            {TOWER_ORDER.map((key) => {
              const t = TOWERS[key];
              const active = tab === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectTab(key)}
                  className={cn(
                    "w-full rounded-xl px-3 py-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 sm:px-4 sm:py-3.5",
                    active
                      ? t.tab
                      : "bg-transparent text-neutral-800 hover:bg-neutral-200/50",
                  )}
                >
                  <span className="block font-display text-sm font-bold leading-tight tracking-tight lg:text-[13px]">
                    {t.title}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 block text-[11px] font-medium tracking-wide",
                      active ? t.tabText : "text-neutral-400",
                    )}
                  >
                    {t.brand}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Showcase */}
          <div
            role="tabpanel"
            className="relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white p-7 shadow-lg sm:p-10 md:min-h-[40rem] lg:col-span-10 lg:p-12"
          >
            <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-12 md:flex-1 lg:gap-10">
              <div className="group relative overflow-hidden rounded-2xl bg-neutral-200 shadow-md md:col-span-6">
                <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/11] md:absolute md:inset-0 md:aspect-auto md:h-full">
                  <Image
                    src={tower.image}
                    alt={tower.title}
                    fill
                    sizes="(min-width: 768px) 42vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <p className="absolute inset-x-6 bottom-6 font-display text-lg font-bold leading-snug text-white drop-shadow-md sm:bottom-7 sm:text-xl md:inset-x-8 md:bottom-8">
                  {tower.quote}
                </p>
              </div>

              <div className="space-y-7 md:col-span-6 md:flex md:flex-col md:justify-center md:py-2">
                <div className="space-y-1.5">
                  <span
                    className={cn(
                      "text-xs font-bold uppercase tracking-widest",
                      tower.accent,
                    )}
                  >
                    {tower.eyebrow}
                  </span>
                  <h3 className="font-display text-3xl font-black leading-tight tracking-tight text-neutral-900 sm:text-4xl">
                    {tower.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3.5">
                  {tower.subCards.map((card, idx) => {
                    const selected = subIndex === idx;
                    return (
                      <button
                        key={card.value}
                        type="button"
                        onClick={() => setSubIndex(idx)}
                        aria-pressed={selected}
                        className={cn(
                          "flex flex-row items-center justify-between gap-3 rounded-2xl border p-3.5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 sm:min-h-20 sm:flex-col sm:items-stretch sm:justify-between sm:p-4",
                          selected
                            ? cn(tower.selectedPill, "shadow-sm")
                            : "border-neutral-200 bg-white/80 text-neutral-800 hover:border-neutral-300 hover:bg-white",
                        )}
                      >
                        <span className="line-clamp-1 text-xs font-medium text-neutral-400">
                          {card.label}
                        </span>
                        <span className="block font-display text-sm font-bold leading-tight text-neutral-900 sm:mt-1.5 sm:text-sm">
                          {card.value}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-3 pt-5">
                  <span className="block text-xs font-bold uppercase tracking-widest text-neutral-400">
                    {sub.tag}
                  </span>
                  <h4 className="font-display text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                    {sub.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-neutral-600 sm:text-base">
                    {sub.desc}
                  </p>
                  <p className="flex flex-col items-center gap-1.5 text-center text-sm font-medium text-neutral-800 sm:flex-row sm:items-start sm:gap-2 sm:text-left">
                    <span className="shrink-0 text-base font-bold leading-none text-brand-gold sm:mt-1">
                      ✦
                    </span>
                    <span>{sub.bullet}</span>
                  </p>
                </div>

                <Link
                  href={`${routes.veIpaLiving}#${tower.hash}`}
                  className={cn(
                    "flex w-full items-center justify-center gap-2.5 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0 sm:inline-flex sm:w-auto sm:text-sm",
                    tower.cta,
                  )}
                >
                  <span>{tower.ctaLabel} →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
