"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Check,
  CheckCircle2,
  FileText,
  HeartPulse,
  PhoneCall,
  Send,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { localImage } from "@/lib/images";
import { routes } from "@/lib/routes";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { LeadForm } from "@/components/marketing/lead-form";

type ProductKey = "elitecare" | "phuc-an-sinh" | "tai-nan-dien";

type Product = {
  id: ProductKey;
  tabIcon: LucideIcon;
  name: string;
  breadcrumb: string;
  badge: string;
  heroTitle: string;
  heroHighlight: string;
  heroDesc: string;
  highlights: [string, string, string];
  price?: { prefix: string; amount: string; unit: string };
  ctaMain: string;
  formTitle: string;
  formDesc: string;
  formProduct: string;
  image: string;
  benefits: [string, string, string];
};

const PRODUCTS: Product[] = [
  {
    id: "elitecare",
    tabIcon: Sparkles,
    name: "Bảo hiểm sức khoẻ cao cấp Elitecare",
    breadcrumb: "Bảo hiểm sức khoẻ cao cấp Elitecare",
    badge: "Chương trình cao cấp VIP",
    heroTitle: "Bảo hiểm sức khoẻ",
    heroHighlight: "cao cấp Elitecare",
    heroDesc:
      "Quyền lợi cao cấp, mạng lưới bệnh viện quốc tế, bảo lãnh viện phí trực tiếp — chăm sóc sức khoẻ không giới hạn cho bạn và gia đình.",
    highlights: [
      "200+ Mạng lưới bảo lãnh",
      "Bảo vệ toàn diện",
      "Vận chuyển cấp cứu khẩn cấp",
    ],
    ctaMain: "Để lại thông tin tư vấn",
    formTitle: "Để lại thông tin, PTI liên hệ bạn",
    formDesc:
      "Chuyên gia tư vấn giải pháp sẽ tư vấn và gửi báo giá phù hợp với nhu cầu của bạn — miễn phí, không ràng buộc.",
    formProduct: "Bảo hiểm sức khoẻ cao cấp Elitecare",
    image: localImage(
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
    ),
    benefits: [
      "Hạn mức bảo vệ y tế vượt trội, chăm sóc toàn diện tại các bệnh viện quốc tế",
      "Bảo lãnh viện phí trực tiếp tại 200+ bệnh viện và phòng khám hàng đầu",
      "Vận chuyển cấp cứu y tế khẩn cấp và hỗ trợ y khoa chuyên biệt",
    ],
  },
  {
    id: "phuc-an-sinh",
    tabIcon: Activity,
    name: "Bảo hiểm chăm sóc sức khoẻ Phúc An Sinh",
    breadcrumb: "Bảo hiểm chăm sóc sức khoẻ Phúc An Sinh",
    badge: "Chăm sóc sức khỏe quốc dân",
    heroTitle: "Bảo hiểm chăm sóc sức khoẻ",
    heroHighlight: "Phúc An Sinh",
    heroDesc:
      "Giải pháp chăm sóc sức khoẻ cho mọi lứa tuổi từ đủ 3 tuổi đến 65 tuổi: bảo hiểm tai nạn cá nhân, nằm viện – phẫu thuật do ốm đau và bảo lãnh viện phí trực tiếp tại hệ thống bệnh viện liên kết của PTI.",
    highlights: [
      "Tham gia từ đủ 3 tuổi đến 65 tuổi",
      "Điều trị ngoại trú",
      "200+ Mạng lưới bảo lãnh",
    ],
    price: {
      prefix: "Chỉ từ",
      amount: "1.590.000",
      unit: "VNĐ / người / năm",
    },
    ctaMain: "Nhận báo giá",
    formTitle: "Để lại thông tin, PTI liên hệ bạn",
    formDesc:
      "Chuyên gia tư vấn giải pháp sẽ tư vấn chương trình và gửi báo giá phù hợp với nhu cầu của bạn và gia đình — miễn phí, không ràng buộc.",
    formProduct: "Bảo hiểm chăm sóc sức khoẻ Phúc An Sinh",
    image: localImage(
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600",
    ),
    benefits: [
      "Bảo hiểm toàn diện: Tai nạn cá nhân, điều trị nội trú, phẫu thuật do ốm đau",
      "Tùy chọn mở rộng quyền lợi điều trị ngoại trú và nha khoa linh hoạt",
      "Bảo lãnh viện phí trực tiếp tại 200+ bệnh viện, quy trình bồi thường nhanh chóng",
    ],
  },
  {
    id: "tai-nan-dien",
    tabIcon: Zap,
    name: "Bảo hiểm tai nạn hộ sử dụng điện",
    breadcrumb: "Bảo hiểm tai nạn hộ sử dụng điện",
    badge: "Bảo an gia đình",
    heroTitle: "Bảo hiểm tai nạn",
    heroHighlight: "hộ sử dụng điện",
    heroDesc:
      "Bảo vệ toàn bộ thành viên trong hộ gia đình trước rủi ro tai nạn điện, số tiền bảo hiểm từ 1 đến 50 triệu đồng/người/vụ.",
    highlights: [
      "Một hợp đồng – cả hộ được bảo vệ",
      "Chi phí nhỏ - Bảo vệ cho cả hộ gia đình",
      "Số tiền bảo hiểm linh hoạt",
    ],
    price: {
      prefix: "Chỉ từ",
      amount: "2.800",
      unit: "/ hộ / năm (tối đa 08 người)",
    },
    ctaMain: "Nhận báo giá",
    formTitle: "Để lại thông tin, PTI liên hệ bạn",
    formDesc:
      "Chuyên gia tư vấn giải pháp sẽ tư vấn Số tiền bảo hiểm phù hợp và gửi báo giá theo số thành viên trong hộ — miễn phí, không ràng buộc.",
    formProduct: "Bảo hiểm tai nạn hộ sử dụng điện",
    image: localImage(
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600",
    ),
    benefits: [
      "Bảo vệ trọn vẹn mọi thành viên có tên trong cùng hộ khẩu hoặc sổ tạm trú",
      "Chi phí đóng chỉ từ 2.800đ/hộ/năm — tối ưu tài chính cho mọi gia đình",
      "Số tiền chi trả bảo hiểm linh hoạt từ 1 đến 50 triệu đồng/người/vụ",
    ],
  },
];

