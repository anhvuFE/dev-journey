import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import SiteHeader from "@/components/sections/SiteHeader";
import ClientEnhancements from "@/components/ClientEnhancements";
import "../globals.css";

// Sans grotesk (chất modern) — hỗ trợ tiếng Việt đầy đủ.
const fontSans = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  // Chỉ nạp các weight thực dùng (bỏ 900) -> nhẹ hơn
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const L = locale === "vi";
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s · ${SITE_NAME}` },
    description,
    applicationName: SITE_NAME,
    authors: [{ name: "Vũ Xuân Anh", url: "https://github.com/anhvuFE" }],
    creator: "Vũ Xuân Anh",
    publisher: "Vũ Xuân Anh",
    keywords: L
      ? ["học lập trình", "hành trình code", "full stack developer", "newbie", "Next.js", "React", "Vũ Xuân Anh", "anhvuFE"]
      : ["learn to code", "developer journey", "full stack developer", "beginner", "Next.js", "React", "Vu Xuan Anh", "anhvuFE"],
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: `/${locale}`,
      locale: L ? "vi_VN" : "en_US",
      alternateLocale: L ? "en_US" : "vi_VN",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${fontSans.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {/* Kết nối sớm tới API lịch đóng góp GitHub (dùng ở trang chủ) */}
        <link rel="preconnect" href="https://github-contributions-api.jogruber.de" />
        <link rel="dns-prefetch" href="https://github-contributions-api.jogruber.de" />
        <NextIntlClientProvider>
          <a href="#main" className="skip-link">
            {locale === "vi" ? "Tới nội dung" : "Skip to content"}
          </a>
          <SiteHeader />
          {children}
          <ClientEnhancements />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
