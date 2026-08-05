import { getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import type { Lesson } from "@/data/chapters";

export default async function LessonList({
  lessons,
  locale,
}: {
  lessons: Lesson[];
  locale: "vi" | "en";
}) {
  const t = await getTranslations("chapters");
  return (
    <section className="mt-20">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
        {t("lessons")}
      </h2>
      <div className="mt-6 border-t border-border">
        {lessons.map((lesson, i) => (
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
  );
}
