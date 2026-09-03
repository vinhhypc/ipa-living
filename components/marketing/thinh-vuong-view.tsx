"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  Calendar,
  Compass,
  ExternalLink,
  FileText,
  HeartHandshake,
  Layers,
  LineChart,
  Map as MapIcon,
  PieChart,
  Repeat,
  Scale,
  ShieldCheck,
  Sliders,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { localImage } from "@/lib/images";
import { routes } from "@/lib/routes";
import { WorkshopInterestModal } from "@/components/marketing/workshop-interest-modal";

const HERO_IMAGE = localImage(
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1800&q=85",
);

const NAV_TABS = [
  { id: "toan-trinh", label: "Toàn Trình Đầu Tư" },
  { id: "chuyen-gia-vndcare", label: "Chuyên Gia VNDCARE" },
  { id: "nhom-san-pham", label: "3 Nhóm Sản Phẩm VNDGO" },
  { id: "cong-dong", label: "Cộng Đồng & Workshop" },
];

const FOUNDATION_PILLARS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: MapIcon,
    title: "Một Bản Đồ",
    desc: "Vẽ ra bản đồ tài chính cá nhân của mỗi Khách hàng để hiểu vị thế đầu tư theo nguyên tắc cá nhân hóa.",
  },
  {
    icon: Compass,
    title: "Một La Bàn",
    desc: "Hiểu rõ bản chất từng kênh đầu tư, loại tài sản; nắm được các nguyên tắc đầu tư để không lạc hướng, luôn vững tâm duy trì được kỷ luật đầu tư.",
  },
  {
    icon: Layers,
    title: "Một Tháp Thịnh Vượng",
    desc: "Phân bổ và quản lý tài sản trong sự hiểu biết tri thức đầu tư.",
  },
];

const VNDCARE_ROLES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: ShieldCheck,
    title: "Xây nền tài chính vững chắc",
    desc: "Đặt sức khỏe tài chính làm ưu tiên hàng đầu trong mọi khuyến nghị.",
  },
  {
    icon: Target,
    title: "Thiết lập mục tiêu rõ ràng",
    desc: "Định hướng kế hoạch tài chính và mục tiêu phù hợp với từng giai đoạn cuộc sống.",
  },
  {
    icon: BookOpen,
    title: "Trang bị hiểu biết & kỷ luật đầu tư",
    desc: "Giúp khách hàng hiểu đúng, chọn đúng và duy trì kỷ luật để đạt mục tiêu dài hạn.",
  },
  {
    icon: Users,
    title: "Đồng hành trọn hành trình",
    desc: "Hỗ trợ khách hàng liên tục, thích ứng với thay đổi và cùng nhau trưởng thành.",
  },
];

type ProductKey = "sip" | "wealth" | "trade";

type Product = {
  key: ProductKey;
  name: string;
  tagline: string;
  slogan: string;
  eyebrow: string;
  badge: string;
  badgeClass: string;
  image: string;
  alt: string;
  intro?: string;
  quote?: string;
  featTitle: string;
  features: { icon: LucideIcon; title: string; desc: string }[];
  highlight?: string;
};

