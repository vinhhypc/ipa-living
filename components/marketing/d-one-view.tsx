"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  CreditCard,
  Gift,
  Heart,
  Package,
  Send,
  Shield,
  Sparkles,
  Store,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import {
  submitWorkshopInterest,
  type WorkshopInterestState,
} from "@/lib/actions/registration";

type TabId = "member" | "supplier";
const INITIAL: WorkshopInterestState = { status: "idle" };

const inputClass =
  "w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-xs text-neutral-800 outline-none focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500";
const inputAmber =
  "w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-xs text-neutral-800 outline-none focus-visible:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500";
const labelClass =
  "mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-700";

const PILLARS: {
  icon: LucideIcon;
  tone: string;
  no: string;
  title: string;
  desc: React.ReactNode;
}[] = [
  {
    icon: Heart,
    tone: "bg-emerald-100 text-emerald-700",
    no: "Trụ cột 01",
    title: "Sống khỏe",
    desc: (
      <>
        Nuôi dưỡng những lựa chọn sống tốt mỗi ngày cùng{" "}
        <strong>Anvie Life</strong>.
      </>
    ),
  },
  {
    icon: TrendingUp,
    tone: "bg-amber-100 text-amber-700",
    no: "Trụ cột 02",
    title: "Sống giàu",
    desc: (
      <>
        Đồng hành cùng mục tiêu tài chính và hành trình tăng trưởng cùng{" "}
        <strong>VNDGO</strong>.
      </>
    ),
  },
  {
    icon: Shield,
    tone: "bg-sky-100 text-sky-700",
    no: "Trụ cột 03",
    title: "Sống an",
    desc: (
      <>
        Chủ động bảo vệ bản thân, gia đình và tương lai cùng{" "}
        <strong>PTIcare</strong>.
      </>
    ),
  },
];

const SUPPLIER_CRITERIA = [
  {
    title: "Nguồn gốc Minh bạch",
    desc: "Sản phẩm có xuất xứ rõ ràng, vùng trồng bản địa chuẩn hóa hoặc chứng nhận hữu cơ (VietGAP, GlobalGAP, Organic).",
  },
  {
    title: "Thuận Tự Nhiên",
    desc: "Ưu tiên quy trình chế biến không hóa chất bảo quản, lên men tự nhiên, bảo toàn giá trị sinh học và vi sinh tế bào.",
  },
  {
    title: "Năng lực Cung ứng",
    desc: "Khả năng duy trì sản lượng ổn định, đảm bảo tiêu chuẩn đóng gói và quy trình bảo quản vệ sinh an toàn.",
  },
  {
    title: "Đồng điệu Triết lý",
    desc: "Cam kết phát triển bền vững, phụng sự sức khỏe cộng đồng và cùng đồng hành dài hạn với hệ sinh thái IPA Living.",
  },
];

