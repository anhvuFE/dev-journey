import { setRequestLocale } from "next-intl/server";
import SmoothScroll from "@/components/SmoothScroll";
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
      <SmoothScroll />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <ChaptersSection />
      </main>
      <SiteFooter />
    </>
  );
}
