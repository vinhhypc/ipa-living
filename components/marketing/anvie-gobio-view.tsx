"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Baby,
  BookOpen,
  Clock,
  Gift,
  Home as HomeIcon,
  Leaf,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Utensils,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

type MainSection = "portfolio" | "shop" | "tu-sach";
type BioCategory = "bep-bio" | "nha-bio" | "me-bio" | "im-bio" | "vietcharm";
type BepTab = "oshawa" | "homefood" | "hoa-vi" | "delivie";

const MAIN_SECTIONS: {
  id: MainSection;
  number: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}[] = [
  {
    id: "portfolio",
    number: "01",
    title: "AnVie Gobio",
    subtitle: "Portfolio Hệ Sản Phẩm Bio",
    icon: Leaf,
  },
  {
    id: "shop",
    number: "02",
    title: "Gobio Shop",
    subtitle: "Kênh Phân Phối & Tiêu Dùng",
    icon: ShoppingBag,
  },
  {
    id: "tu-sach",
    number: "03",
    title: "Tủ Sách Phương Bối",
    subtitle: "Di Sản Tri Thức",
    icon: BookOpen,
  },
];

const BIO_CATEGORIES: {
  id: BioCategory;
  name: string;
  icon: LucideIcon;
  tag: string;
}[] = [
  { id: "bep-bio", name: "Bếp Bio", icon: Utensils, tag: "4 Giải pháp Bếp" },
  { id: "nha-bio", name: "Nhà Bio", icon: HomeIcon, tag: "Chăm sóc nhà cửa" },
  { id: "me-bio", name: "Mẹ Bio", icon: Baby, tag: "Chăm sóc mẹ & bé" },
  { id: "im-bio", name: "I'm Bio", icon: Sparkles, tag: "Chăm sóc cơ thể" },
  {
    id: "vietcharm",
    name: "Vietcharm Gift",
    icon: Gift,
    tag: "Quà Tặng Di Sản",
  },
];

const BEP_TABS: { id: BepTab; label: string }[] = [
  { id: "oshawa", label: "1. Thực Dưỡng Ohsawa" },
  { id: "homefood", label: "2. Bếp Nhà HF" },
  { id: "hoa-vi", label: "3. Bếp Hoa Vị" },
  { id: "delivie", label: "4. Bếp Delivie" },
];

type Group = { badge: string; title: string; body: string };

