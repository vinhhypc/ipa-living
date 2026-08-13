import type { MetadataRoute } from "next";

import { ARTICLES, WORKSHOPS } from "@/lib/data";
import { routes, siteUrl, staticRoutePaths } from "@/lib/routes";

/**
 * Sitemap liệt kê toàn bộ route thực tế của site: các trang tĩnh + trang
 * workshop và bài viết chi tiết sinh động theo dữ liệu trong `lib/data`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutePaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === routes.home ? 1 : 0.8,
  }));

  const workshopEntries: MetadataRoute.Sitemap = WORKSHOPS.map((workshop) => ({
    url: `${siteUrl}${routes.workshop(workshop.id)}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const articleEntries: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${siteUrl}${routes.article(article.id)}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...workshopEntries, ...articleEntries];
}