export function DOneView({ initialTab = "member" }: { initialTab?: TabId }) {
  const [tab, setTab] = useState<TabId>(initialTab);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash.includes("supplier") || hash.includes("nha-cung-cap")) {
        setTab("supplier");
      } else if (hash.includes("member")) {
        setTab("member");
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      <section className="relative overflow-hidden border-b border-neutral-800 bg-neutral-950 py-16 text-white md:py-24">
        <div className="bg-glow-green-tr pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl space-y-5 px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-emerald-400" /> Hệ sinh thái D-ONE
          </span>
          <h1 className="font-display text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            D-one: Nền tảng số tích hợp điểm chạm của ba nếp sống
          </h1>
          <div className="mx-auto max-w-3xl space-y-2 text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
            <p>
              D-one là người bạn đồng hành số của IPA Living, giúp kết nối hành
              trình xây dựng nếp <strong>Sống khỏe</strong>,{" "}
              <strong>Sống giàu</strong> và <strong>Sống an</strong> trong một
              trải nghiệm liền mạch.
            </p>
            <p className="text-xs text-neutral-400 sm:text-sm">
              Từ những lựa chọn chăm sóc sức khỏe mỗi ngày, kế hoạch tài chính cá
              nhân đến giải pháp bảo vệ cho tương lai, D-one ghi nhớ điều quan
              trọng với bạn và kết nối bạn với đúng chuyên gia khi cần.
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <div
              role="tablist"
              aria-label="Loại đăng ký D-one"
              className="inline-flex rounded-2xl border border-neutral-800 bg-neutral-900 p-1.5 shadow-lg"
            >
              <button
                type="button"
                role="tab"
                aria-selected={tab === "member"}
                onClick={() => setTab("member")}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 sm:text-sm",
                  tab === "member"
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "text-neutral-400 hover:bg-neutral-800/60 hover:text-white",
                )}
              >
                <CreditCard className="h-4 w-4" />
                <span>Đăng ký Thành viên</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "supplier"}
                onClick={() => setTab("supplier")}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:text-sm",
                  tab === "supplier"
                    ? "bg-amber-600 text-white shadow-lg"
                    : "text-neutral-400 hover:bg-neutral-800/60 hover:text-white",
                )}
              >
                <Store className="h-4 w-4" />
                <span>Đăng ký Nhà cung cấp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-12"
          >
            {tab === "member" ? <MemberTab /> : <SupplierTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MemberTab() {
  const [state, formAction] = useActionState(submitWorkshopInterest, INITIAL);

  return (
    <>
      <div id="member" className="mx-auto max-w-3xl space-y-3 text-center">
        <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800">
          Trải nghiệm tích hợp
        </span>
        <h2 className="font-display text-2xl font-black text-neutral-900 sm:text-3xl">
          Ba hành trình, một điểm chạm
        </h2>
        <p className="text-sm leading-relaxed text-neutral-600">
          Kết nối liền mạch các giải pháp và chuyên gia trên toàn bộ hệ sinh thái
          IPA Living.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className="space-y-4 rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl",
                  pillar.tone,
                )}
              >
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-500">
                  {pillar.no}
                </span>
                <h3 className="text-xl font-bold text-neutral-900">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-neutral-600">
                {pillar.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="flex flex-col justify-between space-y-6 bg-gradient-to-br from-emerald-900 via-neutral-900 to-neutral-950 p-8 text-white md:col-span-2">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                <BadgeCheck className="h-3.5 w-3.5" />
                <span>Đăng nhập &amp; Đăng ký</span>
              </span>
              <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">
                Chào mừng bạn đến với D-one
              </h3>
              <p className="text-xs font-light leading-relaxed text-neutral-300">
                Mỗi hành trình sống đều bắt đầu từ việc hiểu điều thật sự quan
                trọng với bạn. Đăng nhập để tiếp tục hành trình, hoặc trở thành
                thành viên D-one để bắt đầu theo cách của riêng mình.
              </p>
              <div className="mt-4 space-y-2 rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-xs font-medium text-emerald-300">
                  Đã có tài khoản D-one?
                </p>
                <button
                  type="button"
                  disabled
                  title="Cổng đăng nhập D-one sắp ra mắt"
                  className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-white/80 py-2.5 text-xs font-bold text-neutral-950 shadow-md"
                >
                  <span>Đăng nhập D-one (sắp ra mắt)</span>
                </button>
                <p className="text-center text-xs text-neutral-400">
                  Tiếp tục hành trình của bạn.
                </p>
              </div>
            </div>
            <div className="space-y-3 border-t border-white/10 pt-6 text-xs text-neutral-300">
              <p className="flex items-center gap-2.5">
                <Users className="h-4 w-4 text-emerald-400" />
                <span>Hơn 12,000+ thành viên tin chọn</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Gift className="h-4 w-4 text-amber-400" />
                <span>Tặng Voucher trải nghiệm tại Dstation</span>
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-10 md:col-span-3">
            {state.status === "success" ? (
              <SuccessPanel
                tone="emerald"
                title="Đăng ký Thành viên thành công!"
                message={state.message}
              />
            ) : (
              <form action={formAction} className="space-y-4" noValidate>
                {state.status === "error" && state.message ? (
                  <p
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-medium text-red-700"
                  >
                    {state.message}
                  </p>
                ) : null}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field id="m-name" label="Họ và tên" required>
                    <input id="m-name" name="name" type="text" required autoComplete="name" placeholder="Ví dụ: Nguyễn Văn An" className={inputClass} />
                  </Field>
                  <Field id="m-phone" label="Số điện thoại" required>
                    <input id="m-phone" name="phone" type="tel" required autoComplete="tel" placeholder="0912 345 678" className={inputClass} />
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field id="m-email" label="Email nhận thông báo">
                    <input id="m-email" name="email" type="email" autoComplete="email" placeholder="email@example.com" className={inputClass} />
                  </Field>
                  <Field id="m-city" label="Khu vực sinh sống">
                    <select id="m-city" name="city" defaultValue="Hà Nội" className={cn(inputClass, "bg-white")}>
                      <option>Hà Nội</option>
                      <option>TP. Hồ Chí Minh</option>
                      <option>Đà Nẵng</option>
                      <option value="Khác">Tỉnh thành khác</option>
                    </select>
                  </Field>
                </div>
                <Field id="m-tower" label="Trụ cột bạn quan tâm nhất">
                  <select id="m-tower" name="interestedTower" defaultValue="all" className={cn(inputClass, "bg-white")}>
                    <option value="all">Toàn diện cả 3 Trụ cột (Sức khỏe - Đầu tư - Bảo an)</option>
                    <option value="anvie">Sức khỏe Anvie (Y học lối sống & Dược liệu Gobio)</option>
                    <option value="vndgo">Thịnh vượng VNDGO (Tích sản VNDSIP & Lớp học tài chính)</option>
                    <option value="pticare">Bảo an PTI (Bảo hiểm sức khỏe PTI Health & SOS)</option>
                  </select>
                </Field>
                <Field id="m-note" label="Ghi chú / Nhu cầu cụ thể (nếu có)">
                  <textarea id="m-note" name="note" rows={2} placeholder="Ví dụ: Tôi muốn tham gia workshop Bếp nhà Delivie làm bánh men sống..." className={cn(inputClass, "resize-none")} />
                </Field>
                <div className="pt-2">
                  <SubmitButton tone="emerald" label="Trở thành thành viên D-one" />
                  <p className="mt-2 text-center text-xs font-medium text-neutral-500">
                    Bắt đầu kết nối Sống khỏe - Sống giàu - Sống an.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function SupplierTab() {
  const [state, formAction] = useActionState(submitWorkshopInterest, INITIAL);

  return (
    <>
      <div id="supplier" className="mx-auto max-w-3xl space-y-3 text-center">
        <h2 className="font-display text-2xl font-black text-neutral-900 sm:text-3xl">
          Hợp tác Nhà Cung Cấp Đối Tác
        </h2>
        <p className="text-sm leading-relaxed text-neutral-600">
          Cùng IPA Living kiến tạo chuỗi cung ứng sản phẩm thảo mộc bản địa, dinh
          dưỡng hữu cơ, giải pháp bảo an và lối sống xanh chuẩn mực.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {SUPPLIER_CRITERIA.map((item, idx) => (
          <div
            key={item.title}
            className="space-y-2.5 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 font-bold text-amber-800">
              {idx + 1}
            </span>
            <h3 className="text-sm font-bold text-neutral-900">{item.title}</h3>
            <p className="text-xs leading-relaxed text-neutral-500">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="flex flex-col justify-between space-y-6 bg-gradient-to-br from-amber-950 to-neutral-900 p-8 text-white md:col-span-2">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-300">
                <Store className="h-3.5 w-3.5" />
                <span>Đối tác Cung ứng</span>
              </span>
              <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">
                Đăng ký kết nối chuỗi cung ứng
              </h3>
              <p className="text-xs font-light leading-relaxed text-neutral-300">
                Sản phẩm của quý đối tác sẽ được thẩm định và có cơ hội trưng
                bày, phân phối trực tiếp tại hệ thống Dstation trên toàn quốc.
              </p>
            </div>
            <div className="space-y-3 border-t border-white/10 pt-6 text-xs text-neutral-300">
              <p className="flex items-center gap-2.5">
                <Building2 className="h-4 w-4 text-amber-400" />
                <span>Hệ thống phân phối Dstation đa kênh</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Package className="h-4 w-4 text-emerald-400" />
                <span>Kiểm định và truyền thông thương hiệu</span>
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-10 md:col-span-3">
            {state.status === "success" ? (
              <SuccessPanel
                tone="amber"
                title="Hồ sơ đã được gửi thành công!"
                message={state.message}
              />
            ) : (
              <form action={formAction} className="space-y-4" noValidate>
                {state.status === "error" && state.message ? (
                  <p
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-medium text-red-700"
                  >
                    {state.message}
                  </p>
                ) : null}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field id="s-company" label="Tên Đơn vị / Doanh nghiệp" required>
                    <input id="s-company" name="companyName" type="text" required placeholder="Công ty / Hợp tác xã / Xưởng..." className={inputAmber} />
                  </Field>
                  <Field id="s-name" label="Người đại diện liên hệ" required>
                    <input id="s-name" name="name" type="text" required autoComplete="name" placeholder="Họ và tên người đại diện" className={inputAmber} />
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field id="s-phone" label="Số điện thoại" required>
                    <input id="s-phone" name="phone" type="tel" required autoComplete="tel" placeholder="0988 123 456" className={inputAmber} />
                  </Field>
                  <Field id="s-email" label="Email liên hệ">
                    <input id="s-email" name="email" type="email" autoComplete="email" placeholder="contact@company.com" className={inputAmber} />
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field id="s-category" label="Nhóm sản phẩm / Dịch vụ">
                    <select id="s-category" name="productCategory" defaultValue="herbal" className={cn(inputAmber, "bg-white")}>
                      <option value="herbal">Dược liệu & Thảo mộc bản địa</option>
                      <option value="food">Thực phẩm dinh dưỡng & Lên men</option>
                      <option value="cosmetic">Mỹ phẩm tự nhiên & Chăm sóc cá nhân</option>
                      <option value="eco">Đồ dùng sinh thái & Đời sống xanh</option>
                      <option value="service">Dịch vụ chăm sóc sức khỏe / Đào tạo</option>
                    </select>
                  </Field>
                  <Field id="s-cert" label="Chứng nhận chất lượng (nếu có)">
                    <input id="s-cert" name="certification" type="text" placeholder="VietGAP, HACCP, Organic, ISO..." className={inputAmber} />
                  </Field>
                </div>
                <Field id="s-desc" label="Mô tả chi tiết sản phẩm & Năng lực cung ứng">
                  <textarea id="s-desc" name="productDescription" rows={3} placeholder="Giới thiệu quy trình sản xuất, công suất cung ứng hàng tháng, đặc điểm nổi bật..." className={cn(inputAmber, "resize-none")} />
                </Field>
                <SubmitButton tone="amber" label="Gửi hồ sơ đăng ký Nhà cung cấp" />
              </form>
            )}
          </div>
        </div>
      </div>
    </>
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
      <label htmlFor={id} className={labelClass}>
        {label} {required ? <span className="text-rose-500">*</span> : null}
      </label>
      {children}
    </div>
  );
}

function SubmitButton({
  tone,
  label,
}: {
  tone: "emerald" | "amber";
  label: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all disabled:opacity-60",
        tone === "emerald"
          ? "bg-emerald-600 hover:bg-emerald-700"
          : "bg-amber-600 hover:bg-amber-700",
      )}
    >
      <Send className="h-4 w-4" />
      <span>{pending ? "Đang gửi..." : label}</span>
    </button>
  );
}

function SuccessPanel({
  tone,
  title,
  message,
}: {
  tone: "emerald" | "amber";
  title: string;
  message?: string;
}) {
  return (
    <div className="space-y-4 py-10 text-center">
      <span
        className={cn(
          "mx-auto flex h-16 w-16 items-center justify-center rounded-full",
          tone === "emerald"
            ? "bg-emerald-100 text-emerald-600"
            : "bg-amber-100 text-amber-600",
        )}
      >
        <CheckCircle2 className="h-10 w-10" />
      </span>
      <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
      <p className="mx-auto max-w-md text-xs leading-relaxed text-neutral-600 sm:text-sm">
        {message}
      </p>
    </div>
  );
}
