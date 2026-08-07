"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

/**
 * Bảng lưu bút bằng giscus, bind vào MỘT discussion chung ("guestbook",
 * category General) qua mapping=specific -> mọi người ký cùng một chỗ.
 * Trên trang riêng nên cuộn trang = cuộn giscus, không kẹt như khi nhúng
 * giữa chương; data-lenis-prevent để cuộn trong iframe dùng cuộn gốc.
 */
export default function GuestbookBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const L = useLocale() === "vi";

  useEffect(() => {
    const el = ref.current;
    if (!el || el.querySelector("script, iframe.giscus-frame")) return;
    const s = document.createElement("script");
    s.src = "https://giscus.app/client.js";
    s.async = true;
    s.crossOrigin = "anonymous";
    const attrs: Record<string, string> = {
      "data-repo": "anhvuFE/dev-journey",
      "data-repo-id": "R_kgDOTtZIZw",
      "data-category": "General",
      "data-category-id": "DIC_kwDOTtZIZ84DCtCr",
      "data-mapping": "specific",
      "data-term": "guestbook",
      "data-strict": "1",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": "transparent_dark",
      "data-lang": L ? "vi" : "en",
      "data-loading": "lazy",
    };
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
    el.appendChild(s);
  }, [L]);

  return <div ref={ref} data-lenis-prevent className="giscus mt-10 min-h-[300px]" />;
}
