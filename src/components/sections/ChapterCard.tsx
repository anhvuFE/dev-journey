"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Chapter } from "@/data/chapters";

export default function ChapterCard({
  chapter,
  index,
}: {
  chapter: Chapter;
  index: number;
}) {
  const locale = useLocale() as "vi" | "en";
  const num = String(chapter.order).padStart(2, "0");

  return (
    <motion.div
      data-theme={chapter.theme.key}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/chapters/${chapter.id}`}
        className="group flex items-center gap-6 border-b border-border py-9 md:gap-10"
      >
        <span className="w-10 shrink-0 font-mono text-sm tabular-nums text-muted-foreground md:w-16 md:text-base">
          {num}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="inline-block text-xl font-extrabold uppercase leading-none tracking-tight md:text-4xl">
            {chapter.title[locale]}
            {/* gạch chân accent mảnh — chỉ hiện khi hover */}
            <span
              aria-hidden
              className="mt-2 block h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              style={{ background: "var(--c-accent)" }}
            />
          </h3>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-[15px]">
            {chapter.tagline[locale]}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground/60">
            {chapter.repos.slice(0, 4).map((r) => (
              <span key={r.name}>{r.name}</span>
            ))}
          </div>
        </div>

        <span
          aria-hidden
          className="shrink-0 text-2xl text-muted-foreground opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-c group-hover:opacity-100 md:text-3xl"
        >
          →
        </span>
      </Link>
    </motion.div>
  );
}
