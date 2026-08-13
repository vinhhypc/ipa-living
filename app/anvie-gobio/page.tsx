import type { Metadata } from "next";

import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { AnvieGobioView } from "@/components/marketing/anvie-gobio-view";

export const metadata: Metadata = buildMetadata({
  title: "AnVie Gobio — Tiêu dùng thuận tự nhiên",
  description:
    "AnVie Gobio: portfolio hệ sản phẩm Bio (Bếp Bio, Nhà Bio, Mẹ Bio, I'm Bio, Vietcharm), Gobio Shop và Tủ Sách Phương Bối — chuẩn vùng trồng GAO, chế biến NAO.",
  path: routes.anvieGobio,
  keywords: [
    "AnVie Gobio",
    "Bếp Bio",
    "thực dưỡng Oshawa",
    "Gobio Shop",
    "Vietcharm",
    "tiêu dùng hữu cơ",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: routes.home },
          { name: "Tháp Sức Khỏe AnVie", path: routes.sucKhoe },
          { name: "AnVie Gobio", path: routes.anvieGobio },
        ])}
      />
      <AnvieGobioView />
    </>
  );
}
