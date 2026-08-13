# Kế hoạch migrate `src-old` (Vite React SPA) → Next.js App Router

> Quyết định đã chốt với chủ dự án (2026-08-28):
> 1. **Thay hoàn toàn** code hiện tại trong `app/`, `components/`, `lib/` bằng bản port từ `src-old`.
>    Giữ hạ tầng: `app/globals.css` (design tokens), self-host font, providers, `next.config`, cập nhật lại `sitemap`/`robots`.
> 2. **Font Inter-only self-host** — không thêm Google Fonts. `--font-display`/`--font-serif` map về Inter.
> 3. **Tải ảnh Unsplash về `public/images/`**, dùng `next/image`. Bỏ `remotePatterns` Unsplash sau khi xong.
> 4. **Route canonical + redirect alias** (301 trong `next.config`). Detail dùng route động.
> 5. Data tĩnh trong `lib/` — không React Query / services / API.
> 6. Form submit → Next.js Server Action (chỉ log + trả success) làm stub.
> 7. SEO đầy đủ: metadata + canonical + OG/Twitter + JSON-LD (Organization, WebSite, BreadcrumbList, Article, Event) + sitemap động + semantic HTML + alt text.
> 8. Component theo AGENTS.md (shadcn/base-ui + CVA), bỏ phần code antd trong `.trae/*` chỉ giữ nguyên tắc.

## Route map

| Canonical route | Nguồn `src-old` | Alias → redirect 301 |
|---|---|---|
| `/` | `pages/Home.tsx` | — |
| `/ve-ipa-living` | `pages/VeIpaLiving.tsx` | — |
| `/suc-khoe` | `pages/SucKhoe.tsx` | `/anvie` |
| `/anvie-gobio` | `pages/AnvieGobioDetail.tsx` | `/gobio` |
| `/anvie-health` | `pages/AnvieHealthDetail.tsx` | `/health` |
| `/anvie-life` | `pages/AnvieLifeDetail.tsx` | `/life` |
| `/thinh-vuong` | `pages/ThinhVuong.tsx` | `/vndgo` |
| `/bao-an` | `pages/BaoAn.tsx` | `/pticare` |
| `/diem-cham` | `pages/DiemCham.tsx` | `/dstation` |
| `/tri-thuc` | `pages/DiemCham.tsx` (sub-tab `tri-thuc`) | `/blog` |
| `/d-one` | `pages/DOne.tsx` | — |
| `/d-care` | `pages/DCare.tsx` | — |
| `/tuyen-dung-ca` | `pages/DCare.tsx` (tab `recruitment`) / `pages/TuyenDungCA.tsx` | — |
| `/pti-sos` | `pages/PtiSos.tsx` | — |
| `/pti-health` | `pages/PtiHealth.tsx` | — |
| `/pti-commercial` | `pages/PtiCommercial.tsx` | — |
| `/pti-homes` | `pages/PtiHomes.tsx` | — |
| `/workshop/[id]` | `pages/WorkshopDetail.tsx` | `/workshop-detail` → `/diem-cham#workshop` |
| `/tri-thuc/[id]` | `pages/ArticleDetail.tsx` | `/bai-viet-chi-tiet`, `/article-detail`, `/tri-thuc-chi-tiet` |

Hash-section cũ (`?activeHash`) → anchor `#id` thật + scroll mượt (đã có `scroll-behavior: smooth`).
`onNavigate(path, hash)` → `<Link href={hash ? `${path}#${hash}` : path}>`.

## Các phase thực thi

- **P0 — Foundation:** ✅ `lib/routes.ts` (route map + `legacyRedirects`), `next.config.ts` redirects 301, `lib/types.ts`, `lib/data.ts` (port từ `src-old/data.ts`), `lib/images.ts` (`localImage`), `scripts/download-unsplash.mjs` + tải ảnh về `public/images/unsplash/`, cập nhật `app/sitemap.ts` + `app/robots.ts`, `tsconfig` exclude `src-old`/`scripts`.
- **P1 — Shared shell:** ✅ `components/layout/site-header.tsx` + `site-footer.tsx` port theo nav src-old (Về IPA Living / Dstation / D-One / D-Care). Giữ logo thật `IpaLivingMark` (không dùng text-logo src-old — trái rule brand asset). `IpaLivingLogo` không cần.
- **P2 — Primitives & shared components:** ✅ `components/marketing/`: `workshop-card` (Link→/workshop/[id], không modal), `knowledge-card`, `tower-card` (client), `map-section` (client), `bon-bep-carousel` (client), `registration-form` (client + `lib/actions/registration.ts` Server Action stub). Thêm token `--color-facebook{,-dark}`. `BON_BEP_SLIDES` → `lib/data.ts`.
- **P3 — Pages nhóm 1:** ✅ Home · SucKhoe · ThinhVuong · BaoAn · VeIpaLiving (data-driven BranchSection, tab filter client). Build+lint xanh.
  - Thêm token `--color-brand-brown{,-dark}`.
  - `components/seo/json-ld.tsx` — `<JsonLd>` cho BreadcrumbList/Article/Event từng trang.
  - `components/marketing/workshop-interest-modal.tsx` — modal lead generic (name/phone/email + selects cấu hình + message optional), Server Action `submitWorkshopInterest` (log mọi field).

