import { getTranslations } from "next-intl/server";
import { chapters } from "@/data/chapters";
import ChapterCard from "./ChapterCard";

export default async function ChaptersSection() {
  const t = await getTranslations("chapters");

  return (
    <section id="chapters" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-3xl font-extrabold uppercase tracking-tight sm:text-5xl">
          {t("sectionTitle")}
        </h2>
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {t("sectionKicker")} · 07
        </span>
      </div>

      <div className="rule mt-6" />

      <ol>
        {chapters.map((chapter, i) => (
          <li key={chapter.id}>
            <ChapterCard chapter={chapter} index={i} />
          </li>
        ))}
      </ol>
    </section>
  );
}
