import type { Metadata } from "next";

import { SITE_NAME, organizationJsonLd } from "@/lib/seo";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollToButtons } from "@/components/layout/scroll-to-buttons";
import { MotionProvider } from "@/components/providers/motion-provider";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ipaliving.vn"),
  title: {
    default: "IPA Living | Hệ sinh thái Wellbeing Việt Nam",
    template: "%s | IPA Living",
  },
  description:
    "IPA Living kết nối Sống Khỏe (AnVie), Thịnh Vượng (VNDIRECT) và Bảo An (PTI) thành một hệ sinh thái Wellbeing hiện đại dành cho gia đình Việt.",
  keywords: [
    "IPA Living",
    "wellbeing",
    "sức khỏe",
    "thịnh vượng",
    "bảo an",
    "AnVie",
    "VNDIRECT",
    "PTI",
    "workshop wellbeing",
    "Dstation",
  ],
  applicationName: SITE_NAME,
  openGraph: {
    title: "IPA Living | Hệ sinh thái Wellbeing Việt Nam",
    description:
      "Ba trụ cột Sức Khỏe, Thịnh Vượng và Bảo An trong một hệ sinh thái Wellbeing duy nhất.",
    siteName: SITE_NAME,
    type: "website",
    locale: "vi_VN",
    url: "https://ipaliving.vn",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="min-h-full antialiased" lang="vi">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <MotionProvider>
          <SiteHeader />
          <main className="flex-grow">{children}</main>
          <SiteFooter />
          <ScrollToButtons />
        </MotionProvider>
      </body>
    </html>
  );
}
