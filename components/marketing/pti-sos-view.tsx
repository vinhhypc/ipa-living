"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Bike,
  Car,
  Check,
  CheckCircle2,
  FileText,
  Home,
  PhoneCall,
  Plane,
  Send,
  Shield,
  ShieldAlert,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { localImage } from "@/lib/images";
import { routes } from "@/lib/routes";
import {
  submitWorkshopInterest,
  type WorkshopInterestState,
} from "@/lib/actions/registration";

const INITIAL: WorkshopInterestState = { status: "idle" };

// shadcn UI thuần — chỉ override màu focus ring theo nhận diện PTI SOS (amber).
const fieldClass =
  "focus-visible:border-amber-500 focus-visible:ring-amber-500/30";
const selectTriggerClass = cn("w-full", fieldClass);

const HERO_IMAGE = localImage(
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600",
);

type Tone = "amber" | "purple" | "rose" | "blue" | "emerald" | "sky";

const TONE: Record<Tone, { check: string; badge: string; cta: string; price: string }> = {
  amber: { check: "text-amber-600", badge: "border-amber-100 bg-amber-50 text-amber-800", cta: "bg-amber-700 hover:bg-amber-800", price: "text-amber-900" },
  purple: { check: "text-purple-600", badge: "border-purple-100 bg-purple-50 text-purple-800", cta: "bg-purple-700 hover:bg-purple-800", price: "text-purple-950" },
  rose: { check: "text-rose-600", badge: "border-rose-100 bg-rose-50 text-rose-800", cta: "bg-rose-700 hover:bg-rose-800", price: "text-rose-950" },
  blue: { check: "text-blue-600", badge: "border-blue-100 bg-blue-50 text-blue-800", cta: "bg-blue-700 hover:bg-blue-800", price: "text-blue-950" },
  emerald: { check: "text-emerald-600", badge: "border-emerald-100 bg-emerald-50 text-emerald-800", cta: "bg-emerald-700 hover:bg-emerald-800", price: "text-emerald-950" },
  sky: { check: "text-sky-600", badge: "border-sky-100 bg-sky-50 text-sky-800", cta: "bg-sky-700 hover:bg-sky-800", price: "text-sky-950" },
};

type Product = {
  id: string;
  tone: Tone;
  badge: string;
  line: string;
  name: string;
  desc: string;
  highlights: string[];
  price: string;
  selectLabel: string;
};

const CARS: Product[] = [
  {
    id: "oto-vat-chat",
    tone: "amber",
    badge: "Toàn diện thân vỏ",
    line: "PTISOS Drive",
    name: "Bảo hiểm vật chất xe ô tô",
    desc: "Bồi thường thiệt hại vật chất cho chiếc xe của bạn trước tai nạn bất ngờ và thiên tai — từ đâm va, cháy nổ đến mất cắp toàn bộ xe.",
    highlights: [
      "Đâm va, lật đổ, cháy nổ, thiên tai, mất cắp toàn bộ xe.",
      "Pin xe ô tô điện được bảo vệ tương tự như các bộ phận khác của xe.",
      "Có mặt hiện trường trong 30 phút tùy khu vực.",
    ],
    price: "6.500.000 VNĐ/năm",
    selectLabel: "PTISOS Drive · Bảo hiểm vật chất xe ô tô",
  },
  {
    id: "oto-flexicar-dam-va",
    tone: "purple",
    badge: "Linh hoạt đâm va",
    line: "PTISOS Drive",
    name: "Flexicar Đâm va",
    desc: "Bảo hiểm rủi ro chuyên biệt cho hai tình huống phổ biến nhất trên đường: đâm va với xe khác và xe bị lật, đổ, rơi.",
    highlights: [
      "Tập trung 2 nhóm rủi ro thường gặp: đâm va với xe khác và lật, đổ, rơi.",
      "Chi trả chi phí cứu hộ, kéo xe tới nơi sửa chữa, tối đa 10% STBH.",
      "Bảo lãnh chi phí sửa chữa trực tiếp, không ứng tiền.",
    ],
    price: "3.000.000 VNĐ/năm",
    selectLabel: "PTISOS Drive · Flexicar Đâm va",
  },
  {
    id: "oto-flexicar-hoa-hoan",
    tone: "rose",
    badge: "Hỏa hoạn & Thiên tai",
    line: "PTISOS Drive",
    name: "Flexicar Hỏa hoạn, thiên tai",
    desc: "Bảo hiểm rủi ro chuyên biệt cho xe trước cháy, nổ và thiên tai: bão, lũ lụt, triều cường, động đất, sấm sét.",
    highlights: [
      "Bảo vệ xe trước cháy, nổ, bão, lũ lụt, động đất, sấm sét.",
      "Chi trả chi phí cứu hộ, kéo xe tới nơi sửa chữa, tối đa 10% STBH.",
      "Bảo lãnh chi phí sửa chữa trực tiếp, không ứng tiền.",
    ],
    price: "650.000 VNĐ/năm",
    selectLabel: "PTISOS Drive · Flexicar Hỏa hoạn, thiên tai",
  },
  {
    id: "oto-tnds-bat-buoc",
    tone: "blue",
    badge: "Nghị định 67/2023/NĐ-CP",
    line: "PTISOS Drive",
    name: "Bảo hiểm bắt buộc TNDS của chủ xe ô tô",
    desc: "Sản phẩm bắt buộc theo Nghị định 67/2023/NĐ-CP: PTI thay chủ xe bồi thường thiệt hại về người và tài sản cho bên thứ ba, hành khách khi xe gây tai nạn.",
    highlights: [
      "Mọi chủ xe ô tô phải tham gia theo Nghị định 67/2023/NĐ-CP.",
      "Tạm ứng lên đến 70% (tử vong) hoặc 50% (tổn thương bộ phận) tiền bồi thường ước tính.",
      "Bảo lãnh chi phí sửa chữa trực tiếp, không ứng tiền.",
    ],
    price: "480.700 VNĐ/năm",
    selectLabel: "PTISOS Drive · Bảo hiểm bắt buộc TNDS chủ xe ô tô",
  },
];

