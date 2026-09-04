import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { HomeView } from "@/components/marketing/home-view";

export const metadata: Metadata = buildMetadata({
  title: "IPA Living | Hệ sinh thái Wellbeing Việt Nam",
  description:
    "Người bạn đồng hành cho cuộc sống trọn vẹn: nuôi dưỡng Thân khỏe cùng AnVie, tích sản vững bền cùng VNDIRECT và bảo vệ bình an cùng PTI trong một hệ sinh thái duy nhất.",
  path: "/",
  keywords: [
    "IPA Living",
    "hệ sinh thái wellbeing",
    "sống khỏe",
    "tích sản",
    "bảo hiểm",
    "workshop Dstation",
  ],
});

export default function Page() {
  return <HomeView />;
}
