import "server-only";

/**
 * Đăng nhập DRM bằng tài khoản người dùng nhập ở màn login.
 *
 *   POST {DRM_ID_BASE_URL}/login?redirect-app=drm-admin
 *   body: username=...&password=...&url=       (form-urlencoded)
 *
 * Thành công: body là **chuỗi URL redirect** dạng
 *   `https://drm-admin-uat.ipas.com.vn?token-id=<uuid>`
 * → lấy query `token-id`. Token này lưu vào cookie phiên, dùng cho các call log.
 */

const ID_BASE = process.env.DRM_ID_BASE_URL ?? "https://id-uat.ipas.com.vn";

function readSetCookies(res: Response): string[] {
  const anyHeaders = res.headers as Headers & { getSetCookie?: () => string[] };
  if (typeof anyHeaders.getSetCookie === "function") return anyHeaders.getSetCookie();
  const single = res.headers.get("set-cookie");
  return single ? [single] : [];
}

/** Rút token từ body URL (`?token-id=`), dự phòng Set-Cookie `token=` và JSON. */
function extractToken(res: Response, rawText: string, body: unknown): string | null {
  const urlMatch = rawText.match(/[?&](?:token-id|token|token_id|tokenId)=([^&\s"']+)/i);
  if (urlMatch && urlMatch[1]) return decodeURIComponent(urlMatch[1]);

  for (const c of readSetCookies(res)) {
    const m = c.match(/(?:^|;|,)\s*token=([^;,\s]+)/i);
    if (m && m[1]) return m[1];
  }

  const b = body as Record<string, unknown> | null;
  const data = b?.data;
  if (typeof data === "string" && data) return data;
  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    for (const k of ["token", "accessToken", "access_token", "token-id", "tokenId"]) {
      if (typeof d[k] === "string" && d[k]) return d[k] as string;
    }
  }
  if (typeof b?.token === "string" && b.token) return b.token as string;
  return null;
}

/** Trả token DRM, hoặc ném lỗi với message tiếng Việt để hiển thị ở màn login. */
export async function loginToDrm(
  username: string,
  password: string,
): Promise<string> {
  let res: Response;
  try {
    res = await fetch(`${ID_BASE}/login?redirect-app=drm-admin`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        Origin: ID_BASE,
        Referer: `${ID_BASE}/login?&redirect-app=drm-admin`,
      },
      body: new URLSearchParams({ username, password, url: "" }).toString(),
      cache: "no-store",
    });
  } catch (error) {
    console.error("[drm-auth] network error", error);
    throw new Error("Không kết nối được máy chủ đăng nhập DRM (id-uat).");
  }

  const text = await res.text();
  let body: unknown = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = null;
  }

  if (res.status === 401 || res.status === 403) {
    throw new Error("Sai tài khoản hoặc mật khẩu.");
  }
  if (!res.ok) {
    const msg = (body as { message?: string } | null)?.message;
    throw new Error(msg ?? `Đăng nhập DRM thất bại (HTTP ${res.status}).`);
  }

  const token = extractToken(res, text, body);
  if (!token) {
    console.error("[drm-auth] không đọc được token từ response login", text.slice(0, 300));
    throw new Error("Đăng nhập OK nhưng không đọc được token từ response DRM.");
  }
  return token;
}
