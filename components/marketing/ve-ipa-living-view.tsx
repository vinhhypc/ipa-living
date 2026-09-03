"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Compass,
  Heart,
  Leaf,
  Shield,
  Sparkle,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { localImage } from "@/lib/images";
import { routes } from "@/lib/routes";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

type BranchKey = "anvie" | "vndirect" | "pti";
type TabKey = "all" | BranchKey;

type SubProduct = {
  badge: string;
  title: string;
  quote?: string;
  desc: string;
  href: string;
  ctaLabel: string;
  image: string;
};

type Branch = {
  key: BranchKey;
  anchor: string;
  eyebrow: string;
  icon: LucideIcon;
  title: string;
  motto: string;
  accentText: string;
  accentHover: string;
  accentBtn: string;
  /** Hover fill cho CTA phụ (nút viền sáng → tô đậm màu tháp khi hover). */
  ctaHover: string;
  overviewHref: string;
  quickCard: {
    image: string;
    badge: string;
    brand: string;
    icon: LucideIcon;
    title: string;
    quote: string;
    cta: string;
  };
  vision: string;
  mission: string;
  extra?: React.ReactNode;
  subTitle: string;
  subNote: string;
  subProducts: SubProduct[];
  banner?: React.ReactNode;
};

const img = (id: string) =>
  localImage(
    `https://images.unsplash.com/photo-${id}?q=80&w=800&auto=format&fit=crop`,
  );

