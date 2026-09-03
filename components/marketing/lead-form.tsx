"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  submitWorkshopInterest,
  type WorkshopInterestState,
} from "@/lib/actions/registration";

const INITIAL: WorkshopInterestState = { status: "idle" };

// shadcn UI thuần — chỉ override màu focus ring theo nhận diện PTI (amber).
const fieldClass =
  "focus-visible:border-amber-600 focus-visible:ring-amber-600/30";

/**
 * Form "Để lại thông tin" dùng chung cho các trang sản phẩm PTI
 * (PtiHomes, PtiHealth...). Submit vào Server Action stub `submitWorkshopInterest`.
 */
export function LeadForm({
  eyebrow,
  title,
  intro,
  bullets,
  product,
  submitLabel = "Đăng ký tư vấn",
  note,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  bullets: string[];
  product: string;
  submitLabel?: string;
  note?: string;
}) {
  const [state, formAction] = useActionState(submitWorkshopInterest, INITIAL);

  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="flex flex-col justify-between space-y-6 bg-gradient-to-br from-amber-950 via-neutral-900 to-neutral-950 p-8 text-white md:col-span-2">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-300">
              {eyebrow}
            </span>
            <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">
              {title}
            </h3>
            <p className="text-xs font-light leading-relaxed text-neutral-300">
              {intro}
            </p>
          </div>
          <ul className="space-y-3 border-t border-white/10 pt-6 text-xs text-neutral-300">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 md:col-span-3">
          {state.status === "success" ? (
            <div className="space-y-4 py-12 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                <CheckCircle2 className="h-8 w-8" />
              </span>
              <h4 className="text-xl font-bold text-neutral-900">
                Gửi thông tin thành công!
              </h4>
              <p className="mx-auto max-w-sm text-xs leading-relaxed text-neutral-600">
                {state.message}
              </p>
            </div>
          ) : (
            <form action={formAction} className="space-y-4" noValidate>
              <input type="hidden" name="product" value={product} />
              {state.status === "error" && state.message ? (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-medium text-red-700"
                >
                  {state.message}
                </p>
              ) : null}
              <div>
                <Label htmlFor="lead-name" className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Họ và tên <span className="text-rose-500">*</span>
                </Label>
                <Input id="lead-name" name="name" type="text" required autoComplete="name" placeholder="Nguyễn Văn A" className={fieldClass} />
              </div>
              <div>
                <Label htmlFor="lead-phone" className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Số điện thoại <span className="text-rose-500">*</span>
                </Label>
                <Input id="lead-phone" name="phone" type="tel" required autoComplete="tel" placeholder="0901 234 567" className={fieldClass} />
              </div>
              <div>
                <Label htmlFor="lead-product" className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Sản phẩm quan tâm
                </Label>
                <Input
                  id="lead-product"
                  type="text"
                  readOnly
                  value={product}
                  className="cursor-not-allowed bg-muted font-medium text-muted-foreground"
                />
              </div>
              <div>
                <Label htmlFor="lead-email" className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Email (không bắt buộc)
                </Label>
                <Input id="lead-email" name="email" type="email" autoComplete="email" placeholder="email@cua-ban.com" className={fieldClass} />
              </div>
              <div className="pt-2">
                <SubmitButton label={submitLabel} />
                {note ? (
                  <p className="mt-2.5 text-center text-xs font-light leading-relaxed text-neutral-500">
                    {note}
                  </p>
                ) : null}
              </div>
            </form>
          )}
        </div>
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
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-700 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-amber-800 disabled:opacity-60"
    >
      <Send className="h-4 w-4" />
      <span>{pending ? "Đang gửi..." : label}</span>
    </button>
  );
}
