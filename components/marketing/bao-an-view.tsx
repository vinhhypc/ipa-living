"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Building2,
  Car,
  CheckCircle2,
  Clock,
  FileText,
  Heart,
  HeartHandshake,
  Plane,
  RefreshCw,
  Shield,
  ShieldAlert,
  Sparkles,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { localImage } from "@/lib/images";
import { routes } from "@/lib/routes";
import { WorkshopInterestModal } from "@/components/marketing/workshop-interest-modal";

const HERO_IMAGE = localImage(
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1800&q=85",
);

type DimensionTone = "emerald" | "blue" | "amber";

const DIMENSION_TONE: Record<
  DimensionTone,
  { iconBox: string; note: string; noteText: string }
> = {
  emerald: {
    iconBox: "bg-emerald-50 border-emerald-100 text-emerald-600",
    note: "bg-emerald-50/60 border-emerald-100/80",
    noteText: "text-emerald-900",
  },
  blue: {
    iconBox: "bg-blue-50 border-blue-100 text-brand-navy",
    note: "bg-blue-50/60 border-blue-100/80",
    noteText: "text-blue-900",
  },
  amber: {
    iconBox: "bg-amber-50 border-amber-100 text-amber-700",
    note: "bg-amber-50/60 border-amber-100/80",
    noteText: "text-amber-900",
  },
};

const DIMENSIONS: {
  tone: DimensionTone;
  icon: LucideIcon;
  step: string;
  name: string;
  noteTitle: string;
  quote: string;
  desc: string;
  offeringsTitle: string;
  offerings: { icon: LucideIcon; text: string }[];
}[] = [
  {
    tone: "emerald",
    icon: Activity,
    step: "Chiều 1",
    name: "An Toàn",
    noteTitle: "An toàn thể chất",
    quote: "Được bảo vệ mỗi ngày, không chỉ khi có sự cố",
    desc: "PTI kết nối đúng bệnh viện trước khi bạn cần, đồng hành trong suốt quá trình điều trị, và hỗ trợ phục hồi sau đó — không để bạn một mình.",
    offeringsTitle: "Giải pháp tích hợp",
    offerings: [
      { icon: Heart, text: "PTI Health · Medical Journey 24/7" },
      { icon: ShieldAlert, text: "PTI SOS · Xe cộ & du lịch" },
      { icon: CheckCircle2, text: "Smart Hospital Connect · 600+ BV" },
    ],
  },
  {
    tone: "blue",
    icon: Shield,
    step: "Chiều 2",
    name: "An Tâm",
    noteTitle: "Bình an về tài chính",
    quote: "Gia đình không bị ảnh hưởng tài chính dù có rủi ro",
    desc: "Khi bệnh nặng, tai nạn hay thiên tai xảy đến, PTI đảm bảo tài sản bạn gây dựng không bị cuốn trôi. Bạn tập trung điều trị; phần còn lại đã có PTI.",
    offeringsTitle: "Giải pháp tích hợp",
    offerings: [
      { icon: Activity, text: "PTI Health · Nội trú & bệnh hiểm nghèo" },
      { icon: Building2, text: "PTI Commercial · Doanh nghiệp & Tài sản" },
    ],
  },
  {
    tone: "amber",
    icon: HeartHandshake,
    step: "Chiều 3",
    name: "An Sinh",
    noteTitle: "Đồng hành lâu dài",
    quote: "Xuyên suốt vòng đời hợp đồng, không chỉ lúc ký kết",
    desc: "PTI chủ động nhắc tái tục, đơn giản hóa quy trình bồi thường, và luôn có người thật lắng nghe khi bạn cần điều chỉnh — vì cuộc sống thay đổi, sự bảo vệ cũng phải đổi thay.",
    offeringsTitle: "Dịch vụ đồng hành",
    offerings: [
      { icon: Clock, text: "Claim Concierge · Bồi thường nhanh" },
      { icon: UserCheck, text: "Tư vấn viên đồng hành" },
      { icon: RefreshCw, text: "Nhắc tái tục tự động" },
    ],
  },
];

