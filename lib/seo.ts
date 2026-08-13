import type { Metadata } from "next";

import { siteUrl } from "@/lib/routes";

export const SITE_NAME = "IPA Living";
export const DEFAULT_OG_IMAGE = "/images/logo-landscape.png";

type PageMetaInput = {
  title: string;
  description: string;
  /** Đường dẫn canonical bắt đầu bằng "/", ví dụ "/suc-khoe". */
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
};

/**
 * Tạo `Metadata` chuẩn SEO cho một route: title, description, canonical,
 * OpenGraph và Twitter card. Dùng chung cho mọi `page.tsx`.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
  type = "website",
}: PageMetaInput): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "vi_VN",
      type,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/** JSON-LD Organization + WebSite cho toàn site (đặt trong layout gốc). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: SITE_NAME,
        url: siteUrl,
        logo: `${siteUrl}${DEFAULT_OG_IMAGE}`,
        description:
          "Hệ sinh thái Wellbeing toàn diện: Sức Khỏe (AnVie), Thịnh Vượng (VNDIRECT) và Bảo An (PTI).",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Số 1 Nguyễn Thượng Hiền, P. Nguyễn Du, Q. Hai Bà Trưng",
          addressLocality: "Hà Nội",
          addressCountry: "VN",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+84-1900-5454-09",
          contactType: "customer service",
          areaServed: "VN",
          availableLanguage: ["vi"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: SITE_NAME,
        inLanguage: "vi-VN",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
}

/** JSON-LD BreadcrumbList từ danh sách [tên, path]. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
