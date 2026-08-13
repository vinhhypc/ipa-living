import type { Metadata } from "next";

import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { PtiSosView } from "@/components/marketing/pti-sos-view";

export const metadata: Metadata = buildMetadata({
  title: "PTI SOS — Cứu hộ & Bảo hiểm 3 tầng",
  description:
    "PTISOS bảo vệ toàn diện 3 tầng: Drive (bảo hiểm xe ô tô & xe máy), Travel (bảo hiểm du lịch trong nước & quốc tế) và Homes (bảo hiểm nhà tư nhân) — cứu hộ 24/7.",
  path: routes.ptiSos,
  keywords: [
    "PTI SOS",
    "PTISOS",
    "bảo hiểm xe ô tô",
    "bảo hiểm xe máy",
    "bảo hiểm du lịch",
    "cứu hộ 24/7",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: routes.home },
          { name: "Tháp Bảo An PTICare", path: routes.baoAn },
          { name: "PTI SOS", path: routes.ptiSos },
        ])}
      />
      <PtiSosView />
    </>
  );
}
