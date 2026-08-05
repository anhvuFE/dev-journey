import { setRequestLocale } from "next-intl/server";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import ConstellationBg from "@/components/ConstellationBg";
import SiteHeader from "@/components/sections/SiteHeader";
import Hero from "@/components/sections/Hero";
import ChaptersSection from "@/components/sections/ChaptersSection";
import SiteFooter from "@/components/sections/SiteFooter";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ScrollProgress />
      <SmoothScroll />
      <ConstellationBg color="#c6ff3d" />
      <SiteHeader />
      <main className="relative z-10 flex-1">
        <Hero />
        <ChaptersSection />
      </main>
      <div className="relative z-10">
        <SiteFooter />
      </div>
    </>
  );
}
