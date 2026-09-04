import "server-only";

import zlib from "node:zlib";
import { cookies } from "next/headers";

import { FORM_CATALOG, FORM_LIST, type FormCode } from "@/lib/forms/catalog";
import { DASHBOARD_COOKIE } from "@/lib/dashboard/constants";
import type { Submission, SubmissionResult } from "@/lib/dashboard/types";

/**
 * Lấy danh sách lượt gửi của 1 form từ DRM admin.
 *
 *   GET {DRM_ADMIN_BASE_URL}/api/proxy/log?ruleId={id}&targetType=RULE&orderBy=created&isDesc=true
 *   Cookie: token={token}   ← token của phiên đăng nhập (lưu ở cookie `ipa_dashboard`)
 *
 * Mỗi bản ghi có `message` = "zip:" + base64(gzip(BRMS trace text)). Trong trace
 * có dòng `Record [..] Data: { ...payload JSON... }` — chính là dữ liệu người dùng nhập.
 *
 * Token hết hạn → log trả 401 → báo phiên hết hạn (người dùng đăng nhập lại).
 */

const BASE = process.env.DRM_ADMIN_BASE_URL;

type LogItem = {
  recordId: string;
  status: number;
  created: number;
  message: string;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatTime(epochMs: number): string {
  const d = new Date(epochMs);
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()} ${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

/** Giải mã `message`: bỏ tiền tố `zip:`, base64 -> gunzip -> text. */
function decodeMessage(message: unknown): string | null {
  if (typeof message !== "string") return null;
  if (!message.startsWith("zip:")) return message;
  try {
    return zlib
      .gunzipSync(Buffer.from(message.slice(4), "base64"))
      .toString("utf8");
  } catch {
    return null;
  }
}

/** Lấy JSON payload từ dòng `Record [..] Data: { ... }` trong trace. */
function extractPayload(trace: string): Record<string, unknown> | null {
  const m = trace.match(
    /Record\s*\[[^\]]*\]\s*Data:\s*(\{[\s\S]*?\})\s*(?:\r?\n|$)/,
  );
  if (!m) return null;
  try {
    return JSON.parse(m[1]) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function logRequest(ruleId: number, token: string) {
  return fetch(
    `${BASE}/api/proxy/log?ruleId=${ruleId}&targetType=RULE&orderBy=created&isDesc=true`,
    {
      headers: {
        Accept: "*/*",
        Referer: `${BASE}/rules`,
        "x-auth-mode": "required",
        Cookie: `token=${token}`,
        "User-Agent": "IPA-Living-Dashboard",
      },
      // Admin: luôn lấy mới, không cache — mỗi lần vào form gọi lại DRM.
      cache: "no-store",
    },
  );
}

export async function fetchSubmissions(
  code: FormCode,
): Promise<SubmissionResult> {
  const { ruleId } = FORM_CATALOG[code];

  if (!BASE) {
    return {
      ok: false,
      error: "Chưa cấu hình DRM_ADMIN_BASE_URL trong biến môi trường.",
      rows: [],
    };
  }

  const token = (await cookies()).get(DASHBOARD_COOKIE)?.value;
  if (!token) {
    return { ok: false, error: "Chưa đăng nhập.", rows: [] };
  }

  let res: Response;
  try {
    res = await logRequest(ruleId, token);
  } catch (error) {
    console.error("[drm-log] error", code, error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Lỗi khi gọi DRM.",
      rows: [],
    };
  }

  if (res.status === 401 || res.status === 403) {
    return {
      ok: false,
      error: "Phiên đăng nhập DRM đã hết hạn — hãy đăng xuất và đăng nhập lại.",
      rows: [],
    };
  }
  if (!res.ok) {
    return { ok: false, error: `DRM admin trả về lỗi ${res.status}.`, rows: [] };
  }

  const json = (await res.json().catch(() => null)) as {
    content?: LogItem[];
  } | null;
  const content = json?.content ?? [];

  const rows: Submission[] = [];
  for (const item of content) {
    const trace = decodeMessage(item.message);
    const payload = trace ? extractPayload(trace) : null;
    if (!payload) continue;

    const values: Record<string, string | boolean> = {};
    for (const [key, value] of Object.entries(payload)) {
      values[key] = typeof value === "boolean" ? value : String(value ?? "");
    }
    values.createdTime = formatTime(item.created);

    rows.push({ id: item.recordId, status: item.status, values });
  }

  return { ok: true, rows };
}

/** Đếm số lượt gửi của tất cả form (cho sidebar + trang tổng quan). */
export async function fetchSubmissionCounts(): Promise<{
  counts: Record<string, number>;
  error: string | null;
}> {
  const results = await Promise.all(
    FORM_LIST.map(async (form) => {
      const res = await fetchSubmissions(form.code as FormCode);
      return { code: form.code, res };
    }),
  );

  const counts: Record<string, number> = {};
  let error: string | null = null;
  for (const { code, res } of results) {
    counts[code] = res.rows.length;
    if (!res.ok && !error) error = res.error;
  }
  return { counts, error };
}
