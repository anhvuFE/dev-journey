"use client";

import { useRef, type MouseEvent } from "react";
import { useLocale } from "next-intl";
import { timeline } from "@/data/timeline";

export default function JourneyTimeline() {
  const locale = useLocale() as "vi" | "en";
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0 });

  const onDown = (e: MouseEvent) => {
    const el = scroller.current;
    if (!el) return;
    drag.current = { down: true, startX: e.pageX, startLeft: el.scrollLeft };
    el.style.cursor = "grabbing";
  };
  const onMove = (e: MouseEvent) => {
    const el = scroller.current;
    if (!el || !drag.current.down) return;
    el.scrollLeft = drag.current.startLeft - (e.pageX - drag.current.startX);
  };
  const stop = () => {
    drag.current.down = false;
    if (scroller.current) scroller.current.style.cursor = "grab";
  };

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-3xl font-extrabold uppercase tracking-tight sm:text-5xl">
          {locale === "vi" ? "Dòng thời gian" : "The timeline"}
        </h2>
        <span className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:block">
          {locale === "vi" ? "kéo để đi →" : "drag to travel →"}
        </span>
      </div>
      <div className="rule mt-6" />

      <div
        ref={scroller}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={stop}
        onMouseLeave={stop}
        className="mt-10 cursor-grab overflow-x-auto pb-4 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="relative flex w-max gap-6 pr-10">
          {/* đường path */}
          <div className="absolute inset-x-0 top-[7px] h-px bg-border" />
          {timeline.map((m, i) => (
            <div key={i} className="group relative w-52 shrink-0 pt-4">
              {/* node */}
              <span
                className="absolute left-0 top-[7px] h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-background transition-transform duration-300 group-hover:scale-125"
                style={{ background: m.accent, boxShadow: `0 0 14px ${m.accent}` }}
              />
              <div className="mt-5">
                <div
                  className="font-mono text-xs uppercase tracking-wider"
                  style={{ color: m.accent }}
                >
                  {m.year}
                </div>
                <div className="mt-2 text-sm font-semibold leading-snug">
                  {m.title[locale]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
