import type { Metadata } from "next";

import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { PtiHealthView } from "@/components/marketing/pti-health-view";

export const metadata: Metadata = buildMetadata({
  title: "PTI Health — Bảo hiểm sức khỏe toàn diện",
  description:
    "PTI Health với Elitecare, Phúc An Sinh và Bảo hiểm tai nạn hộ sử dụng điện — bảo lãnh viện phí trực tiếp tại 200+ bệnh viện, chăm sóc sức khỏe cho cả gia đình.",
  path: routes.ptiHealth,
  keywords: [
    "PTI Health",
    "bảo hiểm sức khỏe",
    "Elitecare",
    "Phúc An Sinh",
    "bảo lãnh viện phí",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: routes.home },
          { name: "Tháp Bảo An PTICare", path: routes.baoAn },
          { name: "PTI Health", path: routes.ptiHealth },
        ])}
      />
      <PtiHealthView />
    </>
  );
}
