import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  FileText,
  Flame,
  Home,
  PhoneCall,
  Send,
  Tv,
  Users,
  type LucideIcon,
} from "lucide-react";

import { localImage } from "@/lib/images";
import { routes } from "@/lib/routes";
import { LeadForm } from "@/components/marketing/lead-form";

const HERO_IMAGE = localImage(
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600",
);

const HIGHLIGHTS = [
  "Khung nhà, tài sản bên trong và trách nhiệm với bên thứ 3 trong cùng một hợp đồng.",
  "Tài sản tổn thất được bồi thường theo giá trị mới, không khấu trừ khấu hao.",
  "Bồi thường theo tổn thất thực tế, không giảm trừ do bảo hiểm dưới giá trị.",
];

const TIERS: {
  tier: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  items: string[];
  footLabel: string;
  footValue: string;
}[] = [
  {
    tier: "Tầng 1",
    icon: Flame,
    title: "Bảo hiểm kết cấu nhà",
    desc: "Bảo vệ toàn diện phần khung nhà, móng, tường, mái trước hỏa hoạn, cháy nổ, bão lũ, sét đánh và sụt lún đất bất ngờ.",
    items: [
      "Cháy nổ, hỏa hoạn, sét đánh trực tiếp",
      "Thiên tai: bão, lũ lụt, giông lốc, sụt lún",
      "Chi phí dọn dẹp hiện trường sau sự cố",
    ],
    footLabel: "Mức phí tham khảo:",
    footValue: "Chỉ từ 220.000đ/năm",
  },
  {
    tier: "Tầng 2",
    icon: Tv,
    title: "Bảo hiểm tài sản bên trong",
    desc: "Bảo vệ trọn vẹn tài sản, trang thiết bị nội thất, thiết bị điện tử và đồ gia dụng đắt giá trong ngôi nhà của bạn theo giá trị mới.",
    items: [
      "Tài sản nội thất, thiết bị điện & đồ gia dụng",
      "Trộm cắp đột nhập có dấu vết cạy phá",
      "Tràn nước từ đường ống bể vỡ trong nhà",
    ],
    footLabel: "Bồi thường giá trị mới:",
    footValue: "Không khấu trừ khấu hao",
  },
  {
    tier: "Tầng 3",
    icon: Users,
    title: "Bảo hiểm trách nhiệm bên thứ ba",
    desc: "Bảo vệ trách nhiệm pháp lý khi sự cố từ nhà bạn (như cháy lây lan hay vỡ ống nước) vô tình làm hư hỏng nhà hàng xóm.",
    items: [
      "Chi trả thiệt hại tài sản gây ra cho láng giềng",
      "Bảo vệ trách nhiệm công cộng chính chủ nhà",
      "Giữ trọn tình nghĩa xóm giềng & an tâm pháp lý",
    ],
    footLabel: "Tổn thất thực tế:",
    footValue: "Không giảm trừ bảo hiểm",
  },
];