const BIKES: Product[] = [
  {
    id: "xemay-tnds-bat-buoc",
    tone: "emerald",
    badge: "Bắt buộc pháp luật",
    line: "PTISOS Drive · Xe máy",
    name: "Bảo hiểm bắt buộc TNDS của chủ xe máy",
    desc: "Sản phẩm bắt buộc theo Nghị định 67/2023/NĐ-CP cho mô tô, xe gắn máy và xe máy điện: PTI thay chủ xe bồi thường cho người thứ ba khi xe gây tai nạn.",
    highlights: [
      "Mọi chủ xe máy phải tham gia theo Nghị định 67/2023/NĐ-CP.",
      "Giới hạn trách nhiệm về tài sản do xe máy gây ra.",
      "Bảo lãnh chi phí sửa chữa trực tiếp, không ứng tiền.",
    ],
    price: "60.500 VNĐ/năm",
    selectLabel: "PTISOS Drive · TNDS bắt buộc chủ xe máy",
  },
  {
    id: "xemay-trach-nhiem-nguoi-ngoi",
    tone: "emerald",
    badge: "Tự nguyện mở rộng",
    line: "PTISOS Drive · Xe máy",
    name: "Bảo hiểm Trách nhiệm của Chủ xe/Lái xe đối với người ngồi trên xe máy",
    desc: "PTI chi trả trách nhiệm của chủ xe/lái xe về sức khỏe, tính mạng cho người được chở trên xe máy khi tai nạn xảy ra — mở rộng cho cả người lái.",
    highlights: [
      "Chi trả cho người được chở trên xe và cả người lái.",
      "Bồi thường theo Bảng tỷ lệ trả tiền thiệt hại về người, minh bạch theo tỷ lệ thương tật.",
      "STBH trên 20 triệu đồng được cộng thêm chi phí trợ cấp theo ngày điều trị.",
    ],
    price: "10.000 VNĐ/người/năm",
    selectLabel: "PTISOS Drive · Trách nhiệm người ngồi trên xe máy",
  },
];

