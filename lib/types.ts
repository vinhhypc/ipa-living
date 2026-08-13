/**
 * Kiểu dữ liệu nội dung tĩnh của site, port từ `src-old/types.ts`.
 */

export type Tower = "suc-khoe" | "thinh-vuong" | "bao-an";

export type WorkshopStatus = "upcoming" | "ongoing" | "completed";

export interface Workshop {
  id: string;
  stt?: number;
  dongWorkshop?: string;
  packageName?: string;
  level?: string;
  theme?: string;
  title: string;
  description: string;
  price?: string;
  priceNumber?: number;
  duration?: string;
  capacity?: string;
  format?: string;
  host?: string;
  gift?: string;
  date?: string;
  time?: string;
  location?: string;
  image: string;
  tower: Tower;
  status: WorkshopStatus;
  spotsLeft?: number;
  note?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Tower;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export interface DstationZone {
  id: string;
  title: string;
  description: string;
  iconName: string;
  colorClass: string;
  details?: string[];
}

export type BonBepSubTab =
  | "bep-homefood"
  | "bep-hoa-vi"
  | "bep-tri-lieu"
  | "bep-delivie";

export interface BonBepSlide {
  id: string;
  subTabId?: BonBepSubTab;
  title: string;
  kitchenName: string;
  badge: string;
  badgeColor: string;
  imageUrl: string;
  caption: string;
}

export type ExpertCategory = "ca" | "anvie" | "vndgo" | "pticare";

export interface Expert {
  id: string;
  name: string;
  role: string;
  category: ExpertCategory;
  categoryLabel: string;
  avatar: string;
  experience: string;
  rating: number;
  reviewsCount: number;
  location: string;
  bio: string;
  specialties: string[];
  certifications: string[];
}

export type DstationCity = "hanoi" | "hcm" | "other";

export interface DstationLocation {
  id: string;
  orderNumber: string;
  name: string;
  address: string;
  phone?: string;
  city: DstationCity;
  cityName: string;
  province?: string;
  district?: string;
  category?: "dstation" | "hoavi" | "shop";
  mapsLink?: string;
  facebookLink?: string;
}
