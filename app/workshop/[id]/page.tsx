import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WORKSHOPS } from "@/lib/data";
import { routes, siteUrl } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata, SITE_NAME } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { WorkshopDetailView } from "@/components/marketing/workshop-detail-view";

export function generateStaticParams() {
  return WORKSHOPS.map((workshop) => ({ id: workshop.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const workshop = WORKSHOPS.find((item) => item.id === id);
  if (!workshop) return { title: "Không tìm thấy workshop" };

  return buildMetadata({
    title: `${workshop.title} — Workshop Dstation`,
    description: workshop.description,
    path: routes.workshop(workshop.id),
    image: workshop.image,
    keywords: [
      workshop.dongWorkshop ?? "workshop wellbeing",
      "Dstation",
      "workshop IPA Living",
    ],
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workshop = WORKSHOPS.find((item) => item.id === id);
  if (!workshop) notFound();

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: workshop.title,
    description: workshop.description,
    image: `${siteUrl}${workshop.image}`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus:
      workshop.status === "completed"
        ? "https://schema.org/EventCancelled"
        : "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: workshop.location ?? "Dstation",
      address: { "@type": "PostalAddress", addressCountry: "VN" },
    },
    organizer: { "@type": "Organization", name: SITE_NAME, url: siteUrl },
    offers: {
      "@type": "Offer",
      price: workshop.priceNumber ?? 0,
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}${routes.workshop(workshop.id)}`,
    },
    inLanguage: "vi-VN",
  };

  return (
    <>
      <JsonLd data={eventJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: routes.home },
          { name: "Workshop & Sự kiện", path: `${routes.diemCham}` },
          { name: workshop.title, path: routes.workshop(workshop.id) },
        ])}
      />
      <WorkshopDetailView workshop={workshop} />
    </>
  );
}
