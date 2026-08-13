import type { Metadata } from "next";

import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { DCareView } from "@/components/marketing/d-care-view";

export const metadata: Metadata = buildMetadata({
  title: "D-Care — Đội ngũ đồng hành & Chuyên gia",
  description:
    "Gặp gỡ mạng lưới Client Advisor, Bác sĩ Y học lối sống AnVie, Chuyên gia Tích sản VNDGO và Chuyên gia Bảo an PTI. Đặt lịch tư vấn 1:1 hoặc ứng tuyển gia nhập đội ngũ.",
  path: routes.dCare,
  keywords: [
    "D-Care",
    "Client Advisor",
    "đặt lịch tư vấn",
    "chuyên gia wellbeing",
    "tuyển dụng CA",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: routes.home },
          { name: "D-Care", path: routes.dCare },
        ])}
      />
      <DCareView />
    </>
  );
}
