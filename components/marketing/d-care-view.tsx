"use client";

import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  HeartHandshake,
  MapPin,
  Search,
  Send,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EXPERTS } from "@/lib/data";
import type { Expert, ExpertCategory } from "@/lib/types";
import {
  submitWorkshopInterest,
  type WorkshopInterestState,
} from "@/lib/actions/registration";

type Filter = "all" | ExpertCategory;
const INITIAL: WorkshopInterestState = { status: "idle" };

// shadcn UI thuần — chỉ override màu focus ring theo nhận diện tuyển dụng (amber).
const fieldClass =
  "text-sm placeholder:text-xs sm:placeholder:text-sm focus-visible:border-amber-500 focus-visible:ring-amber-500/30";
const selectTriggerClass = cn("w-full", fieldClass);

const POSITION_OPTIONS = [
  "Client Advisor (Tư vấn viên lối sống & gia sản)",
  "Bác sĩ / Dược sĩ Y học lối sống Anvie",
  "Chuyên viên Hoạch định Tài chính VNDGO",
  "Chuyên viên Tư vấn Bảo hiểm PTI",
  "Quản lý / Vận hành Trạm Dstation",
] as const;

const LOCATION_OPTIONS = [
  "Hà Nội (Tây Hồ, Hai Bà Trưng)",
  "TP. HCM (Quận 1, Quận 5)",
  "Đà Nẵng",
  "Hải Phòng",
] as const;

const EXPERIENCE_YEARS_OPTIONS = [
  "Mới tốt nghiệp / Đam mê phong cách sống",
  "1 - 3 năm kinh nghiệm",
  "3 - 5 năm kinh nghiệm",
  "Trên 5 năm kinh nghiệm",
] as const;

const TIME_SLOT_OPTIONS = [
  "09:00 - 10:30 (Sáng)",
  "14:00 - 15:30 (Chiều)",
  "16:00 - 17:30 (Chiều)",
] as const;

const METHOD_OPTIONS = [
  "Trực tiếp tại Dstation",
  "Online qua Google Meet",
] as const;

const CATEGORY_PILLS: {
  key: Filter;
  label: string;
  icon?: LucideIcon;
  active: string;
}[] = [
  {
    key: "all",
    label: `Tất cả (${EXPERTS.length})`,
    active: "bg-neutral-900 text-white",
  },
  {
    key: "ca",
    label: "Client Advisor (CA)",
    icon: Users,
    active: "bg-amber-600 text-white",
  },
  {
    key: "anvie",
    label: "Bác sĩ Anvie Health",
    icon: Heart,
    active: "bg-health-600 text-white",
  },
  {
    key: "vndgo",
    label: "Tài chính VNDGO",
    icon: TrendingUp,
    active: "bg-wealth-700 text-white",
  },
  {
    key: "pticare",
    label: "Bảo an PTI",
    icon: Shield,
    active: "bg-protection-600 text-white",
  },
];

const CATEGORY_BADGE: Record<ExpertCategory, string> = {
  anvie: "border-health-500/25 bg-health-50 text-health-700",
  ca: "border-amber-200 bg-amber-100 text-amber-900",
  vndgo: "border-wealth-500/25 bg-wealth-50 text-wealth-700",
  pticare: "border-protection-500/25 bg-protection-50 text-protection-700",
};

const STATS = [
  {
    icon: Users,
    tone: "text-brand-gold",
    value: "2.000+",
    label: "Đội ngũ chuyên gia",
    desc: "Chuyên viên & Cố vấn gia sản, y học lối sống và bảo an được đào tạo bài bản trên toàn quốc.",
  },
  {
    icon: MapPin,
    tone: "text-health-600",
    value: "34 Tỉnh/TP",
    label: "Mạng lưới phủ sóng",
    desc: "Hệ thống trạm Dstation và chi nhánh dịch vụ hiện diện khắp các tỉnh thành cả nước.",
  },
  {
    icon: HeartHandshake,
    tone: "text-protection-600",
    value: "500.000+",
    label: "Khách hàng đồng hành",
    desc: "Gia đình và hội viên tin tưởng đồng hành trọn đời trên hành trình Sống Vui - Khỏe - Giàu.",
  },
  {
    icon: Star,
    tone: "text-amber-500",
    value: "98.6%",
    label: "Mức độ hài lòng",
    desc: "Đánh giá hài lòng từ các phiên tư vấn, dịch vụ bồi thường và hội thảo chuyển hóa.",
  },
];

