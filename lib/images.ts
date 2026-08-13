/**
 * Trong quá trình migrate từ `src-old`, mọi ảnh Unsplash remote đã được tải về
 * `public/images/unsplash/photo-<id>.jpg` (xem `scripts/download-unsplash.mjs`).
 * Helper này nhận URL Unsplash gốc và trả về đường dẫn ảnh local tương ứng,
 * để không phải sửa tay từng URL rải rác trong nội dung.
 */
export function localImage(url: string): string {
  const id = url.match(/photo-([a-z0-9]+)/i)?.[1];
  return id ? `/images/unsplash/photo-${id}.jpg` : url;
}
