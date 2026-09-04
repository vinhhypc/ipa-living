"use client";

import { useMemo, useState } from "react";
import {
  ChevronRight,
  Compass,
  Globe,
  MapPin,
  Navigation,
  Sparkles,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { D_STATION_LOCATIONS, D_STATION_ZONES } from "@/lib/data";
import type { DstationCity } from "@/lib/types";
import { FacebookIcon } from "@/components/icons/social-icons";

type CityFilter = "all" | DstationCity;

const ZONE_ICONS: Record<string, LucideIcon> = {
  Compass,
  Sparkles,
  UserCheck,
  Users,
};

const CITY_FILTERS: { key: CityFilter; label: string; count: number }[] = [
  { key: "all", label: "Tất cả", count: D_STATION_LOCATIONS.length },
  {
    key: "hanoi",
    label: "Hà Nội",
    count: D_STATION_LOCATIONS.filter((l) => l.city === "hanoi").length,
  },
  {
    key: "hcm",
    label: "TP. HCM",
    count: D_STATION_LOCATIONS.filter((l) => l.city === "hcm").length,
  },
  {
    key: "other",
    label: "Khác",
    count: D_STATION_LOCATIONS.filter((l) => l.city === "other").length,
  },
];

const EXPERIENCE_ZONES = [
  { title: "Bistro & Cafe", desc: "Bếp men sống Delivie" },
  { title: "Tea & Wealth", desc: "Hoạch định tài chính" },
  { title: "Tea & Health", desc: "Tư vấn sống khỏe AnVie" },
  { title: "CA Advisor Room", desc: "Không gian riêng tư" },
];

function mapsUrlFor(name: string, address: string, mapsLink?: string) {
  return (
    mapsLink ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${name} ${address}`,
    )}`
  );
}

export function MapSection() {
  const [city, setCity] = useState<CityFilter>("all");
  const [activeId, setActiveId] = useState(D_STATION_LOCATIONS[0].id);

  const filtered = useMemo(
    () =>
      city === "all"
        ? D_STATION_LOCATIONS
        : D_STATION_LOCATIONS.filter((l) => l.city === city),
    [city],
  );

  const active =
    D_STATION_LOCATIONS.find((l) => l.id === activeId) ?? D_STATION_LOCATIONS[0];
  const mapsUrl = mapsUrlFor(active.name, active.address, active.mapsLink);

  const handleCity = (next: CityFilter) => {
    setCity(next);
    const list =
      next === "all"
        ? D_STATION_LOCATIONS
        : D_STATION_LOCATIONS.filter((l) => l.city === next);
    if (list[0]) setActiveId(list[0].id);
  };

  return (
    <div id="dstation-section" className="space-y-12 font-sans">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
          Dstation Experience
        </span>
        <h3 className="mt-2 font-display text-2xl font-extrabold leading-snug text-brand-navy md:text-3xl">
          Dstation — nơi Trải nghiệm và Kết nối.
        </h3>
        <p className="mt-3 text-sm font-light leading-relaxed text-neutral-600 md:text-base">
          Dstation là mạng lưới điểm chạm của IPA Living tại nhiều tỉnh thành,
          nơi những sản phẩm, dịch vụ và con người được kết nối thành một trải
          nghiệm trọn vẹn cho sức khỏe, tài chính và đời sống của bạn.
        </p>
      </div>

      {/* 4 zones */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {D_STATION_ZONES.map((zone) => {
          const Icon = ZONE_ICONS[zone.iconName] ?? Compass;
          return (
            <div
              key={zone.id}
              className={cn(
                "flex flex-col justify-between rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md",
                zone.colorClass,
              )}
            >
              <span className="mb-4 w-fit rounded-xl bg-white p-3 shadow-sm">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h4 className="font-display text-base font-bold leading-snug text-neutral-800">
                  {zone.title}
                </h4>
                <p className="mt-2.5 text-xs font-light leading-relaxed text-neutral-600">
                  {zone.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Coordinate map */}
      <div className="relative grid grid-cols-1 gap-8 overflow-hidden rounded-3xl bg-neutral-900 p-6 text-white md:p-8 lg:grid-cols-12 lg:p-10">
        <div className="bg-glow-gold-bl pointer-events-none absolute inset-0" />

        {/* Left — filters + list */}
        <div className="flex h-full flex-col justify-between gap-6 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-brand-gold">
                Tọa độ kết nối
              </span>
              <span className="text-xs font-medium text-neutral-400">
                Tổng {D_STATION_LOCATIONS.length} điểm chạm
              </span>
            </div>
            <h4 className="mt-1 font-display text-xl font-extrabold text-white">
              Hệ thống Trạm &amp; Nhà Hàng
            </h4>

            <div className="mt-4 flex flex-wrap gap-2">
              {CITY_FILTERS.map((btn) => {
                const activeBtn = city === btn.key;
                return (
                  <button
                    key={btn.key}
                    type="button"
                    onClick={() => handleCity(btn.key)}
                    aria-pressed={activeBtn}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
                      activeBtn
                        ? "bg-brand-gold text-white shadow-sm"
                        : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    <span>{btn.label}</span>
                    <span
                      className={cn(
                        "rounded-full px-1.5 text-xs",
                        activeBtn
                          ? "bg-white/25 font-bold text-white"
                          : "bg-white/10 text-neutral-400",
                      )}
                    >
                      {btn.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <ul className="custom-scrollbar max-h-95 space-y-2 overflow-y-auto pr-2">
            {filtered.map((loc) => {
              const selected = activeId === loc.id;
              const isHoaVi = loc.category === "hoavi";
              return (
                <li key={loc.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(loc.id)}
                    aria-pressed={selected}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
                      selected
                        ? "border-brand-gold bg-white/10 text-white shadow-md"
                        : "border-white/5 bg-white/[0.02] text-neutral-300 hover:bg-white/5",
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                          selected
                            ? "bg-brand-gold text-white"
                            : isHoaVi
                              ? "border border-amber-500/30 bg-amber-500/20 text-amber-300"
                              : "bg-white/10 text-neutral-300",
                        )}
                      >
                        {loc.orderNumber}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-display text-xs font-bold text-white">
                          {loc.name}
                        </span>
                        <span className="block truncate text-xs font-light text-neutral-400">
                          {loc.address}
                        </span>
                      </span>
                    </span>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform",
                        selected
                          ? "translate-x-1 text-brand-gold"
                          : "text-neutral-500",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center justify-between border-t border-white/5 pt-2 text-xs text-neutral-400">
            <span>*Dstation mở cửa: 08:00 - 21:00 hàng ngày</span>
            <span className="text-brand-gold">Hệ sinh thái IPA Living</span>
          </div>
        </div>

        {/* Right — active location detail */}
        <div className="relative flex h-full min-h-90 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 lg:col-span-7">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
            <svg
              viewBox="0 0 800 500"
              aria-hidden
              className="h-full w-full text-brand-gold"
            >
              <path
                d="M50,100 L750,100 M50,200 L750,200 M50,300 L750,300 M50,400 L750,400"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <path
                d="M150,50 L150,450 M300,50 L300,450 M450,50 L450,450 M600,50 L600,450"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <circle cx="200" cy="150" r="8" fill="currentColor" />
              <circle cx="450" cy="220" r="12" fill="currentColor" />
              <circle cx="650" cy="380" r="6" fill="currentColor" />
              <path
                d="M200,150 Q325,185 450,220 T650,380"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>

          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 motion-reduce:animate-none" />
                <span className="text-xs uppercase tracking-widest text-emerald-400">
                  {active.category === "hoavi"
                    ? "Nhà Hàng Dưỡng Sinh Hoa Vị"
                    : "Điểm chạm đang hoạt động"}
                </span>
              </span>
              {active.facebookLink ? (
                <a
                  href={active.facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-facebook px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-facebook-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                >
                  <FacebookIcon className="h-3.5 w-3.5" />
                  <span>Fanpage</span>
                </a>
              ) : null}
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gold text-sm font-black text-white shadow-sm">
                {active.orderNumber}
              </span>
              <div>
                <h4 className="font-display text-xl font-extrabold text-white sm:text-2xl">
                  {active.name}
                </h4>
                {active.category === "hoavi" ? (
                  <p className="mt-0.5 text-xs font-medium text-amber-300">
                    Không gian ẩm thực dưỡng sinh &amp; Trà đạo thảo mộc
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 sm:flex-row sm:items-center">
              <div className="flex min-w-0 items-start gap-3 text-sm text-neutral-200">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
                <div className="min-w-0">
                  <span className="block text-xs uppercase tracking-wider text-neutral-400">
                    Địa chỉ trạm
                  </span>
                  <p className="text-xs font-medium leading-relaxed text-white sm:text-sm">
                    {active.address}
                  </p>
                </div>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg bg-brand-gold px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-white shadow transition-all hover:bg-brand-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:self-center"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>Xem Maps</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 md:grid-cols-4">
              {EXPERIENCE_ZONES.map((zone, idx) => (
                <div
                  key={zone.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-center"
                >
                  <span className="block text-xs text-brand-gold">
                    Zone {idx + 1}
                  </span>
                  <span className="mt-0.5 block text-xs font-semibold text-white">
                    {zone.title}
                  </span>
                  <span className="mt-0.5 block text-xs font-light text-neutral-400">
                    {zone.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-4 sm:flex-row">
            <p className="text-xs text-neutral-400">
              Trải nghiệm dịch vụ Wellbeing hoàn hảo trong không gian thượng lưu.
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-brand-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Navigation className="h-4 w-4" />
              <span>Chỉ đường trên Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
