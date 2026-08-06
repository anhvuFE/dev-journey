"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { chapters } from "@/data/chapters";

// Bản đồ công nghệ dạng chòm sao: chỉ lấy ~20 công nghệ dùng nhiều nhất cho
// thoáng; chấm to theo số dự án, nối bằng đường rõ; nhãn hiện khi di chuột.
// Bấm 1 sao -> /projects lọc theo tech đó.
const W = 1000;
const H = 560;
const TOP = 20;
const rand = (i: number) => Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;

export default function TechConstellation() {
  const L = useLocale() === "vi";
  const router = useRouter();

  const nodes = useMemo(() => {
    const count = new Map<string, number>();
    chapters.forEach((c) =>
      c.repos.forEach((r) => r.stack.forEach((s) => count.set(s, (count.get(s) ?? 0) + 1))),
    );
    const list = [...count.entries()].sort((a, b) => b[1] - a[1]).slice(0, TOP);
    const N = list.length;
    const cols = Math.ceil(Math.sqrt(N * (W / H)));
    const rows = Math.ceil(N / cols);
    const cw = W / cols;
    const ch = H / rows;
    return list.map(([name, n], i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const jx = (rand(i + 1) - 0.5) * cw * 0.5;
      const jy = (rand(i + 50) - 0.5) * ch * 0.5;
      return {
        name,
        n,
        x: col * cw + cw / 2 + jx,
        y: row * ch + ch / 2 + jy,
        r: 7 + Math.min(n, 12) * 1.1,
      };
    });
  }, []);

  const edges = useMemo(() => {
    const seen = new Set<string>();
    const out: { a: number; b: number }[] = [];
    nodes.forEach((nd, i) => {
      nodes
        .map((o, j) => ({ j, d: (o.x - nd.x) ** 2 + (o.y - nd.y) ** 2 }))
        .filter((x) => x.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2)
        .forEach(({ j }) => {
          const a = Math.min(i, j);
          const b = Math.max(i, j);
          const k = `${a}-${b}`;
          if (!seen.has(k)) {
            seen.add(k);
            out.push({ a, b });
          }
        });
    });
    return out;
  }, [nodes]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={L ? "Bản đồ công nghệ" : "Tech map"}>
      {edges.map((e, i) => (
        <line
          key={i}
          x1={nodes[e.a].x}
          y1={nodes[e.a].y}
          x2={nodes[e.b].x}
          y2={nodes[e.b].y}
          stroke="var(--neon)"
          strokeWidth={1.4}
          opacity={0.32}
        />
      ))}
      {nodes.map((nd) => (
        <g
          key={nd.name}
          className="group cursor-pointer"
          data-cursor
          onClick={() => router.push(`/projects?tech=${encodeURIComponent(nd.name)}`)}
        >
          <circle cx={nd.x} cy={nd.y} r={nd.r + 16} fill="transparent" />
          <circle
            cx={nd.x}
            cy={nd.y}
            r={nd.r}
            fill="var(--neon)"
            className="transition-all duration-200 group-hover:brightness-150"
            style={{ filter: "drop-shadow(0 0 8px color-mix(in oklab, var(--neon) 60%, transparent))" }}
          />
          <text
            x={nd.x}
            y={nd.y - nd.r - 10}
            textAnchor="middle"
            style={{ fill: "var(--foreground)", fontSize: 15 }}
            className="pointer-events-none font-mono uppercase opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          >
            {nd.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
