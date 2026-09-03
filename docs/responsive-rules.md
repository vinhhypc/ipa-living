# Responsive Rules

> Tuân thủ theo rule token của design system tại `.trae/theme-config-system-ai-rules.md` và
> `.trae/theme-config-system-design-guidelines.md`: **không dùng arbitrary px/rem cố định**
> (vd `p-[7px]`, `top-[64px]`). Chỉ dùng: (1) utility có sẵn trong thang Tailwind (`top-16`,
> `max-w-7xl`...), hoặc (2) `[var(--token-name)]` trỏ tới CSS variable đã khai báo trong
> `app/globals.css`. Không tự bịa số mới dưới bất kỳ hình thức nào.

## Mục tiêu

- Giữ UI sát `src-demo` nhưng không vỡ layout trên mobile đến `2xl`.
- Ưu tiên mobile-first, sau đó mở rộng dần theo breakpoint của Tailwind.
- Không đưa text/chức năng ra khỏi tầm nhìn chỉ để giữ layout đẹp.

## Breakpoint

- `base`: `0-639px`
- `sm`: `640-767px`
- `md`: `768-1023px`
- `lg`: `1024-1279px`
- `xl`: `1280-1535px`
- `2xl`: `>=1536px`

## Rule chung

- Container:
  - `px-4` ở `base`
  - `sm:px-6`
  - `lg:px-8`
  - `2xl:max-w-[var(--container-2xl)] 2xl:px-10` nếu màn cần breathing room — **không viết
    `max-w-[1440px]`**. `--container-2xl` (1440px) đã khai báo trong `app/globals.css`; đây
    là token layout hợp lệ vì Tailwind mặc định không có step nào khớp 1440px (`max-w-7xl` =
    1280px là gần nhất nhưng lệch đáng kể).
- Grid:
  - Không lên 2 cột ở `md` nếu text/label dài
  - Ưu tiên `grid-cols-1 lg:grid-cols-2` hoặc `grid-cols-1 xl:grid-cols-2`
  - Card dày text chỉ lên `3 cột` từ `xl`
- Typography:
  - Hero title scale theo `text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl`
  - Section title scale theo `text-2xl sm:text-3xl xl:text-4xl`
  - Không dùng `whitespace-nowrap` cho text dài trên mobile nếu không bắt buộc
- Sticky/tab bar:
  - Dùng `overflow-x-auto no-scrollbar`
  - Chip/tab cần `shrink-0`
  - Sticky offset của sub-nav bám dưới header: dùng token `top-[var(--header-h)]`
    (**không** `top-16 sm:top-20`, cũng **không** arbitrary px).
    > `--header-h` (69px) khai báo trong `app/globals.css`, là chiều cao header
    > (`components/layout/site-header.tsx`) lúc đã cuộn — thời điểm duy nhất sub-nav bám
    > vào header. Header co giãn `py-3/py-4` nên không có step Tailwind nào khớp; đây là
    > token layout hợp lệ giống `--container-2xl`. `top-16` (64px) thì header đè mất ~5px
    > mép trên thanh; `sm:top-20` (80px) thì hở ~11px. Nếu đổi layout header, cập nhật
    > `--header-h` một chỗ.
- Form:
  - Form field giữ `1 cột` đến ít nhất `lg`
  - Nút CTA full width trên mobile, auto width từ `sm` hoặc `md`
- Modal/panel:
  - `max-h-[85vh]` trên mobile — **đây là ngoại lệ hợp lệ**: `85vh` là ràng buộc theo viewport
    height (modal không được cao hơn 85% màn hình), không thuộc thang spacing/padding
    (`space-*`) mà rule token áp dụng, nên không cần snap về token.
  - `p-4 sm:p-6 lg:p-8`
  - Footer action stack trên mobile
- Image:
  - Hero image tối thiểu `h-56` trên mobile (utility có sẵn, không phải arbitrary)
  - Card image dùng tỷ lệ cố định, tránh text nhảy vì chiều cao không đều

## Ưu tiên fix

- `Header`, `Home`, `DiemCham`, `PtiSos`, `SucKhoe`
- `MapSection`, `RegistrationForm`, `WorkshopDetail`
- `WorkshopCard`, `KnowledgeCard`, `TowerCard`
