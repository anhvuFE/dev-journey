"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { MessageSquare } from "lucide-react";

// Bình luận + reaction bằng giscus (GitHub Discussions).
// Ẩn sau nút "Xem bình luận": lúc đọc & cuộn tới đáy chỉ là 1 nút -> không có
// iframe trong đường cuộn nên không bị kẹt smooth-scroll; bấm mới nạp giscus.
// data-lenis-prevent: khi đã mở, cuộn trên khu iframe dùng cuộn gốc (không kẹt).
export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const L = useLocale() === "vi";

  useEffect(() => {
    if (!open) return;
    const el = ref.current;
    if (!el || el.querySelector("script, iframe.giscus-frame")) return;
    const s = document.createElement("script");
    s.src = "https://giscus.app/client.js";
    s.async = true;
    s.crossOrigin = "anonymous";
    const attrs: Record<string, string> = {
      "data-repo": "anhvuFE/dev-journey",
      "data-repo-id": "R_kgDOTtZIZw",
      "data-category": "Announcements",
      "data-category-id": "DIC_kwDOTtZIZ84DCtCq",
      "data-mapping": "pathname",
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "bottom",
      "data-theme": "transparent_dark",
      "data-lang": L ? "vi" : "en",
      "data-loading": "lazy",
    };
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
    el.appendChild(s);
  }, [open, L]);

  return (
    <section className="mt-20">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
        {L ? "Bình luận & cảm xúc" : "Comments & reactions"}
      </h2>

      {open ? (
        <div ref={ref} data-lenis-prevent className="giscus mt-6 min-h-[140px]" />
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-6 inline-flex items-center gap-3 border border-border px-5 py-3 font-mono text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:border-accent-c hover:text-foreground"
        >
          <MessageSquare className="h-4 w-4" />
          {L ? "Xem bình luận" : "Load comments"}
        </button>
      )}
    </section>
  );
}
