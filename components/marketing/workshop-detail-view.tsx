import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Coffee,
  Heart,
  Map as MapIcon,
  MapPin,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { localImage } from "@/lib/images";
import { routes } from "@/lib/routes";
import type { Tower, Workshop } from "@/lib/types";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WorkshopRegistration } from "@/components/marketing/workshop-registration";

const TOWER_META: Record<
  Tower,
  { label: string; chip: string; icon: LucideIcon }
> = {
  "suc-khoe": {
    label: "Sức Khỏe (AnVie)",
    chip: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: Heart,
  },
  "thinh-vuong": {
    label: "Thịnh Vượng (VNDIRECT)",
    chip: "border-amber-200 bg-amber-50 text-amber-700",
    icon: TrendingUp,
  },
  "bao-an": {
    label: "Bảo An (PTI)",
    chip: "border-blue-200 bg-blue-50 text-blue-700",
    icon: Shield,
  },
};

const VALUE_POINTS = [
  "Tiếp cận tư duy thiết kế bản đồ Wellbeing cá nhân hóa",
  "Nhận hướng dẫn thực hành 1-1 trực tiếp từ Bác sĩ & Chuyên gia",
  "Trải nghiệm trực tiếp các giải pháp vi sinh & công cụ quản trị gia sản",
  "Kết nối cùng cộng đồng cư dân thông thái & Bạn Đồng Hành (CA)",
];

const AGENDA = [
  {
    time: "08:30 - 09:00",
    title: "Đón Khách & Thưởng Trà Thiền Vi Sinh AnVie",
    desc: "Check-in nhận tài liệu workshop, giao lưu cùng Bạn Đồng Hành (CA) và trải nghiệm thức uống vi sinh Gobio.",
  },
  {
    time: "09:00 - 10:15",
    title: "Chia Sẻ Chuyên Đề Từ Chuyên Gia",
    desc: "Nội dung cốt lõi của workshop: Đánh giá thực trạng, phương pháp khoa học và công cụ thực hành áp dụng ngay.",
  },
  {
    time: "10:15 - 11:00",
    title: "Thảo Luận Trực Tiếp & Thiết Lập Bản Đồ Cá Nhân",
    desc: "Hỏi đáp 1-1 cùng diễn giả và các Client Advisor để nhận tư vấn phù hợp với nhu cầu riêng của gia đình.",
  },
  {
    time: "11:00 - 11:30",
    title: "Rút Thăm Quà Tặng & Trao Chứng Nhận Đồng Hành",
    desc: "Bốc thăm bộ quà tặng sức khỏe AnVie & voucher trải nghiệm dịch vụ tại hệ thống Dstation.",
  },
];

const SPEAKERS = [
  {
    name: "TS. BS. Nguyễn Văn Thành",
    role: "Chuyên gia Y học Lối sống & Dinh dưỡng Tế bào (AnVie)",
    avatar: localImage(
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200",
    ),
    bio: "Hơn 15 năm kinh nghiệm nghiên cứu các giải pháp sinh học vi sinh và đào thải độc tố tự nhiên cho tế bào.",
  },
  {
    name: "ThS. Trần Minh Hoàng",
    role: "Giám đốc Hoạch định Gia sản (VNDIRECT)",
    avatar: localImage(
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    ),
    bio: "Chuyên gia tư vấn phân bổ tài sản cố định và kỷ luật tích sản VNDSIP cho các gia tộc doanh nhân.",
  },
];

function SectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6 rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="flex items-center gap-2 pb-4 font-display text-xl font-extrabold text-brand-navy">
        <Icon className="h-5 w-5 text-brand-gold" />
        <span>{title}</span>
      </h2>
      {children}
    </div>
  );
}

