import type { Metadata } from "next";

import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { PtiCommercialView } from "@/components/marketing/pti-commercial-view";

export const metadata: Metadata = buildMetadata({
  title: "PTI Commercial — Bảo hiểm Doanh nghiệp",
  description:
    "PTI Commercial cung cấp lớp bảo vệ minh bạch, linh hoạt cho doanh nghiệp: bảo hiểm tài sản & gián đoạn kinh doanh, vận chuyển hàng hóa và trách nhiệm pháp lý.",
  path: routes.ptiCommercial,
  keywords: [
    "PTI Commercial",
    "bảo hiểm doanh nghiệp",
    "bảo hiểm tài sản",
    "bảo hiểm hàng hóa",
    "trách nhiệm pháp lý",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: routes.home },
          { name: "Tháp Bảo An PTICare", path: routes.baoAn },
          { name: "PTI Commercial", path: routes.ptiCommercial },
        ])}
      />
      <PtiCommercialView />
    </>
  );
}
