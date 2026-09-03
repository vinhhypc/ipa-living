import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  Gift,
  Heart,
  MapPin,
  Shield,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";
import type { Tower, Workshop } from "@/lib/types";

const TOWER_META: Record<
  Tower,
  { label: string; badge: string; icon: LucideIcon }
> = {
  "suc-khoe": {
    label: "Tháp Sức Khỏe",
    badge: "bg-health-500 text-white",
    icon: Heart,
  },
  "thinh-vuong": {
    label: "Tháp Thịnh Vượng",
    badge: "bg-wealth-500 text-white",
    icon: TrendingUp,
  },
  "bao-an": {
    label: "Tháp Bảo An",
    badge: "bg-protection-500 text-white",
    icon: Shield,
  },
};

export function WorkshopCard({ workshop }: { workshop: Workshop }) {
  const tower = TOWER_META[workshop.tower] ?? TOWER_META["suc-khoe"];
  const TowerIcon = tower.icon;
  const displayTitle = (workshop.packageName || workshop.title).toUpperCase();
  const spotsLeft =
    workshop.spotsLeft ??
    (workshop.capacity ? Number.parseInt(workshop.capacity, 10) || 12 : 12);
  const hasGift = Boolean(workshop.gift && workshop.gift !== "—");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative h-52 overflow-hidden bg-neutral-900 sm:h-56">
        <Image
          src={workshop.image}
          alt={workshop.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm",
              tower.badge,
            )}
          >
            <TowerIcon className="h-3 w-3" />
            <span>{tower.label}</span>
          </span>
          <span className="rounded-full bg-brand-gold px-3 py-1 text-xs font-bold text-white shadow-sm">
            Sắp diễn ra
          </span>
        </div>
      </div>

      <div className="flex flex-grow flex-col justify-between gap-4 p-6">
        <div className="space-y-3">
          <h3 className="line-clamp-2 text-base font-bold uppercase leading-snug tracking-tight text-neutral-900 transition-colors group-hover:text-emerald-800 sm:text-lg">
            {displayTitle}
          </h3>
          <p className="line-clamp-2 min-h-10 text-xs font-light leading-relaxed text-neutral-600 sm:text-sm">
            {workshop.description}
          </p>

          <p
            className={
              hasGift
                ? "inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800"
                : "inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50/80 px-3 py-1 text-xs font-medium text-emerald-800"
            }
          >
            {hasGift ? (
              <>
                <Gift className="h-3 w-3 shrink-0 text-emerald-600" />
                <span>Ưu đãi: {workshop.gift}</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3 shrink-0 text-emerald-600" />
                <span>Miễn phí hoặc ưu đãi dành cho thành viên</span>
              </>
            )}
          </p>

          <div className="space-y-2 pt-2 text-xs text-neutral-600">
            <p className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0 text-neutral-400" />
              <span className="font-medium text-neutral-700">
                {workshop.date || "Hàng tuần"}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-neutral-400" />
              <span>
                {workshop.time ||
                  (workshop.duration
                    ? `Thời lượng ${workshop.duration}`
                    : "09:00 - 11:30")}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-neutral-400" />
              <span className="truncate">
                {workshop.location || "Dstation"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
          <span className="text-xs font-semibold text-brand-gold">
            Còn {spotsLeft} chỗ đăng ký
          </span>
          <Link
            href={routes.workshop(workshop.id)}
            className="group/link inline-flex items-center gap-1 rounded text-xs font-bold uppercase  text-brand-green transition-colors hover:text-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <span>Đăng ký giữ chỗ</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1 motion-reduce:transition-none" />
          </Link>
        </div>
      </div>
    </article>
  );
}
