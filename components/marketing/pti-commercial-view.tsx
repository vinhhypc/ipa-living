import Image from "next/image";
import Link from "next/link";
import {
  Anchor,
  Briefcase,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  UserCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { localImage } from "@/lib/images";
import { routes } from "@/lib/routes";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

const HERO_IMAGE = localImage(
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
);

const SOLUTIONS = [
  {
    no: "1",
    icon: FileSpreadsheet,
    tone: "bg-brand-bluegray/10",
    title: "Bảo hiểm Tài sản & Gián đoạn Kinh doanh",
    lead: "Lá chắn thép bảo vệ chuỗi vận hành khỏi thâm hụt tài chính bất ngờ.",
    benefits: [
      "Đền bù thiệt hại vật chất bất ngờ cho nhà xưởng, thiết bị",
      "Bù đắp doanh thu sụt giảm và chi phí lương cố định khi tạm ngưng",
      "Khảo sát kỹ lưỡng và may đo gói rủi ro sát thực tế",
    ],
    cta: "Yêu cầu khảo sát rủi ro",
    ctaClass: "bg-brand-bluegray hover:bg-brand-bluegray-dark",
  },
  {
    no: "2",
    icon: Anchor,
    tone: "bg-brand-bluegray/15",
    title: "Bảo hiểm Vận chuyển & Trách nhiệm Pháp lý",
    lead: "Đồng hành trên mọi hành trình lưu chuyển hàng hóa xuất nhập khẩu.",
    benefits: [
      "Bảo an hàng hóa theo đúng chuẩn quốc tế đường bộ/biển/không",
      "Bảo vệ trách nhiệm công cộng thương nghiệp và lỗi sản phẩm",
      "Hỗ trợ toàn bộ chi phí tranh biện pháp lý liên đới",
    ],
    cta: "Nhận tư vấn vận chuyển & pháp lý",
    ctaClass: "bg-brand-navy hover:bg-brand-navy-light",
  },
];

export function PtiCommercialView() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: routes.home },
          { label: "Tháp Bảo An PTICare", href: routes.baoAn },
          { label: "PTI Commercial" },
        ]}
      />

      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="bg-glow-bluegray-tr pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-6 lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-bluegray/20 bg-brand-bluegray/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-bluegray">
              <Briefcase className="h-4 w-4" />
              Giải pháp quản trị rủi ro doanh nghiệp
            </span>
            <h1 className="font-display text-3xl font-black leading-tight text-brand-navy sm:text-4xl lg:text-5xl">
              PTICommercial — Chuyên gia tư vấn &amp; Bảo hiểm
            </h1>
            <div className="space-y-4 pt-2">
              <p className="rounded-2xl border border-amber-300/80 bg-amber-50/90 p-4 text-xs leading-relaxed text-amber-950 shadow-sm sm:p-5 sm:text-sm">
                Hầu hết giải pháp bảo hiểm thương mại truyền thống phức tạp và
                không phù hợp với doanh nghiệp vừa và nhỏ. PTI thiết kế PTI
                Commercials để cung cấp lớp bảo vệ doanh nghiệp minh bạch, linh
                hoạt và có thể tuỳ chỉnh.
              </p>
              <p className="rounded-2xl border border-neutral-200/90 bg-neutral-100/90 p-4 text-xs leading-relaxed text-neutral-700 shadow-sm sm:p-5 sm:text-sm">
                Doanh nghiệp được xây dựng từ nhiều tài sản và trách nhiệm cần
                bảo vệ. PTI Commercial giúp giảm thiểu tổn thất đối với tài sản,
                hàng hóa, công trình và trách nhiệm với bên thứ ba, để hoạt động
                kinh doanh luôn vững vàng trước rủi ro.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={routes.tuyenDungCa}
                className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-brand-navy-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <FileText className="h-4 w-4" />
                <span>Để lại thông tin</span>
              </Link>
              <Link
                href={routes.dCare}
                className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-5 py-3 text-xs font-bold uppercase tracking-wider text-brand-navy shadow-sm transition-all hover:bg-brand-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <UserCheck className="h-4 w-4" />
                <span>Liên hệ CA Advisor</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-80 overflow-hidden rounded-3xl border border-white/50 shadow-lg">
              <Image
                src={HERO_IMAGE}
                alt="PTI Commercial — bảo hiểm doanh nghiệp"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-100 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl space-y-3 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-bluegray">
              Giải pháp quản trị thương nghiệp
            </span>
            <h2 className="font-display text-2xl font-black text-brand-navy sm:text-3xl">
              Doanh Nghiệp Vận Hành Trơn Tru, Cả Khi Điều Bất Ngờ Xảy Ra
            </h2>
            <p className="text-sm font-light text-neutral-500">
              Chúng tôi sở hữu đội ngũ chuyên gia tư vấn am hiểu ngành nghề sâu
              sắc, đồng hành cùng sự vững vàng tài chính và phát triển dài lâu
              của quý công ty.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {SOLUTIONS.map((solution) => {
              const Icon = solution.icon;
              return (
                <div
                  key={solution.no}
                  className="flex flex-col justify-between space-y-6 rounded-3xl border border-brand-bluegray/10 bg-neutral-50 p-8 shadow-md transition-all hover:shadow-lg"
                >
                  <div className="space-y-4">
                    <span
                      className={cn(
                        "flex w-fit items-center justify-center rounded-2xl p-3 text-brand-bluegray",
                        solution.tone,
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="flex items-center font-display text-xl font-black text-brand-navy">
                      <span className="mr-2 text-2xl text-brand-bluegray">
                        {solution.no}.
                      </span>
                      {solution.title}
                    </h3>
                    <p className="text-sm font-light leading-relaxed text-neutral-600">
                      {solution.lead}
                    </p>
                    <ul className="space-y-3 border-t border-neutral-200/60 pt-4">
                      {solution.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-bluegray" />
                          <span className="text-sm font-medium text-neutral-700">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={routes.dCare}
                    className={cn(
                      "block w-full rounded-xl px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                      solution.ctaClass,
                    )}
                  >
                    {solution.cta}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-700 bg-gradient-to-r from-neutral-900 via-brand-navy to-neutral-800 py-16 text-center text-white">
        <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
          <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-400">
            Bền vững kinh doanh
          </span>
          <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
            Chủ động Quản Trị Rủi Ro Hôm Nay
          </h2>
          <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-slate-300">
            Không một doanh nghiệp thành công nào thiếu đi lá chắn bảo an vững
            chắc. Hãy thiết lập hàng rào phòng ngự kiên cố cho chuỗi vận hành
            thương mại của quý công ty.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Link
              href={routes.tuyenDungCa}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-brand-navy shadow-lg transition-all hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto"
            >
              <FileText className="h-4 w-4" />
              <span>Để lại thông tin</span>
            </Link>
            <Link
              href={routes.dCare}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gold px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-brand-navy shadow-lg transition-all hover:bg-brand-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto"
            >
              <UserCheck className="h-4 w-4" />
              <span>Liên hệ CA Advisor</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
