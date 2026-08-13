import { ARTICLES, WORKSHOPS } from "@/lib/data";
import { HeroSection } from "@/components/home/hero-section";
import { TowersSection } from "@/components/home/towers-section";
import { WorkshopTeaserSection } from "@/components/home/workshop-teaser-section";
import { KnowledgeTeaserSection } from "@/components/home/knowledge-teaser-section";
import { FinalCtaSection } from "@/components/home/final-cta-section";

/**
 * Trang chủ — port từ `src-old/pages/Home.tsx`. Mỗi section tách riêng dưới
 * `components/home/`; phần tương tác (hero slider, tabs 3 tháp) là Client
 * Component, phần còn lại render trên server.
 */
export function HomeView() {
  const upcomingWorkshops = WORKSHOPS.filter(
    (workshop) => workshop.status === "upcoming",
  ).slice(0, 3);
  const latestArticles = ARTICLES.slice(0, 3);

  return (
    <div id="home-page" className="font-sans">
      <HeroSection />
      <TowersSection />
      <WorkshopTeaserSection workshops={upcomingWorkshops} />
      <KnowledgeTeaserSection articles={latestArticles} />
      <FinalCtaSection />
    </div>
  );
}
