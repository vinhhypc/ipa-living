import type { Metadata } from "next";

import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { TuyenDungCaView } from "@/components/marketing/tuyen-dung-ca-view";

export const metadata: Metadata = buildMetadata({
  title: "Tuyển dụng Client Advisor (CA)",
  description:
    "IPA Living tuyển dụng đội ngũ Bạn Đồng Hành (Client Advisor) — được đào tạo đa trụ cột về Y học lối sống, Quản trị gia sản và Bảo an, làm việc tại hệ thống Trạm Dstation.",
  path: routes.tuyenDungCa,
  keywords: [
    "tuyển dụng CA",
    "Client Advisor",
    "việc làm IPA Living",
    "tuyển dụng wellbeing",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: routes.home },
          { name: "Tuyển dụng Client Advisor", path: routes.tuyenDungCa },
        ])}
      />
      <TuyenDungCaView />
    </>
  );
}
