import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { routes } from "@/lib/routes";
import type { Workshop } from "@/lib/types";
import { WorkshopCard } from "@/components/marketing/workshop-card";

export function WorkshopTeaserSection({
  workshops,
}: {
  workshops: Workshop[];
}) {
  return (
    <section
      id="workshop-teaser"
      className="border-t border-neutral-100 bg-white py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
              D-Station Workshops · Trải nghiệm &amp; Kết nối
            </span>
            <h2 className="font-display text-2xl font-black leading-snug text-neutral-900 sm:text-3xl">
              Thay đổi bắt đầu từ trải nghiệm
            </h2>
            <p className="pt-1 text-sm leading-relaxed text-neutral-600 sm:text-base">
              Workshop thực hành theo từng tháp giá trị, tổ chức tại các điểm
              Dstation trên toàn quốc.
            </p>
          </div>
          <Link
            href={`${routes.diemCham}#workshop`}
            className="group inline-flex shrink-0 items-center gap-1.5 rounded text-xs font-bold uppercase tracking-widest text-brand-gold transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <span>Xem tất cả Workshop</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {workshops.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>
      </div>
    </section>
  );
}
