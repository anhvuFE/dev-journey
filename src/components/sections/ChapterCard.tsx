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
        className="group relative flex items-center gap-4 overflow-hidden border-b border-border py-8 sm:gap-6 sm:py-10 md:gap-10"
      >
        {/* Số watermark khổng lồ ở nền */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 select-none font-mono text-[3.5rem] font-extrabold leading-none opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.13] sm:right-2 sm:text-[6rem] sm:opacity-[0.05] md:text-[9.5rem]"
          style={{ color: "var(--c-accent)" }}
        >
          {num}
        </span>

        {/* Số chương cỡ lớn màu accent */}
        <span
          className="relative z-10 w-12 shrink-0 font-mono text-2xl font-bold tabular-nums md:w-16 md:text-4xl"
          style={{ color: "var(--c-accent)" }}
        >
          {num}
        </span>

        <div className="relative z-10 min-w-0 flex-1 transition-transform duration-300 group-hover:translate-x-1.5">
          <h3 className="inline-block text-xl font-extrabold uppercase leading-none tracking-tight md:text-4xl">
            {chapter.title[locale]}
            {/* gạch chân accent — chỉ hiện khi hover */}
            <span
              aria-hidden
              className="mt-2 block h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              style={{ background: "var(--c-accent)" }}
            />
          </h3>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-[15px]">
            {chapter.tagline[locale]}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            {chapter.repos.slice(0, 4).map((r) => (
              <span key={r.name}>{r.name}</span>
            ))}
          </div>
        </div>

        <span
          aria-hidden
          className="relative z-10 shrink-0 text-2xl text-muted-foreground opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-c group-hover:opacity-100 md:text-3xl"
        >
          →
        </span>
      </Link>
    </motion.div>
  );
}
