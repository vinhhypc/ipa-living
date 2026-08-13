import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Heart,
  Shield,
  TrendingUp,
  User,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";
import type { Article, Tower } from "@/lib/types";

const TOWER_META: Record<
  Tower,
  {
    label: string;
    badge: string;
    link: string;
    titleHover: string;
    icon: LucideIcon;
  }
> = {
  "suc-khoe": {
    label: "Sức Khỏe",
    badge: "bg-health-500 text-white",
    link: "text-health-700",
    titleHover: "group-hover:text-health-700",
    icon: Heart,
  },
  "thinh-vuong": {
    label: "Thịnh Vượng",
    badge: "bg-wealth-500 text-white",
    link: "text-wealth-700",
    titleHover: "group-hover:text-wealth-700",
    icon: TrendingUp,
  },
  "bao-an": {
    label: "Bảo An",
    badge: "bg-protection-500 text-white",
    link: "text-protection-700",
    titleHover: "group-hover:text-protection-700",
    icon: Shield,
  },
};

export function KnowledgeCard({ article }: { article: Article }) {
  const tower = TOWER_META[article.category] ?? TOWER_META["suc-khoe"];
  const TowerIcon = tower.icon;

  return (
    <article className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:flex-row">
      <div className="relative -mx-5 -mt-5 h-52 shrink-0 overflow-hidden rounded-t-2xl bg-neutral-100 md:mx-0 md:mt-0 md:h-44 md:w-1/3 md:rounded-xl">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(min-width: 768px) 240px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <span
          className={cn(
            "absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold shadow-sm",
            tower.badge,
          )}
        >
          <TowerIcon className="h-2.5 w-2.5" />
          <span>Tháp {tower.label}</span>
        </span>
      </div>

      <div className="flex grow flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-neutral-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-neutral-300" />
              {article.date}
            </span>
            <span aria-hidden>&bull;</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-neutral-300" />
              {article.readTime}
            </span>
          </div>

          <h3
            className={cn(
              "mt-2 line-clamp-2 font-display text-base font-extrabold leading-snug text-neutral-800 transition-colors md:text-lg",
              tower.titleHover,
            )}
          >
            <Link
              href={routes.article(article.id)}
              className="rounded after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              {article.title}
            </Link>
          </h3>

          <p className="mt-2 line-clamp-2 text-xs font-light leading-relaxed text-neutral-500 sm:text-sm">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-2 border-t border-neutral-100 pt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <span className="flex min-w-0 items-center gap-1 text-xs text-neutral-500">
            <User className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
            <span className="truncate">{article.author}</span>
          </span>
          <span
            className={cn(
              "flex shrink-0 items-center gap-1 text-xs font-bold transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none",
              tower.link,
            )}
          >
            <span>Đọc chi tiết bài viết</span>
            <span aria-hidden>&rarr;</span>
          </span>
        </div>
      </div>
    </article>
  );
}