export function WorkshopDetailView({ workshop }: { workshop: Workshop }) {
  const tower = TOWER_META[workshop.tower] ?? TOWER_META["suc-khoe"];
  const TowerIcon = tower.icon;
  const completed = workshop.status === "completed";

  return (
    <div className="min-h-screen bg-neutral-50 pb-10">
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: routes.home },
          { label: "Workshop & Sự kiện", href: `${routes.diemCham}#workshop` },
          { label: workshop.title },
        ]}
        trailing={
          <span
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold",
              tower.chip,
            )}
          >
            <TowerIcon className="h-3.5 w-3.5" />
            <span>{tower.label}</span>
          </span>
        }
      />
      <div className="mx-auto max-w-7xl space-y-10 px-4 pt-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-lg lg:grid-cols-12">
          <div className="relative min-h-80 overflow-hidden bg-neutral-900 lg:col-span-5">
            <Image
              src={workshop.image}
              alt={workshop.title}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
            <div className="absolute inset-x-6 bottom-6 space-y-2 text-white">
              <span className="inline-block rounded-full bg-brand-gold px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-white">
                {completed ? "Đã diễn ra" : "Sự kiện đặc biệt"}
              </span>
              <p className="text-xs font-light text-neutral-300">
                *Số lượng tham dự giới hạn để đảm bảo chất lượng tương tác 1-1.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:col-span-7 lg:p-10">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark">
                  Sự kiện trải nghiệm Dstation
                </span>
                {workshop.spotsLeft ? (
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-0.5 text-xs font-semibold text-amber-700">
                    Chỉ còn {workshop.spotsLeft} chỗ trống
                  </span>
                ) : null}
              </div>

              <h1 className="font-display text-2xl font-black leading-tight text-neutral-900 sm:text-3xl">
                {workshop.title}
              </h1>
              <p className="text-sm font-light leading-relaxed text-neutral-600 sm:text-base">
                {workshop.description}
              </p>

              <dl className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 p-4 sm:grid-cols-2 sm:p-5">
                <MetaItem
                  icon={Calendar}
                  label="Thời gian ngày"
                  value={workshop.date}
                />
                <MetaItem
                  icon={Clock}
                  label="Khung giờ"
                  value={workshop.time}
                />
                <MetaItem
                  icon={MapPin}
                  label="Địa điểm tổ chức"
                  value={workshop.location}
                  full
                />
              </dl>
            </div>

            <div className="flex flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
              <p className="text-xs font-light text-neutral-500">
                <span className="mr-2 block text-base font-bold text-neutral-800 sm:inline">
                  Vé tham dự: Miễn phí
                </span>
                (Dành cho hội viên &amp; khách mời IPA Living)
              </p>
              <WorkshopRegistration
                info={{
                  workshopId: workshop.id,
                  title: workshop.title,
                  date: workshop.date,
                  time: workshop.time,
                  location: workshop.location,
                  completed,
                }}
              />
            </div>
          </div>
        </div>

        {/* Detail grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <SectionCard icon={Sparkles} title="Giá Trị Nhận Được Từ Workshop">
              <p className="text-sm font-light leading-relaxed text-neutral-600">
                Workshop không chỉ đơn thuần là buổi học lý thuyết mà là một
                trải nghiệm sống động. Bạn sẽ được đắm mình trong không gian thư
                thái của Trạm Dstation, giao lưu cùng những người bạn đồng điệu
                và tiếp cận nguồn tri thức chuẩn xác được chứng minh thực tiễn.
              </p>
              <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                {VALUE_POINTS.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-2xl border border-neutral-100 bg-neutral-50 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span className="text-xs font-medium leading-snug text-neutral-800">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard
              icon={Clock}
              title="Chương Trình & Lịch Trình Chi Tiết"
            >
              <ol className="relative space-y-6 before:absolute before:bottom-3 before:left-4 before:top-3 before:w-0.5 before:bg-neutral-200 sm:before:left-6">
                {AGENDA.map((item) => (
                  <li key={item.time} className="relative pl-10 sm:pl-14">
                    <span className="absolute left-2 top-1 h-5 w-5 rounded-full border-4 border-amber-100 bg-brand-navy sm:left-4" />
                    <div className="space-y-1 rounded-2xl border border-neutral-100 bg-neutral-50 p-4 sm:p-5">
                      <span className="inline-block rounded-md border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-brand-gold-dark">
                        {item.time}
                      </span>
                      <h3 className="pt-1 font-display text-base font-bold text-neutral-800">
                        {item.title}
                      </h3>
                      <p className="text-xs font-light leading-relaxed text-neutral-500">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </SectionCard>

            <SectionCard icon={Users} title="Diễn Giả & Chuyên Gia Đồng Hành">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {SPEAKERS.map((speaker) => (
                  <div
                    key={speaker.name}
                    className="flex items-start gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 p-5"
                  >
                    <Image
                      src={speaker.avatar}
                      alt={speaker.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 shrink-0 rounded-full border-2 border-brand-gold object-cover shadow-sm"
                    />
                    <div>
                      <h3 className="font-display text-sm font-bold text-neutral-800">
                        {speaker.name}
                      </h3>
                      <p className="mt-0.5 text-xs font-semibold text-brand-gold-dark">
                        {speaker.role}
                      </p>
                      <p className="mt-2 text-xs font-light leading-relaxed text-neutral-500">
                        {speaker.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="space-y-4 rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 font-display text-base font-bold text-brand-navy">
                <MapPin className="h-4 w-4 text-brand-gold" />
                <span>Địa điểm Trạm Dstation</span>
              </h2>
              <div className="space-y-3 text-xs font-light text-neutral-600">
                <p className="font-medium leading-snug text-neutral-800">
                  {workshop.location}
                </p>
                <p className="flex items-center gap-2 text-neutral-500">
                  <Coffee className="h-4 w-4 text-amber-600" />
                  <span>
                    Có phục vụ trà thảo mộc &amp; bánh nhẹ hữu cơ miễn phí
                  </span>
                </p>
                <p className="flex items-center gap-2 text-neutral-500">
                  <MapIcon className="h-4 w-4 text-blue-600" />
                  <span>Bãi đỗ xe ô tô &amp; xe máy rộng rãi an toàn</span>
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href={`${routes.diemCham}#dstation`}
                  className="block w-full rounded-xl border border-neutral-200 py-2.5 text-center text-xs font-bold text-brand-navy transition-colors hover:border-brand-navy"
                >
                  Khám phá thêm về Trạm Dstation
                </Link>
              </div>
            </div>

            <div className="relative space-y-4 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy to-neutral-900 p-6 text-white shadow-md">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
                Hỗ trợ đăng ký
              </span>
              <h2 className="font-display text-lg font-bold text-white">
                Bạn cần hỗ trợ thêm thông tin?
              </h2>
              <p className="text-xs font-light leading-relaxed text-neutral-300">
                Đội ngũ Client Advisor (CA) luôn túc trực hỗ trợ bạn giải đáp
                thắc mắc và sắp xếp vị trí ngồi ưu tiên.
              </p>
              <Link
                href={routes.tuyenDungCa}
                className="block w-full rounded-xl bg-brand-gold py-3 text-center text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-gold-light"
              >
                Kết nối Client Advisor
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
  full = false,
}: {
  icon: LucideIcon;
  label: string;
  value?: string;
  full?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-xs font-medium text-neutral-700 sm:text-sm",
        full && "sm:col-span-2",
      )}
    >
      <span className="rounded-xl bg-white p-2 text-brand-navy shadow-sm">
        <Icon className="h-4 w-4 text-brand-gold" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs uppercase text-neutral-400">
          {label}
        </span>
        <span className="block truncate">{value}</span>
      </span>
    </div>
  );
}