const TRAVEL: Product[] = [
  {
    id: "travel-trong-nuoc",
    tone: "emerald",
    badge: "Toàn quốc",
    line: "PTISOS Travel",
    name: "Bảo hiểm Sức khỏe Du lịch trong nước",
    desc: "Bảo vệ bạn và người thân trước tai nạn, ốm đau bất ngờ trong mọi chuyến du lịch, công tác khắp Việt Nam.",
    highlights: [
      "Hồ sơ bồi thường nhanh chóng, minh bạch.",
      "Chi phí siêu tiết kiệm cho cả đoàn.",
      "Cứu trợ khẩn cấp 24/7 trên 63 tỉnh thành.",
    ],
    price: "15.000 đ/người/chuyến",
    selectLabel: "PTISOS Travel · Du lịch trong nước",
  },
  {
    id: "travel-quoc-te",
    tone: "sky",
    badge: "Toàn cầu 24/7",
    line: "PTISOS Travel",
    name: "Bảo hiểm Sức khỏe Du lịch quốc tế",
    desc: "Bảo vệ y tế toàn cầu, bồi thường hành lý, hoãn hủy chuyến bay với 9 gói quyền lợi linh hoạt.",
    highlights: [
      "Chi trả y tế, tai nạn, vận chuyển cấp cứu quốc tế.",
      "Hỗ trợ trễ chuyến, hủy bay, thất lạc hành lý.",
      "Đường dây nóng cứu hộ SOS quốc tế 24/7.",
    ],
    price: "108.000 đ/người/chuyến",
    selectLabel: "PTISOS Travel · Du lịch quốc tế",
  },
];

const HOMES_SELECT_LABEL = "PTISOS Homes · Bảo hiểm nhà tư nhân PTI Homecare";
const ALL_SELECT = [
  ...CARS,
  ...BIKES,
  ...TRAVEL,
].map((p) => p.selectLabel);
ALL_SELECT.push(HOMES_SELECT_LABEL);

