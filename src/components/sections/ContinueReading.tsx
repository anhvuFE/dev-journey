"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { chapters } from "@/data/chapters";
import { getLastChapter, READ_EVENT } from "@/lib/progress";

/** Pill "Đọc tiếp" — dẫn về chương đọc dở gần nhất (localStorage). */
export default function ContinueReading() {
  const locale = useLocale() as "vi" | "en";
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => setId(getLastChapter());
    sync();
    window.addEventListener(READ_EVENT, sync);
    return () => window.removeEventListener(READ_EVENT, sync);
  }, []);

  if (!id) return null;
  const c = chapters.find((x) => x.id === id);
  if (!c) return null;
  const L = locale === "vi";

  return (
    <Link
      href={`/chapters/${c.id}`}
      className="group mt-6 inline-flex items-center gap-3 border border-border px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:border-accent-c hover:text-foreground"
    >
      <span className="text-accent-c">▸</span>
      {L ? "Đọc tiếp" : "Continue"}: {String(c.order).padStart(2, "0")} ·{" "}
      <span className="normal-case tracking-normal text-foreground">
        {c.title[locale]}
      </span>
    </Link>
  );
}
