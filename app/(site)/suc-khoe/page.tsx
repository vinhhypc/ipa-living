import type { Metadata } from "next";

import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { SucKhoeView } from "@/components/marketing/suc-khoe-view";

export const metadata: Metadata = buildMetadata({
  title: "Tháp Sức Khỏe AnVie",
  description:
    "AnVie gìn giữ nếp sống thuận tự nhiên qua ba trụ cột: AnVie Gobio (tiêu dùng), AnVie Health (trải nghiệm ẩm thực) và AnVie Life (chăm sóc sức khỏe chủ động).",
  path: routes.sucKhoe,
  keywords: [
    "AnVie",
    "AnVie Gobio",
    "AnVie Health",
    "AnVie Life",
    "sống khỏe",
    "y học lối sống",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: routes.home },
          { name: "Tháp Sức Khỏe AnVie", path: routes.sucKhoe },
        ])}
      />
      <SucKhoeView />
    </>
  );
}
