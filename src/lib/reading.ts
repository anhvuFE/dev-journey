import type { Chapter } from "@/data/chapters";

/** Ước lượng số phút đọc một chương (~200 từ/phút). */
export function readingMinutes(c: Chapter, locale: "vi" | "en"): number {
  const parts: string[] = [];
  if (c.intro) parts.push(c.intro[locale]);
  parts.push(...c.story[locale]);
  c.lessons.forEach((l) => parts.push(l.title[locale], l.body[locale]));
  c.tips?.forEach((t) => parts.push(t.title[locale], t.body[locale]));
  const words = parts.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
