"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Calendar,
  Compass,
  Filter,
  Heart,
  Search,
  Shield,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ARTICLES, WORKSHOPS } from "@/lib/data";
import type { Tower } from "@/lib/types";
import { MapSection } from "@/components/marketing/map-section";
import { WorkshopCard } from "@/components/marketing/workshop-card";
import { KnowledgeCard } from "@/components/marketing/knowledge-card";

type TabId = "dstation" | "workshop" | "tri-thuc";
type CategoryFilter = "all" | Tower;

const TABS: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: "dstation", label: "Tọa Độ Kết Nối (Dstation)", icon: Compass },
  { id: "workshop", label: "Workshop & Sự Kiện", icon: Calendar },
  { id: "tri-thuc", label: "Tri Thức Wellbeing", icon: BookOpen },
];

const DONG_LIST = [
  { id: "all", label: "Tất cả 10 gói" },
  { id: "Bếp Nhà AnVie", label: "Bếp Nhà AnVie" },
  { id: "Trà Vietcharm", label: "Trà Vietcharm" },
  { id: "Trà & Bánh", label: "Trà & Bánh" },
  { id: "Tôi Là Thảo Mộc", label: "Tôi Là Thảo Mộc" },
];

const CATEGORY_FILTERS: {
  key: CategoryFilter;
  label: string;
  icon: LucideIcon;
  active: string;
}[] = [
  { key: "all", label: "Tất cả chủ đề", icon: BookOpen, active: "bg-neutral-900 text-white" },
  { key: "suc-khoe", label: "Sức Khỏe & Dinh Dưỡng", icon: Heart, active: "bg-emerald-700 text-white" },
  { key: "thinh-vuong", label: "Thịnh Vượng & Đầu Tư", icon: TrendingUp, active: "bg-amber-700 text-white" },
  { key: "bao-an", label: "Bảo An & Phòng Vệ", icon: Shield, active: "bg-sky-700 text-white" },
];

const PILLAR_INSIGHTS = [
  {
    icon: Heart,
    tone: "border-emerald-200/80 bg-emerald-50/70 text-emerald-800",
    title: "Trụ Cột Sức Khỏe",
    desc: "Phương pháp dinh dưỡng thuận tự nhiên, cân bằng hệ vi sinh đường ruột với men sống Bếp nhà Delivie và trà thảo mộc bản địa.",
  },
  {
    icon: TrendingUp,
    tone: "border-amber-200/80 bg-amber-50/70 text-amber-800",
    title: "Trụ Cột Thịnh Vượng",
    desc: "Kỷ luật tích sản bền vững VNDSIP, hoạch định tháp tài sản trọn đời và quản lý dòng tiền an tâm cho hưu trí.",
  },
  {
    icon: Shield,
    tone: "border-sky-200/80 bg-sky-50/70 text-sky-800",
    title: "Trụ Cột Bảo An",
    desc: "Lưới an sinh vững chắc, lá chắn bảo vệ sức khỏe và cứu hộ khẩn cấp PTISOS cho cả gia đình trước mọi biến cố.",
  },
];

const HASH_TO_TAB: Record<string, TabId> = {
  dstation: "dstation",
  "toa-do-ket-noi": "dstation",
  location: "dstation",
  workshop: "workshop",
  "workshop-su-kien": "workshop",
  "su-kien": "workshop",
  "tri-thuc": "tri-thuc",
  knowledge: "tri-thuc",
  blog: "tri-thuc",
};

