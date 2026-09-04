import type { Metadata } from "next";

import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { DiemChamView } from "@/components/marketing/diem-cham-view";

export const metadata: Metadata = buildMetadata({
  title: "Tri Thức Wellbeing",
  description:
    "Thư viện Tri thức Wellbeing IPA Living — bài nghiên cứu, hướng dẫn thực hành và triết lý sống từ ba trụ cột Sức Khỏe (AnVie), Thịnh Vượng (VNDGO) và Bảo An (PTI).",
  path: routes.triThuc,
  keywords: [
    "tri thức wellbeing",
    "blog IPA Living",
    "y học lối sống",
    "tích sản",
    "bảo an gia đình",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: routes.home },
          { name: "Điểm Chạm Trải Nghiệm", path: routes.diemCham },
          { name: "Tri Thức Wellbeing", path: routes.triThuc },
        ])}
      />
      <DiemChamView initialTab="tri-thuc" />
    </>
  );
}