const BEP_CONTENT: Record<BepTab, { lead: string; groups: Group[] }> = {
  oshawa: {
    lead: "Thực dưỡng Ohsawa — khi cơ thể cần nghỉ ngơi và đào thải",
    groups: [
      {
        badge: "Nhóm 01",
        title: "Ngũ Cốc",
        body: "Gạo lứt đen · Gạo lứt đỏ · Vừng đen",
      },
      {
        badge: "Nhóm 02",
        title: "Bột Dưỡng",
        body: "Bột sắn dây · Bột thảo mộc Kokko · Bột gạo lứt nảy mầm",
      },
      {
        badge: "Nhóm 03",
        title: "Lên Men",
        body: "Tamari ủ trên 4 năm · Tamari tỏi · Chanh muối · Mơ muối · Miso",
      },
      {
        badge: "Nhóm 04",
        title: "Dưỡng sinh mỗi ngày",
        body: "Canh dưỡng sinh · Trà bình minh",
      },
    ],
  },
  homefood: {
    lead: "Bữa cơm Homefood chuẩn Việt — ăn đúng & cân bằng mỗi ngày",
    groups: [
      {
        badge: "Nhóm 01",
        title: "NAO – Gạo & Ngũ Cốc",
        body: "Hạt Mầm & Cơm Lành: Gạo Séng Cù (xát trắng/dối/lứt) · Đậu · đỗ · lạc · Bún · miến · phở",
      },
      {
        badge: "Nhóm 02",
        title: "Bộ Gia Vị",
        body: "Tamari ủ 3 năm · Muối khoáng biển · Hạt nêm nấm & củ quả · Nước mắm chay thực dưỡng · Tương ớt tự nhiên · Dầu vừng/phộng ép · Dấm táo/mơ",
      },
      {
        badge: "Nhóm 03",
        title: "Nature's Garden",
        body: "Đồ khô (bột sắn, măng...) · Rau củ quả tươi mùa vụ (đông/hè) · Trái cây theo mùa",
      },
    ],
  },
  "hoa-vi": {
    lead: "Bữa cơm tròn vị, nhẹ công bếp — sốt, cốt canh, mắm làm sẵn (Quy trình: Ủ · Om · Nén)",
    groups: [
      {
        badge: "Hoa Vị Mộc",
        title: "Giỏ Mắm",
        body: "Mắm Sung · Mắm Sấu · Mắm Cà — những vị mắm mộc mạc, tiện dùng cùng rau luộc, cơm nóng và các món ăn hằng ngày.",
      },
      {
        badge: "Hoa Vị Mộc",
        title: "Giỏ Cốt Canh",
        body: "Nước dùng phở · rau củ · Canh dưỡng sinh · Tomyum — cốt nền làm sẵn, chỉ cần đun nóng, thêm rau/nấm/măng/đậu phụ là có bát canh nóng.",
      },
      {
        badge: "Chefcook",
        title: "Giỏ Sốt",
        body: "Sốt kho (ướp & kho) · Sốt xào · Sốt salad",
      },
    ],
  },
  delivie: {
    lead: "Tinh hoa Pháp, chạm vị Việt — bánh tiện lợi, nướng nóng tại nhà",
    groups: [
      {
        badge: "Nhóm 01",
        title: "Bánh mì sourdough",
        body: "Bánh mì men tự nhiên lên men chậm, vỏ giòn ruột ẩm.",
      },
      {
        badge: "Nhóm 02",
        title: "Bánh mì Việt Nam",
        body: "Bánh mì đặc ruột kiểu Việt, thơm mềm.",
      },
      {
        badge: "Nhóm 03",
        title: "Viennoiseries",
        body: "Croissant, pain au chocolat và các loại bánh ngàn lớp.",
      },
      {
        badge: "Nhóm 04",
        title: "Bộ Pairing",
        body: "Combo bánh — trà — mứt để thưởng thức trọn vị.",
      },
    ],
  },
};

const SIMPLE_BIO: Record<
  Exclude<BioCategory, "bep-bio" | "vietcharm">,
  { eyebrow: string; title: string; lead: string; items: Group[] }
> = {
  "nha-bio": {
    eyebrow: "NhàBio — Chăm nhà lành, nuôi nếp sống xanh",
    title: "NhàBio — Chăm nhà lành, nuôi nếp sống xanh",
    lead: "NhàBio mang đến giải pháp chăm sóc mái ấm từ nguyên liệu tự nhiên và nền tảng sinh học, giúp làm sạch không gian, bảo vệ gia đình và gìn giữ môi trường sống.",
    items: [
      {
        badge: "Chăm Bếp",
        title: "Chăm Bếp Tự Nhiên",
        body: "Rửa bát · Tẩy rửa đa năng.",
      },
      {
        badge: "Chăm Nhà",
        title: "Chăm Nhà Sinh Học",
        body: "Tẩy rửa bồn cầu & nhà tắm · Lau sàn · Giặt xả · Giặt đồ lót.",
      },
    ],
  },
  "me-bio": {
    eyebrow: "MẹBio · Gieo Nếp Lành",
    title: "Gieo nếp lành từ vòng tay mẹ",
    lead: "MẹBio mang đến những giải pháp chăm sóc dịu lành cho mẹ và bé, để mỗi lựa chọn nhỏ không chỉ giúp con lớn lên khỏe mạnh mà còn gieo một nếp sống gần gũi với tự nhiên và trân trọng môi trường.",
    items: [
      {
        badge: "Sản phẩm 01",
        title: "Giặt Cho Bé",
        body: "Giặt cho bé (lá ổi: 2L / 3.8L · than tre: 750ml / 2L)",
      },
      {
        badge: "Sản phẩm 02",
        title: "Rửa Bình Sữa & Đồ Dùng",
        body: "Rửa bình sữa & đồ dùng cho bé (than tre 750ml)",
      },
    ],
  },
  "im-bio": {
    eyebrow: "I'm Bio · Chăm Sóc Cơ Thể",
    title: "Chăm cơ thể lành từ những điều gần gũi.",
    lead: "Mang đến giải pháp chăm sóc cá nhân từ thảo mộc và nền tảng sinh học, dịu lành với cơ thể và gần gũi với tự nhiên.",
    items: [
      {
        badge: "Nhánh 01",
        title: "Vệ Sinh Tay Kháng Khuẩn",
        body: "Rửa tay than tre hoạt tính (500ml · 5L)",
      },
      {
        badge: "Nhánh 02",
        title: "Chăm Sóc Tóc & Da Đầu",
        body: "Gội thảo dược (400ml)",
      },
    ],
  },
};

