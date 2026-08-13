import type { Metadata } from "next";

import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { BaoAnView } from "@/components/marketing/bao-an-view";

export const metadata: Metadata = buildMetadata({
  title: "Tháp Bảo An PTICare",
  description:
    "PTI xây lá chắn bảo an ba tầng — An Toàn, An Tâm, An Sinh — với PTI SOS (xe & du lịch), PTI Health (sức khỏe) và PTI Commercial (doanh nghiệp).",
  path: routes.baoAn,
  keywords: [
    "PTICare",
    "PTI",
    "bảo hiểm",
    "PTI SOS",
    "PTI Health",
    "PTI Commercial",
    "bảo an",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: routes.home },
          { name: "Tháp Bảo An PTICare", path: routes.baoAn },
        ])}
      />
      <BaoAnView />
    </>
  );
}
