"use client";

import { useMemo, useRef, type MouseEvent } from "react";
import { useLocale } from "next-intl";
import { timeline } from "@/data/timeline";

// Hình học đường nhịp tim (ECG)
const COL = 260; // khoảng cách giữa các "nhịp"
const X0 = 80; // lề trái tới nhịp đầu
const Y0 = 70; // đường nền (baseline)
const A = 42; // độ cao đỉnh R (nhịp)
const H = 150; // cao vùng vẽ ECG

export default function JourneyTimeline() {
  const locale = useLocale() as "vi" | "en";
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0 });

  const n = timeline.length;
  const totalW = X0 * 2 + (n - 1) * COL;

  // Đường ECG: baseline + phức bộ QRS (P → Q → R → S) tại mỗi mốc
  const path = useMemo(() => {
    let d = `M 0 ${Y0}`;
    for (let i = 0; i < n; i++) {
      const x = X0 + i * COL;
      d += ` L ${x - 30} ${Y0}`; // flat
      d += ` L ${x - 22} ${Y0 - 8} L ${x - 15} ${Y0}`; // sóng P
      d += ` L ${x - 9} ${Y0 + 12}`; // Q
      d += ` L ${x} ${Y0 - A}`; // R (đỉnh nhịp = node)
      d += ` L ${x + 9} ${Y0 + 14}`; // S
      d += ` L ${x + 17} ${Y0}`; // về baseline
    }
    d += ` L ${totalW} ${Y0}`;
    return d;
  }, [n, totalW]);

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
          {locale === "vi" ? "nhịp code · kéo để đi →" : "the pulse · drag to travel →"}
        </span>
      </div>
      <div className="rule mt-6" />

      <div
        ref={scroller}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={stop}
        onMouseLeave={stop}
        className="mt-8 cursor-grab overflow-x-auto pb-4 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          className="relative"
          style={{ width: totalW, height: 232, ["--ecg-len" as string]: `${totalW + 160}px` }}
        >
          {/* Đường nhịp tim */}
          <svg
            className="absolute left-0 top-0"
            width={totalW}
            height={H}
            fill="none"
          >
            {/* line nền mờ */}
            <path d={path} stroke="#c6ff3d" strokeWidth={2} opacity={0.22} />
            {/* tia sáng quét chạy như máy đo nhịp */}
            <path
              d={path}
              stroke="#c6ff3d"
              strokeWidth={2.5}
              className="ecg-sweep"
              style={{ filter: "drop-shadow(0 0 6px #c6ff3d)" }}
            />
          </svg>

          {/* Node (đỉnh nhịp) + card */}
          {timeline.map((m, i) => {
            const x = X0 + i * COL;
            return (
              <div
                key={i}
                className="group absolute top-0"
                style={{ left: x }}
              >
                <span
                  className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background transition-transform duration-300 group-hover:scale-125"
                  style={{
                    top: Y0 - A,
                    background: m.accent,
                    boxShadow: `0 0 16px ${m.accent}`,
                  }}
                />
                <div
                  className="absolute w-52 -translate-x-1/2 px-1 transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ top: Y0 + 24 }}
                >
                  <div
                    className="font-mono text-2xl font-extrabold tabular-nums"
                    style={{ color: m.accent }}
                  >
                    {m.year}
                  </div>
                  <div className="mt-2 text-[14px] font-semibold leading-snug text-foreground">
                    {m.title[locale]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
