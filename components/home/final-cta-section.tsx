import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

import { localImage } from "@/lib/images";
import { routes } from "@/lib/routes";

const CA_IMAGE = localImage(
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
);

export function FinalCtaSection() {
  return (
    <section
      id="home-final-cta"
      className="border-t border-neutral-200 bg-neutral-50 py-16 text-neutral-900 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl border border-amber-200/80 bg-white p-6 shadow-lg sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
          <div className="space-y-6 lg:col-span-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-amber-800">
              <Users className="h-4 w-4 text-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Gia nhập đội ngũ đồng hành (CA)
              </span>
            </p>

            <h2 className="font-display text-3xl font-black leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              Trở thành Client Advisor cùng IPA Living
            </h2>

            <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">
              Tư vấn lối sống và quản lý gia sản cho hàng triệu gia đình Việt
              Nam.
            </p>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <Link
                href={routes.tuyenDungCa}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-brand-navy shadow-md transition-all hover:-translate-y-0.5 hover:bg-brand-gold-dark hover:text-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0"
              >
                <span>Ứng tuyển CA ngay</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`${routes.dCare}#experts`}
                className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-800 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-neutral-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0"
              >
                Danh sách chuyên gia
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-80 overflow-hidden rounded-2xl border border-neutral-200/80 shadow-lg sm:h-100">
              <Image
                src={CA_IMAGE}
                alt="Client Advisor IPA Living"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
