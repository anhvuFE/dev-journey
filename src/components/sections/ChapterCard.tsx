"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
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
  const t = useTranslations("chapters");

  return (
    <motion.div
      data-theme={chapter.theme.key}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/chapters/${chapter.id}`} className="group block">
        <div
          className="grain relative overflow-hidden rounded-3xl border border-white/10 p-8 transition-transform duration-300 group-hover:-translate-y-1"
          style={{
            background: `radial-gradient(120% 120% at 0% 0%, color-mix(in oklab, var(--c-accent) 18%, var(--c-bg)) 0%, var(--c-bg) 60%)`,
            color: "var(--c-fg)",
          }}
        >
          <div
            className="glow-ring absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-60 blur-2xl"
            style={{ background: "var(--c-glow)" }}
          />
          <div className="relative flex items-start justify-between">
            <span
              className="font-mono text-5xl font-bold opacity-30"
              style={{ color: "var(--c-accent)" }}
            >
              {String(chapter.order).padStart(2, "0")}
            </span>
            <ArrowUpRight
              className="h-6 w-6 opacity-40 transition-all group-hover:rotate-45 group-hover:opacity-100"
              style={{ color: "var(--c-accent)" }}
            />
          </div>

          <h3 className="glow-text relative mt-6 text-2xl font-bold tracking-tight">
            {chapter.title[locale]}
          </h3>
          <p
            className="relative mt-2 text-sm"
            style={{ color: "var(--c-muted)" }}
          >
            {chapter.tagline[locale]}
          </p>

          <div className="relative mt-6 flex flex-wrap gap-2">
            {chapter.repos.slice(0, 4).map((r) => (
              <span
                key={r.name}
                className="rounded-full border border-white/15 px-2.5 py-1 text-[11px]"
                style={{ color: "var(--c-muted)" }}
              >
                {r.name}
              </span>
            ))}
          </div>

          <span
            className="relative mt-6 inline-flex items-center gap-1 text-sm font-medium"
            style={{ color: "var(--c-accent)" }}
          >
            {t("read")}
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
