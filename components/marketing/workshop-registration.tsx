"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, QrCode, Ticket, X } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitWorkshopInterest } from "@/lib/actions/registration";

type Info = {
  workshopId: string;
  title: string;
  date?: string;
  time?: string;
  location?: string;
  completed: boolean;
};

// shadcn UI thuần — chỉ override màu focus ring theo nhận diện workshop (brand navy).
const fieldClass =
  "text-sm placeholder:text-xs sm:placeholder:text-sm focus-visible:border-brand-navy focus-visible:ring-brand-navy/30";
const selectTriggerClass = cn("w-full", fieldClass);

const TICKET_OPTIONS = [
  "1 Người (Cá nhân)",
  "2 Người (Đồng hành cùng người thân)",
  "3 Người (Đội nhóm)",
  "4-5 Người (Gia đình)",
] as const;

export function WorkshopRegistration({ info }: { info: Info }) {
  const [open, setOpen] = useState(false);
  const [ticket, setTicket] = useState<null | {
    code: string;
    name: string;
    email: string;
    tickets: string;
  }>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reminder, setReminder] = useState(true);

  if (info.completed) {
    return (
      <button
        type="button"
        disabled
        className="w-full cursor-not-allowed rounded-xl bg-neutral-200 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-500 sm:w-auto"
      >
        Sự kiện đã kết thúc
      </button>
    );
  }

  const handleSubmit = async (formData: FormData) => {
    setPending(true);
    setError(null);
    const result = await submitWorkshopInterest({ status: "idle" }, formData);
    setPending(false);
    if (result.status === "error") {
      setError(result.message ?? "Có lỗi xảy ra, vui lòng thử lại.");
      return;
    }
    setTicket({
      code: `IPA-WS${Math.floor(100000 + Math.random() * 900000)}`,
      name: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      tickets: String(formData.get("numberOfParticipants") ?? "1"),
    });
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setError(null);
        }}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-navy px-8 py-3.5 text-xs font-bold uppercase text-white shadow-lg transition-all hover:bg-brand-navy-light hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:w-auto"
      >
        <Ticket className="h-4 w-4 text-brand-gold" />
        <span>Đăng ký giữ chỗ ngay</span>
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-neutral-900/60 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Đăng ký tham dự workshop"
            className="relative my-8 w-full max-w-lg space-y-6 rounded-3xl border border-neutral-100 bg-white p-6 shadow-lg sm:p-8"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Đóng"
              className="absolute right-5 top-5 rounded-full bg-neutral-100 p-2 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark">
                Phiếu đăng ký trực tuyến
              </span>
              <h2 className="mt-1 font-display text-lg font-extrabold text-brand-navy sm:text-xl">
                Đăng ký tham dự Workshop
              </h2>
              <div className="mt-3 flex items-start gap-3 rounded-2xl border border-neutral-100 bg-neutral-50 p-3">
                <Ticket className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
                <div>
                  <p className="line-clamp-1 text-xs font-bold text-neutral-800">
                    {info.title}
                  </p>
                  <p className="mt-0.5 text-xs font-light text-neutral-500">
                    {info.date} • {info.time}
                  </p>
                </div>
              </div>
            </div>

            {error ? (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-700"
              >
                {error}
              </p>
            ) : null}

            <form action={handleSubmit} className="space-y-4" noValidate>
              <input
                type="hidden"
                name="apiCode"
                value="register_workshop_ipa_living"
              />
              <div>
                <Label
                  htmlFor="ws-name"
                  className="mb-1 block text-xs font-semibold text-neutral-700"
                >
                  Họ và tên của bạn <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ws-name"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className={fieldClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label
                    htmlFor="ws-phone"
                    className="mb-1 block text-xs font-semibold text-neutral-700"
                  >
                    Số điện thoại <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ws-phone"
                    name="phoneNumber"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="0912 345 678"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="ws-email"
                    className="mb-1 block text-xs font-semibold text-neutral-700"
                  >
                    Email liên hệ <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ws-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="an.nguyen@example.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="ws-tickets"
                  className="mb-1 block text-xs font-semibold text-neutral-700"
                >
                  Số lượng người tham dự
                </Label>
                <Select
                  name="numberOfParticipants"
                  defaultValue={TICKET_OPTIONS[0]}
                >
                  <SelectTrigger id="ws-tickets" className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TICKET_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="ws-note"
                  className="mb-1 block text-xs font-semibold text-neutral-700"
                >
                  Ghi chú / Thắc mắc gửi Ban tổ chức
                </Label>
                <Textarea
                  id="ws-note"
                  name="message"
                  rows={2}
                  placeholder="Ví dụ: Tôi muốn hỏi thêm về gói tư vấn dinh dưỡng AnVie..."
                  className={cn(fieldClass, "resize-none")}
                />
              </div>

              <label className="flex items-center gap-2 pt-1 text-xs font-light text-neutral-500">
                <input
                  type="hidden"
                  name="receiveReminderNotification"
                  value={reminder ? "true" : "false"}
                />
                <Checkbox
                  checked={reminder}
                  onCheckedChange={(value) => setReminder(value === true)}
                />
                <span>
                  Nhận tin nhắc lịch &amp; mã vé qua Zalo / SMS / Email
                </span>
              </label>

              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-xl bg-brand-gold px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all hover:bg-brand-gold-dark disabled:opacity-60"
              >
                {pending
                  ? "Đang gửi thông tin đăng ký..."
                  : "Xác nhận giữ chỗ ngay"}
              </button>
            </form>
          </motion.div>
        </div>
      ) : null}

      {ticket ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-neutral-900/60 p-4 backdrop-blur-sm"
          onClick={() => setTicket(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Đăng ký thành công"
            className="relative my-8 w-full max-w-md space-y-1 rounded-3xl border border-neutral-100 bg-white p-6 text-center shadow-lg sm:p-8"
          >
            <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-emerald-50 bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </span>
            <h2 className="font-display text-xl font-black text-neutral-800 sm:text-2xl">
              Đăng ký thành công!
            </h2>
            <p className="mt-1.5 text-xs font-light leading-relaxed text-neutral-500">
              Cảm ơn bạn đã đăng ký. Ban tổ chức IPA Living đã giữ chỗ ưu tiên
              cho bạn tại Trạm Dstation.
            </p>

            <div className="relative mt-6 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-5 text-left text-white shadow-lg">
              <div className="mb-3 flex items-start justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="block text-xs uppercase tracking-widest text-brand-gold">
                    Mã vé điện tử
                  </span>
                  <span className="text-lg font-bold tracking-wider text-white">
                    {ticket.code}
                  </span>
                </div>
                <span className="rounded-lg bg-white/10 p-2">
                  <QrCode className="h-6 w-6 text-brand-gold" />
                </span>
              </div>
              <div className="space-y-1.5 text-xs font-light text-neutral-300">
                <p>
                  <strong className="font-medium text-white">Họ tên:</strong>{" "}
                  {ticket.name}
                </p>
                <p>
                  <strong className="font-medium text-white">Sự kiện:</strong>{" "}
                  {info.title}
                </p>
                <p>
                  <strong className="font-medium text-white">Thời gian:</strong>{" "}
                  {info.date} ({info.time})
                </p>
                <p>
                  <strong className="font-medium text-white">Địa điểm:</strong>{" "}
                  {info.location}
                </p>
                <p>
                  <strong className="font-medium text-white">
                    Số lượng vé:
                  </strong>{" "}
                  {ticket.tickets} vé
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => setTicket(null)}
                className="w-full rounded-xl bg-brand-navy px-4 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-navy-light"
              >
                Hoàn tất &amp; đóng
              </button>
              <p className="text-xs italic text-neutral-400">
                *Thông tin mã vé đã được gửi tự động tới email {ticket.email}.
              </p>
            </div>
          </motion.div>
        </div>
      ) : null}
    </>
  );
}
