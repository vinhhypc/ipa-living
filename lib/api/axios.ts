import axios, { AxiosError } from "axios";

/**
 * Shared axios instance. Base URL comes from `NEXT_PUBLIC_API_BASE_URL`
 * (see `.env.*`), so the same client works on the server and in the browser.
 */
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20_000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "[api]",
        error.config?.method?.toUpperCase(),
        error.config?.url,
        error.response?.status,
        error.response?.data ?? error.message,
      );
    }
    return Promise.reject(error);
  },
);

/** Narrow an unknown error thrown by axios into a readable message. */
export function getApiErrorMessage(error: unknown, fallback = "Đã có lỗi xảy ra, vui lòng thử lại."): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string; error?: string } | undefined;
    return data?.message ?? data?.error ?? error.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}
