/**
 * Tách riêng, không import gì — an toàn để dùng trong middleware/proxy (edge).
 *
 * Cookie này chứa **token DRM** của phiên đăng nhập (không phải cờ boolean).
 */
export const DASHBOARD_COOKIE = "ipa_dashboard";

/** Tên tài khoản đã đăng nhập — chỉ để hiển thị ở sidebar. */
export const DASHBOARD_USER_COOKIE = "ipa_dashboard_user";
