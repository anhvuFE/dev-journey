"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLocale } from "next-intl";

/** Bật/tắt chế độ đọc tập trung (ẩn header, nền chòm sao, con trỏ neon). */
export default function FocusModeToggle() {
  const [on, setOn] = useState(false);
  const L = useLocale() === "vi";

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("focus-reading", on);
    return () => root.classList.remove("focus-reading");
  }, [on]);

  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      className="fixed right-5 top-5 z-[70] inline-flex items-center gap-2 border border-border bg-background/80 px-3 py-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground backdrop-blur transition-colors hover:border-accent-c hover:text-accent-c"
    >
      {on ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      {on ? (L ? "Thoát tập trung" : "Exit focus") : L ? "Đọc tập trung" : "Focus"}
    </button>
  );
}
