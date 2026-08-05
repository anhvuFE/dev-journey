import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { chapters, getChapter } from "@/data/chapters";
import { Link } from "@/i18n/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import ChapterScrollStory from "@/components/ChapterScrollStory";
import ConstellationBg from "@/components/ConstellationBg";
import ChapterHeader from "@/components/chapter/ChapterHeader";
import LessonList from "@/components/chapter/LessonList";
import TipsGrid from "@/components/chapter/TipsGrid";
import ProjectList from "@/components/chapter/ProjectList";
import NextChapterLink from "@/components/chapter/NextChapterLink";

export function generateStaticParams() {
  return chapters.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "vi" | "en"; id: string }>;
}) {
  const { locale, id } = await params;
  const chapter = getChapter(id);
  if (!chapter) return {};
  return { title: chapter.title[locale], description: chapter.tagline[locale] };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ locale: "vi" | "en"; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const chapter = getChapter(id);
  if (!chapter) notFound();

  const back = await getTranslations("footer");
  const idx = chapters.findIndex((c) => c.id === chapter.id);
  const next = chapters[idx + 1];

  return (
    <div
      data-theme={chapter.theme.key}
      className="relative min-h-screen bg-background text-foreground"
    >
      <ConstellationBg color={chapter.theme.accent} />
      <ScrollProgress />
      <SmoothScroll />

      <div className="relative z-10 mx-auto max-w-4xl px-5 py-14 md:py-20">
        <Link
          href="/#chapters"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {back("backHome")}
        </Link>

        <ChapterHeader chapter={chapter} locale={locale} />

        {chapter.intro ? (
          <p className="mt-12 max-w-2xl text-xl font-medium leading-relaxed">
            {chapter.intro[locale]}
          </p>
        ) : null}

        <div className="mt-12 max-w-2xl">
          <ChapterScrollStory paragraphs={chapter.story[locale]} />
        </div>

        <LessonList lessons={chapter.lessons} locale={locale} />

        {chapter.tips ? <TipsGrid tips={chapter.tips} locale={locale} /> : null}

        <ProjectList repos={chapter.repos} locale={locale} />

        {next ? <NextChapterLink next={next} locale={locale} /> : null}
      </div>
    </div>
  );
}