const PRODUCTS: Product[] = [
  {
    key: "sip",
    name: "VNDSIP",
    tagline: "Go Online Go Direct",
    slogan: "Tích lũy định kỳ, hình thành nếp đầu tư",
    eyebrow: "Giải pháp tích lũy định kỳ tự động",
    badge: "Tích Lũy Tự Động",
    badgeClass: "bg-wealth-600 text-white",
    image: localImage(
      "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=700&q=80",
    ),
    alt: "VNDSIP — Tích lũy định kỳ",
    intro:
      "Giải pháp tích lũy định kỳ tự động, giúp bạn đầu tư một phần thu nhập đều đặn theo lịch cá nhân vào danh mục tài sản đa dạng để khai phóng sức mạnh lãi kép.",
    featTitle: "Đặc tính nổi bật",
    features: [
      { icon: Repeat, title: "Tích lũy tự động", desc: "Thiết lập lịch và mức đầu tư tự động theo kỳ lương." },
      { icon: PieChart, title: "Danh mục tối ưu", desc: "Được thẩm định kỹ lưỡng về chất lượng & uy tín." },
      { icon: TrendingUp, title: "Sức mạnh lãi kép", desc: "Duy trì bền bỉ không phụ thuộc thời điểm thị trường." },
      { icon: Sliders, title: "Linh hoạt theo nhu cầu", desc: "Tự do tùy biến danh mục, tạm dừng hay rút vốn linh hoạt." },
    ],
  },
  {
    key: "wealth",
    name: "VNDWealth",
    tagline: "Wisdom to success",
    slogan: "Gìn giữ tài sản, vun bồi thịnh vượng",
    eyebrow: "Giải pháp quản lý & phát triển tài sản",
    badge: "Wisdom To Success",
    badgeClass: "bg-brand-brown text-white",
    image: localImage(
      "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=700&q=80",
    ),
    alt: "VNDWealth — Quản trị gia sản",
    quote:
      "Gia sản không chỉ là những gì được tích lũy, mà còn là những giá trị được gìn giữ và trao truyền.",
    featTitle: "Vai trò trọng tâm",
    highlight: "Gia Sản & Trao Truyền",
    features: [
      { icon: Target, title: "Hoạch định theo mục tiêu gia đình", desc: "Xây dựng kế hoạch tài sản theo từng cột mốc cuộc sống." },
      { icon: PieChart, title: "Phân bổ & quản trị tài sản", desc: "Đa dạng hóa danh mục theo khẩu vị và hành trình riêng." },
      { icon: ShieldCheck, title: "Gìn giữ thành quả", desc: "Bảo vệ và duy trì giá trị tài sản đã tích lũy bền vững." },
      { icon: Users, title: "Chuẩn bị cho trao truyền", desc: "Cơ chế chuyển giao di sản tài chính cho thế hệ kế tiếp." },
    ],
  },
  {
    key: "trade",
    name: "VNDTRADE",
    tagline: "Empowering investors",
    slogan: "Giao dịch chủ động, tăng trưởng bền vững",
    eyebrow: "Giải pháp giao dịch chứng khoán nhà nghề",
    badge: "Empowering Investors",
    badgeClass: "bg-neutral-900 text-white",
    image: localImage(
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
    ),
    alt: "VNDTRADE — Giao dịch chứng khoán chuyên nghiệp",
    intro:
      "Giải pháp giao dịch toàn diện cho nhà đầu tư chủ động, tích hợp bảng giá DBOARD thông minh, lệnh điều kiện tự động và hệ sinh thái sản phẩm tài chính đa dạng.",
    featTitle: "Đặc tính nổi bật",
    features: [
      { icon: Zap, title: "Bảng giá DBOARD thông minh", desc: "Tốc độ xử lý siêu tốc, giao diện trực quan và sắc sảo." },
      { icon: Sliders, title: "Bộ lệnh điều kiện tự động", desc: "Cắt lỗ, chốt lời chủ động, quản trị rủi ro đa chiều." },
      { icon: FileText, title: "Báo cáo phân tích chuyên sâu", desc: "Cập nhật vĩ mô, ngành và doanh nghiệp định kỳ." },
      { icon: Scale, title: "Sản phẩm tài chính đa dạng", desc: "Cổ phiếu, D-Bond, D-Fund, Chứng quyền & Phái sinh." },
    ],
  },
];

const PRODUCT_DETAIL: Record<
  ProductKey,
  { eyebrow: string; title: string; body: React.ReactNode }
