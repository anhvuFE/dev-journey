"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "@/components/CountUp";

/** Thanh công nghệ: mọc từ 0 + số đếm lên khi cuộn tới; hover làm nổi + tooltip. */
export default function TechBars({
  tech,
  locale,
}: {
  tech: { name: string; count: number }[];
  locale: "vi" | "en";
}) {
  const max = Math.max(...tech.map((t) => t.count));
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-6 space-y-4">
      {tech.map((t, i) => (
        <div key={t.name} className="group">
          <div className="flex items-baseline justify-between font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
            <span>{t.name}</span>
            <span className="tabular-nums">
              <CountUp value={t.count} />
            </span>
          </div>
          <div
            className="mt-1.5 h-1.5 w-full bg-white/[0.06]"
            title={
              locale === "vi"
                ? `${t.count} dự án dùng ${t.name}`
                : `${t.count} projects use ${t.name}`
            }
          >
            <div
              className="h-full bg-primary transition-[width,box-shadow] duration-700 ease-out group-hover:shadow-[0_0_10px_var(--neon)]"
              style={{
                width: on ? `${(t.count / max) * 100}%` : "0%",
                transitionDelay: `${i * 80}ms`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