const BRANCHES: Branch[] = [
  {
    key: "anvie",
    anchor: "thap-anvie",
    eyebrow: "Trụ cột I · Tháp Sức Khỏe",
    icon: Leaf,
    title: "AnVie — Nếp Sống Thuận Tự Nhiên",
    motto:
      'Khẩu quyết: "Một nếp sống khỏe · một gia tài Việt · một hệ sinh thái xanh."',
    accentText: "text-health-700",
    accentHover: "group-hover:text-health-700",
    accentBtn: "bg-health-600 hover:bg-health-700",
    ctaHover: "hover:border-health-600 hover:bg-health-700 hover:text-white",
    overviewHref: routes.sucKhoe,
    quickCard: {
      image: img("1556911073-38141963c9e0"),
      badge: "Trụ Cột I · Tháp Sức Khỏe",
      brand: "AnVie",
      icon: Heart,
      title: "AnVie — Nếp Sống Thuận Tự Nhiên",
      quote: '"Một nếp sống khỏe · một gia tài Việt · một hệ sinh thái xanh."',
      cta: "Khám phá Tháp Sức Khỏe",
    },
    vision:
      '"Một Việt Nam, nơi sống lành có chuẩn mực trở thành nếp sống — mỗi người được nuôi dưỡng tỉnh thức bởi di sản thiên nhiên và gia tài trí tuệ của chính cộng đồng mình."',
    mission:
      '"Tiếp nối một gia tài Việt, bồi đắp một hệ sinh thái xanh cho thế hệ mai sau — qua nếp sống thuận tự nhiên."',
    extra: (
      <div className="rounded-2xl border border-health-500/25 bg-health-50 p-4">
        <p className="text-xs font-medium leading-relaxed text-neutral-800 sm:text-sm">
          <strong>AnVie — Nếp nhà Việt · AnVie — Nếp nhà Trúc Lâm:</strong> Mọi
          thứ bắt đầu từ AnVie. AnVie không phải một nhãn hàng — là một nếp
          sống: không ai “mua AnVie” — người ta sống AnVie.
        </p>
      </div>
    ),
    subTitle: "Ba Trục Sản Phẩm & Trải Nghiệm AnVie",
    subNote: "Mạng lưới: Dstation & D-one",
    subProducts: [
      {
        badge: "Trục 1 · Tiêu Dùng Xanh",
        title: "AnVie Gobio (Tiêu Dùng Sinh Học)",
        quote:
          '"Một căn bếp lành — một mái ấm sạch — một lối sống thuận tự nhiên"',
        desc: "Cung cấp hệ sản phẩm tiêu dùng sạch chuẩn sinh học cho căn bếp và mái ấm gồm Bếp Bio, Nhà Bio, Mẹ & Bé, I'm Bio, quà tặng di sản Vietcharm và Tủ Sách Phương Bối.",
        href: routes.anvieGobio,
        ctaLabel: "Xem chi tiết AnVie Gobio",
        image: img("1615485290382-441e4d049cb5"),
      },
      {
        badge: "Trục 2 · Trải Nghiệm Bản Địa",
        title: "AnVie Health (Ẩm Thực & Hành Trình)",
        quote:
          '"Một trải nghiệm chạm — một nếp ăn lành — một kỳ nghỉ phục hồi"',
        desc: "Không gian trải nghiệm ẩm thực Bếp Bio tại Hoa Vị, trạm Dstation Bistro kết nối ba nếp sống, các hành trình trải nghiệm bản địa CBX và khu nghỉ dưỡng điều dưỡng CDA — Club des Amis.",
        href: routes.anvieHealth,
        ctaLabel: "Xem chi tiết AnVie Health",
        image: img("1540420773420-3366772f4999"),
      },
      {
        badge: "Trục 3 · Chăm Sóc Sức Khỏe",
        title: "AnVie Life (Y Học Lối Sống & Bác Sĩ)",
        quote: '"Một nếp y dưỡng — một bác sĩ gia đình — trọn đời sống an vui"',
        desc: "Xây dựng nếp chăm sóc sức khỏe chủ động qua học viện đào tạo y học lối sống AnVie Academy, chuỗi phòng khám tư vấn dự phòng và đội ngũ bác sĩ gia đình đồng hành.",
        href: routes.anvieLife,
        ctaLabel: "Xem chi tiết AnVie Life",
        image: img("1544367567-0f2fcb009e0b"),
      },
    ],
    banner: (
      <p className="text-xs leading-relaxed text-neutral-700 sm:text-sm">
        <strong>Mạch vận hành:</strong> Gobio (Đưa cái sạch vào đời sống) &rarr;
        Health (Đánh thức nhận thức bằng trải nghiệm) &rarr; Life (Biến thành
        nếp chăm sóc chủ động &amp; toàn diện).
      </p>
    ),
  },
  {
    key: "vndirect",
    anchor: "thap-vndirect",
    eyebrow: "Trụ cột II · Tháp Thịnh Vượng",
    icon: TrendingUp,
    title: "VNDIRECT — Sức Khỏe Tài Chính",
    motto:
      'Khẩu quyết: "Một nếp sống đầu tư — một bản đồ thịnh vượng — một hành trình trí tuệ."',
    accentText: "text-wealth-700",
    accentHover: "group-hover:text-wealth-700",
    accentBtn: "bg-wealth-600 hover:bg-wealth-700",
    ctaHover: "hover:border-wealth-600 hover:bg-wealth-700 hover:text-white",
    overviewHref: routes.thinhVuong,
    quickCard: {
      image: img("1551836022-d5d88e9218df"),
      badge: "Trụ Cột II · Tháp Thịnh Vượng",
      brand: "VNDIRECT",
      icon: TrendingUp,
      title: "VNDIRECT — Sức Khỏe Tài Chính",
      quote:
        '"Một nếp sống đầu tư — một bản đồ thịnh vượng — một hành trình trí tuệ."',
      cta: "Khám phá Tháp Thịnh Vượng",
    },
    vision:
      '"Một Việt Nam, nơi đầu tư trở thành một nếp sống trọn đời — tỉnh thức, hiểu biết và trách nhiệm — mỗi gia đình gìn giữ và góp sức vào sự tích lũy thịnh vượng chung."',
    mission:
      '"Vun bồi sức khỏe tài chính và thịnh vượng bền vững cho mỗi gia đình Việt — nền vững trước, tăng trưởng sau."',
    extra: (
      <div className="grid grid-cols-1 gap-4 border-t border-neutral-100 pt-4 md:grid-cols-2">
        <div className="space-y-1 rounded-2xl border border-wealth-500/30 bg-wealth-50 p-4">
          <span className="text-xs font-bold uppercase text-wealth-700">
            Tagline VNDGO
          </span>
          <p className="text-xs italic leading-relaxed text-neutral-800">
            “VNDIRECT không bán sản phẩm — VNDIRECT đồng hành cùng bạn trọn cuộc
            đời tài chính: nền vững trước, tăng trưởng sau.”
          </p>
        </div>
        <div className="space-y-1 rounded-2xl border border-brand-brown/20 bg-brand-brown/10 p-4">
          <span className="text-xs font-bold uppercase text-brand-brown">
            Tagline VNDCARE
          </span>
          <p className="text-xs italic leading-relaxed text-neutral-800">
            “Mỗi người tôi gặp ở VNDIRECT là một Người bạn — tư vấn vì lợi ích
            của tôi, vì hành trình trọn đời của gia đình tôi.”
          </p>
        </div>
      </div>
    ),
    subTitle: "3 Trụ Cột Sản Phẩm Theo Vòng Đời Tài Chính",
    subNote: "Nền vững trước, tăng trưởng sau",
    subProducts: [
      {
        badge: "Trục 1 · Tích Lũy Tự Động",
        title: "VNDSIP",
        desc: "Tích lũy định kỳ có kỷ luật vào danh mục tài sản đa dạng. Hình thành nếp đầu tư tự động hàng tháng từ thu nhập.",
        href: `${routes.thinhVuong}#nhom-san-pham`,
        ctaLabel: "Xem chi tiết VNDSIP",
        image: img("1579532537598-459ecdaf39cc"),
      },
      {
        badge: "Trục 2 · Gia Sản Gia Đình",
        title: "VNDWealth",
        desc: "Hoạch định tài sản theo từng cột mốc cuộc sống, gìn giữ và chuẩn bị cơ chế trao truyền thịnh vượng xuyên thế hệ.",
        href: `${routes.thinhVuong}#nhom-san-pham`,
        ctaLabel: "Xem chi tiết VNDWealth",
        image: img("1560520653-9e0e4c89eb11"),
      },
      {
        badge: "Trục 3 · Giao Dịch Chủ Động",
        title: "VNDTrade",
        desc: "Giải pháp giao dịch nhà nghề trên nền tảng DBOARD thông minh, bộ lệnh điều kiện và báo cáo phân tích chuyên sâu.",
        href: `${routes.thinhVuong}#nhom-san-pham`,
        ctaLabel: "Xem chi tiết VNDTrade",
        image: img("1611974789855-9c2a0a7236a3"),
      },
    ],
  },
  {
    key: "pti",
    anchor: "thap-pti",
    eyebrow: "Trụ cột III · Tháp Bảo An",
    icon: Shield,
    title: "PTI — Bảo An Cho Đời Sống",
    motto:
      'Khẩu quyết: "Một nếp sống tương hỗ — trọn giải pháp bảo hiểm — triệu mái nhà sống an."',
    accentText: "text-protection-700",
    accentHover: "group-hover:text-protection-700",
    accentBtn: "bg-protection-600 hover:bg-protection-700",
    ctaHover:
      "hover:border-protection-600 hover:bg-protection-700 hover:text-white",
    overviewHref: routes.baoAn,
    quickCard: {
      image: img("1576765608535-5f04d1e3f289"),
      badge: "Trụ Cột III · Tháp Bảo An",
      brand: "PTI",
      icon: Shield,
      title: "PTI — Bảo An Cho Đời Sống",
      quote:
        '"Một nếp sống tương hỗ — trọn giải pháp bảo hiểm — triệu mái nhà sống an."',
      cta: "Khám phá Tháp Bảo An",
    },
    vision:
      '"Một Việt Nam, nơi bảo an tương hỗ trở thành nếp sống — mỗi người được che chở bởi sự chuẩn bị tỉnh thức của chính mình và của cộng đồng."',
    mission: '"Gìn giữ sự bình an cho mỗi gia đình Việt."',
    extra: (
      <div className="space-y-1 rounded-2xl border border-protection-500/25 bg-protection-50 p-4">
        <span className="text-xs font-bold uppercase text-protection-700">
          Câu ba lớp của gian
        </span>
        <p className="text-xs italic text-neutral-800 sm:text-sm">
          “PTI cấy nền chuẩn mực — PTICare xây nếp tương hỗ — Tháp Bảo An theo
          trọn.”
        </p>
        <p className="pt-1 text-xs font-light text-neutral-600">
          <strong>Bảo an tương hỗ:</strong> Mình vì mọi người và mọi người vì
          mình. Ba chữ An: <strong>An tâm · An toàn · An sinh</strong>.
        </p>
      </div>
    ),
    subTitle: "Ba Trục Sản Phẩm Bảo An Trọng Tâm",
    subNote: "Mục tiêu: Triệu Mái Nhà Sống An",
    subProducts: [
      {
        badge: "Trục 1 · Cứu Hộ & Tài Sản",
        title: "PTI SOS (Cứu Hộ & Giám Định)",
        quote: '"Một ngôi nhà — mọi tài sản — một hành trình an toàn"',
        desc: "Bảo hiểm xe cơ giới, căn hộ & tài sản cùng mạng lưới cứu hộ khẩn cấp 24/7 và giám định hiện trường tức thì trên toàn quốc.",
        href: routes.ptiSos,
        ctaLabel: "Xem giải pháp PTI SOS",
        image: img("1549399542-7e3f8b79c341"),
      },
      {
        badge: "Trục 2 · Sức Khỏe Gia Đình",
        title: "PTI Health (Sức Khỏe Toàn Diện)",
        quote:
          '"Một hợp đồng — một cộng đồng tương hỗ — triệu gia đình sống an"',
        desc: "Bảo hiểm chăm sóc sức khỏe toàn diện, bảo lãnh viện phí tại hơn 300 bệnh viện quốc tế, kết nối trực tiếp với mạng lưới chăm sóc y tế.",
        href: routes.ptiHealth,
        ctaLabel: "Xem giải pháp PTI Health",
        image: img("1584515979956-d9f6e5d09982"),
      },
      {
        badge: "Trục 3 · Bảo Hiểm Doanh Nghiệp",
        title: "PTI Commercial (Bảo An Doanh Nghiệp)",
        quote: '"Một giải pháp — mọi rủi ro — một nền tảng an sinh"',
        desc: "Bảo hiểm rủi ro tài sản, hàng hóa, công trình và trách nhiệm pháp lý toàn diện cho các tổ chức, hộ kinh doanh và doanh nghiệp.",
        href: routes.ptiCommercial,
        ctaLabel: "Xem giải pháp PTI Commercial",
        image: img("1486406146926-c627a92ad1ab"),
      },
    ],
  },
];

