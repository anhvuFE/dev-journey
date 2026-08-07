import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { chapters } from "@/data/chapters";
import { pageMetadata } from "@/lib/seo";
import ConstellationBg from "@/components/ConstellationBg";
import type { Proj } from "@/components/sections/ProjectsExplorer";
import ProjectsView from "@/components/sections/ProjectsView";

type Locale = "vi" | "en";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/projects",
    title: locale === "vi" ? "Dự án" : "Projects",
    description:
      locale === "vi"
        ? "Tất cả dự án trong hành trình — lọc theo công nghệ và loại (cá nhân / thương mại)."
        : "Every project from the journey — filter by tech and type (personal / client).",
  });
}

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ tech?: string }>;
}) {
  const { locale } = await params;
  const { tech } = await searchParams;
  setRequestLocale(locale);
  const L = locale === "vi";

  const projects: Proj[] = chapters.flatMap((c) =>
    c.repos.map((r) => ({
      name: r.name,
      blurb: r.blurb[locale],
      stack: [...r.stack],
      privacy: r.privacy,
      chapterId: c.id,
      chapterOrder: c.order,
      chapterTitle: c.title[locale],
      accent: c.theme.accent,
    })),
  );

  return (
    <div
      id="main"
      tabIndex={-1}
      className="relative min-h-screen bg-background text-foreground outline-none"
    >
      <ConstellationBg color="#c6ff3d" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-24 pb-14 md:pt-28 md:pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {L ? "Về trang chủ" : "Back home"}
        </Link>

        <header className="mt-12 border-t border-border pt-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
            {L ? "Kho dự án" : "Project index"}
          </p>
          <h1 className="mt-6 text-4xl font-extrabold uppercase leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
            {L ? "Dự án" : "Projects"}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {L
              ? "Tất cả dự án rải trong 7 chương, gom về một chỗ. Lọc theo công nghệ hoặc loại để xem nhanh."
              : "Every project scattered across the 7 chapters, gathered here. Filter by tech or type to browse fast."}
          </p>
        </header>

        <ProjectsView projects={projects} initialTech={tech ?? null} />
      </div>
    </div>
  );
}
