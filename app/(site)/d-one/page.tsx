import type { Metadata } from "next";

import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { DOneView } from "@/components/marketing/d-one-view";

export const metadata: Metadata = buildMetadata({
  title: "D-one — Nền tảng số IPA Living",
  description:
    "D-one kết nối hành trình Sống khỏe, Sống giàu và Sống an trong một trải nghiệm số liền mạch. Đăng ký thành viên D-ONE hoặc trở thành nhà cung cấp đối tác.",
  path: routes.dOne,
  keywords: [
    "D-one",
    "D-ONE",
    "thành viên IPA Living",
    "đăng ký nhà cung cấp",
    "nền tảng số wellbeing",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: routes.home },
          { name: "D-one", path: routes.dOne },
        ])}
      />
      <DOneView />
    </>
  );
}
