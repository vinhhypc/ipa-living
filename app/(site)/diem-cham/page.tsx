import type { Metadata } from "next";

import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { DiemChamView } from "@/components/marketing/diem-cham-view";

export const metadata: Metadata = buildMetadata({
  title: "Điểm Chạm Trải Nghiệm — Dstation",
  description:
    "Hệ thống điểm chạm của IPA Living: mạng lưới trạm trải nghiệm Dstation, lịch Workshop & Sự kiện và thư viện Tri thức Wellbeing từ ba trụ cột Sức khỏe, Thịnh vượng, Bảo an.",
  path: routes.diemCham,
  keywords: [
    "Dstation",
    "điểm chạm IPA Living",
    "workshop wellbeing",
    "tri thức wellbeing",
    "trạm trải nghiệm",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: routes.home },
          { name: "Điểm Chạm Trải Nghiệm", path: routes.diemCham },
        ])}
      />
      <DiemChamView />
    </>
  );
}
