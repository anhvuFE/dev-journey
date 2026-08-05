"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { chapters } from "@/data/chapters";
import { readChaptersRead, READ_EVENT } from "@/lib/progress";

/** Vòng tiến độ "đã đọc X/N chương" — chỉ hiện sau khi đọc ít nhất 1 chương. */
export default function ChapterProgress() {
  const total = chapters.length;
  const [count, setCount] = useState(0);
  const L = useLocale() === "vi";

  useEffect(() => {
    const sync = () => setCount(readChaptersRead().size);
    sync();
    window.addEventListener(READ_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(READ_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (count === 0) return null;

  const r = 9;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(count / total, 1);
  const done = count >= total;

  return (
    <div
      className="flex items-center gap-1.5"
      title={
        L
          ? `Bạn đã đọc ${count}/${total} chương`
          : `You've read ${count}/${total} chapters`
      }
      aria-label={
        L
          ? `Đã đọc ${count} trên ${total} chương`
          : `Read ${count} of ${total} chapters`
      }
    >
      <svg width="22" height="22" viewBox="0 0 24 24" className="-rotate-90">
        <circle cx="12" cy="12" r={r} fill="none" stroke="var(--border)" strokeWidth="2.5" />
        <circle
          cx="12"
          cy="12"
          r={r}
          fill="none"
          stroke="var(--neon)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
          style={{
            transition: "stroke-dashoffset 0.6s cubic-bezier(0.22,1,0.36,1)",
            filter: done ? "drop-shadow(0 0 4px var(--neon))" : undefined,
          }}
        />
      </svg>
      <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
        {count}/{total}
      </span>
    </div>
  );
}
