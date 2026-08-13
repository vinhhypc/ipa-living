import type { Metadata } from "next";

import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { PtiHomesView } from "@/components/marketing/pti-homes-view";

export const metadata: Metadata = buildMetadata({
  title: "PTI Homes — Bảo hiểm nhà tư nhân",
  description:
    "PTI Homecare bảo vệ toàn diện 3 chiều cho tổ ấm: kết cấu nhà, tài sản bên trong và trách nhiệm với bên thứ ba trong một hợp đồng, chỉ từ 220.000đ/năm.",
  path: routes.ptiHomes,
  keywords: [
    "PTI Homes",
    "PTI Homecare",
    "bảo hiểm nhà tư nhân",
    "bảo hiểm tài sản gia đình",
    "bảo hiểm cháy nổ",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: routes.home },
          { name: "Tháp Bảo An PTICare", path: routes.baoAn },
          { name: "PTI Homes", path: routes.ptiHomes },
        ])}
      />
      <PtiHomesView />
    </>
  );
}
