"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

// Bình luận + reaction dựa trên GitHub Discussions (giscus). Không cần backend.
// - theme "transparent_dark": nền trong suốt -> tan vào nền đen neon (đỡ xấu).
// - chỉ nạp khi cuộn tới gần (lazy) -> đỡ nặng & đỡ giật scroll.
export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const L = useLocale() === "vi";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!show) return;
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
  }, [show, L]);

  return (
    <section className="mt-20">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
        {L ? "Bình luận & cảm xúc" : "Comments & reactions"}
      </h2>
      <div ref={ref} className="giscus mt-6 min-h-[140px]" />
    </section>
  );
}
