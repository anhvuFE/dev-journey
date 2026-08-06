"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { chapters } from "@/data/chapters";
import { readChaptersRead, READ_EVENT } from "@/lib/progress";

const DONE_KEY = "dj:celebrated";

/** Ăn mừng khi người đọc hoàn thành cả N chương (hiện 1 lần). */
export default function ReaderAchievement() {
  const total = chapters.length;
  const [show, setShow] = useState(false);
  const L = useLocale() === "vi";

  useEffect(() => {
    const check = () => {
      try {
        if (localStorage.getItem(DONE_KEY)) return;
        if (readChaptersRead().size >= total) {
          localStorage.setItem(DONE_KEY, "1");
          setShow(true);
        }
      } catch {}
    };
    check();
    window.addEventListener(READ_EVENT, check);
    return () => window.removeEventListener(READ_EVENT, check);
  }, [total]);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4" role="status" aria-live="polite">
      <div className="toast-in flex max-w-md items-center gap-4 border border-accent-c/50 bg-card/95 px-5 py-4 shadow-2xl backdrop-blur">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-c text-xl text-background"
          style={{ filter: "drop-shadow(0 0 10px var(--neon))" }}
        >
          🏆
        </span>
        <div className="min-w-0">
          <p className="font-bold text-foreground">
            {L ? "Hoàn thành hành trình!" : "Journey complete!"}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {L
              ? `Bạn đã đọc hết ${total} chương. Cảm ơn đã đồng hành 💚`
              : `You've read all ${total} chapters. Thanks for reading 💚`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShow(false)}
          aria-label={L ? "Đóng" : "Close"}
          className="ml-1 shrink-0 text-muted-foreground transition-colors hover:text-foreground"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
