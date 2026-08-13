/**
 * Nhúng một khối JSON-LD structured data. Dùng trong `page.tsx` (Server
 * Component) cho BreadcrumbList, Article, Event...
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
