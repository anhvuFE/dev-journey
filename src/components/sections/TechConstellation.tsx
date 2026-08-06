"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { chapters } from "@/data/chapters";

// Bản đồ công nghệ dạng chòm sao: mỗi công nghệ là 1 ngôi sao (to theo số dự án
// dùng nó), nối nhau bằng đường mờ; bấm 1 sao -> mở /projects đã lọc theo tech đó.
const W = 1000;
const H = 460;
const PAD = 100;

export default function TechConstellation() {
  const L = useLocale() === "vi";
  const router = useRouter();

  const nodes = useMemo(() => {
    const count = new Map<string, number>();
    chapters.forEach((c) => c.repos.forEach((r) => r.stack.forEach((s) => count.set(s, (count.get(s) ?? 0) + 1))));
    return [...count.entries()].map(([name, n], i) => {
      const rx = Math.abs(Math.sin((i + 1) * 12.9898) * 43758.5453) % 1;
      const ry = Math.abs(Math.cos((i + 1) * 78.233) * 12345.678) % 1;
      return { name, n, x: PAD + rx * (W - 2 * PAD), y: PAD + ry * (H - 2 * PAD), r: 5 + Math.min(n, 7) };
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
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={L ? "Bản đồ công nghệ" : "Tech map"}>
        {edges.map((e, i) => (
          <line
            key={i}
            x1={nodes[e.a].x}
            y1={nodes[e.a].y}
            x2={nodes[e.b].x}
            y2={nodes[e.b].y}
            stroke="var(--neon)"
            strokeWidth={0.6}
            opacity={0.16}
          />
        ))}
        {nodes.map((nd) => (
          <g
            key={nd.name}
            className="cursor-pointer"
            data-cursor
            onClick={() => router.push(`/projects?tech=${encodeURIComponent(nd.name)}`)}
          >
            <circle
              cx={nd.x}
              cy={nd.y}
              r={nd.r}
              fill="var(--neon)"
              className="transition-all duration-200 hover:brightness-125"
              style={{ filter: "drop-shadow(0 0 6px color-mix(in oklab, var(--neon) 55%, transparent))" }}
            />
            <text
              x={nd.x}
              y={nd.y - nd.r - 7}
              textAnchor="middle"
              style={{ fill: "var(--muted-foreground)", fontSize: 13 }}
              className="pointer-events-none font-mono uppercase"
            >
              {nd.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
