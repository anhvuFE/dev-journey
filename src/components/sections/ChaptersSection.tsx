import { getTranslations } from "next-intl/server";
import { chapters } from "@/data/chapters";
import ChapterCard from "./ChapterCard";

export default async function ChaptersSection() {
  const t = await getTranslations("chapters");

  return (
    <section id="chapters" className="relative mx-auto max-w-6xl px-5 py-28">
      <div className="mb-14 text-center">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {t("sectionKicker")}
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("sectionTitle")}
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.map((chapter, i) => (
          <ChapterCard key={chapter.id} chapter={chapter} index={i} />
        ))}
      </div>
    </section>
  );
}
