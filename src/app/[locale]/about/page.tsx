import { setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import ConstellationBg from "@/components/ConstellationBg";
import Certificates from "@/components/sections/Certificates";
import AboutIntro from "@/components/about/AboutIntro";
import StatGrid from "@/components/about/StatGrid";
import SkillList from "@/components/about/SkillList";
import ContactLinks from "@/components/about/ContactLinks";
import { aboutCopy, type Locale } from "@/data/about";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = aboutCopy[locale];

  return (
    <div
      data-theme="growing-up"
      className="relative min-h-screen bg-background text-foreground"
    >
      <ConstellationBg color="#a3e635" />
      <ScrollProgress />
      <SmoothScroll />

      <div className="relative z-10 mx-auto max-w-5xl px-5 pt-24 pb-14 md:pt-28 md:pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {c.back}
        </Link>

        <AboutIntro kicker={c.kicker} body={c.body} locale={locale} />
        <StatGrid stats={c.stats} />
        <SkillList label={c.skillsLabel} />
        <Certificates />
        <ContactLinks label={c.connectLabel} />
      </div>
    </div>
  );
}
