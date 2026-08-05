"use client";

import { useEffect, useRef, useState } from "react";

/** Vòng tròn tỉ trọng công nghệ (donut) — các cung neon vẽ dần khi cuộn tới. */
export default function TechDonut({
  tech,
  label,
}: {
  tech: { name: string; count: number }[];
  label: string;
}) {
  const total = tech.reduce((s, t) => s + t.count, 0);
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
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const R = 42;
  const C = 2 * Math.PI * R;
  const GAP = 3;
  let acc = 0;

  return (
    <div ref={ref} className="relative h-24 w-24 shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={R} fill="none" stroke="var(--border)" strokeWidth="10" />
        {tech.map((t, i) => {
          const frac = t.count / total;
          const len = Math.max(0, C * frac - GAP);
          const offset = -acc;
          acc += C * frac;
          return (
            <circle
              key={t.name}
              cx="50"
              cy="50"
              r={R}
              fill="none"
              stroke="var(--neon)"
              strokeWidth="10"
              strokeDasharray={`${on ? len : 0} ${C}`}
              strokeDashoffset={offset}
              style={{
                opacity: 0.35 + (1 - i / tech.length) * 0.65,
                transition: `stroke-dasharray 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 90}ms`,
              }}
            />
          );
        })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-mono text-lg font-extrabold leading-none text-foreground">
          {tech.length}
        </span>
        <span className="mt-0.5 max-w-[64px] font-mono text-[8px] uppercase leading-tight tracking-wide text-muted-foreground">
          {label}
        </span>
      </div>
    </div>
  );
}
