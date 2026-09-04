import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollToButtons } from "@/components/layout/scroll-to-buttons";

/**
 * Layout cho toàn bộ trang marketing công khai — bọc header / footer / nút cuộn.
 * Khu vực `/dashboard` nằm ngoài group này nên không dính chrome của site.
 */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main className="flex-grow">{children}</main>
      <SiteFooter />
      <ScrollToButtons />
    </>
  );
}
