"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  BookOpen,
  GraduationCap,
  Heart,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { localImage } from "@/lib/images";
import { routes } from "@/lib/routes";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

type TabId = "academy" | "network";

const TABS: { id: TabId; label: string; subtitle: string; icon: LucideIcon }[] =
  [
    {
      id: "academy",
      label: "1. AnVie Academy",
      subtitle: "Không gian học tập & trao truyền tri thức",
      icon: GraduationCap,
    },
    {
      id: "network",
      label: "2. Chuỗi Phòng Khám",
      subtitle: "Mạng lưới tư vấn sức khỏe gia đình",
      icon: Stethoscope,
    },
  ];

const ACADEMY_ITEMS: {
  icon: LucideIcon;
  tone: string;
  title: string;
  desc: string;
}[] = [
  {
    icon: BookOpen,
    tone: "bg-purple-100 text-purple-900",
    title: "Hiểu Cơ Thể & Nếp Sống Thuận Tự Nhiên",
    desc: "Nhận biết thể trạng cá nhân, lắng nghe các tín hiệu cảnh báo sớm từ cơ thể và xây dựng thói quen sinh hoạt cân bằng nhịp sinh học.",
  },
  {
    icon: Heart,
    tone: "bg-emerald-100 text-emerald-900",
    title: "Dinh Dưỡng Nuôi Dưỡng & Phục Hồi",
    desc: "Thực hành ăn đúng theo mùa, hiểu tính cân bằng âm dương trong nguyên liệu Bếp Bio và chế biến các bữa ăn giàu năng lượng sống cho tổ ấm.",
  },
  {
    icon: Sparkles,
    tone: "bg-amber-100 text-amber-900",
    title: "Chủ Động Làm Chủ Sức Khỏe Gia Đình",
    desc: "Trang bị kỹ năng sơ cứu tự nhiên, sử dụng dược liệu thảo mộc lành tính và hình thành nếp nhà an vui qua các thế hệ.",
  },
];

const NETWORK_ITEMS: {
  icon: LucideIcon;
  tone: string;
  title: string;
  desc: string;
}[] = [
  {
    icon: Activity,
    tone: "bg-sky-100 text-sky-900",
    title: "Theo Dõi Sức Khỏe Toàn Diện",
    desc: "Lập và quản lý hồ sơ sức khỏe điện tử, theo dõi định kỳ các chỉ số sinh học và cảnh báo sớm các nguy cơ mất cân bằng thể trạng.",
  },
  {
    icon: ShieldCheck,
    tone: "bg-emerald-100 text-emerald-900",
    title: "Y Học Dự Phòng & Can Thiệp Lối Sống",
    desc: "Tư vấn chế độ dinh dưỡng, vận động, giấc ngủ và thanh lọc cơ thể để chủ động phòng bệnh từ sớm trước khi phải dùng đến thuốc điều trị.",
  },
  {
    icon: Users,
    tone: "bg-purple-100 text-purple-900",
    title: "Xây Dựng Nếp Sống Phù Hợp Nhu Cầu Cá Nhân & Gia Đình",
    desc: "Thiết kế thực đơn gia đình, lịch sinh hoạt điều dưỡng riêng biệt cho từng thành viên: người cao tuổi, trẻ nhỏ và người làm việc áp lực cao.",
  },
];

const ACADEMY_IMG = localImage(
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
);
const NETWORK_IMG = localImage(
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
);

