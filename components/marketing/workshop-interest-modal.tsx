"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  submitWorkshopInterest,
  type WorkshopInterestState,
} from "@/lib/actions/registration";

const INITIAL: WorkshopInterestState = { status: "idle" };

const inputClass =
  "w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-brand-gold";

export type ModalSelect = {
  name: string;
  label: string;
  options: string[];
};

export function WorkshopInterestModal({
  open,
  onClose,
  eyebrow = "Trạm dịch vụ Dstation",
  title = "Đăng ký Workshop",
  intro,
  selects,
  withMessage = false,
  submitLabel = "Gửi đăng ký",
}: {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title?: string;
  intro?: string;
  selects: ModalSelect[];
  withMessage?: boolean;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState(submitWorkshopInterest, INITIAL);
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="max-h-modal w-full max-w-lg space-y-5 overflow-y-auto rounded-3xl border border-neutral-200 bg-white p-6 shadow-lg outline-none sm:p-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark">
              {eyebrow}
            </span>
            <h3
              id={titleId}
              className="mt-1 font-display text-xl font-black text-neutral-900"
            >
              {title}
            </h3>
            {intro ? (
              <p className="mt-1 text-xs font-light leading-relaxed text-neutral-500">
                {intro}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {state.status === "success" ? (
          <div className="space-y-3 py-6 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-6 w-6" />
            </span>
            <h4 className="font-display text-lg font-bold text-neutral-900">
              Đăng ký thành công!
            </h4>
            <p className="text-xs font-light text-neutral-600">{state.message}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 rounded-full bg-neutral-900 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white"
            >
              Hoàn tất
            </button>
          </div>
        ) : (
          <form action={formAction} className="space-y-4 text-xs" noValidate>
            {state.status === "error" && state.message ? (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 font-medium text-red-700"
              >
                {state.message}
              </p>
            ) : null}

            <div>
              <label htmlFor="lead-name" className="mb-1 block font-bold text-neutral-700">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                id="lead-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Nguyễn Văn A"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="lead-phone" className="mb-1 block font-bold text-neutral-700">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  id="lead-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="0912 345 678"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="lead-email" className="mb-1 block font-bold text-neutral-700">
                  Email
                </label>
                <input
                  id="lead-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="email@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            {selects.map((select) => (
              <div key={select.name}>
                <label
                  htmlFor={`lead-${select.name}`}
                  className="mb-1 block font-bold text-neutral-700"
                >
                  {select.label}
                </label>
                <select
                  id={`lead-${select.name}`}
                  name={select.name}
                  className={cn(inputClass, "bg-white")}
                >
                  {select.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {withMessage ? (
              <div>
                <label htmlFor="lead-message" className="mb-1 block font-bold text-neutral-700">
                  Ghi chú thêm (không bắt buộc)
                </label>
                <textarea
                  id="lead-message"
                  name="message"
                  rows={2}
                  placeholder="Lời nhắn hoặc thời gian thuận tiện nhận cuộc gọi..."
                  className={cn(inputClass, "resize-none")}
                />
              </div>
            ) : null}

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-neutral-200 px-4 py-2 font-bold text-neutral-600 transition-colors hover:bg-neutral-50"
              >
                Hủy
              </button>
              <SubmitButton label={submitLabel} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-brand-green-dark px-6 py-2.5 font-bold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-brand-forest disabled:opacity-60"
    >
      {pending ? "Đang gửi..." : label}
    </button>
  );
}
