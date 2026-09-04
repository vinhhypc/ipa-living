/** Tách riêng, không import gì — an toàn để dùng trong middleware (edge). */
export const DASHBOARD_COOKIE = "ipa_dashboard";

/**
 * MOCK: tài khoản đăng nhập tạm cố định. Thay bằng gọi API xác thực khi có.
 */
export const MOCK_CREDENTIALS = {
  username: "admin",
  password: "admin",
};
