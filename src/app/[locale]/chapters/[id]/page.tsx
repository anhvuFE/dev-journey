import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { chapters, getChapter } from "@/data/chapters";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/Reveal";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import ChapterScrollStory from "@/components/ChapterScrollStory";
import CodeBlock from "@/components/CodeBlock";
import ConstellationBg from "@/components/ConstellationBg";

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

  const t = await getTranslations("chapters");
  const back = await getTranslations("footer");
  const num = String(chapter.order).padStart(2, "0");
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

        {/* Masthead */}
        <header className="mt-12 border-t border-border pt-8">
          <div className="flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span>
              Chương {num} <span className="opacity-40">/ 07</span>
            </span>
            <span className="text-accent-c">{chapter.theme.mood[locale]}</span>
          </div>
          <h1 className="mt-7 text-4xl font-extrabold uppercase leading-[1.03] tracking-tight md:text-7xl">
            {chapter.title[locale]}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            {chapter.tagline[locale]}
          </p>
          <span
            className="mt-8 block h-1 w-16"
            style={{ background: "var(--c-accent)" }}
          />
        </header>

        {chapter.intro ? (
          <p className="mt-12 max-w-2xl text-xl font-medium leading-relaxed">
            {chapter.intro[locale]}
          </p>
        ) : null}

        {/* Cốt truyện (GSAP scrollytelling) */}
        <div className="mt-12 max-w-2xl">
          <ChapterScrollStory paragraphs={chapter.story[locale]} />
        </div>

        {/* Bài học */}
        <section className="mt-20">
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
            {t("lessons")}
          </h2>
          <div className="mt-6 border-t border-border">
            {chapter.lessons.map((lesson, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="grid gap-3 border-b border-border py-7 md:grid-cols-[3rem_1fr]">
                  <span
                    className="font-mono text-lg font-bold"
                    style={{ color: "var(--c-accent)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold md:text-xl">
                      {lesson.title[locale]}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                      {lesson.body[locale]}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Tips / lỗi hay mắc */}
        {chapter.tips && chapter.tips.length > 0 ? (
          <section className="mt-20">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
              {locale === "vi" ? "Lỗi hay mắc & mẹo" : "Common pitfalls & tips"}
            </h2>
            <div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2">
              {chapter.tips.map((tip, i) => (
                <Reveal key={i}>
                  <div className="h-full bg-background p-6">
                    <h3 className="font-bold">{tip.title[locale]}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {tip.body[locale]}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}

        {/* Dự án */}
        <section className="mt-20">
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
            {t("projects")}
          </h2>
          <div className="mt-6 border-t border-border">
            {chapter.repos.map((repo) => (
              <Reveal key={repo.name}>
                <article className="border-b border-border py-8">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-mono text-base font-bold md:text-lg">
                      {repo.name}
                    </h3>
                    {repo.commits ? (
                      <span className="shrink-0 font-mono text-xs text-muted-foreground">
                        {repo.commits} {t("commits")}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                    {repo.blurb[locale]}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {repo.stack.map((s) => (
                      <span
                        key={s}
                        className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                    {repo.privacy === "client" ? (
                      <span className="px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground/60">
                        · {t("clientBadge")}
                      </span>
                    ) : null}
                  </div>

                  {/* CODE THẬT — nhân vật chính, đưa lên ngay */}
                  {repo.snippet ? (
                    <CodeBlock
                      code={repo.snippet.code}
                      file={repo.snippet.file}
                      lang={repo.snippet.lang}
                    />
                  ) : null}

                  {repo.caseStudy ? (
                    <div className="mt-3 grid gap-4 md:grid-cols-2">
                      <div
                        className="border-l-2 pl-4"
                        style={{ borderColor: "var(--c-accent)" }}
                      >
                        <p className="font-mono text-[11px] uppercase tracking-wider text-accent-c">
                          {locale === "vi" ? "Thử thách" : "The challenge"}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {repo.caseStudy.challenge[locale]}
                        </p>
                      </div>
                      <div className="border-l-2 border-border pl-4">
                        <p className="font-mono text-[11px] uppercase tracking-wider">
                          {locale === "vi" ? "Cách xử lý" : "The fix"}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {repo.caseStudy.fix[locale]}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {repo.commitsShown && repo.commitsShown.length > 0 ? (
                    <div className="mt-5 space-y-1">
                      {repo.commitsShown.map((c, j) => (
                        <div
                          key={j}
                          className="flex items-start gap-2 font-mono text-xs text-muted-foreground"
                        >
                          <span className="text-accent-c">$</span>
                          <span>git commit -m &quot;{c}&quot;</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Điều hướng chương kế tiếp */}
        {next ? (
          <Link
            href={`/chapters/${next.id}`}
            data-theme={next.theme.key}
            className="group mt-20 flex items-center justify-between border-t border-border pt-8"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Chương tiếp theo — {String(next.order).padStart(2, "0")}
              </span>
              <div className="mt-2 text-2xl font-extrabold uppercase tracking-tight transition-colors group-hover:text-accent-c md:text-3xl">
                {next.title[locale]}
              </div>
            </div>
            <ArrowRight className="h-7 w-7 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent-c" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