const JOIN_BENEFITS = [
  {
    title: "Môi trường làm việc văn minh",
    desc: "Làm việc tại chuỗi không gian sáng tạo Dstation sang trọng, gần gũi thiên nhiên.",
  },
  {
    title: "Thu nhập & Đãi ngộ xứng đáng",
    desc: "Cơ chế lương cứng cạnh tranh, hoa hồng đa hệ sinh thái và bảo hiểm sức khỏe VIP.",
  },
  {
    title: "Đào tạo liên tục",
    desc: "Được kèm cặp bởi các chuyên gia hàng đầu về Y học lối sống, Hoạch định tài chính và Thẩm định bảo an.",
  },
];

export function DCareView() {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [booking, setBooking] = useState<Expert | null>(null);

  const query = search.trim().toLowerCase();
  const experts = useMemo(
    () =>
      EXPERTS.filter((expert) => {
        const matchesCategory = filter === "all" || expert.category === filter;
        const matchesSearch =
          !query ||
          expert.name.toLowerCase().includes(query) ||
          expert.role.toLowerCase().includes(query) ||
          expert.specialties.some((s) => s.toLowerCase().includes(query));
        return matchesCategory && matchesSearch;
      }),
    [filter, query],
  );

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 font-sans text-neutral-800">
      <section className="hero-bleed relative overflow-hidden border-b border-neutral-800 bg-neutral-950 pb-16 text-white md:pb-24">
        <Breadcrumbs
          variant="overlay-dark"
          items={[
            { label: "Trang chủ", href: routes.home },
            { label: "D-Care" },
          ]}
        />
        <div className="bg-glow-gold-top pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl space-y-4 px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-amber-400" /> D-Care · Đội
            ngũ đồng hành &amp; Chuyên gia
          </span>
          <h1 className="mx-auto max-w-4xl font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            Người Đồng Hành Tận Tâm Cho Cuộc Sống Vui - Khỏe - Giàu
          </h1>
          <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
            Mạng lưới <strong>Client Advisor (CA)</strong>, Bác sĩ Y học lối
            sống Anvie, Chuyên gia Tích sản VNDGO và Chuyên gia Bảo an PTI — sẵn
            sàng tư vấn và kiến tạo an tâm cho gia đình bạn.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <a
              href="#danh-sach-chuyen-gia"
              className="inline-flex items-center gap-2 rounded-xl bg-health-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-health-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Users className="h-4 w-4" />
              <span>Gặp gỡ chuyên gia</span>
            </a>
            <a
              href="#gia-nhap-doi-ngu"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Briefcase className="h-4 w-4" />
              <span>Gia nhập đội ngũ (Ứng tuyển)</span>
            </a>
          </div>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-lg sm:p-8">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="space-y-2 text-center sm:text-left">
                  <span
                    className={cn(
                      "flex items-center justify-center gap-2 sm:justify-start",
                      stat.tone,
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </span>
                  <p className="font-display text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="text-xs font-light leading-relaxed text-neutral-600">
                    {stat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="danh-sach-chuyen-gia"
        className="mx-auto max-w-7xl space-y-8 px-4 pt-12 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl space-y-2 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-health-700">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Phần 1: Đội ngũ Cố vấn &amp; Chuyên gia</span>
          </span>
          <h2 className="font-display text-2xl font-black text-neutral-900 sm:text-3xl">
            Chuyên gia Đồng hành Cùng Bạn
          </h2>
          <p className="text-xs leading-relaxed text-neutral-600 sm:text-sm">
            Chọn chuyên gia theo lĩnh vực quan tâm để nhận tư vấn chuyên sâu
            hoặc đặt lịch gặp trực tiếp tại Dstation.
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6 md:flex-row">
          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
            {CATEGORY_PILLS.map((pill) => {
              const Icon = pill.icon;
              const active = filter === pill.key;
              return (
                <button
                  key={pill.key}
                  type="button"
                  onClick={() => setFilter(pill.key)}
                  aria-pressed={active}
                  className={cn(
                    "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                    active
                      ? pill.active
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
                  )}
                >
                  {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <label htmlFor="expert-search" className="sr-only">
              Tìm chuyên gia
            </label>
            <Input
              id="expert-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên hoặc chuyên môn..."
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-4 text-xs outline-none focus-visible:ring-2 focus-visible:ring-health-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {experts.map((expert) => (
            <article
              key={expert.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-neutral-100">
                  <Image
                    src={expert.avatar}
                    alt={expert.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/25 to-transparent" />
                  <span
                    className={cn(
                      "absolute left-3 top-3 rounded-full border px-3 py-1 text-xs font-bold uppercase shadow-sm",
                      CATEGORY_BADGE[expert.category],
                    )}
                  >
                    {expert.categoryLabel}
                  </span>
                  <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-neutral-900/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>{expert.rating}</span>
                    <span className="text-xs font-normal text-neutral-300">
                      ({expert.reviewsCount})
                    </span>
                  </span>
                  <div className="absolute inset-x-3 bottom-3 text-white">
                    <h3 className="font-display text-lg font-black leading-tight text-white">
                      {expert.name}
                    </h3>
                    <p className="mt-0.5 line-clamp-1 text-xs font-light text-neutral-200">
                      {expert.role}
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 p-5">
                  <p className="line-clamp-2 text-xs leading-relaxed text-neutral-600">
                    {expert.bio}
                  </p>
                  <p className="flex items-center gap-2 text-xs text-neutral-500">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-600" />
                    <span className="truncate">{expert.location}</span>
                  </p>
                  <div className="space-y-1.5 pt-2">
                    <p className="text-xs font-bold uppercase text-neutral-400">
                      Lĩnh vực tư vấn
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {expert.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => setBooking(expert)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-health-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Đặt lịch tư vấn</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {experts.length === 0 ? (
          <p className="rounded-3xl border border-neutral-200 bg-white p-12 text-center text-sm text-neutral-500">
            Không tìm thấy chuyên gia phù hợp với bộ lọc hiện tại.
          </p>
        ) : null}
      </section>

      {/* Recruitment */}
      <section
        id="gia-nhap-doi-ngu"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-20 sm:px-6 lg:px-8"
      >
        <div className="overflow-hidden rounded-3xl border border-amber-200/90 bg-white shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="flex flex-col justify-between space-y-6 bg-gradient-to-br from-amber-950 via-neutral-900 to-neutral-950 p-8 text-white sm:p-10 lg:col-span-5">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-amber-300">
                  <Award className="h-3.5 w-3.5 text-amber-400" />
                  <span>Phần 2: Tuyển dụng &amp; Đồng hành</span>
                </span>
                <h2 className="font-display text-xl font-black leading-tight text-white sm:text-3xl">
                  Gia Nhập Đội Ngũ{" "}
                  <span className="text-amber-400">
                    Client Advisor &amp; Chuyên Gia
                  </span>
                </h2>
                <p className="text-xs font-light leading-relaxed text-neutral-300 sm:text-sm">
                  Trở thành người kiến tạo nếp sống an tâm cho hàng ngàn gia
                  đình. Chúng tôi chào đón các bạn trẻ nhiệt huyết, chuyên gia y
                  tế, tài chính và bảo hiểm cùng chung triết lý phụng sự.
                </p>
                <ul className="space-y-3.5 border-t border-white/10 pt-4 text-xs text-neutral-200">
                  {JOIN_BENEFITS.map((benefit) => (
                    <li
                      key={benefit.title}
                      className="flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-health-500" />
                      <span>
                        <strong>{benefit.title}:</strong> {benefit.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="flex items-center gap-2 border-t border-white/10 pt-6 text-xs text-neutral-400">
                <Clock className="h-4 w-4 text-amber-400" />
                <span>
                  Phản hồi hồ sơ nhanh chóng trong vòng 3 ngày làm việc
                </span>
              </p>
            </div>

            <div className="bg-neutral-50/50 p-8 sm:p-10 lg:col-span-7">
              <RecruitmentForm />
            </div>
          </div>
        </div>
      </section>

      {booking ? (
        <BookingModal expert={booking} onClose={() => setBooking(null)} />
      ) : null}
    </div>
  );
}

function RecruitmentForm() {
  const [state, formAction] = useActionState(submitWorkshopInterest, INITIAL);

  if (state.status === "success") {
    return (
      <div className="space-y-4 py-12 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-health-50 text-health-700">
          <CheckCircle2 className="h-10 w-10" />
        </span>
        <h3 className="font-display text-xl font-black text-neutral-900 sm:text-2xl">
          Ứng tuyển thành công!
        </h3>
        <p className="mx-auto max-w-md text-xs leading-relaxed text-neutral-600 sm:text-sm">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <input type="hidden" name="apiCode" value="apply_advisor_ipa_living" />
      <div>
        <h3 className="font-display text-xl font-bold text-neutral-900">
          Điền Thông Tin Ứng Tuyển
        </h3>
        <p className="mt-0.5 text-xs text-neutral-500">
          Vui lòng cung cấp thông tin liên hệ chính xác để chúng tôi kết nối sớm
          nhất.
        </p>
      </div>
      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-medium text-red-700"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="r-name" label="Họ và tên ứng viên" required>
          <Input
            id="r-name"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="Ví dụ: Trần Quốc Bảo"
            className={fieldClass}
          />
        </Field>
        <Field id="r-phone" label="Số điện thoại" required>
          <Input
            id="r-phone"
            name="phoneNumber"
            type="tel"
            required
            autoComplete="tel"
            placeholder="0909 123 456"
            className={fieldClass}
          />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="r-email" label="Email liên hệ">
          <Input
            id="r-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="baotran@gmail.com"
            className={fieldClass}
          />
        </Field>
        <Field id="r-position" label="Vị trí mong muốn ứng tuyển">
          <Select name="position" defaultValue={POSITION_OPTIONS[0]}>
            <SelectTrigger id="r-position" className={selectTriggerClass}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {POSITION_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="r-location" label="Khu vực làm việc mong muốn">
          <Select name="workAddress" defaultValue={LOCATION_OPTIONS[0]}>
            <SelectTrigger id="r-location" className={selectTriggerClass}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LOCATION_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field id="r-exp" label="Kinh nghiệm làm việc">
          <Select
            name="workExperience"
            defaultValue={EXPERIENCE_YEARS_OPTIONS[1]}
          >
            <SelectTrigger id="r-exp" className={selectTriggerClass}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {EXPERIENCE_YEARS_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Field
        id="r-cv"
        label="Link CV / Hồ sơ năng lực (Google Drive / LinkedIn / PDF)"
      >
        <Input
          id="r-cv"
          name="cvProfileUrl"
          type="url"
          placeholder="https://drive.google.com/... hoặc https://linkedin.com/in/..."
          className={fieldClass}
        />
      </Field>
      <Field id="r-bg" label="Kinh nghiệm / Thông điệp gửi tới IPA Living">
        <Textarea
          id="r-bg"
          name="message"
          rows={2}
          placeholder="Chia sẻ ngắn về thế mạnh hoặc lý do bạn mong muốn đồng hành cùng chúng tôi..."
          className={cn(fieldClass, "resize-none")}
        />
      </Field>

      <RecruitSubmit />
    </form>
  );
}

function RecruitSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-amber-700 disabled:opacity-60"
    >
      <Send className="h-4 w-4" />
      <span>{pending ? "Đang gửi..." : "Nộp hồ sơ ứng tuyển"}</span>
    </button>
  );
}

function BookingModal({
  expert,
  onClose,
}: {
  expert: Expert;
  onClose: () => void;
}) {
  const [state, formAction] = useActionState(submitWorkshopInterest, INITIAL);
  const [method, setMethod] = useState<(typeof METHOD_OPTIONS)[number]>(
    METHOD_OPTIONS[0],
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Đặt lịch tư vấn với ${expert.name}`}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-modal w-full max-w-lg overflow-y-auto rounded-3xl border border-neutral-100 bg-white p-6 shadow-lg sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="absolute right-4 top-4 rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
        >
          <X className="h-5 w-5" />
        </button>

        {state.status === "success" ? (
          <div className="space-y-4 py-8 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-health-50 text-health-700">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <h3 className="font-display text-xl font-bold text-neutral-900">
              Đặt lịch thành công!
            </h3>
            <p className="mx-auto max-w-xs text-xs leading-relaxed text-neutral-600">
              {state.message}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-neutral-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-neutral-800"
            >
              Đóng cửa sổ
            </button>
          </div>
        ) : (
          <form action={formAction} className="space-y-4" noValidate>
            <input
              type="hidden"
              name="apiCode"
              value="register_consultation_ipa_living"
            />
            <input type="hidden" name="consultationMethod" value={method} />
            <div className="flex items-center gap-3.5 pb-4">
              <Image
                src={expert.avatar}
                alt={expert.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-xl object-cover"
              />
              <div>
                <h3 className="text-sm font-bold text-neutral-900">
                  {expert.name}
                </h3>
                <p className="text-xs text-neutral-500">{expert.role}</p>
              </div>
            </div>

            {state.status === "error" && state.message ? (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-medium text-red-700"
              >
                {state.message}
              </p>
            ) : null}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field id="b-name" label="Họ và tên của bạn" required>
                <Input
                  id="b-name"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Nguyễn Văn A"
                  className={fieldClass}
                />
              </Field>
              <Field id="b-phone" label="Số điện thoại" required>
                <Input
                  id="b-phone"
                  name="phoneNumber"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="0912 345 678"
                  className={fieldClass}
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field id="b-date" label="Ngày tư vấn">
                <DatePicker
                  id="b-date"
                  name="consultationDate"
                  placeholder="Chọn ngày tư vấn"
                  disablePast
                  triggerClassName={fieldClass}
                />
              </Field>
              <Field id="b-slot" label="Khung giờ">
                <Select
                  name="consultationTime"
                  defaultValue={TIME_SLOT_OPTIONS[0]}
                >
                  <SelectTrigger id="b-slot" className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOT_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <div>
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Hình thức tư vấn
              </span>
              <div className="grid grid-cols-2 gap-2">
                {METHOD_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setMethod(option)}
                    aria-pressed={method === option}
                    className={cn(
                      "rounded-xl border py-2 text-xs font-bold transition-colors",
                      method === option
                        ? "border-health-600 bg-health-50 text-health-700"
                        : "border-neutral-200 text-neutral-600 hover:bg-neutral-50",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <Field id="b-notes" label="Nhu cầu cần trao đổi cụ thể">
              <Textarea
                id="b-notes"
                name="message"
                rows={2}
                defaultValue={`Chuyên gia mong muốn: ${expert.name}\n`}
                placeholder="Ví dụ: Cần tư vấn lộ trình tích sản hưu trí, cân bằng chuyển hóa đường ruột..."
                className={cn(fieldClass, "resize-none")}
              />
            </Field>
            <BookingSubmit />
          </form>
        )}
      </div>
    </div>
  );
}

function BookingSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-health-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-colors hover:bg-health-700 disabled:opacity-60"
    >
      <Send className="h-3.5 w-3.5" />
      <span>{pending ? "Đang gửi..." : "Xác nhận đặt lịch tư vấn"}</span>
    </button>
  );
}

function Field({
  id,
  label,
  required = false,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-700"
      >
        {label} {required ? <span className="text-rose-500">*</span> : null}
      </label>
      {children}
    </div>
  );
}
