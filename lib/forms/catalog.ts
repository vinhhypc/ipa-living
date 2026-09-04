/**
 * Nguồn dữ liệu DUY NHẤT mô tả mọi form marketing của IPA Living:
 * - danh sách field gửi lên DRM (khớp `targetObject` trong Postman "2. IPA Living")
 * - field bắt buộc / field boolean
 * - tên hiển thị + đường dẫn trang chứa form
 *
 * Dùng bởi cả server action submit ([lib/actions/registration.ts])
 * lẫn màn admin `/dashboard`.
 */

/** Nhãn tiếng Việt cho từng field (hiển thị làm tiêu đề cột ở dashboard). */
export const FIELD_LABELS: Record<string, string> = {
  fullName: "Họ và tên",
  phoneNumber: "Số điện thoại",
  email: "Email",
  numberOfParticipants: "Số người tham dự",
  message: "Ghi chú",
  receiveReminderNotification: "Nhận nhắc lịch",
  interestedTopic: "Chủ đề quan tâm",
  dstationAddress: "Địa điểm Dstation",
  address: "Địa chỉ",
  interestedPillar: "Trụ cột quan tâm",
  companyName: "Tên đơn vị",
  representativeName: "Người đại diện",
  productServiceGroup: "Nhóm sản phẩm / dịch vụ",
  qualityCertificates: "Chứng nhận chất lượng",
  consultationDate: "Ngày tư vấn",
  consultationTime: "Khung giờ",
  consultationMethod: "Hình thức tư vấn",
  position: "Vị trí ứng tuyển",
  workAddress: "Khu vực làm việc",
  workExperience: "Kinh nghiệm làm việc",
  cvProfileUrl: "CV / Hồ sơ",
  expertiseField: "Lĩnh vực chuyên môn",
  interestedProduct: "Sản phẩm quan tâm",
  productInfo: "Thông tin sản phẩm",
  createdTime: "Thời gian gửi",
};

export type FormCatalogEntry = {
  /** Mã business rule = path DRM: /public/matches/{code}. */
  code: string;
  /** Tên hiển thị ở dashboard. */
  name: string;
  /** Nhóm để gom nhãn ở sidebar. */
  group: "Workshop" | "PTI" | "D-One" | "D-Care" | "Tuyển dụng";
  /** Trang công khai chứa form (để mở nhanh từ dashboard). */
  publicPath: string;
  /** ID rule trong DRM admin (dùng để lấy log lượt gửi). */
  ruleId: number;
  /** Field gửi lên (đúng thứ tự & tên theo targetObject của rule). */
  fields: readonly string[];
  /** Field bắt buộc (rule BR-01). */
  required: readonly string[];
  /** Field kiểu boolean (checkbox). */
  booleans?: readonly string[];
  /** Thông báo thành công riêng. */
  successMessage?: string;
};