const TABS: { id: TabKey; label: string }[] = [
  { id: "all", label: "Toàn Bộ 3 Tháp" },
  { id: "anvie", label: "1. AnVie (Sức Khỏe)" },
  { id: "vndirect", label: "2. VNDIRECT (Thịnh Vượng)" },
  { id: "pti", label: "3. PTI (Bảo An)" },
];

function scrollToId(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function VeIpaLivingView() {
  const [tab, setTab] = useState<TabKey>("all");

  const select = (next: TabKey, anchor?: string) => {
    setTab(next);
    if (anchor) window.setTimeout(() => scrollToId(anchor), 60);
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800">
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: routes.home },
          { label: "Về IPA Living" },
        ]}
      />
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-neutral-50 pb-16 pt-14 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-7xl space-y-6 px-4 text-center sm:space-y-8 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/95 px-4 py-1.5 shadow-sm backdrop-blur-md">
            <span className="mr-1 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-health-600" />
              <span className="h-2.5 w-2.5 rounded-full bg-wealth-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-protection-600" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-800">
              Hệ sinh thái IPA Living
            </span>
          </p>
          <h1 className="mx-auto max-w-5xl font-display text-2xl font-black leading-tight tracking-tight text-neutral-950 sm:text-3xl md:text-4xl">
            <span className="block">
              Cộng đồng người sống khỏe, nhà nhà sống giàu,
            </span>
            <span className="mt-1 block">cộng đồng sống vui</span>
            <span className="mt-1 block text-brand-green">
              bắt đầu từ lựa chọn nhỏ mỗi ngày.
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-sm font-light leading-relaxed text-neutral-600 sm:text-base md:text-lg">
            Hệ sinh thái kết nối con người với thiên nhiên thuần khiết, kiến tạo
            nếp sống đầu tư gia sản bền vững và che chở bình an trọn đời cho mỗi
            gia đình Việt qua
            <strong className="mt-1.5 block font-bold text-neutral-900">
              Tháp Sức Khỏe · Tháp Thịnh Vượng · Tháp Bảo An.
            </strong>
          </p>
        </div>
      </section>

      {/* Quick cards + filter */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {BRANCHES.map((branch) => {
              const CardIcon = branch.quickCard.icon;
              return (
                <button
                  key={branch.key}
                  type="button"
                  onClick={() => select(branch.key, branch.anchor)}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200 bg-white text-left shadow-sm transition-all duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                    <Image
                      src={branch.quickCard.image}
                      alt={branch.quickCard.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-bold uppercase text-white backdrop-blur-md">
                      {branch.quickCard.badge}
                    </span>
                    <span className="absolute inset-x-3 bottom-3 flex items-center justify-between text-white">
                      <span className="text-xs font-bold">
                        {branch.quickCard.brand}
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                        <CardIcon className="h-3.5 w-3.5" />
                      </span>
                    </span>
                  </div>
                  <div className="space-y-2 p-5">
                    <h3
                      className={cn(
                        "font-display text-lg font-bold text-neutral-900 transition-colors",
                        branch.accentHover,
                      )}
                    >
                      {branch.quickCard.title}
                    </h3>
                    <p className="text-xs font-light leading-relaxed text-neutral-600">
                      {branch.quickCard.quote}
                    </p>
                    <span
                      className={cn(
                        "flex items-center pt-2 text-xs font-bold transition-transform group-hover:translate-x-1",
                        branch.accentText,
                      )}
                    >
                      {branch.quickCard.cta}
                      <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 pt-4">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() =>
                  select(t.id, t.id === "all" ? undefined : `thap-${t.id}`)
                }
                aria-pressed={tab === t.id}
                className={cn(
                  "whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                  tab === t.id
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Branch sections */}
      {BRANCHES.map((branch) =>
        tab === "all" || tab === branch.key ? (
          <BranchSection key={branch.key} branch={branch} />
        ) : null,
      )}

      {/* Final CTA */}
      <section className="border-t border-neutral-200 bg-neutral-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm sm:p-12 lg:flex-row">
            <div className="max-w-2xl space-y-3 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-green">
                Điểm chạm hệ sinh thái IPA Living
              </span>
              <h2 className="font-display text-2xl font-black text-neutral-900 sm:text-3xl">
                Gặp gỡ Chuyên gia tại Dstation hoặc Trải nghiệm số trên D-one
              </h2>
              <p className="text-xs font-light leading-relaxed text-neutral-600 sm:text-sm">
                Được tư vấn toàn diện về sức khỏe thân tâm, hoạch định tháp tài
                chính và trang bị lá chắn bảo an vững chắc cho bạn và gia đình.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
              <Link
                href={`${routes.diemCham}#dstation`}
                className="inline-flex items-center gap-2 rounded-full bg-brand-green-dark px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <Compass className="h-4 w-4" />
                <span>Trạm Dstation gần nhất</span>
              </Link>
              <Link
                href={routes.dOne}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-800 shadow-sm transition-all hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <Sparkle className="h-4 w-4 text-brand-gold-dark" />
                <span>Nền tảng D-one Online</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function BranchSection({ branch }: { branch: Branch }) {
  const Icon = branch.icon;
  return (
    <section
      id={branch.anchor}
      className="scroll-mt-24 border-b border-neutral-200 bg-neutral-50 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-neutral-200 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-4xl space-y-3">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wide",
                branch.accentText,
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {branch.eyebrow}
            </span>
            <h2 className="font-display text-2xl font-black leading-tight tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
              {branch.title}
            </h2>
            <p
              className={cn(
                "font-display text-base font-semibold italic sm:text-lg",
                branch.accentText,
              )}
            >
              {branch.motto}
            </p>
          </div>
          <Link
            href={branch.overviewHref}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
              branch.accentBtn,
            )}
          >
            <span>{branch.quickCard.cta}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="w-full space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-2">
            <span
              className={cn(
                "block text-xs font-bold uppercase tracking-widest",
                branch.accentText,
              )}
            >
              Tầm nhìn
            </span>
            <p className="font-display text-lg font-bold leading-snug text-neutral-900 sm:text-xl">
              {branch.vision}
            </p>
          </div>
          <div className="space-y-2 border-t border-neutral-100 pt-4">
            <span
              className={cn(
                "block text-xs font-bold uppercase tracking-widest",
                branch.accentText,
              )}
            >
              Sứ mệnh
            </span>
            <p className="text-sm font-light leading-relaxed text-neutral-700 sm:text-base">
              {branch.mission}
            </p>
          </div>
          {branch.extra ? (
            <div className="border-t border-neutral-100 pt-4">
              {branch.extra}
            </div>
          ) : null}
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-xl font-black text-neutral-900 sm:text-2xl">
              {branch.subTitle}
            </h3>
            <span className="text-xs text-neutral-500">{branch.subNote}</span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {branch.subProducts.map((product) => (
              <article
                key={product.title}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-bold uppercase text-white backdrop-blur-md">
                    {product.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between space-y-3 p-6">
                  <div className="space-y-2.5">
                    <h4
                      className={cn(
                        "font-display text-xl font-black text-neutral-900 transition-colors",
                        branch.accentHover,
                      )}
                    >
                      {product.title}
                    </h4>
                    {product.quote ? (
                      <p className="rounded-xl border border-neutral-100 bg-neutral-50 p-2.5 text-xs italic text-neutral-700">
                        {product.quote}
                      </p>
                    ) : null}
                    <p className="text-xs font-light leading-relaxed text-neutral-600">
                      {product.desc}
                    </p>
                  </div>
                  <Link
                    href={product.href}
                    className={cn(
                      "mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs font-bold text-neutral-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                      branch.ctaHover,
                    )}
                  >
                    <span>{product.ctaLabel}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {branch.banner ? (
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-5 sm:flex-row">
              {branch.banner}
              <Link
                href={branch.overviewHref}
                className={cn(
                  "flex shrink-0 items-center gap-1 text-xs font-bold hover:underline",
                  branch.accentText,
                )}
              >
                <span>Xem chi tiết</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
