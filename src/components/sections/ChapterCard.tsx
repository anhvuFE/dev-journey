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

  return (
    <motion.div
      data-theme={chapter.theme.key}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/chapters/${chapter.id}`}
        className="group flex items-center gap-5 border-b border-border py-8 transition-[padding] duration-300 hover:pl-3 md:gap-10"
      >
        <span className="w-10 shrink-0 font-mono text-sm tabular-nums text-accent-c md:w-16 md:text-base">
          {String(chapter.order).padStart(2, "0")}
        </span>

        <div className="flex-1">
          <h3 className="text-2xl font-extrabold uppercase leading-none tracking-tight transition-colors duration-200 group-hover:text-accent-c md:text-5xl">
            {chapter.title[locale]}
          </h3>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-[15px]">
            {chapter.tagline[locale]}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground/70">
            {chapter.repos.slice(0, 4).map((r) => (
              <span key={r.name}>{r.name}</span>
            ))}
          </div>
        </div>

        <span
          aria-hidden
          className="shrink-0 text-2xl text-accent-c opacity-25 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 md:text-3xl"
        >
          →
        </span>
      </Link>
    </motion.div>
  );
}