const VIETCHARM_CARDS: Group[] = [
  {
    badge: "Card · Vinabee",
    title: "Vinabee",
    body: "Mật ong nguyên chất - được chăm sóc và thu hoạch bởi những người nuôi ong lâu năm, giàu kinh nghiệm, để gìn giữ hương vị tự nhiên từ mỗi mùa hoa.",
  },
  {
    badge: "Card · Trà Shantra",
    title: "Trà Shantra",
    body: "Trà Shantra mang theo hương vị của rừng trà cổ thụ Tây Bắc, từ những búp non được hái thủ công theo mùa.",
  },
  {
    badge: "Card · NAO Coffee",
    title: "NAO Coffee",
    body: "NAO Coffee - từ những giống cà phê tuyển chọn sinh trưởng thuận tự nhiên dưới tán rừng cao nguyên, được thu hái thủ công khi quả chín đúng mùa.",
  },
  {
    badge: "Card · NAO Cacao",
    title: "NAO Cacao",
    body: "NAO Cacao - từ những vùng cacao lâu năm của Việt Nam, được tuyển chọn và làm cẩn trọng để gìn giữ hương vị nguyên bản.",
  },
];

const SHOP_PILLARS: {
  icon: LucideIcon;
  tone: string;
  title: string;
  desc: string;
}[] = [
  {
    icon: ShoppingBag,
    tone: "bg-amber-600",
    title: "Hàng Thương Mại Tuyển Chọn",
    desc: "Sàng lọc các nhà sản xuất nông nghiệp hữu cơ uy tín đạt chuẩn kiểm nghiệm vi sinh và không tồn dư thuốc bảo vệ thực vật.",
  },
  {
    icon: Clock,
    tone: "bg-emerald-700",
    title: "Giao Định Kỳ Hằng Tuần",
    desc: "Gói giao thực phẩm sạch và gia vị dưỡng sinh định kỳ tận cửa nhà, đảm bảo căn bếp gia đình luôn dồi dào nguyên liệu tươi mới.",
  },
  {
    icon: MapPin,
    tone: "bg-sky-700",
    title: "Điểm Chạm Dstation",
    desc: "Trực tiếp dùng thử sản phẩm, thưởng thức món ngon tại quầy Bistro và nhận tư vấn dinh dưỡng trực tiếp từ chuyên gia.",
  },
];

const BOOK_CARDS = [
  {
    icon: BookOpen,
    tone: "bg-amber-800",
    title: "Tác Phẩm Y Dưỡng Sinh & Thực Dưỡng",
    desc: "Hệ thống sách hướng dẫn ăn uống cân bằng âm dương theo triết lý Oshawa, nếp sống thuận tự nhiên, phương pháp kiềm hóa máu và phòng ngừa bệnh mạn tính bằng nguồn thực phẩm bản địa.",
    list: "Các đầu sách: Thực dưỡng Oshawa kinh điển, Thức ăn quyết định số phận, Canh dưỡng sinh & Dược thực trị liệu.",
  },
  {
    icon: Sparkles,
    tone: "bg-emerald-800",
    title: "Triết Lý Sống & Nếp Nhà Việt",
    desc: "Các ấn phẩm văn hóa về lối sống tối giản, hòa hợp cùng thiên nhiên đất trời, nếp ăn nếp ở thuần khiết và nuôi dạy con trẻ bằng tình yêu thương và nếp sống tỉnh thức.",
    list: "Các đầu sách: Nếp nhà Việt Nam, Sống chậm giữa đời vội, Dưỡng tâm an hòa, Nuôi con thuận tự nhiên.",
  },
];