export function AnvieLifeView({
  initialTab = "academy",
}: {
  initialTab?: TabId;
}) {
  const [tab, setTab] = useState<TabId>(initialTab);

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800">
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: routes.home },
          { label: "Tháp Sức Khỏe AnVie", href: routes.sucKhoe },
          { label: "AnVie Life" },
        ]}
        trailing={
          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold uppercase text-purple-900">
            AnVie Life · Chăm Sóc Sức Khỏe
          </span>
        }
      />

      <section className="relative overflow-hidden bg-purple-950 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-700 bg-purple-900/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-300">
              <Activity className="h-3.5 w-3.5" />
              Chăm Sóc Sức Khỏe Chủ Động
            </span>
            <h1 className="font-display text-3xl font-black tracking-tight text-white sm:text-5xl">
              AnVie Life
            </h1>
            <p className="max-w-2xl text-sm font-light leading-relaxed text-purple-100 sm:text-base">
              AnVie Life đồng hành cùng bạn chăm sóc sức khỏe chủ động, thông
              qua tri thức nếp sống và mạng lưới tư vấn sức khỏe đáng tin cậy.
            </p>
          </div>
          <div className="space-y-2 rounded-2xl border border-white/20 bg-white/10 p-5 text-xs backdrop-blur-md lg:col-span-4">
            <span className="block font-bold uppercase text-purple-300">
              2 Trụ Cột AnVie Life
            </span>
            <p className="font-light leading-relaxed text-purple-100">
              1. <strong>AnVie Academy:</strong> Không gian học tập và trao
              truyền tri thức.
              <br />
              2. <strong>Chuỗi phòng khám:</strong> Mạng lưới tư vấn sức khỏe
              gia đình.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div
          role="tablist"
          aria-label="Trụ cột AnVie Life"
          className="mb-8 flex flex-wrap gap-3 border-b border-neutral-200 pb-4"
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
                  "flex items-center gap-3 rounded-2xl px-5 py-3 text-left text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                  active
                    ? "bg-purple-900 text-white shadow-md"
                    : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50",
                )}
              >
                <span
                  className={cn(
                    "rounded-xl p-2",
                    active
                      ? "bg-purple-800 text-purple-200"
                      : "bg-purple-50 text-purple-900",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-sm font-bold">
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-light",
                      active ? "text-purple-200" : "text-neutral-500",
                    )}
                  >
                    {item.subtitle}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <TabPanel
          no={tab === "academy" ? "Mục 01" : "Mục 02"}
          title={tab === "academy" ? "AnVie Academy" : "Chuỗi Phòng Khám"}
          lead={
            tab === "academy"
              ? "Không gian học tập và trao truyền tri thức, giúp mỗi người hiểu mình và chủ động nuôi dưỡng một nếp sống khỏe."
              : "Mạng lưới tư vấn sức khỏe gia đình - đồng hành cùng mỗi người trong theo dõi, dự phòng và xây dựng nếp sống phù hợp với nhu cầu sức khỏe."
          }
          intro={
            tab === "academy"
              ? "Tại AnVie Academy, tri thức về nếp sống, dinh dưỡng bản địa, y học lối sống và y dưỡng sinh Oshawa được truyền trao một cách dễ hiểu, khoa học và có tính ứng dụng cao cho từng gia đình:"
              : "Mạng lưới gồm các chuyên gia y tế, bác sĩ lối sống và điều dưỡng tận tâm đồng hành sát sao cùng mỗi cá nhân và các thế hệ trong gia đình:"
          }
          items={tab === "academy" ? ACADEMY_ITEMS : NETWORK_ITEMS}
          image={tab === "academy" ? ACADEMY_IMG : NETWORK_IMG}
          imageAlt={
            tab === "academy"
              ? "AnVie Academy — không gian học tập và trao truyền tri thức"
              : "Mạng lưới tư vấn sức khỏe gia đình AnVie"
          }
          ctaLabel={
            tab === "academy"
              ? "Đăng ký tư vấn khóa học AnVie Academy"
              : "Kết nối mạng lưới tư vấn sức khỏe của bạn"
          }
        />
      </div>
    </div>
  );
}

function TabPanel({
  no,
  title,
  lead,
  intro,
  items,
  image,
  imageAlt,
  ctaLabel,
}: {
  no: string;
  title: string;
  lead: string;
  intro: string;
  items: { icon: LucideIcon; tone: string; title: string; desc: string }[];
  image: string;
  imageAlt: string;
  ctaLabel: string;
}) {
  return (
    <div className="space-y-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
      <div className="pb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-800">
          {no}
        </span>
        <h2 className="mt-1 font-display text-2xl font-black text-neutral-900 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-sm font-light leading-relaxed text-neutral-700 sm:text-base">
          {lead}
        </p>
      </div>

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-7">
          <p className="text-xs font-light leading-relaxed text-neutral-600 sm:text-sm">
            {intro}
          </p>
          <div className="space-y-3">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4"
                >
                  <span
                    className={cn("mt-0.5 shrink-0 rounded-xl p-2", item.tone)}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-bold text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-xs font-light leading-relaxed text-neutral-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={routes.dCare}
              className="rounded-xl bg-purple-800 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-purple-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              {ctaLabel}
            </Link>
            <Link
              href={`${routes.diemCham}#workshop`}
              className="rounded-xl border border-purple-200 bg-white px-5 py-2.5 text-xs font-bold text-purple-900 transition-all hover:bg-neutral-100"
            >
              Xem các Workshop trải nghiệm &rarr;
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-neutral-100 shadow-md">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
