"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  Layers,
  Shield,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";
import type { Tower } from "@/lib/types";

type Layer = {
  type: string;
  name: string;
  desc: string;
  bullet: string;
  subtitle: string;
};

type TowerConfig = {
  title: string;
  shortTitle: string;
  brand: string;
  href: string;
  accent: string;
  chip: string;
  icon: LucideIcon;
  iconColor: string;
  cta: string;
  tagline: string;
  layers: [Layer, Layer, Layer];
};

const TOWERS: Record<Tower, TowerConfig> = {
  "suc-khoe": {
    title: "Tháp Sức Khỏe",
    shortTitle: "Sức Khỏe",
    brand: "AnVie",
    href: routes.sucKhoe,
    accent: "border-brand-green bg-brand-green/5 text-brand-green",
    chip: "bg-brand-green/10 text-brand-green",
    icon: Heart,
    iconColor: "text-brand-green",
    cta: "bg-brand-green text-white hover:bg-brand-green-dark",
    tagline: "Xây nền sống khỏe từ gốc rễ.",
    layers: [
      {
        type: "Nền tảng",
        subtitle: "Thương hiệu Nền tảng gốc",
        name: "AnVie",
        desc: "Thương hiệu nền định vị y học lối sống chủ động, định hình triết lý chăm sóc sức khỏe.",
        bullet: "Bảo chứng y khoa & tư vấn chuyên sâu",
      },
      {
        type: "Sản phẩm & Giải pháp",
        subtitle: "Bộ giải pháp & Sản phẩm",
        name: "AnVie Gobio & AnVie Health",
        desc: "Bộ sản phẩm dinh dưỡng hữu cơ kết hợp dịch vụ tầm soát y khoa, bảo vệ chủ động 24/7.",
        bullet: "Thực phẩm dinh dưỡng & khám y khoa",
      },
      {
        type: "Không gian Cộng đồng",
        subtitle: "Không gian Cộng đồng",
        name: "AnVie Life",
        desc: "Cộng đồng gắn kết, gieo hạt hành trình thực hành nếp sống Vui - Khỏe lành mạnh.",
        bullet: "Chia sẻ thói quen sống xanh & tích cực",
      },
    ],
  },
  "thinh-vuong": {
    title: "Tháp Thịnh Vượng",
    shortTitle: "Thịnh Vượng",
    brand: "VNDIRECT",
    href: routes.thinhVuong,
    accent: "border-brand-gold bg-brand-gold/5 text-brand-gold",
    chip: "bg-brand-gold/15 text-brand-gold-dark",
    icon: TrendingUp,
    iconColor: "text-brand-gold",
    cta: "bg-brand-gold text-white hover:bg-brand-gold-dark",
    tagline: "Gieo hạt tài chính, gặt sự an tâm dài hạn.",
    layers: [
      {
        type: "Nền tảng",
        subtitle: "Thương hiệu Nền tảng gốc",
        name: "VNDIRECT",
        desc: "Nền tảng công nghệ giao dịch và cố vấn tài chính chuyên nghiệp, quản lý gia sản bền vững.",
        bullet: "Năng lực quản lý tài chính chuẩn mực quốc tế",
      },
      {
        type: "Sản phẩm & Giải pháp",
        subtitle: "Bộ giải pháp & Sản phẩm",
        name: "VNDTrade, VNDSIP, VNDWealth",
        desc: "Công cụ giao dịch chứng khoán, đầu tư tích góp định kỳ có kỷ luật và ủy thác đầu tư cao cấp.",
        bullet: "Tích lũy tài sản - Đầu tư hiệu quả",
      },
      {
        type: "Không gian Cộng đồng",
        subtitle: "Không gian Cộng đồng",
        name: "VNDGO",
        desc: "Cộng đồng những nhà đầu tư có trách nhiệm, chia sẻ kinh nghiệm và tri thức gieo hạt thịnh vượng.",
        bullet: "Lan tỏa nếp sống đầu tư văn minh",
      },
    ],
  },
  "bao-an": {
    title: "Tháp Bảo An",
    shortTitle: "Bảo An",
    brand: "PTI",
    href: routes.baoAn,
    accent: "border-brand-bluegray bg-brand-bluegray/5 text-brand-bluegray",
    chip: "bg-brand-bluegray/10 text-brand-bluegray-dark",
    icon: Shield,
    iconColor: "text-brand-bluegray",
    cta: "bg-brand-bluegray text-white hover:bg-brand-bluegray-dark",
    tagline: "Chắn mọi biến động trước khi nó xảy ra.",
    layers: [
      {
        type: "Nền tảng",
        subtitle: "Thương hiệu Nền tảng gốc",
        name: "PTI (Bảo hiểm Bưu điện)",
        desc: "Thương hiệu bảo hiểm hàng đầu Việt Nam, bệ đỡ an toàn cho tài sản vật chất lẫn sức khỏe con người.",
        bullet: "Mạng lưới bảo lãnh & hỗ trợ khẩn cấp toàn quốc",
      },
      {
        type: "Sản phẩm & Giải pháp",
        subtitle: "Bộ giải pháp & Sản phẩm",
        name: "PTI SOS, PTI Health, PTI Commercial",
        desc: "Bộ giải pháp cứu hộ cứu nạn khẩn cấp, bảo vệ sức khỏe gia đình và bảo hiểm tài sản thương nghiệp.",
        bullet: "Chi trả nhanh chóng - Đồng hành hỗ trợ 24/7",
      },
      {
        type: "Không gian Cộng đồng",
        subtitle: "Không gian Cộng đồng",
        name: "PTICare",
        desc: "Cộng đồng hậu mãi chăm sóc khách hàng, hỗ trợ tận tâm gieo sự bình an và tin tưởng.",
        bullet: "Kết nối yêu thương - An tâm trọn vẹn",
      },
    ],
  },
};

