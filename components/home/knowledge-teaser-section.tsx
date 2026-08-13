import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { routes } from "@/lib/routes";
import type { Article } from "@/lib/types";
import { KnowledgeCard } from "@/components/marketing/knowledge-card";

export function KnowledgeTeaserSection({
  articles,
}: {
  articles: Article[];
}) {
  return (
    <section
      id="knowledge-teaser"
      className="border-t border-neutral-100 bg-neutral-50 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-bluegray">
              Thư viện tri thức
            </span>
            <h2 className="font-display text-2xl font-black leading-snug text-neutral-900 sm:text-3xl">
              Tri thức sống trọn vẹn mỗi ngày
            </h2>
            <p className="pt-1 text-sm leading-relaxed text-neutral-600 sm:text-base">
              Bài viết chuyên sâu từ chuyên gia của AnVie, VNDIRECT và PTI.
            </p>
          </div>
          <Link
            href={routes.triThuc}
            className="group inline-flex shrink-0 items-center gap-1.5 rounded text-xs font-bold uppercase tracking-widest text-brand-bluegray transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <span>Xem tất cả bài viết</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
          </Link>
        </div>

        <div className="space-y-6">
          {articles.map((article) => (
            <KnowledgeCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