### Ảnh Unsplash bị xoá (404) — cần thay khi port trang tương ứng
- `photo-1594824813598` — avatar trong `src-old/pages/DCare.tsx:136`
- `photo-1486006920555` — ảnh nội dung `src-old/pages/PtiSos.tsx:461`
Thay bằng photo-id Unsplash khác còn sống + thêm vào `scripts/download-unsplash.mjs` domain list / tải thủ công.
- **P4 — Pages nhóm 2:** ✅ DiemCham (`components/marketing/diem-cham-view.tsx` client — tabs + hash sync + filters + search; dùng lại MapSection/WorkshopCard/KnowledgeCard). `/tri-thuc` = DiemCham initialTab. `/workshop/[id]` (server + `workshop-registration.tsx` client modal + ticket, JSON-LD Event, generateStaticParams). `/tri-thuc/[id]` (server + `article-actions.tsx` client, JSON-LD Article). Xoá `app/workshop-detail/`, `lib/site-content.ts`, `lib/site-data.ts`. Redirect `:id` alias thêm vào `legacyRedirects`.
  - Quy tắc lint: `react/no-unescaped-entities` — quote thẳng trong JSX text phải là `“ ”` hoặc `{`“${x}”`}`.
- **P5 — Pages nhóm 3:** ✅ DOne (`d-one-view.tsx` client — tab member/supplier + 2 form dùng `submitWorkshopInterest`). DCare (`d-care-view.tsx` client — expert filter/search + booking modal + recruitment form; `EXPERTS` + type `Expert` vào lib). TuyenDungCA (`tuyen-dung-ca-view.tsx` server + `RegistrationForm`). Ảnh chết `photo-1594824813598` (exp-6) → thay bằng `photo-1622253692010`.
  - Lint: `react-hooks/set-state-in-effect` — hash-sync effect phải qua hàm `syncFromHash()` gọi trong effect, không gọi `setState` trực tiếp trong body.
- **P6 — Pages nhóm 4:** ✅ PtiCommercial (server) · PtiHomes (server + `lead-form.tsx`) · PtiHealth (client tabs 3 SP) · PtiSos (client, 9 SP / 3 tầng + scrollspy + product-select form) · AnvieGobio (client, 3 section + 5 bio cat + Bếp Bio 4 sub-tab, data-driven) · AnvieHealth (client 4 tab) · AnvieLife (client 2 tab). Ảnh chết `photo-1486006920555` (PtiSos hero) → `photo-1516549655169`. `lead-form.tsx` reusable. **36 route, build + lint xanh.**
- **P7 — SEO layer:** ✅ (làm dần trong P3–P6) `buildMetadata()` mọi page + canonical + OG/Twitter; JSON-LD Organization + WebSite (layout), BreadcrumbList (mọi page), Article (`/tri-thuc/[id]`), Event (`/workshop/[id]`); `sitemap.ts` động; `robots.ts`; `lang="vi"`, semantic HTML, alt text.
- **P8 — Dọn dẹp:** ⏳ Đã xoá orphan (`components/home/towers/`, `hash-scroll`, `brand/ipa-logo`, `motion/reveal`), `lib/site-content|site-data`, `app/workshop-detail/`. Còn: verify browser preview; `src-old/` giữ lại theo yêu cầu chủ dự án.

## Quy tắc port (bắt buộc)

- Không `p-[7px]`/`top-[64px]`/hex thô. Chỉ Tailwind scale util hoặc `[var(--token)]` trong `globals.css`.
  - `bg-[#FAF7F0]` → `bg-neutral-50`; `border-[#EAE3D2]` → `border-neutral-200`; `#5C8F3E` → `text-brand-green`/`primary-500`; `#EB8421`/`#EB8421` → `brand-gold`.
- `motion/react` giữ nguyên (đã có `motion` trong deps) — bọc `prefers-reduced-motion`, để trong Client Component nhỏ.
- Trang mặc định Server Component; tách phần tương tác (tab, accordion, carousel, form, menu) thành Client island `"use client"`.
- `<img>` → `next/image` với `width`/`height` hoặc `fill` + container ratio.
- Semantic: `<nav> <main> <section> <button> <label>`, 1 `<h1>`/trang.