export function TowerCard({ towerType }: { towerType: Tower }) {
  const tower = TOWERS[towerType];
  const Icon = tower.icon;
  // Mặc định chọn tầng Cộng đồng (đỉnh tháp) như bản gốc.
  const [selected, setSelected] = useState(2);
  const active = tower.layers[selected];
  const stackOrder = [2, 1, 0];

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-lg transition-all duration-300 hover:shadow-lg">
      <div className="border-b border-neutral-50 p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className={cn("rounded-2xl p-3 shadow-md", tower.accent)}>
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="font-display text-xl font-extrabold text-neutral-800">
              {tower.title}
            </h3>
          </div>
          <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-600">
            {tower.brand}
          </span>
        </div>
        <p className="mt-3 text-sm font-light leading-relaxed text-neutral-500">
          {tower.tagline}
        </p>
      </div>

      <div className="flex min-h-50 flex-col items-center justify-center bg-neutral-50/50 p-5 sm:p-6">
        <div className="flex w-full max-w-70 flex-col gap-2">
          {stackOrder.map((idx) => {
            const layer = tower.layers[idx];
            const isActive = selected === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelected(idx)}
                aria-pressed={isActive}
                className={cn(
                  "rounded-xl border px-3.5 py-2.5 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                  isActive
                    ? cn(tower.accent, "-translate-y-0.5 border-2 shadow-md")
                    : "border-neutral-200 bg-white text-neutral-600 opacity-85 shadow-sm hover:border-neutral-300 hover:bg-neutral-50",
                )}
              >
                <span className="flex items-center justify-end">
                  <Layers className="h-3.5 w-3.5 opacity-40" />
                </span>
                <span className="block font-display text-sm font-bold text-neutral-800">
                  {layer.name}
                </span>
                <span className="mt-0.5 block text-xs font-light text-neutral-500">
                  {layer.subtitle}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-center text-xs text-neutral-400">
          * Bấm chọn từng phần để xem chi tiết
        </p>
      </div>

      <div className="flex flex-grow flex-col justify-between bg-white p-5 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.15 }}
            className="space-y-2"
          >
            <span
              className={cn(
                "inline-block rounded-full px-2.5 py-0.5 text-xs font-bold uppercase",
                tower.chip,
              )}
            >
              {active.type}
            </span>
            <h4 className="font-display text-base font-bold text-neutral-800">
              {active.name}
            </h4>
            <p className="text-xs font-light leading-relaxed text-neutral-600">
              {active.desc}
            </p>
            <p className="flex items-start gap-2 pt-1">
              <CheckCircle2
                className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", tower.iconColor)}
              />
              <span className="text-xs font-medium text-neutral-700">
                {active.bullet}
              </span>
            </p>
          </motion.div>
        </AnimatePresence>

        <Link
          href={tower.href}
          className={cn(
            "mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold uppercase tracking-widest shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
            tower.cta,
          )}
        >
          <span>Khám phá Tháp {tower.shortTitle}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
