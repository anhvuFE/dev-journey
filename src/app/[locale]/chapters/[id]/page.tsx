import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { chapters, getChapter } from "@/data/chapters";
import { pageMetadata, SITE_URL, SITE_NAME } from "@/lib/seo";
import { profile } from "@/data/profile";
import JsonLd from "@/components/JsonLd";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import ChapterScrollStory from "@/components/ChapterScrollStory";
import ConstellationBg from "@/components/ConstellationBg";
import ChapterSidebar from "@/components/chapter/ChapterSidebar";
import KeyboardChapterNav from "@/components/chapter/KeyboardChapterNav";
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
}): Promise<Metadata> {
  const { locale, id } = await params;
  const chapter = getChapter(id);
  if (!chapter) return {};
  return pageMetadata({
    locale,
    path: `/chapters/${chapter.id}`,
    title: chapter.title[locale],
    description: chapter.intro?.[locale] ?? chapter.tagline[locale],
    type: "article",
  });
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
  const prev = chapters[idx - 1];
  const next = chapters[idx + 1];
  const num = String(chapter.order).padStart(2, "0");
  const L = locale === "vi";
  const hasTips = Boolean(chapter.tips && chapter.tips.length);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: chapter.title[locale],
    description: chapter.intro?.[locale] ?? chapter.tagline[locale],
    inLanguage: locale === "vi" ? "vi-VN" : "en-US",
    url: `${SITE_URL}/${locale}/chapters/${chapter.id}`,
    articleSection: `Chapter ${chapter.order}`,
    author: {
      "@type": "Person",
      name: "Vũ Xuân Anh",
      url: profile.links.github,
    },
    publisher: { "@type": "Person", name: "Vũ Xuân Anh" },
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: `${SITE_URL}/${locale}`,
    },
  };

  const sections = [
    { id: "story", label: L ? "Câu chuyện" : "Story" },
    { id: "lessons", label: L ? "Bài học" : "Lessons" },
    ...(hasTips ? [{ id: "tips", label: L ? "Mẹo" : "Tips" }] : []),
    { id: "projects", label: L ? "Dự án" : "Projects" },
  ];

  return (
    <div
      data-theme={chapter.theme.key}
      className="relative min-h-screen bg-background text-foreground"
    >
      <JsonLd data={jsonLd} />
      <ConstellationBg color={chapter.theme.accent} />
      <ScrollProgress />
      <SmoothScroll />
      <KeyboardChapterNav prevId={prev?.id} nextId={next?.id} />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-24 pb-14 md:pt-28 md:pb-20">
        <div className="md:grid md:grid-cols-[240px_1fr] md:gap-14 lg:gap-20">
          <ChapterSidebar
            num={num}
            title={chapter.title[locale]}
            mood={chapter.theme.mood[locale]}
            backLabel={back("backHome")}
            sections={sections}
          />

          <div className="mt-14 md:mt-2">
            <section id="story" className="scroll-mt-28">
              {chapter.intro ? (
                <p className="max-w-2xl text-xl font-medium leading-relaxed">
                  {chapter.intro[locale]}
                </p>
              ) : null}
              <div className="mt-8 max-w-2xl">
                <ChapterScrollStory paragraphs={chapter.story[locale]} />
              </div>
            </section>

            <div id="lessons" className="scroll-mt-28">
              <LessonList lessons={chapter.lessons} locale={locale} />
            </div>

            {chapter.tips ? (
              <div id="tips" className="scroll-mt-28">
                <TipsGrid tips={chapter.tips} locale={locale} />
              </div>
            ) : null}

            <div id="projects" className="scroll-mt-28">
              <ProjectList repos={chapter.repos} locale={locale} />
            </div>

            {next ? <NextChapterLink next={next} locale={locale} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
