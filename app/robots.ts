import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/routes";

/**
 * robots.txt — mở crawl toàn site, trỏ tới sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