> = {
  sip: {
    eyebrow: "Giải pháp tích lũy định kỳ tự động",
    title: "VNDSIP — Tích lũy định kỳ",
    body: (
      <>
        <p>
          <strong>VNDSIP</strong> được thiết kế dành cho mọi cá nhân và gia đình
          mong muốn xây dựng tương lai an tâm bằng phương pháp tích sản kỷ luật.
        </p>
        <div className="space-y-2 rounded-2xl border border-amber-200/80 bg-wealth-50 p-4">
          <h4 className="text-sm font-bold text-neutral-900">
            Các gói tích sản nổi bật
          </h4>
          <ul className="list-inside list-disc space-y-1.5">
            <li>
              <strong>Gói Tích Sản Hưu Trí:</strong> Xây dựng dòng tiền thụ động
              an nhàn tuổi 50+.
            </li>
            <li>
              <strong>Gói Quỹ An Cư Mua Nhà:</strong> Tích lũy vốn đối ứng 30-50%
              không lo áp lực nợ vay.
            </li>
            <li>
              <strong>Gói Quỹ Giáo Dục Du Học:</strong> Đảm bảo tài chính cho con
              bước vào đại học.
            </li>
            <li>
              <strong>Gói Tích Lũy Tự Do:</strong> Linh hoạt lựa chọn danh mục cổ
              phiếu / chứng chỉ quỹ theo ý muốn.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  wealth: {
    eyebrow: "Giải pháp quản lý & phát triển tài sản",
    title: "VNDWealth — Quản trị gia sản",
    body: (
      <>
        <p>
          <strong>VNDWealth</strong> mang đến giải pháp Private Wealth toàn diện
          cho khách hàng có quy mô tài sản lớn, kết hợp giữa tư vấn độc lập và hệ
          thống công cụ quản trị danh mục hiện đại.
        </p>
        <div className="space-y-2 rounded-2xl border border-amber-200/80 bg-wealth-50 p-4">
          <h4 className="text-sm font-bold text-neutral-900">
            Quy trình hoạch định 4 bước
          </h4>
          <ol className="list-inside list-decimal space-y-1.5">
            <li>
              <strong>Khảo sát & Định vị:</strong> Xác định khẩu vị rủi ro và các
              mục tiêu tài chính gia đình.
            </li>
            <li>
              <strong>Thiết kế Danh mục Đa tầng:</strong> Phân bổ vào các lớp tài
              sản Bảo toàn, Thu nhập và Tăng trưởng.
            </li>
            <li>
              <strong>Tái cân bằng Định kỳ:</strong> Theo dõi và điều chỉnh danh
              mục thích ứng với chu kỳ kinh tế.
            </li>
            <li>
              <strong>Hoạch định Trao truyền:</strong> Xây dựng cơ chế chuyển
              giao gia sản xuyên thế hệ.
            </li>
          </ol>
        </div>
      </>
    ),
  },
  trade: {
    eyebrow: "Giải pháp giao dịch chứng khoán nhà nghề",
    title: "VNDTRADE — Giao dịch chủ động",
    body: (
      <>
        <p>
          <strong>VNDTRADE</strong> cung cấp hệ sinh thái giao dịch chuyên sâu
          dành cho nhà đầu tư chủ động với bảng giá DBOARD hàng đầu thị trường.
        </p>
        <div className="space-y-2 rounded-2xl border border-amber-200/80 bg-wealth-50 p-4">
          <h4 className="text-sm font-bold text-neutral-900">Tính năng vượt trội</h4>
          <ul className="list-inside list-disc space-y-1.5">
            <li>
              <strong>Lệnh Điều Kiện Tự Động:</strong> Stop-loss, Take-profit,
              Trailing Stop, Lệnh khớp theo phiên (ATO/ATC).
            </li>
            <li>
              <strong>Margin Ưu Đãi Đa Dạng:</strong> Các gói hỗ trợ tài chính
              D-Margin với lãi suất cạnh tranh và tỷ lệ linh hoạt.
            </li>
            <li>
              <strong>D-Data & Stock Screener:</strong> Bộ lọc cổ phiếu theo chỉ
              số cơ bản & kỹ thuật độc quyền.
            </li>
          </ul>
        </div>
      </>
    ),
  },
};

const COMMUNITY_VALUES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Users, title: "Kết nối & Chia sẻ", desc: "Giao lưu với cộng đồng những người cùng chung chí hướng xây dựng an tâm tài chính." },
  { icon: BookOpen, title: "Làm giàu tri thức", desc: "Tiếp cận các buổi tọa đàm, tài liệu nghiên cứu chuyên sâu từ chuyên gia phân tích." },
  { icon: Award, title: "Trao quyền tự chủ", desc: "Tự tin làm chủ quyết định phân bổ danh mục qua các công cụ số hóa hiện đại." },
  { icon: Repeat, title: "Hình thành nếp đầu tư", desc: "Rèn luyện tính kỷ luật, biến đầu tư thành một thói quen tự nhiên trong đời sống." },
];