const PRODUCT_LINES: {
  id: string;
  eyebrow: string;
  title: string;
  quote: string;
  quoteClass: string;
  desc: string;
  scopeTitle: string;
  scope: string[];
  tags: { icon: LucideIcon; text: string }[];
  href: string;
  ctaLabel: string;
  ctaClass: string;
  image: string;
  alt: string;
}[] = [
  {
    id: "sos",
    eyebrow: "Bảo hiểm xe cơ giới & du lịch",
    title: "PTISOS — Bảo hiểm xe cơ giới & du lịch",
    quote: "An toàn trên mọi hành trình.",
    quoteClass: "border-blue-100 bg-blue-50 text-blue-800",
    desc: "Nền tảng cứu hộ & giám định hiện trường: đội ngũ 300 chuyên viên trên 34 tỉnh thành, có mặt nhanh khi bạn cần — từ tai nạn trên đường đến sự cố khi du lịch nước ngoài.",
    scopeTitle: "Phạm vi bảo vệ trọng tâm",
    scope: [
      "Cứu hộ & giám định hiện trường 24/7",
      "Bảo hiểm ô tô · xe máy",
      "Bảo hiểm du lịch trong & ngoài nước",
    ],
    tags: [
      { icon: Car, text: "Bảo hiểm xe ô tô" },
      { icon: Car, text: "Bảo hiểm xe máy" },
      { icon: Plane, text: "Bảo hiểm du lịch quốc tế" },
      { icon: Plane, text: "Bảo hiểm du lịch trong nước" },
    ],
    href: routes.ptiSos,
    ctaLabel: "Xem chi tiết PTI SOS",
    ctaClass: "bg-brand-bluegray hover:bg-brand-bluegray-dark",
    image: localImage(
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600",
    ),
    alt: "PTI SOS — cứu hộ giao thông",
  },
  {
    id: "health",
    eyebrow: "Bảo hiểm sức khỏe toàn diện",
    title: "PTIHealth — Bảo hiểm sức khỏe toàn diện",
    quote: "Sức khỏe của bạn không nên chờ đợi thủ tục.",
    quoteClass: "border-emerald-100 bg-emerald-50 text-emerald-800",
    desc: "Mạng lưới bảo lãnh viện phí trực tiếp tại 600+ bệnh viện trên toàn quốc — nhập viện không cần tạm ứng, không chờ đợi thủ tục.",
    scopeTitle: "Phạm vi bảo vệ trọng tâm",
    scope: [
      "Nội trú: viện phí, phẫu thuật",
      "Ngoại trú: khám chữa hàng ngày",
      "Bệnh hiểm nghèo: chi trả một lần",
    ],
    tags: [
      { icon: Heart, text: "Bảo hiểm Phúc An Sinh" },
      { icon: Sparkles, text: "Bảo hiểm Elite Care" },
    ],
    href: routes.ptiHealth,
    ctaLabel: "Xem chi tiết PTI Health",
    ctaClass: "bg-emerald-600 hover:bg-emerald-700",
    image: localImage(
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600",
    ),
    alt: "PTI Health — bảo hiểm sức khỏe",
  },
  {
    id: "commercial",
    eyebrow: "Bảo hiểm dành cho doanh nghiệp",
    title: "PTICommercial — Chuyên gia tư vấn & Bảo hiểm Doanh nghiệp",
    quote: "Doanh nghiệp vận hành trơn tru, cả khi điều bất ngờ xảy ra.",
    quoteClass: "border-neutral-300 bg-neutral-200/60 text-brand-navy",
    desc: "Đội ngũ tư vấn rủi ro am hiểu ngành, đồng hành từ đánh giá rủi ro ban đầu đến xử lý bồi thường — giữ vận hành kinh doanh không gián đoạn.",
    scopeTitle: "Phạm vi bảo vệ trọng tâm",
    scope: [
      "Tài sản: nhà xưởng, máy móc",
      "Hàng hóa: vận chuyển, gián đoạn KD",
      "Trách nhiệm: bên thứ ba, nghề nghiệp",
    ],
    tags: [],
    href: routes.ptiCommercial,
    ctaLabel: "Xem chi tiết PTI Commercial",
    ctaClass: "bg-brand-navy hover:bg-brand-navy-light",
    image: localImage(
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600",
    ),
    alt: "PTI Commercial — bảo hiểm doanh nghiệp",
  },
];

const MODAL_SELECTS = [
  {
    name: "city",
    label: "Tỉnh / Thành phố",
    options: [
      "Hà Nội",
      "TP. Hồ Chí Minh",
      "Đà Nẵng",
      "Hải Phòng",
      "Cần Thơ",
      "Tỉnh/Thành khác",
    ],
  },
  {
    name: "productInterest",
    label: "Nhu cầu bảo hiểm",
    options: [
      "Gói tổng hợp gia đình",
      "PTI SOS (Xe & Du lịch)",
      "PTI Health (Sức khỏe)",
      "PTI Commercial (Doanh nghiệp)",
    ],
  },
];