export const FORM_CATALOG = {
  register_workshop_ipa_living: {
    code: "register_workshop_ipa_living",
    name: "Đăng ký Workshop",
    group: "Workshop",
    publicPath: "/workshop",
    ruleId: 1036,
    fields: [
      "fullName",
      "phoneNumber",
      "email",
      "numberOfParticipants",
      "message",
      "receiveReminderNotification",
    ],
    required: ["fullName", "phoneNumber", "email"],
    booleans: ["receiveReminderNotification"],
    successMessage:
      "Đăng ký tham dự thành công! Ban tổ chức IPA Living sẽ gửi mã vé và thông tin chi tiết qua điện thoại/email của bạn.",
  },
  register_investment_workshop_ipa_living: {
    code: "register_investment_workshop_ipa_living",
    name: "Đăng ký Workshop Đầu tư",
    group: "Workshop",
    publicPath: "/thinh-vuong",
    ruleId: 1044,
    fields: ["fullName", "phoneNumber", "email", "interestedTopic", "dstationAddress"],
    required: ["fullName", "phoneNumber", "email"],
    successMessage:
      "Đăng ký thành công! Trạm Dstation sẽ liên hệ xác nhận lịch và gửi thông tin workshop đầu tư cho bạn.",
  },
  register_membership_done_ipa_living: {
    code: "register_membership_done_ipa_living",
    name: "Đăng ký Thành viên D-One",
    group: "D-One",
    publicPath: "/d-one",
    ruleId: 1037,
    fields: ["fullName", "phoneNumber", "email", "address", "interestedPillar", "message"],
    required: ["fullName", "phoneNumber"],
    successMessage:
      "Chào mừng bạn đến với D-one! Chúng tôi sẽ liên hệ kích hoạt quyền lợi thành viên và gửi voucher trải nghiệm tại Dstation.",
  },
  register_supplier_ipa_living: {
    code: "register_supplier_ipa_living",
    name: "Đăng ký Nhà cung cấp D-One",
    group: "D-One",
    publicPath: "/d-one",
    ruleId: 1038,
    fields: [
      "companyName",
      "representativeName",
      "phoneNumber",
      "email",
      "productServiceGroup",
      "qualityCertificates",
      "message",
    ],
    required: ["companyName", "representativeName", "phoneNumber"],
    successMessage:
      "Đã nhận hồ sơ nhà cung cấp. Bộ phận đối tác của IPA Living sẽ liên hệ trao đổi trong thời gian sớm nhất.",
  },
  register_consultation_ipa_living: {
    code: "register_consultation_ipa_living",
    name: "Đặt lịch tư vấn D-Care",
    group: "D-Care",
    publicPath: "/d-care",
    ruleId: 1039,
    fields: [
      "fullName",
      "phoneNumber",
      "consultationDate",
      "consultationTime",
      "consultationMethod",
      "message",
    ],
    required: ["fullName", "phoneNumber"],
    successMessage:
      "Đặt lịch thành công! Chuyên gia sẽ xác nhận lịch hẹn với bạn qua điện thoại.",
  },
  apply_advisor_ipa_living: {
    code: "apply_advisor_ipa_living",
    name: "Ứng tuyển Chuyên gia D-Care",
    group: "D-Care",
    publicPath: "/d-care",
    ruleId: 1040,
    fields: [
      "fullName",
      "phoneNumber",
      "email",
      "position",
      "workAddress",
      "workExperience",
      "cvProfileUrl",
      "message",
    ],
    required: ["fullName", "phoneNumber"],
    successMessage:
      "Ứng tuyển thành công! Bộ phận Nhân sự IPA Living sẽ phản hồi hồ sơ của bạn trong vòng 3 ngày làm việc.",
  },
  apply_client_advisor_ipa_living: {
    code: "apply_client_advisor_ipa_living",
    name: "Ứng tuyển Client Advisor (CA)",
    group: "Tuyển dụng",
    publicPath: "/tuyen-dung-ca",
    ruleId: 1043,
    fields: ["fullName", "phoneNumber", "email", "expertiseField", "workAddress", "message"],
    required: ["fullName", "phoneNumber"],
    successMessage:
      "Cảm ơn bạn đã nộp hồ sơ ứng tuyển vị trí Bạn Đồng Hành (Client Advisor - CA) tại Hệ sinh thái IPA Living. Bộ phận Nhân sự sẽ chủ động liên hệ với bạn để trao đổi thông tin phỏng vấn.",
  },
  register_consultation_pti_health_ipa_living: {
    code: "register_consultation_pti_health_ipa_living",
    name: "Tư vấn PTI Health",
    group: "PTI",
    publicPath: "/pti-health",
    ruleId: 1041,
    fields: ["fullName", "phoneNumber", "email", "interestedProduct"],
    required: ["fullName", "phoneNumber"],
    successMessage:
      "Gửi thông tin thành công! Chuyên viên PTI Health sẽ liên hệ tư vấn cho bạn trong vòng 24 giờ.",
  },
  register_consultation_pti_care_ipa_living: {
    code: "register_consultation_pti_care_ipa_living",
    name: "Tư vấn PTI Care / Bảo An",
    group: "PTI",
    publicPath: "/bao-an",
    ruleId: 1042,
    fields: ["fullName", "phoneNumber", "email", "address", "interestedProduct", "message"],
    required: ["fullName", "phoneNumber"],
    successMessage:
      "Gửi thông tin thành công! Chuyên viên CA của PTI sẽ liên hệ hỗ trợ tư vấn giải pháp bảo vệ tối ưu cho bạn.",
  },
  register_consultation_pti_sos_ipa_living: {
    code: "register_consultation_pti_sos_ipa_living",
    name: "Tư vấn PTI SOS",
    group: "PTI",
    publicPath: "/pti-sos",
    ruleId: 1045,
    fields: ["fullName", "phoneNumber", "email", "interestedProduct", "productInfo"],
    required: ["fullName", "phoneNumber"],
    successMessage:
      "Gửi thông tin thành công! Tổng đài PTI 24/7 (1900 54 54 75) sẽ liên hệ tư vấn cho bạn.",
  },
} satisfies Record<string, FormCatalogEntry>;

export type FormCode = keyof typeof FORM_CATALOG;

export const FORM_LIST: readonly FormCatalogEntry[] = Object.values(FORM_CATALOG);

export function isFormCode(value: string): value is FormCode {
  return Object.prototype.hasOwnProperty.call(FORM_CATALOG, value);
}

/** Lấy entry với kiểu đã "nới" về `FormCatalogEntry` (union hẹp làm mất field optional). */
export function formEntry(code: FormCode): FormCatalogEntry {
  return FORM_CATALOG[code];
}

export function fieldLabel(field: string): string {
  return FIELD_LABELS[field] ?? field;
}
