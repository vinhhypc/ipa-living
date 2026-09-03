"use client";

import { useEffect, useRef } from "react";

/**
 * Chạy `handler` với giá trị `location.hash` (đã bỏ dấu `#`) khi mount và mỗi khi hash đổi.
 *
 * Next.js `<Link href="/same-route#khac">` khi đang ở cùng route chỉ `pushState` + cuộn,
 * **không phát `hashchange`**. Nên ngoài `hashchange`/`popstate`, hook bắt thêm click vào
 * bất kỳ `<a>` có `#` trong href rồi đọc lại hash ở frame kế tiếp.
 */
export function useHashSync(handler: (hash: string) => void) {
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    const run = () =>
      handlerRef.current(window.location.hash.replace(/^#/, ""));

    run();

    const onDocClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (anchor && (anchor.getAttribute("href") ?? "").includes("#")) {
        // đọc lại hash sau khi router kịp cập nhật URL
        requestAnimationFrame(run);
        setTimeout(run, 60);
        setTimeout(run, 200);
      }
    };

    window.addEventListener("hashchange", run);
    window.addEventListener("popstate", run);
    document.addEventListener("click", onDocClick);
    return () => {
      window.removeEventListener("hashchange", run);
      window.removeEventListener("popstate", run);
      document.removeEventListener("click", onDocClick);
    };
  }, []);
}
