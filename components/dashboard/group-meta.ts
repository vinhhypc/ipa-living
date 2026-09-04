import {
  Briefcase,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Users2,
  type LucideIcon,
} from "lucide-react";

type GroupStyle = {
  icon: LucideIcon;
  /** Nền đậm (chip icon active, thanh accent). */
  solid: string;
  /** Nền nhạt + chữ (chip icon mặc định, badge nhóm, header bảng). */
  soft: string;
  /** Chữ màu nhóm (trên nền sáng). */
  text: string;
  /** Chữ/icon sáng hơn để đặt trên nền tối (sidebar navy). */
  onDark: string;
  /** Viền trên card / gạch chân header bảng (border-*). */
  border: string;
  /** Gradient nền cho banner trang bảng. */
  gradient: string;
  /** Ring/viền mảnh cùng tông. */
  ring: string;
};

/**
 * Màu mỗi nhóm bám theo nhận diện thương hiệu bên trang người dùng:
 * - Workshop  → vàng cam Dstation (brand-gold)
 * - PTI       → xanh dương PTI / "protection" (#0357bf)
 * - D-One     → xanh ngọc D-One (brand-emerald #006045)
 * - D-Care    → xanh AnVie / "health" — chăm sóc sức khoẻ
 * - Tuyển dụng → navy IPA corporate (brand-navy)
 */
export const GROUP_STYLE: Record<string, GroupStyle> = {
  Workshop: {
    icon: Sparkles,
    solid: "bg-amber-500 text-white",
    soft: "bg-amber-50 text-amber-700",
    text: "text-amber-600",
    onDark: "text-amber-300",
    border: "border-amber-400",
    gradient: "from-amber-500 to-orange-600",
    ring: "ring-amber-500/20",
  },
  PTI: {
    icon: ShieldCheck,
    solid: "bg-blue-600 text-white",
    soft: "bg-blue-50 text-blue-700",
    text: "text-blue-600",
    onDark: "text-blue-300",
    border: "border-blue-500",
    gradient: "from-blue-600 to-blue-800",
    ring: "ring-blue-500/20",
  },
  "D-One": {
    icon: Users2,
    solid: "bg-emerald-600 text-white",
    soft: "bg-emerald-50 text-emerald-700",
    text: "text-emerald-600",
    onDark: "text-emerald-300",
    border: "border-emerald-500",
    gradient: "from-emerald-600 to-teal-700",
    ring: "ring-emerald-500/20",
  },
  "D-Care": {
    icon: HeartPulse,
    solid: "bg-teal-600 text-white",
    soft: "bg-teal-50 text-teal-700",
    text: "text-teal-600",
    onDark: "text-teal-300",
    border: "border-teal-500",
    gradient: "from-teal-600 to-emerald-700",
    ring: "ring-teal-500/20",
  },
  "Tuyển dụng": {
    icon: Briefcase,
    solid: "bg-slate-700 text-white",
    soft: "bg-slate-100 text-slate-700",
    text: "text-slate-600",
    onDark: "text-slate-300",
    border: "border-slate-500",
    gradient: "from-slate-700 to-slate-900",
    ring: "ring-slate-500/20",
  },
};

const FALLBACK: GroupStyle = {
  icon: Sparkles,
  solid: "bg-slate-700 text-white",
  soft: "bg-slate-100 text-slate-700",
  text: "text-slate-600",
  onDark: "text-slate-300",
  border: "border-slate-400",
  gradient: "from-slate-600 to-slate-800",
  ring: "ring-slate-500/20",
};

export function groupStyle(group: string): GroupStyle {
  return GROUP_STYLE[group] ?? FALLBACK;
}
