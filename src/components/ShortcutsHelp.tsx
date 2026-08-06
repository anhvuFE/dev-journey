"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

/** Overlay phím tắt — bấm "?" để mở. */
export default function ShortcutsHelp() {
  const [open, setOpen] = useState(false);
  const L = useLocale() === "vi";
  const prevFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if (e.key === "?" && !typing) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    prevFocus.current = document.activeElement as HTMLElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      prevFocus.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  const rows: { keys: string[]; desc: string }[] = [
    { keys: ["⌘K", "Ctrl K"], desc: L ? "Bảng lệnh — nhảy trang/chương" : "Command palette" },
    { keys: ["`"], desc: L ? "Terminal (easter egg)" : "Terminal (easter egg)" },
    { keys: ["←", "→"], desc: L ? "Chương trước / sau" : "Previous / next chapter" },
    { keys: ["?"], desc: L ? "Bảng phím tắt này" : "This shortcuts panel" },
    { keys: ["Esc"], desc: L ? "Đóng" : "Close" },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={L ? "Phím tắt" : "Keyboard shortcuts"}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md border border-border bg-[#0d0d0d] p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
            {L ? "Phím tắt" : "Shortcuts"}
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={L ? "Đóng" : "Close"}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            ✕
          </button>
        </div>
        <ul className="mt-5 space-y-3">
          {rows.map((r, i) => (
            <li key={i} className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">{r.desc}</span>
              <span className="flex shrink-0 gap-1.5">
                {r.keys.map((k) => (
                  <kbd
                    key={k}
                    className="rounded-[3px] border border-border px-2 py-1 font-mono text-[11px] text-foreground"
                  >
                    {k}
                  </kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
