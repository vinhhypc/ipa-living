import type { Metadata } from "next";

import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { VeIpaLivingView } from "@/components/marketing/ve-ipa-living-view";

export const metadata: Metadata = buildMetadata({
  title: "Về IPA Living",
  description:
    "Tổng quan hệ sinh thái IPA Living với ba trụ cột: AnVie (Tháp Sức Khỏe), VNDIRECT (Tháp Thịnh Vượng) và PTI (Tháp Bảo An) — một nếp sống trọn vẹn cho gia đình Việt.",
  path: routes.veIpaLiving,
  keywords: [
    "Về IPA Living",
    "hệ sinh thái IPA Living",
    "AnVie",
    "VNDIRECT",
    "PTI",
    "ba trụ cột",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: routes.home },
          { name: "Về IPA Living", path: routes.veIpaLiving },
        ])}
      />
      <VeIpaLivingView />
    </>
  );
}
