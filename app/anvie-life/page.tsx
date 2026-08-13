import type { Metadata } from "next";

import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { AnvieLifeView } from "@/components/marketing/anvie-life-view";

export const metadata: Metadata = buildMetadata({
  title: "AnVie Life — Chăm sóc sức khỏe chủ động",
  description:
    "AnVie Life gồm AnVie Academy (không gian học tập, trao truyền tri thức y học lối sống) và chuỗi phòng khám — mạng lưới tư vấn sức khỏe gia đình đồng hành cùng bạn.",
  path: routes.anvieLife,
  keywords: [
    "AnVie Life",
    "AnVie Academy",
    "y học lối sống",
    "phòng khám gia đình",
    "chăm sóc sức khỏe chủ động",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: routes.home },
          { name: "Tháp Sức Khỏe AnVie", path: routes.sucKhoe },
          { name: "AnVie Life", path: routes.anvieLife },
        ])}
      />
      <AnvieLifeView />
    </>
  );
}
