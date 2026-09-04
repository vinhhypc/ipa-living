"use server";

/**
 * Server Action dùng chung cho MỌI form marketing của IPA Living.
 *
 * Mỗi form gắn một `<input type="hidden" name="apiCode" />` ứng với business
 * rule tương ứng. Action đọc `apiCode`, lọc đúng bộ field theo `FORM_CATALOG`
 * ([lib/forms/catalog.ts]), validate các field bắt buộc rồi POST body JSON:
 *
 *   POST {NEXT_PUBLIC_API_BASE_URL}/public/matches/{apiCode}
 *
 * Body gửi lên khớp `targetObject` của từng rule (xem Postman collection).
 * `createdTime` do DRM tự set nên client không gửi.
 */

import { formEntry, isFormCode, type FormCode } from "@/lib/forms/catalog";

const PHONE_RE = /^(\+?84|0)\d{9,10}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

// Giữ tên cũ để không phải sửa import ở các component.
export type RegistrationState = LeadFormState;
export type WorkshopInterestState = LeadFormState;

const REQUIRED_MESSAGE: Record<string, string> = {
  fullName: "Vui lòng nhập họ và tên.",
  phoneNumber: "Vui lòng nhập số điện thoại.",
  email: "Vui lòng nhập email.",
  companyName: "Vui lòng nhập tên đơn vị.",
  representativeName: "Vui lòng nhập tên người đại diện.",
};

const DEFAULT_SUCCESS =
  "Cảm ơn bạn! Thông tin đã được gửi tới IPA Living. Chuyên viên sẽ liên hệ với bạn trong thời gian sớm nhất.";

async function postToDrm(
  code: FormCode,
  payload: Record<string, unknown>,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) {
    return { ok: false, message: "Thiếu cấu hình NEXT_PUBLIC_API_BASE_URL." };
  }

  let res: Response;
  try {
    res = await fetch(`${base}/public/matches/${code}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch (error) {
    console.error("[lead] network error", code, error);
    return { ok: false, message: "Không kết nối được máy chủ, vui lòng thử lại." };
  }

  const text = await res.text();
  let data: Record<string, unknown> | null = null;
  try {
    data = text ? (JSON.parse(text) as Record<string, unknown>) : null;
  } catch {
    data = null;
  }

  const businessMessage =
    (data?.message as string | undefined) ??
    (data?.error as string | undefined) ??
    ((data?.exception as { message?: string } | undefined)?.message ?? undefined);

  const businessCode =
    (data?.code as string | undefined) ??
    ((data?.exception as { code?: string } | undefined)?.code ?? undefined);

  const failedRule =
    data?.success === false ||
    (typeof businessCode === "string" && businessCode.toUpperCase().startsWith("BR"));

  if (!res.ok || failedRule) {
    console.error("[lead] rejected", code, res.status, text.slice(0, 500));
    return {
      ok: false,
      message: businessMessage ?? `Gửi thông tin thất bại (mã ${res.status}).`,
    };
  }

  return { ok: true };
}

/**
 * Xử lý submit cho một `apiCode` cụ thể: validate + build body + POST tới DRM.
 */
async function dispatchLead(formData: FormData): Promise<LeadFormState> {
  const rawCode = String(formData.get("apiCode") ?? "").trim();
  if (!rawCode || !isFormCode(rawCode)) {
    console.error("[lead] apiCode không hợp lệ:", rawCode);
    return { status: "error", message: "Form chưa được cấu hình đúng (thiếu apiCode)." };
  }

  const config = formEntry(rawCode);

  // Đọc giá trị thô.
  const values: Record<string, string> = {};
  for (const field of config.fields) {
    values[field] = String(formData.get(field) ?? "").trim();
  }

  // Validate.
  const fieldErrors: Record<string, string> = {};
  for (const field of config.required) {
    if (!values[field]) {
      fieldErrors[field] =
        REQUIRED_MESSAGE[field] ?? "Trường này không được để trống.";
    }
  }
  if (
    config.fields.includes("phoneNumber") &&
    values.phoneNumber &&
    !PHONE_RE.test(values.phoneNumber)
  ) {
    fieldErrors.phoneNumber = "Số điện thoại chưa hợp lệ.";
  }
  if (config.fields.includes("email")) {
    if (values.email && !EMAIL_RE.test(values.email)) {
      fieldErrors.email = "Email chưa hợp lệ.";
    } else if (!values.email && config.required.includes("email")) {
      fieldErrors.email = "Vui lòng nhập email.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Vui lòng kiểm tra lại các thông tin bắt buộc.",
      fieldErrors,
    };
  }

  // Build body JSON đúng shape của rule.
  const payload: Record<string, unknown> = {};
  for (const field of config.fields) {
    if (config.booleans?.includes(field)) {
      const raw = values[field].toLowerCase();
      payload[field] = raw === "true" || raw === "on" || raw === "1";
    } else {
      payload[field] = values[field];
    }
  }

  const result = await postToDrm(rawCode, payload);
  if (!result.ok) {
    return { status: "error", message: result.message };
  }

  return {
    status: "success",
    message: config.successMessage ?? DEFAULT_SUCCESS,
  };
}

export async function submitWorkshopInterest(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  return dispatchLead(formData);
}

// Giữ tên cũ cho form tuyển dụng CA.
export async function submitRegistration(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  return dispatchLead(formData);
}
