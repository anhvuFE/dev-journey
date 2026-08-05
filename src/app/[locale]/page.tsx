import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata, SITE_URL, SITE_NAME } from "@/lib/seo";
import { profile } from "@/data/profile";
import JsonLd from "@/components/JsonLd";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import ConstellationBg from "@/components/ConstellationBg";
import Hero from "@/components/sections/Hero";
import JourneyTimeline from "@/components/sections/JourneyTimeline";
import ChaptersSection from "@/components/sections/ChaptersSection";
import GrowthDiff from "@/components/sections/GrowthDiff";
import StatsSection from "@/components/sections/StatsSection";
import SiteFooter from "@/components/sections/SiteFooter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    path: "",
    title: t("title"),
    description: t("description"),
    absoluteTitle: true,
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/${locale}`,
        name: SITE_NAME,
        inLanguage: locale === "vi" ? "vi-VN" : "en-US",
        description: t("description"),
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Vũ Xuân Anh",
        alternateName: "anhvuFE",
        jobTitle: "Full Stack Developer",
        url: `${SITE_URL}/${locale}/about`,
        sameAs: [
          profile.links.github,
          profile.links.linkedin,
          profile.links.portfolio,
          profile.links.facebook,
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ScrollProgress />
      <SmoothScroll />
      <ConstellationBg color="#c6ff3d" />
      <main id="main" tabIndex={-1} className="relative z-10 flex-1 outline-none">
        <Hero />
        <JourneyTimeline />
        <ChaptersSection />
        <GrowthDiff locale={locale as "vi" | "en"} />
        <StatsSection />
      </main>
      <div className="relative z-10">
        <SiteFooter />
      </div>
    </>
  );
}