const LIFE_STAGES: { icon: LucideIcon; tag: string; title: string; desc: string }[] = [
  { icon: Repeat, tag: "Giai đoạn tích lũy", title: "Khách hàng trẻ & Gia đình trẻ", desc: "Ưu tiên kích hoạt VNDSIP để tự động hóa tích lũy hưu trí, mua nhà, quỹ học vấn con cái." },
  { icon: Building2, tag: "Giai đoạn gia sản", title: "Gia đình & Nhà đầu tư đã có tài sản", desc: "Ưu tiên VNDWealth để hoạch định phân bổ đa tầng, bảo toàn vốn và thiết lập thừa kế thế hệ." },
  { icon: LineChart, tag: "Giao dịch chủ động", title: "Nhà đầu tư năng động", desc: "Sử dụng VNDTRADE với bảng giá DBOARD, hệ thống lệnh điều kiện và kho dữ liệu chuyên sâu." },
];

const WORKSHOP_TOPICS = [
  "Quản trị gia sản & Tích sản bền vững (VNDWealth/VNDSIP)",
  "Chiến lược phân bổ tài sản đa tầng",
  "Kỹ năng giao dịch chủ động & Quản trị rủi ro (VNDTRADE)",
];
const WORKSHOP_LOCATIONS = [
  "Hà Nội — Trạm Dstation Số 1 Nguyễn Thượng Hiền",
  "TP. Hồ Chí Minh — Trạm Dstation Tòa nhà The 90th",
  "Đà Nẵng — Trạm Dstation Nguyễn Văn Linh",
];