function GroupCard({ group }: { group: Group }) {
  return (
    <div className="space-y-2.5 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
      <span className="inline-block rounded-full border border-emerald-200 bg-emerald-100 px-2.5 py-0.5 text-xs font-bold uppercase text-emerald-900">
        {group.badge}
      </span>
      <h4 className="font-display text-base font-bold text-neutral-900">
        {group.title}
      </h4>
      <p className="rounded-xl border border-neutral-200 bg-white p-3 text-xs font-medium leading-relaxed text-neutral-700">
        {group.body}
      </p>
    </div>
  );
}

function SectionCard({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="border-b border-neutral-100 pb-4">
        <span className="block text-xs font-bold uppercase tracking-widest text-emerald-800">
          {eyebrow}
        </span>
        <h3 className="mt-1 font-display text-2xl font-black text-neutral-900">
          {title}
        </h3>
        <p className="mt-1 text-xs font-light leading-relaxed text-neutral-600 sm:text-sm">
          {lead}
        </p>
      </div>
      {children}
    </div>
  );
}

export function AnvieGobioView({
  initialCategory = "portfolio",
}: {
  initialCategory?: MainSection | BioCategory;
}) {
  const bioInit = BIO_CATEGORIES.some((c) => c.id === initialCategory)
    ? (initialCategory as BioCategory)
    : "bep-bio";
  const mainInit: MainSection =
    initialCategory === "shop" || initialCategory === "tu-sach"
      ? initialCategory
      : "portfolio";

  const [main, setMain] = useState<MainSection>(mainInit);
  const [bio, setBio] = useState<BioCategory>(bioInit);
  const [bepTab, setBepTab] = useState<BepTab>("oshawa");

  const bepData = BEP_CONTENT[bepTab];

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800">
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: routes.home },
          { label: "Tháp Sức Khỏe AnVie", href: routes.sucKhoe },
          { label: "AnVie Gobio" },
        ]}
        trailing={
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase text-emerald-900">
            AnVie Gobio · Cửa Hàng &amp; Tiêu Dùng Sinh Học
          </span>
        }
      />

      <section className="relative overflow-hidden bg-emerald-950 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-700 bg-emerald-900/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
              <Store className="h-3.5 w-3.5" />
              Hệ Thống Tiêu Dùng Thuận Tự Nhiên
            </span>
            <h1 className="font-display text-3xl font-black tracking-tight text-white sm:text-5xl">
              AnVie Gobio
            </h1>
            <p className="max-w-2xl text-sm font-light leading-relaxed text-emerald-100 sm:text-base">
              AnVie Gobio đưa những lựa chọn thuận tự nhiên, rõ nguồn gốc vào
              từng nếp sinh hoạt mỗi ngày.
            </p>
          </div>
          <div className="space-y-2.5 rounded-2xl border border-white/20 bg-white/10 p-5 text-xs backdrop-blur-md lg:col-span-4">
            <span className="flex items-center gap-2 font-bold uppercase text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              Tiêu Chuẩn Vùng Trồng &amp; Chế Biến
            </span>
            <p className="font-light leading-relaxed text-emerald-100">
              • <strong>Chuẩn GAO:</strong> Vùng canh tác tự nhiên, đất sạch,
              nguồn nước thanh khiết.
              <br />• <strong>Chuẩn NAO:</strong> Quy trình chế biến giữ nguyên
              phôi mầm sống và vi chất.
              <br />• <strong>Thuần khiết:</strong> 0% hóa chất bảo quản, phụ
              gia tạo màu, mùi nhân tạo.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div
          role="tablist"
          aria-label="Ba nhánh AnVie Gobio"
          className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {MAIN_SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const active = main === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMain(sec.id)}
                className={cn(
                  "flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                  active
                    ? "border-emerald-900 bg-emerald-900 text-white shadow-md"
                    : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300 hover:bg-neutral-50",
                )}
              >
                <span
                  className={cn(
                    "shrink-0 rounded-xl p-2.5",
                    active
                      ? "bg-emerald-800 text-emerald-200"
                      : "bg-emerald-50 text-emerald-800",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 space-y-0.5">
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-xs font-bold uppercase",
                        active
                          ? "bg-emerald-800 text-emerald-200"
                          : "bg-neutral-100 text-neutral-600",
                      )}
                    >
                      Section {sec.number}
                    </span>
                    <span className="truncate font-display text-sm font-black">
                      {sec.title}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "block truncate text-xs font-medium",
                      active ? "text-emerald-100" : "text-neutral-600",
                    )}
                  >
                    {sec.subtitle}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {main === "portfolio" ? (
          <div className="space-y-8">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col justify-between gap-4 border-b border-neutral-100 pb-5 sm:flex-row sm:items-center">
                <div>
                  <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold uppercase text-emerald-900">
                    Section 01 · Portfolio Hệ Sản Phẩm Bio
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-black text-neutral-900 sm:text-3xl">
                    AnVie Gobio Portfolio
                  </h2>
                  <p className="mt-1 max-w-3xl text-xs font-light leading-relaxed text-neutral-600 sm:text-sm">
                    Danh mục Gobio phân theo hệ Bio — chăm trọn không gian sống:
                    Bếp Bio (ăn) · Nhà Bio (nhà) · I&apos;m Bio (thân) · Mẹ Bio
                    (mẹ &amp; bé), cùng bộ quà tặng Vietcharm Collection.
                  </p>
                </div>
                <span className="w-fit shrink-0 self-start rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-500 sm:self-center">
                  5 Nhánh Sản Phẩm Cốt Lõi
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-5 sm:grid-cols-3 lg:grid-cols-5">
                {BIO_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const active = bio === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setBio(cat.id)}
                      aria-pressed={active}
                      className={cn(
                        "flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-3 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                        active
                          ? "border-emerald-800 bg-emerald-800 text-white shadow-sm"
                          : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4",
                          active ? "text-emerald-200" : "text-emerald-700",
                        )}
                      />
                      <span className="text-xs font-bold">{cat.name}</span>
                      <span
                        className={cn(
                          "text-xs",
                          active ? "text-emerald-200" : "text-neutral-500",
                        )}
                      >
                        {cat.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {bio === "bep-bio" ? (
              <SectionCard
                eyebrow="Bếp Bio · Ăn Uống Thuận Tự Nhiên"
                title="4 Giải pháp Bếp"
                lead="BếpBio mang đến những lựa chọn thuận tự nhiên cho căn bếp hằng ngày - từ thực phẩm, gia vị và món ăn tiện lợi đến các giải pháp chăm sóc, làm sạch không gian bếp."
              >
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {BEP_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setBepTab(tab.id)}
                      aria-pressed={bepTab === tab.id}
                      className={cn(
                        "rounded-xl border px-4 py-3.5 text-center text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 sm:text-sm",
                        bepTab === tab.id
                          ? "border-neutral-900 bg-neutral-900 text-white shadow-sm"
                          : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400",
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <p className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-xs font-medium leading-relaxed text-neutral-800">
                  {bepData.lead}
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {bepData.groups.map((group) => (
                    <GroupCard key={group.title} group={group} />
                  ))}
                </div>
              </SectionCard>
            ) : null}

            {bio === "vietcharm" ? (
              <SectionCard
                eyebrow="Vietcharm Collection · Quà Tặng Di Sản"
                title="Bộ quà tặng di sản Việt."
                lead="Chạm vào tinh hoa và di sản Việt."
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {VIETCHARM_CARDS.map((group) => (
                    <GroupCard key={group.title} group={group} />
                  ))}
                </div>
              </SectionCard>
            ) : null}

            {bio !== "bep-bio" && bio !== "vietcharm" ? (
              <SectionCard
                eyebrow={SIMPLE_BIO[bio].eyebrow}
                title={SIMPLE_BIO[bio].title}
                lead={SIMPLE_BIO[bio].lead}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {SIMPLE_BIO[bio].items.map((group) => (
                    <GroupCard key={group.title} group={group} />
                  ))}
                </div>
              </SectionCard>
            ) : null}
          </div>
        ) : null}

        {main === "shop" ? (
          <div className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="border-b border-neutral-100 pb-5">
              <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold uppercase text-amber-900">
                Section 02 · Kênh Thương Mại &amp; Bán Lẻ
              </span>
              <h2 className="mt-2 font-display text-2xl font-black text-neutral-900 sm:text-3xl">
                Gobio Shop — Kênh Phân Phối &amp; Tiêu Dùng Thuận Tự Nhiên
              </h2>
              <p className="mt-1 max-w-3xl text-xs font-light text-neutral-600 sm:text-sm">
                Cung cấp các sản phẩm tiêu dùng hữu cơ, đặc sản vùng miền được
                tuyển chọn khắt khe qua hệ thống cửa hàng trực tuyến và mạng
                lưới trạm Dstation toàn quốc.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {SHOP_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="space-y-2.5 rounded-2xl border border-neutral-200 bg-neutral-50 p-5"
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl text-white",
                        pillar.tone,
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-base font-bold text-neutral-900">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-light leading-relaxed text-neutral-600">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-emerald-900 p-6 text-white sm:flex-row">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-display text-lg font-bold text-white">
                  Khám Phá Cửa Hàng &amp; Trạm Dstation Gần Bạn
                </h3>
                <p className="max-w-xl text-xs font-light text-emerald-100">
                  Trải nghiệm trực tiếp các sản phẩm Gobio Shop và thưởng thức
                  các món ăn thực dưỡng tại chuỗi điểm chạm Dstation.
                </p>
              </div>
              <Link
                href={`${routes.diemCham}#dstation`}
                className="shrink-0 rounded-xl bg-emerald-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-950 shadow-md transition-all hover:bg-emerald-400"
              >
                Xem mạng lưới Dstation
              </Link>
            </div>
          </div>
        ) : null}

        {main === "tu-sach" ? (
          <div className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="border-b border-neutral-100 pb-5">
              <span className="inline-flex rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-bold uppercase text-neutral-900">
                Section 03 · Di Sản Tri Thức
              </span>
              <h2 className="mt-2 font-display text-2xl font-black text-neutral-900 sm:text-3xl">
                Tủ Sách Phương Bối — Gia Tài Trí Tuệ Nếp Sống
              </h2>
              <p className="mt-1 max-w-3xl text-xs font-light text-neutral-600 sm:text-sm">
                Khai mở nhận thức, nuôi dưỡng tâm hồn và trao truyền tri thức y
                học cổ truyền cho mọi thế hệ trong gia đình.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {BOOK_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl text-white",
                        card.tone,
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-base font-bold text-neutral-900">
                      {card.title}
                    </h3>
                    <p className="text-xs font-light leading-relaxed text-neutral-600">
                      {card.desc}
                    </p>
                    <p className="border-t border-neutral-200 pt-2 text-xs text-neutral-500">
                      {card.list}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:flex-row">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-display text-base font-bold text-amber-950">
                  Học Viện Đào Tạo Nếp Sống AnVie Academy
                </h3>
                <p className="text-xs font-light text-neutral-600">
                  Tham gia các khóa học thực hành nấu ăn thực dưỡng và lắng nghe
                  chia sẻ trực tiếp từ các chuyên gia dinh dưỡng.
                </p>
              </div>
              <Link
                href={routes.anvieLife}
                className="shrink-0 rounded-xl bg-amber-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-amber-800"
              >
                Khám phá AnVie Academy
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
