import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Lightbulb, FolderGit2 } from "lucide-react";
import { chapters, getChapter } from "@/data/chapters";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/Reveal";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";

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
  return {
    title: chapter.title[locale],
    description: chapter.tagline[locale],
  };
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

  const t = await getTranslations("chapters");
  const back = await getTranslations("footer");

  return (
    <div
      data-theme={chapter.theme.key}
      className="grain relative min-h-screen"
      style={{ background: "var(--c-bg)", color: "var(--c-fg)" }}
    >
      <ScrollProgress />
      <SmoothScroll />

      {/* Vầng sáng nền theo tông chương */}
      <div
        className="pointer-events-none fixed left-1/2 top-0 -z-0 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: "var(--c-glow)" }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-5 py-20">
        <Link
          href="/#chapters"
          className="inline-flex items-center gap-2 text-sm opacity-70 transition-opacity hover:opacity-100"
        >
          <ArrowLeft className="h-4 w-4" />
          {back("backHome")}
        </Link>

        {/* Tiêu đề chương */}
        <header className="mt-10">
          <span
            className="font-mono text-6xl font-bold opacity-25"
            style={{ color: "var(--c-accent)" }}
          >
            {String(chapter.order).padStart(2, "0")}
          </span>
          <h1 className="glow-text mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {chapter.title[locale]}
          </h1>
          <p className="mt-3 text-lg" style={{ color: "var(--c-muted)" }}>
            {chapter.tagline[locale]}
          </p>
        </header>

        {/* Cốt truyện */}
        <div className="mt-14 space-y-6">
          {chapter.story[locale].map((para, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-lg leading-relaxed">{para}</p>
            </Reveal>
          ))}
        </div>

        {/* Bài học */}
        <section className="mt-16">
          <h2
            className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--c-accent)" }}
          >
            <Lightbulb className="h-4 w-4" />
            {t("lessons")}
          </h2>
          <div className="mt-6 space-y-4">
            {chapter.lessons.map((lesson, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div
                  className="rounded-2xl border border-white/10 p-5"
                  style={{
                    background:
                      "color-mix(in oklab, var(--c-accent) 8%, transparent)",
                  }}
                >
                  <h3 className="font-semibold">{lesson.title[locale]}</h3>
                  <p className="mt-1.5 text-sm" style={{ color: "var(--c-muted)" }}>
                    {lesson.body[locale]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Dự án */}
        <section className="mt-16">
          <h2
            className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--c-accent)" }}
          >
            <FolderGit2 className="h-4 w-4" />
            {t("projects")}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {chapter.repos.map((repo) => (
              <Reveal key={repo.name}>
                <div className="glow-ring h-full rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm font-semibold">
                      {repo.name}
                    </span>
                    {repo.commits ? (
                      <span
                        className="shrink-0 text-xs"
                        style={{ color: "var(--c-muted)" }}
                      >
                        {repo.commits} {t("commits")}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm" style={{ color: "var(--c-muted)" }}>
                    {repo.blurb[locale]}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {repo.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md px-1.5 py-0.5 text-[10px]"
                        style={{
                          background:
                            "color-mix(in oklab, var(--c-accent) 15%, transparent)",
                          color: "var(--c-fg)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  {repo.privacy === "client" ? (
                    <p className="mt-3 text-[11px] italic opacity-60">
                      {t("clientBadge")}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