export function PtiHomesView() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      <div className="sticky top-0 z-30 border-b border-neutral-200/80 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs">
            <Link
              href={routes.baoAn}
              className="inline-flex items-center gap-1.5 font-bold text-neutral-600 transition-colors hover:text-brand-navy"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-amber-600" />
              <span>Tháp Bảo An</span>
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="font-medium text-neutral-500">
              Bảo hiểm tài sản &amp; tổ ấm
            </span>
            <span className="hidden text-neutral-300 sm:inline">/</span>
            <span className="hidden font-bold text-amber-800 sm:inline">
              PTI Homecare
            </span>
          </nav>
          <a
            href="tel:1900545475"
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900 transition-colors hover:bg-amber-100"
          >
            <PhoneCall className="h-3.5 w-3.5 text-amber-700" />
            <span>1900 54 54 75</span>
          </a>
        </div>
      </div>

      <section className="relative overflow-hidden py-14 sm:py-20">
        <div className="bg-glow-gold-tr pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-6 lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-100/70 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
              <Home className="h-4 w-4 text-amber-700" />
              PTI Homes · Bảo hiểm nhà tư nhân PTI Homecare
            </span>
            <h1 className="font-display text-3xl font-black leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              Bảo vệ toàn diện 3 chiều cho{" "}
              <span className="text-amber-700">tổ ấm của bạn</span>
            </h1>
            <p className="max-w-2xl text-sm font-light leading-relaxed text-neutral-700 sm:text-base">
              Khung nhà · Tài sản bên trong · Trách nhiệm với bên thứ 3 — một hợp
              đồng bảo vệ trọn vẹn ngôi nhà và cuộc sống gia đình, chỉ từ
              220.000đ/năm.
            </p>

            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
              {HIGHLIGHTS.map((text) => (
                <div
                  key={text}
                  className="flex items-start gap-2.5 rounded-2xl border border-neutral-200/80 bg-white p-3.5 shadow-sm"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-xs font-semibold leading-snug text-neutral-800">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <p className="inline-flex flex-wrap items-baseline gap-2 rounded-2xl border border-amber-200/80 bg-amber-50/80 p-4">
              <span className="text-xs font-bold uppercase text-amber-800">
                Chỉ từ:
              </span>
              <span className="font-display text-2xl font-black text-amber-950">
                220.000đ
              </span>
              <span className="text-xs font-medium text-amber-700">
                VNĐ / hợp đồng / năm
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#form"
                className="inline-flex items-center gap-2 rounded-full bg-amber-700 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-amber-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 motion-reduce:hover:translate-y-0 sm:text-sm"
              >
                <Send className="h-4 w-4" />
                <span>Để lại thông tin tư vấn</span>
              </a>
              <a
                href="#benefits"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-800 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-neutral-50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 motion-reduce:hover:translate-y-0 sm:text-sm"
              >
                <FileText className="h-4 w-4 text-amber-700" />
                <span>Xem quyền lợi bảo hiểm</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-80 overflow-hidden rounded-3xl border border-white shadow-lg sm:h-96">
              <Image
                src={HERO_IMAGE}
                alt="PTI Homes — bảo hiểm nhà tư nhân"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="benefits"
        className="scroll-mt-20 border-y border-neutral-200/80 bg-white py-16"
      >
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <span className="inline-flex rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-700">
              Phạm vi bảo vệ trọng tâm
            </span>
            <h2 className="font-display text-2xl font-black text-brand-navy sm:text-3xl">
              3 Tầng Lá Chắn An Tâm Cho Ngôi Nhà Bạn
            </h2>
            <p className="text-sm font-light text-neutral-600">
              Ngôi nhà là nơi bạn tích lũy tài sản và gìn giữ hạnh phúc gia đình.
              PTI Homes mang đến giải pháp bảo vệ 360 độ từ ngôi nhà đến con
              người.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {TIERS.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.tier}
                  className="flex flex-col justify-between space-y-6 rounded-3xl border border-amber-200/80 bg-amber-50/40 p-7 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="space-y-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div className="space-y-1">
                      <span className="inline-block rounded-md bg-amber-100/60 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
                        {tier.tier}
                      </span>
                      <h3 className="pt-1 text-xl font-bold text-neutral-900">
                        {tier.title}
                      </h3>
                    </div>
                    <p className="text-xs font-light leading-relaxed text-neutral-600">
                      {tier.desc}
                    </p>
                    <ul className="space-y-2 border-t border-neutral-100 pt-2 text-xs font-medium text-neutral-700">
                      {tier.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
                    <span className="text-xs font-light text-neutral-400">
                      {tier.footLabel}
                    </span>
                    <span className="rounded-xl bg-amber-100/80 px-3 py-1.5 text-xs font-bold text-amber-900">
                      {tier.footValue}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="form" className="scroll-mt-20 bg-neutral-100 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <LeadForm
            eyebrow="PTI Homes"
            title="Để lại thông tin, PTI liên hệ bạn"
            intro="Chuyên gia tư vấn giải pháp sẽ tư vấn gói bảo vệ và gửi báo giá phù hợp với ngôi nhà của bạn — miễn phí, không ràng buộc."
            bullets={[
              "Bảo mật thông tin tuyệt đối",
              "Tư vấn tận tâm, miễn phí",
              "Tổng đài 24/7: 1900 54 54 75",
            ]}
            product="Bảo hiểm nhà tư nhân PTI Homecare"
            submitLabel="Đăng ký tư vấn →"
            note="Thông tin trên trang chỉ mang tính giới thiệu. Quyền lợi và phí bảo hiểm thực tế theo Quy tắc bảo hiểm và hợp đồng được PTI cấp. Tổng đài 24/7: 1900 54 54 75."
          />
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white py-14 text-center">
        <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
            Bảo an tổ ấm
          </span>
          <h2 className="font-display text-2xl font-black text-neutral-900 sm:text-3xl">
            Tổ Ấm Của Bạn Luôn Xứng Đáng Được Bảo Vệ Trọn Vẹn
          </h2>
          <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-neutral-500">
            Đồng hành cùng PTI Homes để mỗi ngày trôi qua dưới mái nhà thân yêu
            luôn là một ngày bình an và hạnh phúc.
          </p>
          <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
            <a
              href="#form"
              className="rounded-full bg-neutral-900 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-neutral-800"
            >
              Yêu cầu tư vấn viên gọi lại
            </a>
            <Link
              href={routes.baoAn}
              className="rounded-full border border-neutral-300 bg-neutral-50 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-100"
            >
              Quay lại Tháp Bảo An
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
