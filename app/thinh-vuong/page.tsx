import type { Metadata } from "next";

import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { ThinhVuongView } from "@/components/marketing/thinh-vuong-view";

export const metadata: Metadata = buildMetadata({
  title: "Tháp Thịnh Vượng VNDGO",
  description:
    "VNDIRECT kiến tạo toàn trình đầu tư: tích lũy định kỳ VNDSIP, quản trị gia sản VNDWealth và giao dịch chủ động VNDTRADE, đồng hành cùng chuyên gia VNDCARE.",
  path: routes.thinhVuong,
  keywords: [
    "VNDGO",
    "VNDIRECT",
    "VNDSIP",
    "VNDWealth",
    "VNDTRADE",
    "tích sản",
    "quản trị gia sản",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: routes.home },
          { name: "Tháp Thịnh Vượng VNDGO", path: routes.thinhVuong },
        ])}
      />
      <ThinhVuongView />
    </>
  );
}
