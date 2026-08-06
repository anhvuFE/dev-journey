"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

// Bình luận + reaction dựa trên GitHub Discussions (giscus). Không cần backend.
// Yêu cầu: cài giscus GitHub App cho repo (github.com/apps/giscus).
export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const L = locale === "vi";

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
      "data-category": "Announcements",
      "data-category-id": "DIC_kwDOTtZIZ84DCtCq",
      "data-mapping": "pathname",
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "bottom",
      "data-theme": "dark_dimmed",
      "data-lang": L ? "vi" : "en",
    };
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
    el.appendChild(s);
  }, [L]);

  return (
    <section className="mt-20">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
        {L ? "Bình luận & cảm xúc" : "Comments & reactions"}
      </h2>
      <div ref={ref} className="giscus mt-6" />
    </section>
  );
}
