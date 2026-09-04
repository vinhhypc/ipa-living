"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  Compass,
  CreditCard,
  Heart,
  Menu,
  Shield,
  Store,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";
import { IpaLivingMark } from "@/components/brand/ipaliving-mark";

type Dropdown = "ve-ipa-living" | "dstation" | "d-one";

const TRANSITION = { duration: 0.2 } as const;
const MENU_MOTION = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: TRANSITION,
} as const;

/** Các route thuộc nhóm "Về IPA Living" — dùng để tô đậm mục nav đang mở. */
const ABOUT_ROUTES = [
  routes.veIpaLiving,
  routes.sucKhoe,
  routes.thinhVuong,
  routes.baoAn,
];
const DSTATION_ROUTES = [routes.diemCham, routes.triThuc];

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<Dropdown | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  /** Mở dropdown ngay, hủy mọi lịch đóng đang chờ. */
  const openMenu = (name: Dropdown) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(name);
  };

  /** Trì hoãn việc đóng để tránh nháy khi rê chuột giữa nav link và submenu. */
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  const closeMenus = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const isAbout = ABOUT_ROUTES.includes(
    pathname as (typeof ABOUT_ROUTES)[number],
  );
  const isDstation = DSTATION_ROUTES.includes(
    pathname as (typeof DSTATION_ROUTES)[number],
  );

  const navPillBase =
    "px-4 py-2 rounded-full font-semibold text-sm uppercase tracking-wide transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2";
  const navPill = (active: boolean) =>
    cn(
      navPillBase,
      active
        ? "bg-neutral-200 text-neutral-900"
        : "text-neutral-700 hover:bg-neutral-200/60 hover:text-neutral-900",
    );

  return (
    <header
      id="main-header"
      className={cn(
        "sticky top-0 z-50 border-b border-neutral-200 text-neutral-800 transition-all duration-300",
        scrolled
          ? "bg-neutral-50/95 shadow-sm backdrop-blur-md"
          : "bg-neutral-50",
      )}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            href={routes.home}
            onClick={closeMenus}
            title="Về Trang chủ IPA Living"
            className="group flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <IpaLivingMark
              aria-label="IPA Living"
              role="img"
              className="h-11 w-auto shrink-0 transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1.5 lg:flex">
            {/* Về IPA Living */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("ve-ipa-living")}
              onMouseLeave={scheduleClose}
            >
              <Link
                href={routes.veIpaLiving}
                onClick={closeMenus}
                className={navPill(isAbout)}
              >
                <span>Về IPA Living</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    openDropdown === "ve-ipa-living" && "rotate-180",
                  )}
                />
              </Link>
              <AnimatePresence>
                {openDropdown === "ve-ipa-living" && (
                  <motion.div
                    {...MENU_MOTION}
                    className="absolute left-0 mt-2 w-90 rounded-2xl border border-neutral-100 bg-white p-4 text-neutral-800 shadow-lg before:absolute before:-top-2 before:inset-x-0 before:h-2 before:content-['']"
                  >
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-100 pb-2">
                      <Link
                        href={routes.veIpaLiving}
                        onClick={closeMenus}
                        className="text-xs font-semibold text-brand-green hover:underline"
                      >
                        Về IPA Living &rarr;
                      </Link>
                    </div>
                    <div className="space-y-1.5">
                      <MegaItem
                        href={routes.sucKhoe}
                        onClick={closeMenus}
                        icon={<Heart className="h-4 w-4" />}
                        tone="emerald"
                        title="Anvie — Sức khỏe & Đời sống"
                        desc="Gobio · Anvie Health · Anvie Life · Dinh dưỡng & Dược liệu"
                      />
                      <MegaItem
                        href={routes.thinhVuong}
                        onClick={closeMenus}
                        icon={<TrendingUp className="h-4 w-4" />}
                        tone="amber"
                        title="VNDGO — Đầu tư & Đời sống"
                        desc="VNDSIP · VNDWealth · VNDTrade · Tích sản & Gia sản"
                      />
                      <MegaItem
                        href={routes.baoAn}
                        onClick={closeMenus}
                        icon={<Shield className="h-4 w-4" />}
                        tone="sky"
                        title="PTICare — Bảo hiểm & Đời sống"
                        desc="PTIHealth · PTISOS · PTICommercial · Bảo an toàn diện"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dstation */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("dstation")}
              onMouseLeave={scheduleClose}
            >
              <Link
                href={routes.diemCham}
                onClick={closeMenus}
                className={navPill(isDstation)}
              >
                <span>Dstation</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    openDropdown === "dstation" && "rotate-180",
                  )}
                />
              </Link>
              <AnimatePresence>
                {openDropdown === "dstation" && (
                  <motion.div
                    {...MENU_MOTION}
                    className="absolute left-0 mt-2 w-85 rounded-2xl border border-neutral-100 bg-white p-3.5 text-neutral-800 shadow-lg before:absolute before:-top-2 before:inset-x-0 before:h-2 before:content-['']"
                  >
                    <div className="mb-2.5 flex items-center justify-between border-b border-neutral-100 pb-2">
                      <Link
                        href={routes.diemCham}
                        onClick={closeMenus}
                        className="text-xs font-semibold text-brand-green hover:underline"
                      >
                        Khám phá tất cả &rarr;
                      </Link>
                    </div>
                    <div className="space-y-1">
                      <MegaItem
                        href={`${routes.diemCham}#dstation`}
                        onClick={closeMenus}
                        icon={<Compass className="h-4 w-4" />}
                        tone="emerald"
                        compact
                        title="Tọa độ kết nối"
                        desc="Bản đồ các trạm Dstation & Không gian 4 Zones"
                      />
                      <MegaItem
                        href={`${routes.diemCham}#workshop`}
                        onClick={closeMenus}
                        icon={<Calendar className="h-4 w-4" />}
                        tone="amber"
                        compact
                        title="Workshop & Sự kiện"
                        desc="Lịch trải nghiệm làm bánh men sống, trà đạo & tài chính"
                      />
                      <MegaItem
                        href={routes.triThuc}
                        onClick={closeMenus}
                        icon={<BookOpen className="h-4 w-4" />}
                        tone="sky"
                        compact
                        title="Tri thức Wellbeing"
                        desc="Thư viện bài viết Sức khỏe, Thịnh vượng & Bảo an"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* D-One */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("d-one")}
              onMouseLeave={scheduleClose}
            >
              <Link
                href={routes.dOne}
                onClick={closeMenus}
                className={navPill(pathname === routes.dOne)}
              >
                <span>D-One</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    openDropdown === "d-one" && "rotate-180",
                  )}
                />
              </Link>
              <AnimatePresence>
                {openDropdown === "d-one" && (
                  <motion.div
                    {...MENU_MOTION}
                    className="absolute left-0 mt-2 w-80 rounded-2xl border border-neutral-100 bg-white p-3.5 text-neutral-800 shadow-lg before:absolute before:-top-2 before:inset-x-0 before:h-2 before:content-['']"
                  >
                    <div className="space-y-1">
                      <MegaItem
                        href={`${routes.dOne}#member`}
                        onClick={closeMenus}
                        icon={<CreditCard className="h-4 w-4" />}
                        tone="emerald"
                        compact
                        title="Đăng ký thành viên"
                        desc="Đặc quyền hội viên D-ONE & ưu đãi 3 tháp"
                      />
                      <MegaItem
                        href={`${routes.dOne}#supplier`}
                        onClick={closeMenus}
                        icon={<Store className="h-4 w-4" />}
                        tone="amber"
                        compact
                        title="Đăng ký nhà cung cấp"
                        desc="Hợp tác chuỗi cung ứng dược liệu & sản phẩm xanh"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* D-Care */}
            <Link
              href={routes.dCare}
              onClick={closeMenus}
              className={navPill(
                pathname === routes.dCare || pathname === routes.tuyenDungCa,
              )}
            >
              D-Care
            </Link>
          </nav>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={mobileMenuOpen}
            className="rounded-lg p-2 text-neutral-800 hover:bg-neutral-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mt-4 space-y-3 border-t border-neutral-200 pb-6 pt-4">
                <MobileGroup
                  label="Về IPA Living"
                  href={routes.veIpaLiving}
                  onNavigate={closeMenus}
                >
                  <MobileLink
                    href={routes.sucKhoe}
                    onClick={closeMenus}
                    tone="emerald"
                    icon={<Heart className="h-3.5 w-3.5" />}
                  >
                    Anvie — Sức khỏe & Đời sống
                  </MobileLink>
                  <MobileLink
                    href={routes.thinhVuong}
                    onClick={closeMenus}
                    tone="amber"
                    icon={<TrendingUp className="h-3.5 w-3.5" />}
                  >
                    VNDGO — Đầu tư & Đời sống
                  </MobileLink>
                  <MobileLink
                    href={routes.baoAn}
                    onClick={closeMenus}
                    tone="sky"
                    icon={<Shield className="h-3.5 w-3.5" />}
                  >
                    PTICare — Bảo hiểm & Đời sống
                  </MobileLink>
                </MobileGroup>

                <MobileGroup
                  label="Dstation (3 Điểm Chạm)"
                  onNavigate={closeMenus}
                >
                  <MobileLink
                    href={`${routes.diemCham}#dstation`}
                    onClick={closeMenus}
                    icon={<Compass className="h-3.5 w-3.5 text-emerald-700" />}
                  >
                    Tọa độ kết nối
                  </MobileLink>
                  <MobileLink
                    href={`${routes.diemCham}#workshop`}
                    onClick={closeMenus}
                    icon={<Calendar className="h-3.5 w-3.5 text-amber-700" />}
                  >
                    Workshop & Sự kiện
                  </MobileLink>
                  <MobileLink
                    href={routes.triThuc}
                    onClick={closeMenus}
                    icon={<BookOpen className="h-3.5 w-3.5 text-sky-700" />}
                  >
                    Tri thức Wellbeing
                  </MobileLink>
                </MobileGroup>

                <MobileGroup label="D-One" onNavigate={closeMenus}>
                  <MobileLink
                    href={`${routes.dOne}#member`}
                    onClick={closeMenus}
                    icon={
                      <CreditCard className="h-3.5 w-3.5 text-emerald-700" />
                    }
                  >
                    Đăng ký thành viên
                  </MobileLink>
                  <MobileLink
                    href={`${routes.dOne}#supplier`}
                    onClick={closeMenus}
                    icon={<Store className="h-3.5 w-3.5 text-amber-700" />}
                  >
                    Đăng ký nhà cung cấp
                  </MobileLink>
                </MobileGroup>

                <Link
                  href={routes.dCare}
                  onClick={closeMenus}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-bold text-neutral-800 hover:bg-neutral-100"
                >
                  <span>D-Care (Chuyên gia & Gia nhập đội ngũ)</span>
                  <Users className="h-4 w-4 text-emerald-700" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

const TONE_CLASS = {
  emerald: {
    hover: "hover:bg-emerald-50",
    chip: "bg-emerald-100 text-emerald-800",
    title: "group-hover:text-emerald-700",
  },
  amber: {
    hover: "hover:bg-amber-50",
    chip: "bg-amber-100 text-amber-800",
    title: "group-hover:text-amber-700",
  },
  sky: {
    hover: "hover:bg-sky-50",
    chip: "bg-sky-100 text-sky-800",
    title: "group-hover:text-sky-700",
  },
} as const;

type Tone = keyof typeof TONE_CLASS;

function MegaItem({
  href,
  onClick,
  icon,
  tone,
  title,
  desc,
  compact = false,
}: {
  href: string;
  onClick: () => void;
  icon: React.ReactNode;
  tone: Tone;
  title: string;
  desc: string;
  compact?: boolean;
}) {
  const t = TONE_CLASS[tone];
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group flex items-start gap-3 rounded-xl p-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
        compact && "items-center p-2",
        t.hover,
      )}
    >
      <span
        className={cn(
          "mt-0.5 shrink-0 rounded-lg p-2 transition-transform group-hover:scale-105",
          t.chip,
          compact && "mt-0",
        )}
      >
        {icon}
      </span>
      <span>
        <span
          className={cn("block text-xs font-bold text-neutral-900", t.title)}
        >
          {title}
        </span>
        <span className="mt-0.5 block text-xs text-neutral-500">{desc}</span>
      </span>
    </Link>
  );
}

function MobileGroup({
  label,
  href,
  onNavigate,
  children,
}: {
  label: string;
  href?: string;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      {href ? (
        <Link
          href={href}
          onClick={onNavigate}
          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-bold text-neutral-800 hover:bg-neutral-100"
        >
          <span>{label}</span>
          <span className="text-xs text-neutral-400">Tổng quan &rarr;</span>
        </Link>
      ) : (
        <div className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-neutral-400">
          {label}
        </div>
      )}
      <div className="ml-3 space-y-1 border-l border-neutral-200 pl-4">
        {children}
      </div>
    </div>
  );
}

function MobileLink({
  href,
  onClick,
  icon,
  tone,
  children,
}: {
  href: string;
  onClick: () => void;
  icon: React.ReactNode;
  tone?: Tone;
  children: React.ReactNode;
}) {
  const hoverText =
    tone === "emerald"
      ? "hover:bg-emerald-50 text-emerald-800"
      : tone === "amber"
        ? "hover:bg-amber-50 text-amber-800"
        : tone === "sky"
          ? "hover:bg-sky-50 text-sky-800"
          : "hover:bg-neutral-100 text-neutral-800";
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
        hoverText,
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