const TIERS = [
  { id: "tang-1-drive", label: "Tầng 1: Drive (Xe cộ)", icon: Car, active: "bg-neutral-900 text-white", idle: "bg-neutral-100 text-neutral-700 hover:bg-neutral-200" },
  { id: "tang-2-travel", label: "Tầng 2: Travel (Du lịch)", icon: Plane, active: "bg-sky-900 text-white", idle: "border border-sky-200/60 bg-sky-50 text-sky-900 hover:bg-sky-100" },
  { id: "tang-3-homes", label: "Tầng 3: Homes (Tổ ấm)", icon: Home, active: "bg-amber-600 text-white", idle: "border border-amber-200/60 bg-amber-50 text-amber-900 hover:bg-amber-100" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ProductCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (label: string) => void;
}) {
  const tone = TONE[product.tone];
  return (
    <div className="flex flex-col justify-between space-y-5 rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md sm:p-7">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className={cn("rounded-md border px-2.5 py-1 text-xs font-bold uppercase tracking-wider", tone.badge)}>
            {product.badge}
          </span>
          <span className="text-xs font-medium text-neutral-400">{product.line}</span>
        </div>
        <h4 className="text-xl font-bold leading-snug text-neutral-900">
          {product.name}
        </h4>
        <p className="text-xs font-light leading-relaxed text-neutral-600 sm:text-sm">
          {product.desc}
        </p>
        <div className="space-y-2 rounded-2xl border border-neutral-100 bg-neutral-50 p-3.5 text-xs text-neutral-700">
          {product.highlights.map((item) => (
            <p key={item} className="flex items-start gap-2">
              <Check className={cn("mt-0.5 h-4 w-4 shrink-0", tone.check)} />
              <span>{item}</span>
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-4">
        <span>
          <span className="block text-xs font-light text-neutral-400">
            Tham khảo chỉ từ:
          </span>
          <span className={cn("text-base font-bold", tone.price)}>{product.price}</span>
        </span>
        <button
          type="button"
          onClick={() => onSelect(product.selectLabel)}
          className={cn(
            "rounded-xl px-4 py-2 text-xs font-bold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
            tone.cta,
          )}
        >
          Để lại thông tin tư vấn
        </button>
      </div>
    </div>
  );
}

export function PtiSosView() {
  const [activeTier, setActiveTier] = useState("tang-1-drive");
  const [selectedLabel, setSelectedLabel] = useState(ALL_SELECT[0]);
  const [state, formAction] = useActionState(submitWorkshopInterest, INITIAL);

  useEffect(() => {
    const onScroll = () => {
      for (const tier of [...TIERS].reverse()) {
        const el = document.getElementById(tier.id);
        if (el && el.getBoundingClientRect().top <= 160) {
          setActiveTier(tier.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const selectProduct = (label: string) => {
    setSelectedLabel(label);
    scrollToId("sos-form");
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      <div className="sticky top-0 z-30 border-b border-neutral-200/80 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link
            href={routes.baoAn}
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 transition-colors hover:text-brand-navy"
          >
            <ArrowLeft className="h-4 w-4 text-brand-gold" />
            <span>Quay lại Tháp Bảo An</span>
          </Link>
          <a
            href="tel:1900545475"
            className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700 transition-colors hover:bg-red-100"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            <span>1900 54 54 75</span>
          </a>
        </div>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy py-14 text-white sm:py-20">
        <div className="bg-glow-gold-tr pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-5 lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
              <ShieldAlert className="h-4 w-4 text-amber-400" />
              3 Tầng Sản Phẩm PTISOS
            </span>
            <h1 className="font-display text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              An toàn trên mọi hành trình — Đồng hành cùng PTISOS
            </h1>
            <p className="max-w-2xl text-sm font-light leading-relaxed text-slate-200 sm:text-base">
              Hệ thống bảo vệ toàn diện 3 tầng từ PTI: Phương tiện di chuyển
              (<strong>Drive</strong>), Hành trình du lịch (<strong>Travel</strong>)
              và Tổ ấm gia đình (<strong>Homes</strong>).
            </p>
            <div className="grid max-w-xl grid-cols-1 gap-2.5 pt-2 sm:grid-cols-3">
              {TIERS.map((tier) => {
                const Icon = tier.icon;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => scrollToId(tier.id)}
                    className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-left text-xs font-bold text-white transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-amber-400" />
                    <span>{tier.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg sm:h-72">
              <Image
                src={HERO_IMAGE}
                alt="PTISOS — cứu hộ và bảo vệ hành trình"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-14 z-20 border-b border-neutral-200 bg-white shadow-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-2 px-4 py-2.5 sm:px-6 lg:px-8">
          {TIERS.map((tier) => {
            const Icon = tier.icon;
            const active = activeTier === tier.id;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => scrollToId(tier.id)}
                className={cn(
                  "flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 sm:text-sm",
                  active ? tier.active : tier.idle,
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tier.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
        {/* Tier 1 */}
        <section id="tang-1-drive" className="scroll-mt-32 space-y-8">
          <TierHeader
            no="TẦNG 1"
            noClass="bg-amber-500 text-neutral-900"
            borderClass="border-neutral-900"
            title="PTISOS Drive · Xe Ô tô & Xe máy"
            desc="Bảo vệ toàn diện cho Xe ô tô & Xe máy: vật chất xe, tai nạn va chạm và trách nhiệm dân sự bắt buộc."
            tag="6 Sản phẩm (4 Ô tô · 2 Xe máy)"
          />
          <SubGroup icon={Car} tone="bg-amber-500/10 text-amber-700" title="Nhóm Sản Phẩm Xe Ô tô (4 sản phẩm)">
            {CARS.map((product) => (
              <ProductCard key={product.id} product={product} onSelect={selectProduct} />
            ))}
          </SubGroup>
          <SubGroup icon={Bike} tone="bg-emerald-500/10 text-emerald-700" title="Nhóm Sản Phẩm Xe Máy (2 sản phẩm)" divider>
            {BIKES.map((product) => (
              <ProductCard key={product.id} product={product} onSelect={selectProduct} />
            ))}
          </SubGroup>
        </section>

        {/* Tier 2 */}
        <section id="tang-2-travel" className="scroll-mt-32 space-y-6">
          <TierHeader
            no="TẦNG 2"
            noClass="bg-sky-500 text-white"
            borderClass="border-sky-600"
            title="PTISOS Travel · Bảo hiểm Du lịch"
            desc="Bảo vệ sức khỏe và tài chính cho mọi hành trình du lịch, nghỉ dưỡng và công tác trong nước & quốc tế."
            tag="2 Dòng sản phẩm tinh gọn"
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {TRAVEL.map((product) => (
              <ProductCard key={product.id} product={product} onSelect={selectProduct} />
            ))}
          </div>
        </section>

        {/* Tier 3 */}
        <section id="tang-3-homes" className="scroll-mt-32 space-y-8">
          <TierHeader
            no="TẦNG 3"
            noClass="bg-amber-600 text-white"
            borderClass="border-amber-600"
            title="PTISOS Homes · Bảo hiểm Nhà tư nhân"
            desc="Bảo vệ toàn diện 3 chiều cho tổ ấm của bạn: Khung nhà · Tài sản bên trong · Trách nhiệm với bên thứ 3."
            tag="Bảo hiểm trọn vẹn tổ ấm"
          />
          <div className="flex flex-col justify-between space-y-6 rounded-3xl border border-amber-200/80 bg-amber-50/40 p-6 shadow-md sm:p-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-md border border-amber-300 bg-amber-100/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
                  PTISOS Homes · PTI Homecare
                </span>
                <span className="rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
                  Bảo vệ 3 chiều
                </span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900">
                Bảo hiểm nhà tư nhân PTI Homecare
              </h3>
              <p className="max-w-3xl text-sm font-light leading-relaxed text-neutral-600">
                Khung nhà · Tài sản bên trong · Trách nhiệm với bên thứ 3 — một
                hợp đồng bảo vệ trọn vẹn ngôi nhà và cuộc sống gia đình, chỉ từ
                220.000đ/năm.
              </p>
              <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-3">
                {[
                  ["3 Trong 1 Hợp đồng", "Khung nhà, tài sản bên trong và trách nhiệm với bên thứ 3 trong cùng một hợp đồng."],
                  ["Giá trị mới 100%", "Tài sản tổn thất được bồi thường theo giá trị mới, không khấu trừ khấu hao."],
                  ["Tổn thất thực tế", "Bồi thường theo tổn thất thực tế, không giảm trừ do bảo hiểm dưới giá trị."],
                ].map(([title, desc]) => (
                  <div key={title} className="space-y-2 rounded-2xl border border-amber-100 bg-white p-4 shadow-sm">
                    <p className="flex items-center gap-2 text-xs font-bold text-amber-700">
                      <Check className="h-4 w-4 shrink-0" />
                      <span>{title}</span>
                    </p>
                    <p className="text-xs font-light leading-relaxed text-neutral-600">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-amber-100 pt-4">
              <span>
                <span className="block text-xs font-light text-neutral-500">
                  Mức phí áp dụng:
                </span>
                <span className="flex items-baseline gap-1.5">
                  <span className="text-xs font-medium text-amber-900">Chỉ từ</span>
                  <span className="font-display text-xl font-bold text-amber-900">
                    220.000
                  </span>
                  <span className="text-xs text-neutral-600">
                    VNĐ / hợp đồng / năm
                  </span>
                </span>
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={routes.ptiHomes}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-4 py-2.5 text-xs font-bold text-amber-900 transition-all hover:bg-amber-50"
                >
                  <span>Xem quyền lợi bảo hiểm</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => selectProduct(HOMES_SELECT_LABEL)}
                  className="rounded-xl bg-amber-700 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-amber-800"
                >
                  Để lại thông tin tư vấn
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section id="sos-form" className="scroll-mt-32 py-8">
          <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="flex flex-col justify-between space-y-6 bg-gradient-to-br from-brand-navy via-brand-navy-light to-neutral-950 p-8 text-white md:col-span-2">
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-300">
                    <Shield className="h-3.5 w-3.5" />
                    <span>PTISOS</span>
                  </span>
                  <h2 className="font-display text-xl font-bold leading-tight sm:text-2xl">
                    Để lại thông tin, PTI liên hệ bạn
                  </h2>
                  <p className="text-xs font-light leading-relaxed text-slate-300">
                    Chuyên gia tư vấn giải pháp sẽ tư vấn và gửi báo giá phù hợp
                    với nhu cầu của bạn — miễn phí, không ràng buộc.
                  </p>
                </div>
                <ul className="space-y-3 border-t border-white/10 pt-6 text-xs text-slate-300">
                  {[
                    "Bảo mật thông tin tuyệt đối",
                    "Tư vấn tận tâm, miễn phí",
                    "Tổng đài cứu hộ & CSKH 24/7: 1900 54 54 75",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 md:col-span-3">
                {state.status === "success" ? (
                  <div className="space-y-4 py-12 text-center">
                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="h-8 w-8" />
                    </span>
                    <h3 className="text-xl font-bold text-neutral-900">
                      Gửi yêu cầu thành công!
                    </h3>
                    <p className="mx-auto max-w-sm text-xs leading-relaxed text-neutral-600">
                      {state.message}
                    </p>
                  </div>
                ) : (
                  <form action={formAction} className="space-y-4" noValidate>
                    {state.status === "error" && state.message ? (
                      <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-medium text-red-700">
                        {state.message}
                      </p>
                    ) : null}
                    <div>
                      <Label htmlFor="sos-product" className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-700">
                        Sản phẩm quan tâm
                      </Label>
                      <Select
                        name="product"
                        value={selectedLabel}
                        onValueChange={(value) => setSelectedLabel(value as string)}
                      >
                        <SelectTrigger
                          id="sos-product"
                          className={selectTriggerClass}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="text-xs">
                          {ALL_SELECT.map((label) => (
                            <SelectItem key={label} value={label}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="sos-name" className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-700">
                        Họ và tên <span className="text-rose-500">*</span>
                      </Label>
                      <Input id="sos-name" name="name" type="text" required autoComplete="name" placeholder="Nguyễn Văn A" className={fieldClass} />
                    </div>
                    <div>
                      <Label htmlFor="sos-phone" className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-700">
                        Số điện thoại <span className="text-rose-500">*</span>
                      </Label>
                      <Input id="sos-phone" name="phone" type="tel" required autoComplete="tel" placeholder="0901 234 567" className={fieldClass} />
                    </div>
                    <div>
                      <Label htmlFor="sos-detail" className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-700">
                        Thông tin xe / chuyến đi / nhà
                      </Label>
                      <Input id="sos-detail" name="detail" type="text" placeholder="VD: Mazda CX-5 / Nhật Bản 5 ngày / Chung cư 70m²" className={fieldClass} />
                    </div>
                    <div>
                      <Label htmlFor="sos-email" className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-700">
                        Email (không bắt buộc)
                      </Label>
                      <Input id="sos-email" name="email" type="email" autoComplete="email" placeholder="email@cua-ban.com" className={fieldClass} />
                    </div>
                    <div className="pt-2">
                      <SosSubmit />
                      <p className="mt-2.5 text-center text-xs font-light leading-relaxed text-neutral-500">
                        Bằng việc gửi thông tin, bạn đồng ý để PTI liên hệ tư vấn.
                        Tổng đài 24/7: 1900 54 54 75.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8 rounded-3xl border border-neutral-700 bg-gradient-to-r from-neutral-900 via-brand-navy to-neutral-800 p-8 text-center text-white shadow-lg sm:p-12">
          <div className="mx-auto max-w-3xl space-y-3">
            <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-400">
              Đồng hành tư vấn 24/7
            </span>
            <h2 className="font-display text-2xl font-black sm:text-3xl lg:text-4xl">
              Bạn cần tư vấn giải pháp bảo vệ tối ưu nhất?
            </h2>
            <p className="text-xs font-light leading-relaxed text-slate-300 sm:text-sm">
              Đội ngũ Client Advisor của PTI luôn sẵn sàng lắng nghe, phân tích
              nhu cầu và tư vấn chương trình bảo hiểm với mức phí ưu đãi nhất cho
              bạn và gia đình.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollToId("sos-form")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-wider text-brand-navy shadow-lg transition-all hover:bg-neutral-100 sm:w-auto"
            >
              <FileText className="h-4 w-4" />
              <span>Để lại thông tin tư vấn</span>
            </button>
            <Link
              href={routes.dCare}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gold px-8 py-4 text-xs font-bold uppercase tracking-wider text-brand-navy shadow-lg transition-all hover:bg-brand-gold-light sm:w-auto"
            >
              <UserCheck className="h-4 w-4" />
              <span>Liên hệ CA</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function SosSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-neutral-800 disabled:opacity-60"
    >
      <Send className="h-4 w-4 text-amber-400" />
      <span>{pending ? "Đang gửi..." : "Đăng ký tư vấn →"}</span>
    </button>
  );
}

function TierHeader({
  no,
  noClass,
  borderClass,
  title,
  desc,
  tag,
}: {
  no: string;
  noClass: string;
  borderClass: string;
  title: string;
  desc: string;
  tag: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-4 border-b-2 pb-4 sm:flex-row sm:items-center",
        borderClass,
      )}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <span className={cn("rounded-md px-2.5 py-0.5 text-xs font-black", noClass)}>
            {no}
          </span>
          <h2 className="font-display text-2xl font-black text-neutral-900 sm:text-3xl">
            {title}
          </h2>
        </div>
        <p className="text-xs font-light text-neutral-600 sm:text-sm">{desc}</p>
      </div>
      <span className="w-fit rounded-full border border-amber-200/80 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">
        {tag}
      </span>
    </div>
  );
}

function SubGroup({
  icon: Icon,
  tone,
  title,
  divider = false,
  children,
}: {
  icon: LucideIcon;
  tone: string;
  title: string;
  divider?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-5", divider && "border-t border-neutral-200 pt-6")}>
      <div className="flex items-center gap-2 text-neutral-900">
        <span className={cn("rounded-lg p-1.5", tone)}>
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="text-base font-bold sm:text-lg">{title}</h3>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{children}</div>
    </div>
  );
}
