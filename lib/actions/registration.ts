"use server";

/**
 * Server Action nhận hồ sơ ứng tuyển Client Advisor (CA) từ `RegistrationForm`.
 *
 * Bản migrate hiện tại chỉ validate + log (stub) — chưa nối API/CRM thật. Khi có
 * endpoint, thay phần `console.info` bằng lời gọi trong `services/`.
 */

export type RegistrationState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"fullName" | "phone" | "email", string>>;
};

const PHONE_RE = /^(\+?84|0)\d{9,10}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitRegistration(
  _prev: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const experience = String(formData.get("experience") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors: RegistrationState["fieldErrors"] = {};
  if (!fullName) fieldErrors.fullName = "Vui lòng nhập họ và tên.";
  if (!PHONE_RE.test(phone))
    fieldErrors.phone = "Số điện thoại chưa hợp lệ.";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Email chưa hợp lệ.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Vui lòng kiểm tra lại các thông tin bắt buộc.",
      fieldErrors,
    };
  }

  // TODO: gọi service CRM/tuyển dụng thật ở đây.
  console.info("[registration] hồ sơ CA mới", {
    fullName,
    phone,
    email,
    city,
    experience,
    hasMessage: message.length > 0,
  });

  return {
    status: "success",
    message:
      "Cảm ơn bạn đã nộp hồ sơ ứng tuyển vị trí Bạn Đồng Hành (Client Advisor - CA) tại Hệ sinh thái IPA Living. Bộ phận Nhân sự sẽ chủ động liên hệ với bạn để trao đổi thông tin phỏng vấn.",
  };
}

export type WorkshopInterestState = {
  status: "idle" | "success" | "error";
  message?: string;
};

/**
 * Server Action nhận đăng ký tham gia workshop (stub: validate + log).
 */
export async function submitWorkshopInterest(
  _prev: WorkshopInterestState,
  formData: FormData,
): Promise<WorkshopInterestState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  if (!name || !PHONE_RE.test(phone)) {
    return {
      status: "error",
      message: "Vui lòng nhập họ tên và số điện thoại hợp lệ.",
    };
  }

  const payload = Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [key, String(value)]),
  );
  console.info("[lead-interest] đăng ký mới", payload);

  return {
    status: "success",
    message:
      "Chuyên viên hỗ trợ sẽ liên hệ xác nhận lịch hẹn và gửi vé mời chi tiết qua số điện thoại/email của bạn trong vòng 24 giờ.",
  };
}