const BENEFIT_TITLES = [
  "Phạm vi bảo vệ",
  "Mạng lưới & Tiện ích",
  "Dịch vụ đồng hành",
];

export function PtiHealthView() {
  const [key, setKey] = useState<ProductKey>("elitecare");
  const product = PRODUCTS.find((item) => item.id === key) ?? PRODUCTS[0];

  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: routes.home },
          { label: "Tháp Bảo An PTICare", href: routes.baoAn },
          { label: "PTI Health" },
        ]}
        trailing={
          <a
            href="tel:1900545475"
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 transition-colors hover:bg-emerald-100"
          >
            <PhoneCall className="h-3.5 w-3.5 text-emerald-600" />
            <span>1900 54 54 75</span>
          </a>
        }
      />

      <div className="border-b border-neutral-100 bg-white shadow-sm">
        <div
          role="tablist"
          aria-label="Chọn sản phẩm PTI Health"
          className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:gap-4 sm:px-6 lg:px-8"
        >
          {PRODUCTS.map((item) => {
            const Icon = item.tabIcon;
            const active = key === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setKey(item.id)}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-2xl px-4 py-2.5 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:px-5 sm:text-sm",
                  active
                    ? "bg-emerald-800 text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="bg-glow-green-tr pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-6 lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <HeartPulse className="h-4 w-4 text-emerald-600" />
              PTI Health · {product.badge}
            </span>
            <h1 className="font-display text-3xl font-black leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              {product.heroTitle}{" "}
              <span className="text-emerald-700">{product.heroHighlight}</span>
            </h1>
            <p className="max-w-2xl text-sm font-light leading-relaxed text-neutral-700 sm:text-base">
              {product.heroDesc}
            </p>

            <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-3">
              {product.highlights.map((text) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 rounded-2xl border border-neutral-200/80 bg-white p-3.5 shadow-sm"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-semibold leading-tight text-neutral-800">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {product.price ? (
              <p className="inline-flex flex-wrap items-baseline gap-2 rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-4">
                <span className="text-xs font-bold uppercase text-emerald-800">
                  {product.price.prefix}:
                </span>
                <span className="font-display text-2xl font-black text-emerald-900">
                  {product.price.amount}
                </span>
                <span className="text-xs font-medium text-emerald-700">
                  {product.price.unit}
                </span>
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#form"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 motion-reduce:hover:translate-y-0 sm:text-sm"
              >
                <Send className="h-4 w-4" />
                <span>{product.ctaMain}</span>
              </a>
              <a
                href="#benefits"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-800 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 motion-reduce:hover:translate-y-0 sm:text-sm"
              >
                <FileText className="h-4 w-4 text-emerald-700" />
                <span>Xem quyền lợi bảo hiểm</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-80 overflow-hidden rounded-3xl border border-white shadow-lg sm:h-96">
              <Image
                src={product.image}
                alt={product.name}
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
        className="scroll-mt-32 border-y border-neutral-200/80 bg-white py-16"
      >
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <span className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-700">
              Quyền lợi nổi bật
            </span>
            <h2 className="font-display text-2xl font-black text-neutral-900 sm:text-3xl">
              {product.name}
            </h2>
            <p className="text-sm font-light leading-relaxed text-neutral-600">
              Chi tiết các đặc quyền chăm sóc và phạm vi bảo hiểm được thiết kế
              chuyên biệt cho bạn.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {product.benefits.map((benefit, idx) => (
              <div
                key={benefit}
                className="flex flex-col justify-between space-y-3 rounded-2xl border border-emerald-100 bg-neutral-50 p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="space-y-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-sm font-bold text-emerald-800">
                    0{idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-neutral-900">
                    {BENEFIT_TITLES[idx]}
                  </h3>
                  <p className="text-xs font-light leading-relaxed text-neutral-600 sm:text-sm">
                    {benefit}
                  </p>
                </div>
                <p className="flex items-center pt-3 text-xs font-semibold text-emerald-800">
                  <CheckCircle2 className="mr-1.5 h-4 w-4 text-emerald-600" />
                  <span>Chuẩn mực bảo vệ PTI</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="form" className="scroll-mt-32 bg-neutral-100 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <LeadForm
            key={product.id}
            eyebrow="PTI Health"
            title={product.formTitle}
            intro={product.formDesc}
            bullets={[
              "Bảo mật thông tin tuyệt đối",
              "Tư vấn tận tâm, miễn phí",
              "Phản hồi trong vòng 24h",
            ]}
            product={product.formProduct}
            apiCode="register_consultation_pti_health_ipa_living"
            submitLabel="Đăng ký tư vấn →"
            note="Bằng việc gửi thông tin, bạn đồng ý để PTI liên hệ tư vấn."
          />
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white py-14 text-center">
        <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
            Bảo an cho đời sống
          </span>
          <h2 className="font-display text-2xl font-black text-neutral-900 sm:text-3xl">
            Sức Khỏe Của Bạn Là Tài Sản Lớn Nhất
          </h2>
          <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-neutral-500">
            Gieo hạt mầm bảo vệ hôm nay cùng PTI Health để luôn an tâm vui vầy
            bên gia đình trước mọi biến cố.
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
