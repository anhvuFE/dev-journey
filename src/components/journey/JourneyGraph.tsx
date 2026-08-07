"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { chapters } from "@/data/chapters";

/**
 * Đồ thị hành trình: hai cột [Năm · Chương] ↔ [Công nghệ], nối bằng đường cong.
 * Di chuột / bấm một chương -> sáng các tech của nó; bấm một tech -> sáng các
 * chương dùng nó. Bấm chương đi tới chương; bấm tech đi tới /projects đã lọc.
 * Bố cục phân lớp (không phải force-directed) nên luôn gọn, không rối.
 */
const YEAR: Record<number, string> = {
  1: "2022",
  2: "2024",
  3: "2024",
  4: "2024–25",
  5: "2025",
  6: "2025",
  7: "2026",
};
const TOP_TECH = 14;
const W = 1000;
const PADY = 34;
const ROW = 42;
const LEFT_X = 250;
const RIGHT_X = 720;

type Focus = { type: "ch" | "tech"; key: string } | null;

export default function JourneyGraph() {
  const L = useLocale() === "vi";
  const router = useRouter();
  const [focus, setFocus] = useState<Focus>(null);

  const { chs, techs, edges, H } = useMemo(() => {
    const ordered = [...chapters].sort((a, b) => a.order - b.order);
    const chData = ordered.map((c) => ({
      id: c.id,
      order: c.order,
      title: c.title[L ? "vi" : "en"],
      accent: c.theme.accent,
      year: YEAR[c.order] ?? "",
      repoCount: c.repos.length,
      techs: [...new Set(c.repos.flatMap((r) => r.stack))],
    }));

    const count = new Map<string, number>();
    chData.forEach((c) => c.techs.forEach((t) => count.set(t, (count.get(t) ?? 0) + 1)));
    const techList = [...count.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, TOP_TECH)
      .map(([t]) => t);
    const techSet = new Set(techList);

    const rows = Math.max(techList.length, chData.length);
    const H = PADY * 2 + (rows - 1) * ROW;
    const yFor = (i: number, n: number) =>
      n <= 1 ? H / 2 : PADY + (i * (H - 2 * PADY)) / (n - 1);

    const chs = chData.map((c, i) => ({ ...c, x: LEFT_X, y: yFor(i, chData.length) }));
    const techs = techList.map((t, i) => ({
      name: t,
      count: count.get(t) ?? 0,
      x: RIGHT_X,
      y: yFor(i, techList.length),
    }));
    const techY = new Map(techs.map((t) => [t.name, t.y]));

    const edges: {
      ch: string;
      tech: string;
      x1: number;
      y1: number;
      y2: number;
      accent: string;
    }[] = [];
    chs.forEach((c) =>
      c.techs.forEach((t) => {
        if (techSet.has(t))
          edges.push({ ch: c.id, tech: t, x1: c.x, y1: c.y, y2: techY.get(t)!, accent: c.accent });
      }),
    );
    return { chs, techs, edges, H };
  }, [L]);

  const edgeOn = (e: { ch: string; tech: string }) =>
    !focus ||
    (focus.type === "ch" && e.ch === focus.key) ||
    (focus.type === "tech" && e.tech === focus.key);

  const chOn = (id: string) => {
    if (!focus) return true;
    if (focus.type === "ch") return focus.key === id;
    return edges.some((e) => e.tech === focus.key && e.ch === id);
  };
  const techOn = (name: string) => {
    if (!focus) return true;
    if (focus.type === "tech") return focus.key === name;
    return edges.some((e) => e.ch === focus.key && e.tech === name);
  };

  // Chú thích động dưới đồ thị
  const caption = (() => {
    if (!focus)
      return L
        ? "Di chuột hoặc bấm vào một chương / công nghệ để lần theo mạch."
        : "Hover or tap a chapter / tech to trace the thread.";
    if (focus.type === "ch") {
      const c = chs.find((x) => x.id === focus.key);
      if (!c) return "";
      return `${c.year} · ${String(c.order).padStart(2, "0")} ${c.title} — ${c.repoCount} ${
        L ? "dự án" : "projects"
      }`;
    }
    const t = techs.find((x) => x.name === focus.key);
    if (!t) return "";
    return `${t.name} — ${L ? "xuất hiện ở" : "appears in"} ${t.count} ${
      L ? "chương" : "chapters"
    }`;
  })();

  return (
    <div>
      <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full min-w-[560px]"
          role="img"
          aria-label={L ? "Đồ thị hành trình: chương và công nghệ" : "Journey graph: chapters and tech"}
          onMouseLeave={() => setFocus(null)}
        >
          {/* Cạnh nối */}
          {edges.map((e, i) => {
            const on = edgeOn(e);
            const cx = (e.x1 + RIGHT_X) / 2;
            return (
              <path
                key={i}
                d={`M ${e.x1} ${e.y1} C ${cx} ${e.y1}, ${cx} ${e.y2}, ${RIGHT_X} ${e.y2}`}
                fill="none"
                stroke={e.accent}
                strokeWidth={on && focus ? 2 : 1}
                opacity={on ? (focus ? 0.85 : 0.22) : 0.05}
                style={{ transition: "opacity .18s, stroke-width .18s" }}
              />
            );
          })}

          {/* Nút chương (trái) */}
          {chs.map((c) => {
            const on = chOn(c.id);
            return (
              <g
                key={c.id}
                className="cursor-pointer"
                data-cursor
                opacity={on ? 1 : 0.25}
                style={{ transition: "opacity .18s" }}
                onMouseEnter={() => setFocus({ type: "ch", key: c.id })}
                onClick={() => router.push(`/chapters/${c.id}`)}
                role="button"
                aria-label={`${c.title} — ${c.year}`}
              >
                {/* năm */}
                <text
                  x={c.x - 34}
                  y={c.y + 4}
                  textAnchor="end"
                  className="font-mono"
                  style={{ fill: "var(--muted-foreground)", fontSize: 13 }}
                >
                  {c.year}
                </text>
                <circle cx={c.x} cy={c.y} r={15} fill={c.accent} />
                <text
                  x={c.x}
                  y={c.y + 5}
                  textAnchor="middle"
                  className="font-mono font-bold"
                  style={{ fill: "#0a0a0a", fontSize: 14 }}
                >
                  {String(c.order).padStart(2, "0")}
                </text>
              </g>
            );
          })}

          {/* Nút công nghệ (phải) */}
          {techs.map((t) => {
            const on = techOn(t.name);
            return (
              <g
                key={t.name}
                className="cursor-pointer"
                data-cursor
                opacity={on ? 1 : 0.25}
                style={{ transition: "opacity .18s" }}
                onMouseEnter={() => setFocus({ type: "tech", key: t.name })}
                onClick={() =>
                  router.push({ pathname: "/projects", query: { tech: t.name } })
                }
                role="button"
                aria-label={t.name}
              >
                <circle cx={t.x} cy={t.y} r={6} fill="var(--neon)" />
                <text
                  x={t.x + 16}
                  y={t.y + 5}
                  className="font-mono uppercase"
                  style={{ fill: "var(--foreground)", fontSize: 14 }}
                >
                  {t.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <p
        aria-live="polite"
        className="mt-6 border-t border-border pt-4 font-mono text-sm text-muted-foreground"
      >
        {caption}
      </p>
    </div>
  );
}
