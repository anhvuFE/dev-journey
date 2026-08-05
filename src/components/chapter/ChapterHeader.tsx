import type { Chapter } from "@/data/chapters";

export default function ChapterHeader({
  chapter,
  locale,
}: {
  chapter: Chapter;
  locale: "vi" | "en";
}) {
  const num = String(chapter.order).padStart(2, "0");
  return (
    <header className="mt-12 border-t border-border pt-8">
      <div className="flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <span>
          {locale === "vi" ? "Chương" : "Chapter"} {num}{" "}
          <span className="opacity-40">/ 07</span>
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
  );
}
