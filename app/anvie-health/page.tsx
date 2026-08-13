import type { Metadata } from "next";

import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { AnvieHealthView } from "@/components/marketing/anvie-health-view";

export const metadata: Metadata = buildMetadata({
  title: "AnVie Health — Trải nghiệm nếp sống AnVie",
  description:
    "AnVie Health: ẩm thực Hoa Vị & Dstation Bistro, hành trình CBX (Connect · Balance · Experience), nghỉ dưỡng CDA — Club des Amis và chuỗi 10 gói workshop trải nghiệm.",
  path: routes.anvieHealth,
  keywords: [
    "AnVie Health",
    "Hoa Vị",
    "Dstation Bistro",
    "CBX",
    "Club des Amis",
    "workshop wellbeing",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: routes.home },
          { name: "Tháp Sức Khỏe AnVie", path: routes.sucKhoe },
          { name: "AnVie Health", path: routes.anvieHealth },
        ])}
      />
      <AnvieHealthView />
    </>
  );
}
