/**
 * Bản đồ route chuẩn của site sau khi migrate từ `src-old` (router tự chế theo
 * `window.location`) sang Next.js App Router.
 *
 * - `routes`: các route canonical, dùng cho `<Link>`, sitemap, metadata canonical.
 * - `redirects`: alias cũ → route canonical (301), khai báo trong `next.config.ts`.
 */

export const siteUrl = "https://ipaliving.vn";

export const routes = {
  home: "/",
  veIpaLiving: "/ve-ipa-living",
  sucKhoe: "/suc-khoe",
  anvieGobio: "/anvie-gobio",
  anvieHealth: "/anvie-health",
  anvieLife: "/anvie-life",
  thinhVuong: "/thinh-vuong",
  baoAn: "/bao-an",
  diemCham: "/diem-cham",
  triThuc: "/tri-thuc",
  dOne: "/d-one",
  dCare: "/d-care",
  tuyenDungCa: "/tuyen-dung-ca",
  ptiSos: "/pti-sos",
  ptiHealth: "/pti-health",
  ptiCommercial: "/pti-commercial",
  ptiHomes: "/pti-homes",
  workshop: (id: string) => `/workshop/${id}`,
  article: (id: string) => `/tri-thuc/${id}`,
} as const;

/** Toàn bộ route tĩnh (không tham số) — nguồn cho `sitemap.ts`. */
export const staticRoutePaths: string[] = [
  routes.home,
  routes.veIpaLiving,
  routes.sucKhoe,
  routes.anvieGobio,
  routes.anvieHealth,
  routes.anvieLife,
  routes.thinhVuong,
  routes.baoAn,
  routes.diemCham,
  routes.triThuc,
  routes.dOne,
  routes.dCare,
  routes.tuyenDungCa,
  routes.ptiSos,
  routes.ptiHealth,
  routes.ptiCommercial,
  routes.ptiHomes,
];

/** Alias route cũ trong `src-old` → route canonical. Dùng cho redirect 301. */
export const legacyRedirects: { source: string; destination: string }[] = [
  { source: "/anvie", destination: routes.sucKhoe },
  { source: "/gobio", destination: routes.anvieGobio },
  { source: "/health", destination: routes.anvieHealth },
  { source: "/life", destination: routes.anvieLife },
  { source: "/vndgo", destination: routes.thinhVuong },
  { source: "/pticare", destination: routes.baoAn },
  { source: "/dstation", destination: routes.diemCham },
  { source: "/blog", destination: routes.triThuc },
  { source: "/workshop-detail", destination: `${routes.diemCham}#workshop` },
  { source: "/workshop-detail/:id", destination: "/workshop/:id" },
  { source: "/article-detail", destination: routes.triThuc },
  { source: "/article-detail/:id", destination: "/tri-thuc/:id" },
  { source: "/bai-viet-chi-tiet", destination: routes.triThuc },
  { source: "/bai-viet-chi-tiet/:id", destination: "/tri-thuc/:id" },
  { source: "/tri-thuc-chi-tiet", destination: routes.triThuc },
  { source: "/tri-thuc-chi-tiet/:id", destination: "/tri-thuc/:id" },
];