export function DiemChamView({ initialTab = "dstation" }: { initialTab?: TabId }) {
  const [tab, setTab] = useState<TabId>(initialTab);
  const [dongFilter, setDongFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && HASH_TO_TAB[hash]) setTab(HASH_TO_TAB[hash]);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const workshops = WORKSHOPS.filter(
    (ws) => dongFilter === "all" || ws.dongWorkshop === dongFilter,
  );

  const query = search.trim().toLowerCase();
  const articles = ARTICLES.filter((art) => {
    const matchesCategory =
      categoryFilter === "all" || art.category === categoryFilter;
    const matchesSearch =
      !query ||
      [art.title, art.excerpt, art.content, art.author].some((field) =>
        field.toLowerCase().includes(query),
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-neutral-800 bg-neutral-950 py-16 text-white md:py-24">
        <div className="bg-glow-gold-top pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl space-y-4 px-4 text-center sm:px-6 lg:px-8">
          <span className="flex items-center justify-center text-xs font-bold uppercase tracking-widest text-amber-400">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Không gian trải nghiệm
            &amp; điểm chạm thực tế
          </span>
          <h1 className="mx-auto max-w-4xl font-display text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            Dstation — Nơi khởi nguồn của lối sống trọn vẹn và an tâm
          </h1>
          <p className="mx-auto max-w-3xl text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
            Khám phá chuỗi trạm trải nghiệm đa giác quan, chuỗi workshop thực hành
            thường xuyên và kho tàng tri thức chọn lọc từ 3 trụ cột Sức khỏe,
            Thịnh vượng và Bảo an.
          </p>

          <div
            role="tablist"
            aria-label="Nhóm nội dung Điểm Chạm"
            className="flex flex-wrap justify-center gap-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-1.5 shadow-lg sm:inline-flex"
          >
            {TABS.map((item) => {
              const Icon = item.icon;
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 sm:text-sm",
                    active
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "text-neutral-400 hover:bg-neutral-800/60 hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {tab === "dstation" ? (
              <div id="dstation">
                <MapSection />
              </div>
            ) : null}

            {tab === "workshop" ? (
              <div id="workshop" className="space-y-10">
                <div className="mx-auto max-w-3xl space-y-3 pt-2 text-center">
                  <span className="block text-xs font-bold uppercase tracking-widest text-brand-gold">
                    Lịch Workshop &amp; Lớp trải nghiệm
                  </span>
                  <h2 className="font-display text-2xl font-black leading-tight text-neutral-900 sm:text-3xl lg:text-4xl">
                    Thay đổi bắt đầu từ những trải nghiệm thực hành
                  </h2>
                  <p className="text-xs font-light leading-relaxed text-neutral-600 sm:text-sm md:text-base">
                    Đăng ký tham gia ngay các workshop định kỳ tại Dstation để
                    cùng chuyên gia chăm sóc sức khỏe tế bào, học làm bánh men
                    sống Bếp nhà Delivie, thưởng thức trà đạo thảo mộc và hoạch
                    định tài chính tương lai.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="mr-1 flex items-center text-xs font-bold uppercase tracking-wider text-neutral-500">
                      <Filter className="mr-1 h-3.5 w-3.5" /> Dòng:
                    </span>
                    {DONG_LIST.map((dong) => {
                      const selected = dongFilter === dong.id;
                      return (
                        <button
                          key={dong.id}
                          type="button"
                          onClick={() => setDongFilter(dong.id)}
                          aria-pressed={selected}
                          className={cn(
                            "rounded-full px-4 py-2 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                            selected
                              ? "bg-brand-green-dark font-bold text-white shadow-sm"
                              : "border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50",
                          )}
                        >
                          {dong.label}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-neutral-500">
                    Hiển thị <strong>{workshops.length}</strong> workshop
                  </p>
                </div>

                {workshops.length > 0 ? (
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {workshops.map((ws) => (
                      <WorkshopCard key={ws.id} workshop={ws} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center">
                    <p className="text-sm text-neutral-500">
                      Không có gói workshop nào phù hợp với bộ lọc hiện tại.
                    </p>
                  </div>
                )}

                <div className="mx-auto max-w-4xl space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-lg md:p-10">
                  <span className="block text-xs font-bold uppercase tracking-widest text-emerald-700">
                    Cộng đồng gắn kết
                  </span>
                  <p className="text-base font-light leading-relaxed text-neutral-700 md:text-lg">
                    Mỗi workshop mang đến nhiều hơn một buổi học. Bạn sẽ gặp những
                    người đang sống với điều họ chia sẻ: người nghệ nhân trà Shan
                    Tuyết Vietcharm, thợ làm bánh men sống Delivie, cố vấn thực
                    dưỡng Bếp Homefood hay chuyên gia thảo mộc bản địa.
                  </p>
                  <button
                    type="button"
                    onClick={() => setTab("tri-thuc")}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-emerald-700 transition-colors hover:text-emerald-800"
                  >
                    Khám phá bài viết Góc Tri Thức &rarr;
                  </button>
                </div>
              </div>
            ) : null}

            {tab === "tri-thuc" ? (
              <div id="tri-thuc" className="space-y-10">
                <div className="flex flex-col items-start justify-between gap-6 border-b border-neutral-200 pb-6 lg:flex-row lg:items-center">
                  <div className="max-w-2xl">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                      Thư viện tri thức
                    </span>
                    <h2 className="mt-1 font-display text-2xl font-black leading-snug text-neutral-900 sm:text-3xl">
                      Góc Tri Thức Wellbeing
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                      Tuyển tập các bài nghiên cứu, hướng dẫn thực hành và triết
                      lý sống từ 3 trụ cột Sức Khỏe (Anvie) — Thịnh Vượng (VNDGO)
                      — Bảo An (PTI).
                    </p>
                  </div>
                  <div className="relative w-full lg:w-72">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <label htmlFor="article-search" className="sr-only">
                      Tìm bài viết
                    </label>
                    <Input
                      id="article-search"
                      type="search"
                      placeholder="Tìm bài viết, chủ đề..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full rounded-full border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-xs text-neutral-800 shadow-sm outline-none focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {CATEGORY_FILTERS.map((btn) => {
                      const Icon = btn.icon;
                      const selected = categoryFilter === btn.key;
                      return (
                        <button
                          key={btn.key}
                          type="button"
                          onClick={() => setCategoryFilter(btn.key)}
                          aria-pressed={selected}
                          className={cn(
                            "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                            selected
                              ? cn(btn.active, "shadow-md")
                              : "border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100",
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          <span>{btn.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs text-neutral-400">
                    Hiển thị {articles.length} bài viết
                  </span>
                </div>

                {articles.length > 0 ? (
                  <div className="space-y-5">
                    {articles.map((art) => (
                      <KnowledgeCard key={art.id} article={art} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 rounded-3xl border border-neutral-200 bg-white p-8 py-16 text-center">
                    <BookOpen className="mx-auto h-12 w-12 text-neutral-300" />
                    <p className="text-sm font-medium text-neutral-600">
                      Không tìm thấy bài viết phù hợp với từ khóa “{search}”.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setCategoryFilter("all");
                        setSearch("");
                      }}
                      className="text-xs font-bold text-emerald-700 hover:underline"
                    >
                      Đặt lại bộ lọc
                    </button>
                  </div>
                )}

                <div className="border-t border-neutral-200 pt-8">
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-400">
                    Trụ cột tri thức cốt lõi
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {PILLAR_INSIGHTS.map((insight) => {
                      const Icon = insight.icon;
                      return (
                        <div
                          key={insight.title}
                          className={cn(
                            "space-y-2.5 rounded-2xl border p-5",
                            insight.tone,
                          )}
                        >
                          <p className="flex items-center gap-2 text-sm font-bold">
                            <Icon className="h-4 w-4" />
                            <span>{insight.title}</span>
                          </p>
                          <p className="text-xs font-light leading-relaxed text-neutral-700">
                            {insight.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