const sectionCls = "border-b border-neutral-200 bg-neutral-50 py-16 sm:py-24";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ThinhVuongView() {
  const [activeTab, setActiveTab] = useState<string>("");
  const [modalProduct, setModalProduct] = useState<ProductKey | null>(null);
  const [workshopOpen, setWorkshopOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800">
      {/* Hero */}
      <section className="h-hero relative flex min-h-[40rem] w-full items-center overflow-hidden border-b border-neutral-200 bg-neutral-50 py-16 text-neutral-900 sm:min-h-[48rem] sm:py-0 lg:min-h-[54rem]">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Thịnh Vượng VNDGO — bản đồ đầu tư và tích sản bền vững"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right lg:object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-neutral-50 via-neutral-50/90 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-50/80 via-transparent to-neutral-50/20" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 max-w-2xl space-y-5">
              <h1 className="font-display text-4xl font-black leading-tight tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
                Tháp Thịnh Vượng{" "}
                <span className="text-wealth-600">VNDGO</span>
              </h1>
              <p className="font-display text-xs font-bold uppercase tracking-widest text-wealth-700 sm:text-sm lg:text-base">
                Một nếp sống đầu tư · Một bản đồ thịnh vượng
              </p>
              <p className="text-sm font-light leading-relaxed text-neutral-700 sm:text-base lg:text-lg">
                Không chỉ là nơi giao dịch, VNDIRECT kiến tạo một không gian sống
                tài chính trọn vẹn — nơi bạn thấu hiểu bản thân, xây nền kỷ luật
                và gieo mầm gia sản vững bền qua các thế hệ.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToId("nhom-san-pham")}
                  className="inline-flex items-center gap-2 rounded-full bg-wealth-600 px-7 py-3.5 text-xs font-bold tracking-wide text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-wealth-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 motion-reduce:hover:translate-y-0 sm:text-sm"
                >
                  <span>Khám phá 3 nhóm sản phẩm</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToId("chuyen-gia-vndcare")}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/95 px-7 py-3.5 text-xs font-semibold tracking-wide text-neutral-900 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 motion-reduce:hover:translate-y-0 sm:text-sm"
                >
                  <HeartHandshake className="h-4 w-4 text-wealth-700" />
                  <span>Đồng hành Chuyên gia VNDCARE</span>
                </button>
              </div>
            </div>
          </div>
      </section>

      {/* Sticky quick nav */}
      <nav
        aria-label="Điều hướng nhanh Tháp Thịnh Vượng"
        className="sticky top-16 z-30 border-y border-neutral-200 bg-neutral-50/95 py-3 shadow-sm backdrop-blur-md sm:top-20"
      >
        <div className="no-scrollbar mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 sm:px-6 lg:px-8">
          {NAV_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                scrollToId(tab.id);
              }}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                activeTab === tab.id
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "border border-neutral-200 bg-white text-neutral-700 hover:bg-wealth-50 hover:text-wealth-700",
              )}
            >
              {tab.label}
            </button>
          ))}
          <Link
            href={routes.tuyenDungCa}
            className="ml-auto hidden shrink-0 items-center gap-1 text-xs font-bold text-wealth-700 hover:text-brand-brown-dark sm:flex"
          >
            <span>Kết nối Chuyên gia CA</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </nav>

      {/* Section: Toàn trình */}
      <section id="toan-trinh" className={cn(sectionCls, "scroll-mt-32")}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] max-h-144 overflow-hidden rounded-3xl border border-amber-200/80 bg-neutral-900 shadow-lg">
              <Image
                src={localImage(
                  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
                )}
                alt="Chuyên gia tài chính hoạch định đầu tư"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 right-4 max-w-[14rem] rounded-2xl border border-emerald-800/40 bg-brand-forest p-4 text-white shadow-lg sm:bottom-6 sm:right-6 sm:p-5">
                <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Thành tựu
                </span>
                <p className="font-display text-xs font-bold leading-snug text-emerald-50 sm:text-sm">
                  Hành trình 20 năm xây nhà — từ nền móng vững chắc
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-7">
            <span className="block text-xs font-bold uppercase tracking-widest text-wealth-700">
              VNDIRECT kiến tạo toàn trình — Your Investment Home
            </span>
            <h2 className="font-display text-2xl font-black leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              VNDIRECT mời khách vào nhà, để cùng nhau sống một cuộc đời đầu tư
            </h2>

            <div className="space-y-4 pt-2">
              {FOUNDATION_PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className={cn(
                      "flex items-start gap-4 pb-4",
                      idx < FOUNDATION_PILLARS.length - 1 &&
                        "border-b border-neutral-200",
                    )}
                  >
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-300 bg-amber-50 text-wealth-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="space-y-1">
                      <h3 className="font-display text-base font-bold text-neutral-900 sm:text-lg">
                        {pillar.title}
                      </h3>
                      <p className="text-xs font-light leading-relaxed text-neutral-600 sm:text-sm">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-brand-brown p-5 text-white shadow-md sm:p-6">
              <span className="shrink-0 rounded-xl bg-white/10 p-2.5 text-amber-200">
                <HeartHandshake className="h-5 w-5" />
              </span>
              <p className="text-xs font-light leading-relaxed text-amber-50/90 sm:text-sm">
                <strong className="font-bold text-white">VNDCARE</strong> là đội
                ngũ làm bạn với Khách hàng, đồng hành dẫn dắt mỗi thành viên
                trong “nhà”. Từ đó, giúp mỗi thành viên liên tục được học hỏi,
                được duy trì tích sản và có thể quản lý tài sản xuyên thế hệ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Chuyên gia VNDCARE */}
      <section id="chuyen-gia-vndcare" className={cn(sectionCls, "scroll-mt-32")}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
          <div className="space-y-6 lg:col-span-7">
            <span className="block text-xs font-bold uppercase tracking-widest text-wealth-700">
              Chuyên gia VNDCARE
            </span>
            <h2 className="font-display text-2xl font-black leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              Một lời hứa · Một nếp nghề · Một đời đồng hành
            </h2>

            <div className="space-y-1.5 rounded-2xl border border-amber-200/80 bg-wealth-50 p-4 sm:p-5">
              <span className="block text-xs font-bold uppercase tracking-widest text-wealth-700">
                Nguyên lý lõi
              </span>
              <p className="text-xs italic text-neutral-700 sm:text-sm">
                Bạn sống VNDCARE để dẫn được khách hàng sống VNDGO.
              </p>
              <p className="text-xs font-medium text-neutral-800 sm:text-sm">
                Sức khỏe tài chính trước – Tăng trưởng tài sản sau. Hiểu biết
                trước – Hành động sau.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest text-neutral-800">
                  Vai trò VNDCARE
                </span>
                <p className="mt-0.5 text-xs font-light text-neutral-600">
                  Là người dẫn đường và đồng hành tin cậy, giúp khách hàng:
                </p>
              </div>
              <div className="space-y-3">
                {VNDCARE_ROLES.map((role, idx) => {
                  const Icon = role.icon;
                  return (
                    <div
                      key={role.title}
                      className={cn(
                        "flex items-start gap-3.5 pb-3",
                        idx < VNDCARE_ROLES.length - 1 &&
                          "border-b border-neutral-200",
                      )}
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-200 bg-white text-wealth-700">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="space-y-0.5">
                        <h3 className="text-xs font-bold text-neutral-900 sm:text-sm">
                          {role.title}
                        </h3>
                        <p className="text-xs font-light leading-relaxed text-neutral-600">
                          {role.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-brand-brown p-5 text-white shadow-md sm:flex-row sm:items-center">
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest text-amber-200">
                  Cam kết từ VNDCARE
                </span>
                <p className="text-xs font-medium text-white sm:text-sm">
                  Tư vấn vì lợi ích của khách hàng — Đúng người — Đúng lúc — Đúng
                  giải pháp.
                </p>
              </div>
              <Link
                href={routes.tuyenDungCa}
                className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-bold text-neutral-900 shadow-sm transition-all hover:bg-amber-100"
              >
                Gặp chuyên gia
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] max-h-144 overflow-hidden rounded-3xl border border-amber-200/80 bg-neutral-900 shadow-lg">
              <Image
                src={localImage(
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
                )}
                alt="Đội ngũ Chuyên gia VNDCARE đồng hành cùng khách hàng"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-6 bottom-6 space-y-1 rounded-2xl border border-white/15 bg-neutral-900/90 p-4 text-white shadow-lg backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300">
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-wealth-500 motion-reduce:animate-none" />
                    Mạng lưới toàn quốc
                  </span>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-xs text-amber-200">
                    63 Tỉnh/TP
                  </span>
                </div>
                <p className="flex items-baseline gap-2 pt-1">
                  <span className="font-display text-2xl font-black text-white">
                    2.000+
                  </span>
                  <span className="text-xs font-light text-neutral-300">
                    Chuyên viên, Cố vấn Gia sản & Đầu tư sẵn sàng đồng hành
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: 3 nhóm sản phẩm */}
      <section id="nhom-san-pham" className={cn(sectionCls, "scroll-mt-32")}>
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-3 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-green-dark/20 bg-brand-green-dark/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-green-dark">
              Hệ thống sản phẩm đầu tư &amp; gia sản VNDGO
            </span>
            <h2 className="font-display text-2xl font-black leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              3 Trụ Cột Sản Phẩm Theo Vòng Đời Tài Chính
            </h2>
            <p className="mx-auto max-w-3xl text-sm italic text-wealth-700 sm:text-lg">
              “VNDIRECT đồng hành cùng bạn trọn cuộc đời tài chính: nền vững
              trước, tăng trưởng sau.”
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <div
                key={product.key}
                className={cn(
                  "group flex flex-col justify-between overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg",
                  product.key === "wealth"
                    ? "border-2 border-amber-300/80"
                    : "border border-neutral-200/90",
                )}
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent p-4 sm:p-5">
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm",
                          product.badgeClass,
                        )}
                      >
                        {product.badge}
                      </span>
                    </div>
                    {product.highlight ? (
                      <span className="absolute right-3 top-3 rounded-full border border-amber-300 bg-amber-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 shadow-sm">
                        {product.highlight}
                      </span>
                    ) : null}
                  </div>

                  <div className="space-y-4 p-6 sm:p-7">
                    <span className="block text-xs font-bold uppercase tracking-widest text-wealth-700">
                      {product.eyebrow}
                    </span>
                    <div>
                      <h3 className="flex items-baseline gap-2 font-display text-xl font-black text-neutral-900">
                        <span>{product.name}</span>
                        <span className="text-sm font-normal text-neutral-400">—</span>
                        <span className="truncate text-sm font-semibold text-neutral-700">
                          {product.tagline}
                        </span>
                      </h3>
                      <p className="mt-1 text-xs font-medium text-neutral-600 sm:text-sm">
                        {product.slogan}
                      </p>
                    </div>

                    {product.intro ? (
                      <p className="text-xs font-light leading-relaxed text-neutral-600">
                        {product.intro}
                      </p>
                    ) : null}
                    {product.quote ? (
                      <p className="rounded-xl border border-amber-200/80 bg-wealth-50 p-3 text-xs italic leading-relaxed text-neutral-700">
                        {`“${product.quote}”`}
                      </p>
                    ) : null}

                    <div className="space-y-2 border-t border-neutral-100 pt-2">
                      <span className="block text-xs font-bold uppercase text-neutral-800">
                        {product.featTitle}
                      </span>
                      {product.features.map((feat) => {
                        const Icon = feat.icon;
                        return (
                          <div
                            key={feat.title}
                            className="flex items-start gap-2.5 rounded-xl border border-amber-100/60 bg-amber-50/50 p-2"
                          >
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-wealth-700">
                              <Icon className="h-3.5 w-3.5" />
                            </span>
                            <span>
                              <span className="block text-xs font-bold text-neutral-900">
                                {feat.title}
                              </span>
                              <span className="block text-xs font-light leading-tight text-neutral-600">
                                {feat.desc}
                              </span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 sm:p-7">
                  <button
                    type="button"
                    onClick={() => setModalProduct(product.key)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-green-dark px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-brand-forest hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 sm:text-sm"
                  >
                    <span>Xem chi tiết về {product.name}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid grid-cols-1 gap-6 divide-y divide-neutral-100 text-center md:grid-cols-3 md:divide-x md:divide-y-0 md:text-left">
              {LIFE_STAGES.map((stage, idx) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={stage.tag}
                    className={cn(
                      "space-y-1.5",
                      idx === 0 && "md:pr-4",
                      idx === 1 && "pt-4 md:px-4 md:pt-0",
                      idx === 2 && "pt-4 md:pl-4 md:pt-0",
                    )}
                  >
                    <span className="flex items-center justify-center gap-2 text-wealth-700 md:justify-start">
                      <Icon className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase">
                        {stage.tag}
                      </span>
                    </span>
                    <h3 className="font-display text-sm font-bold text-neutral-900">
                      {stage.title}
                    </h3>
                    <p className="text-xs font-light text-neutral-500">
                      {stage.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section: Cộng đồng */}
      <section id="cong-dong" className="scroll-mt-32 bg-neutral-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-3 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-wealth-700">
              <Users className="h-3.5 w-3.5" />
              Cộng đồng Nhà đầu tư VNDGO
            </span>
            <h2 className="font-display text-2xl font-black leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              Từ nếp sống đầu tư đến kết nối hiểu biết và trao quyền
            </h2>
            <p className="mx-auto max-w-2xl text-xs font-light text-neutral-600 sm:text-base">
              Cộng đồng VNDGO là không gian mở dành cho những người muốn xây dựng
              nếp sống đầu tư bền vững, cùng chia sẻ kinh nghiệm, cập nhật tri
              thức và kiến tạo tương lai thịnh vượng.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMMUNITY_VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="space-y-3 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-wealth-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-bold text-neutral-900">
                    {value.title}
                  </h3>
                  <p className="text-xs font-light leading-relaxed text-neutral-600">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col justify-between space-y-4 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-wealth-700">
                  Kênh tương tác online
                </span>
                <h3 className="font-display text-xl font-black text-neutral-900">
                  Tham gia Cộng đồng Nhà Đầu Tư VNDGO
                </h3>
                <p className="text-xs font-light leading-relaxed text-neutral-600 sm:text-sm">
                  Cập nhật các chương trình livestream nhận định thị trường hàng
                  ngày, hỏi đáp trực tiếp cùng đội ngũ chuyên gia phân tích và kết
                  nối cùng hàng trăm nghìn nhà đầu tư.
                </p>
              </div>
              <a
                href="https://www.facebook.com/vndirect"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-neutral-800"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Tham gia Fanpage VNDIRECT</span>
              </a>
            </div>

            <div className="flex flex-col justify-between space-y-4 rounded-3xl border border-amber-300 bg-wealth-50 p-8 shadow-sm">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-wealth-700">
                  Điểm chạm trực tiếp
                </span>
                <h3 className="font-display text-xl font-black text-neutral-900">
                  Đăng ký tham gia Workshop tại Trạm Dstation
                </h3>
                <p className="text-xs font-light leading-relaxed text-neutral-600 sm:text-sm">
                  Các buổi hội thảo chuyên đề hàng tuần về Lập kế hoạch tài chính
                  cá nhân, Tích sản hưu trí và Quản trị danh mục gia sản tại các
                  trạm dịch vụ Dstation trên toàn quốc.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setWorkshopOpen(true)}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-green-dark px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-brand-forest"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Đăng ký tham gia Workshop</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product detail modal */}
      {modalProduct ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setModalProduct(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={PRODUCT_DETAIL[modalProduct].title}
            onClick={(e) => e.stopPropagation()}
            className="max-h-modal w-full max-w-2xl space-y-6 overflow-y-auto rounded-3xl border border-neutral-200 bg-white p-6 shadow-lg sm:p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-wealth-700">
                  {PRODUCT_DETAIL[modalProduct].eyebrow}
                </span>
                <h3 className="mt-1 font-display text-2xl font-black text-neutral-900">
                  {PRODUCT_DETAIL[modalProduct].title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalProduct(null)}
                aria-label="Đóng"
                className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 text-xs font-light leading-relaxed text-neutral-600 sm:text-sm">
              {PRODUCT_DETAIL[modalProduct].body}
            </div>
            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-neutral-100 pt-4">
              <button
                type="button"
                onClick={() => setModalProduct(null)}
                className="rounded-full border border-neutral-200 px-5 py-2.5 text-xs font-bold uppercase text-neutral-700 transition-all hover:bg-neutral-50"
              >
                Đóng
              </button>
              <Link
                href={routes.tuyenDungCa}
                className="flex items-center gap-1.5 rounded-full bg-brand-green-dark px-6 py-2.5 text-xs font-bold uppercase text-white transition-all hover:bg-brand-forest"
              >
                <span>Nhận tư vấn trực tiếp</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <WorkshopInterestModal
        open={workshopOpen}
        onClose={() => setWorkshopOpen(false)}
        eyebrow="Trạm dịch vụ Dstation"
        title="Đăng ký Workshop Đầu Tư"
        submitLabel="Gửi đăng ký"
        selects={[
          { name: "topic", label: "Chủ đề quan tâm", options: WORKSHOP_TOPICS },
          {
            name: "location",
            label: "Địa điểm Trạm Dstation",
            options: WORKSHOP_LOCATIONS,
          },
        ]}
      />
    </div>
  );
}
