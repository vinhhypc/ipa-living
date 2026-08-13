import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ARTICLES } from "@/lib/data";
import { routes, siteUrl } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata, SITE_NAME } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { ArticleDetailView } from "@/components/marketing/article-detail-view";

const TOWER_LABEL: Record<string, string> = {
  "suc-khoe": "Tháp Sức Khỏe",
  "thinh-vuong": "Tháp Thịnh Vượng",
  "bao-an": "Tháp Bảo An",
};

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ id: article.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = ARTICLES.find((item) => item.id === id);
  if (!article) return { title: "Không tìm thấy bài viết" };

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: routes.article(article.id),
    image: article.image,
    type: "article",
    keywords: [article.author, "tri thức wellbeing", TOWER_LABEL[article.category]],
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = ARTICLES.find((item) => item.id === id);
  if (!article) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: `${siteUrl}${article.image}`,
    author: { "@type": "Person", name: article.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo-landscape.png` },
    },
    articleSection: TOWER_LABEL[article.category],
    inLanguage: "vi-VN",
    mainEntityOfPage: `${siteUrl}${routes.article(article.id)}`,
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: routes.home },
          { name: "Tri Thức Wellbeing", path: routes.triThuc },
          { name: article.title, path: routes.article(article.id) },
        ])}
      />
      <ArticleDetailView article={article} />
    </>
  );
}