export function BaoAnView() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-white font-sans">
      {/* Hero */}
      <section className="overflow-hidden border-b border-neutral-200 bg-neutral-50 py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex min-h-130 items-center overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-lg lg:min-h-144">
            <div className="absolute inset-0">
              <Image
                src={HERO_IMAGE}
                alt="Bảo An PTICare — gìn giữ bình an cho mỗi gia đình Việt"
                fill
                priority
                sizes="100vw"
                className="object-cover object-right"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-transparent sm:bg-gradient-to-r sm:via-white/90" />
            </div>
            <div className="relative z-10 max-w-2xl space-y-5 px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
              <h1 className="font-display text-4xl font-black leading-tight tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
                Tháp Bảo An{" "}
                <span className="text-brand-bluegray-dark">PTICare</span>
              </h1>
              <div className="space-y-1">
                <p className="font-display text-xs font-bold uppercase tracking-widest text-brand-bluegray-dark sm:text-sm lg:text-base">
                  Một nếp sống tương hỗ · Triệu mái nhà sống an
                </p>
                <p className="text-xs font-medium italic text-sky-800 sm:text-sm">
                  “Caring beyond Insurance” — Gìn giữ bình an cho mỗi gia đình
                  Việt
                </p>
              </div>
              <p className="text-sm font-light leading-relaxed text-neutral-700 sm:text-base lg:text-lg">
                PTI bảo vệ tài chính, sức khỏe và mọi tài sản của bạn bằng sự
                minh bạch, chuẩn mực và đồng hành xuyên suốt — xây dựng lá chắn
                bảo an vững chãi trước mọi biến động cuộc sống.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#danh-muc-san-pham"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-bluegray-dark px-7 py-3.5 text-xs font-bold tracking-wide text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-brand-navy hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 motion-reduce:hover:translate-y-0 sm:text-sm"
                >
                  <Shield className="h-4 w-4" />
                  <span>Khám phá giải pháp bảo vệ</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/95 px-7 py-3.5 text-xs font-semibold tracking-wide text-neutral-900 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 motion-reduce:hover:translate-y-0 sm:text-sm"
                >
                  <HeartHandshake className="h-4 w-4 text-brand-bluegray-dark" />
                  <span>Đăng ký nhận tư vấn</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ba chiều bảo vệ */}
      <section
        id="ba-chieu-bao-ve"
        className="border-b border-neutral-100 bg-neutral-50 py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl space-y-3 text-center">
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-800">
              Không chỉ là bảo hiểm
            </span>
            <h2 className="font-display text-3xl font-black text-brand-navy sm:text-4xl">
              Ba Tầng Bảo Vệ Toàn Diện
            </h2>
            <p className="text-sm font-light leading-relaxed text-neutral-600 sm:text-base">
              Tạo lập thế trận phòng vệ vững chãi 3 chiều từ sức khỏe thể chất, an
              toàn tài chính gia đình cho đến sự đồng hành dài lâu trọn đời.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {DIMENSIONS.map((dim) => {
              const tone = DIMENSION_TONE[dim.tone];
              const Icon = dim.icon;
              return (
                <div
                  key={dim.name}
                  className="flex flex-col justify-between gap-6 rounded-3xl border border-neutral-200/80 bg-white p-7 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-2xl border",
                          tone.iconBox,
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <span className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
                          {dim.step}
                        </span>
                        <h3 className="text-xl font-bold text-neutral-900">
                          {dim.name}
                        </h3>
                      </div>
                    </div>

                    <div className={cn("rounded-2xl border p-3.5", tone.note)}>
                      <span
                        className={cn(
                          "block text-xs font-bold",
                          tone.noteText,
                        )}
                      >
                        {dim.noteTitle}
                      </span>
                      <p
                        className={cn(
                          "mt-0.5 text-xs font-medium",
                          tone.noteText,
                        )}
                      >
                        {`“${dim.quote}”`}
                      </p>
                    </div>

                    <p className="text-xs font-light leading-relaxed text-neutral-600 sm:text-sm">
                      {dim.desc}
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-neutral-100 pt-4">
                    <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400">
                      {dim.offeringsTitle}
                    </span>
                    <div className="flex flex-col gap-2">
                      {dim.offerings.map((offering) => {
                        const OfferIcon = offering.icon;
                        return (
                          <span
                            key={offering.text}
                            className="inline-flex items-center rounded-xl bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700"
                          >
                            <OfferIcon className="mr-1.5 h-3.5 w-3.5 text-neutral-500" />
                            {offering.text}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Danh mục sản phẩm */}
      <section
        id="danh-muc-san-pham"
        className="scroll-mt-24 border-b border-neutral-100 py-20"
      >
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-bluegray-dark">
              Bảo vệ đúng điều bạn quan tâm nhất
            </span>
            <h2 className="font-display text-3xl font-black leading-snug text-brand-navy sm:text-4xl">
              Từ sức khỏe đến tài sản — PTI đồng hành theo từng giai đoạn cuộc
              sống của bạn.
            </h2>
          </div>

          <div className="space-y-16">
            {PRODUCT_LINES.map((line) => (
              <div
                key={line.id}
                id={line.id}
                className="grid scroll-mt-24 grid-cols-1 items-stretch gap-10 rounded-3xl border border-neutral-200/80 bg-neutral-50/80 p-6 shadow-sm sm:p-8 lg:grid-cols-12"
              >
                <div className="flex flex-col justify-between gap-5 lg:col-span-7">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      {line.eyebrow}
                    </span>
                    <h3 className="font-display text-2xl font-black text-brand-navy sm:text-3xl">
                      {line.title}
                    </h3>
                    <p
                      className={cn(
                        "inline-block rounded-2xl border p-3 text-base font-semibold italic",
                        line.quoteClass,
                      )}
                    >
                      {`“${line.quote}”`}
                    </p>
                    <p className="text-sm leading-relaxed text-neutral-700">
                      {line.desc}
                    </p>

                    <div className="space-y-2 rounded-2xl border border-neutral-200/80 bg-white p-4">
                      <span className="block text-xs font-bold text-neutral-800">
                        {line.scopeTitle}
                      </span>
                      <ul className="grid grid-cols-1 gap-2 text-xs text-neutral-600 sm:grid-cols-2">
                        {line.scope.map((item) => (
                          <li key={item} className="flex items-center">
                            <CheckCircle2 className="mr-2 h-3.5 w-3.5 shrink-0 text-brand-bluegray" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {line.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {line.tags.map((tag) => {
                          const TagIcon = tag.icon;
                          return (
                            <span
                              key={tag.text}
                              className="flex items-center rounded-lg border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700"
                            >
                              <TagIcon className="mr-1.5 h-3.5 w-3.5 text-brand-bluegray" />
                              {tag.text}
                            </span>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>

                  <div className="pt-3">
                    <Link
                      href={line.href}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                        line.ctaClass,
                      )}
                    >
                      <span>{line.ctaLabel}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="relative min-h-64 lg:col-span-5">
                  <Image
                    src={line.image}
                    alt={line.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="rounded-2xl border border-neutral-100 object-cover shadow-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-brand-navy py-16 text-center text-white">
        <div className="bg-glow-navy-tr pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
            An tâm trọn vẹn
          </span>
          <h2 className="font-display text-2xl font-black sm:text-3xl lg:text-4xl">
            Sẵn Sàng Thiết Lập Lá Chắn Bảo Vệ Gia Đình &amp; Doanh Nghiệp?
          </h2>
          <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-slate-300">
            Sự cố không báo trước, nhưng bạn có quyền chuẩn bị tâm thế chủ động
            nhất để đón nhận. Hãy liên hệ ngay với Bạn Đồng Hành (CA) để thiết kế
            gói phòng vệ PTI tối ưu nhất.
          </p>
          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-brand-navy shadow-lg transition-all hover:bg-brand-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <FileText className="h-4 w-4" />
              <span>Để lại thông tin liên hệ</span>
            </button>
            <Link
              href={`${routes.diemCham}#dstation`}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Ghé trạm tư vấn bảo hiểm trực tiếp
            </Link>
          </div>
        </div>
      </section>

      <WorkshopInterestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        eyebrow="Đăng ký tư vấn trực tiếp"
        title="Để lại thông tin liên hệ"
        intro="Chuyên viên CA của PTI sẽ liên hệ hỗ trợ tư vấn giải pháp bảo vệ tối ưu nhất cho bạn."
        submitLabel="Gửi đăng ký"
        withMessage
        selects={MODAL_SELECTS}
      />
    </div>
  );
}
