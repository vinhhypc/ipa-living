"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  Award,
  Briefcase,
  CheckCircle,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import {
  submitRegistration,
  type RegistrationState,
} from "@/lib/actions/registration";

const INITIAL_STATE: RegistrationState = { status: "idle" };

const BENEFITS = [
  {
    icon: GraduationCap,
    title: "Đào Tạo Đa Trụ Cột",
    desc: "Được học tập bài bản về Y học lối sống AnVie, Quản trị tài chính VNDIRECT và Giải pháp phòng vệ PTI.",
  },
  {
    icon: ShieldCheck,
    title: "Không Gian Dstation Đẳng Cấp",
    desc: "Làm việc và tiếp đón khách hàng tại hệ thống Trạm trải nghiệm hiện đại trên toàn quốc.",
  },
  {
    icon: Award,
    title: "Đãi Ngộ & Thăng Tiến Rõ Ràng",
    desc: "Thu nhập hấp dẫn vượt trội theo năng lực cùng cơ hội phát triển quản lý điều hành Trạm Dstation.",
  },
];

const inputClass =
  "w-full rounded-xl border border-neutral-200 py-2.5 pl-10 pr-4 text-sm text-neutral-800 outline-none transition-colors focus:border-brand-navy focus:ring-1 focus:ring-brand-navy";

export function RegistrationForm() {
  const [state, formAction] = useActionState(submitRegistration, INITIAL_STATE);

  return (
    <div
      id="client-advisor-form"
      className="grid grid-cols-1 overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-lg lg:grid-cols-12"
    >
      {/* Left — recruitment value proposition */}
      <div className="relative flex flex-col justify-between bg-brand-navy p-6 text-white md:p-8 lg:col-span-5 lg:p-10">
        <div className="bg-glow-gold-tr-ellipse pointer-events-none absolute inset-0" />
        <div className="relative">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
            Tuyển Dụng Nhân Sự
          </span>
          <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight text-white md:text-3xl">
            Gia Nhập Đội Ngũ Bạn Đồng Hành (CA)
          </h3>
          <p className="mt-3 text-sm font-light leading-relaxed text-slate-300">
            IPA Living tìm kiếm các nhân sự nhiệt huyết làm Client Advisor (CA) —
            lực lượng nòng cốt trực tiếp đồng hành, tư vấn và thiết kế bản đồ
            Wellbeing (Sức khỏe - Thịnh vượng - Bảo an) cho khách hàng.
          </p>

          <ul className="mt-8 space-y-6">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="rounded-lg bg-white/10 p-2 text-brand-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-sm font-bold text-white">
                    {title}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-slate-400">
                    {desc}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative mt-10 border-t border-white/10 pt-6 text-xs text-slate-400">
          *Bộ phận Nhân sự Tuyển dụng CA sẽ phản hồi hồ sơ ứng tuyển của bạn
          trong vòng 24 - 48 giờ làm việc.
        </p>
      </div>

      {/* Right — application form */}
      <div className="bg-white p-6 md:p-8 lg:col-span-7 lg:p-10">
        {state.status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex h-full flex-col items-center justify-center py-10 text-center"
          >
            <span className="mb-4 rounded-full bg-emerald-50 p-4 text-brand-green">
              <CheckCircle className="h-12 w-12" />
            </span>
            <h4 className="font-display text-xl font-extrabold text-neutral-800">
              Ứng tuyển thành công!
            </h4>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-500">
              {state.message}
            </p>
          </motion.div>
        ) : (
          <form action={formAction} className="space-y-5" noValidate>
            <h4 className="flex items-center justify-between border-b border-neutral-100 pb-3 font-display text-lg font-extrabold text-neutral-800 md:text-xl">
              <span>Đăng ký ứng tuyển tuyển dụng CA</span>
              <span className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs text-brand-gold-dark">
                Full-time / Part-time
              </span>
            </h4>

            {state.status === "error" && state.message ? (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-700"
              >
                {state.message}
              </p>
            ) : null}

            <Field
              id="fullName"
              label="Họ và tên ứng viên"
              required
              icon={<User className="h-4 w-4" />}
              error={state.fieldErrors?.fullName}
            >
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                autoComplete="name"
                placeholder="Nguyễn Văn A"
                aria-invalid={Boolean(state.fieldErrors?.fullName)}
                className={inputClass}
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field
                id="phone"
                label="Số điện thoại liên hệ"
                required
                icon={<Phone className="h-4 w-4" />}
                error={state.fieldErrors?.phone}
              >
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  autoComplete="tel"
                  placeholder="0912xxxxxx"
                  aria-invalid={Boolean(state.fieldErrors?.phone)}
                  className={inputClass}
                />
              </Field>

              <Field
                id="email"
                label="Email cá nhân"
                required
                icon={<Mail className="h-4 w-4" />}
                error={state.fieldErrors?.email}
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="example@gmail.com"
                  aria-invalid={Boolean(state.fieldErrors?.email)}
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field
                id="city"
                label="Khu vực mong muốn làm việc"
                icon={<MapPin className="h-4 w-4" />}
              >
                <select
                  id="city"
                  name="city"
                  defaultValue="hanoi"
                  className={cn(inputClass, "cursor-pointer bg-white")}
                >
                  <option value="hanoi">
                    Hà Nội (Trần Bình Trọng, Cầu Giấy, Đống Đa, Thanh Xuân,
                    Timecity,...)
                  </option>
                  <option value="hcm">
                    TP. Hồ Chí Minh (90 Pasteur - Q1, Sala - TP. Thủ Đức)
                  </option>
                  <option value="haiphong">
                    Hải Phòng (5 Nguyễn Tri Phương)
                  </option>
                  <option value="other">
                    Các tỉnh thành khác (Bình Dương, Nha Trang, Huế, Ninh Bình,
                    Hòa Bình,...)
                  </option>
                </select>
              </Field>

              <Field
                id="experience"
                label="Lĩnh vực chuyên môn thế mạnh"
                icon={<Briefcase className="h-4 w-4" />}
              >
                <select
                  id="experience"
                  name="experience"
                  defaultValue="finance"
                  className={cn(inputClass, "cursor-pointer bg-white")}
                >
                  <option value="finance">
                    Tài chính - Ngân hàng - Chứng khoán
                  </option>
                  <option value="health">
                    Y tế - Dinh dưỡng - Chăm sóc sức khỏe
                  </option>
                  <option value="insurance">Bảo hiểm - Quản trị rủi ro</option>
                  <option value="sales">
                    Bán hàng & Tư vấn Dịch vụ cao cấp
                  </option>
                  <option value="fresher">
                    Mới tốt nghiệp / Đã tham gia các khoá học CA
                  </option>
                </select>
              </Field>
            </div>

            <Field
              id="message"
              label="Giới thiệu bản thân / Link CV hoặc Lý do muốn trở thành CA"
              icon={<FileText className="h-4 w-4" />}
              alignTop
            >
              <textarea
                id="message"
                name="message"
                rows={3}
                placeholder="Ví dụ: Tôi có 3 năm kinh nghiệm tư vấn tài chính cá nhân, mong muốn mở rộng kiến thức y tế lối sống để trở thành Bạn Đồng Hành toàn diện..."
                className={cn(inputClass, "resize-none")}
              />
            </Field>

            <SubmitButton />
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  required = false,
  icon,
  error,
  alignTop = false,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  icon: React.ReactNode;
  error?: string;
  alignTop?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold text-neutral-600"
      >
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <div className="relative">
        <span
          className={cn(
            "pointer-events-none absolute left-0 flex items-center pl-3.5 text-neutral-400",
            alignTop ? "top-3" : "inset-y-0",
          )}
        >
          {icon}
        </span>
        {children}
      </div>
      {error ? (
        <p className="mt-1 text-xs font-medium text-red-600">{error}</p>
      ) : null}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "w-full rounded-xl py-3.5 text-xs font-bold uppercase tracking-widest shadow-md transition-all disabled:cursor-not-allowed disabled:opacity-60",
        "bg-brand-gold text-brand-navy hover:bg-brand-gold-dark hover:text-white",
      )}
    >
      {pending ? "Đang gửi hồ sơ ứng tuyển..." : "Gửi hồ sơ ứng tuyển CA"}
    </button>
  );
}
