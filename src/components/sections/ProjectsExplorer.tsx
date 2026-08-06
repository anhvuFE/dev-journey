"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export interface Proj {
  name: string;
  blurb: string;
  stack: string[];
  privacy: "personal" | "client";
  chapterId: string;
  chapterOrder: number;
  chapterTitle: string;
  accent: string;
}

export default function ProjectsExplorer({ projects }: { projects: Proj[] }) {
  const L = useLocale() === "vi";
  const [tech, setTech] = useState<string | null>(null);
  const [type, setType] = useState<"all" | "personal" | "client">("all");

  const techs = useMemo(() => {
    const count = new Map<string, number>();
    projects.forEach((p) => p.stack.forEach((s) => count.set(s, (count.get(s) ?? 0) + 1)));
    return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
  }, [projects]);

  const filtered = projects.filter(
    (p) => (type === "all" || p.privacy === type) && (!tech || p.stack.includes(tech)),
  );

  const chip = (active: boolean) =>
    `shrink-0 border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors ${
      active
        ? "border-transparent bg-accent-c text-background"
        : "border-border text-muted-foreground hover:text-foreground"
    }`;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(["all", "personal", "client"] as const).map((t) => (
          <button key={t} type="button" onClick={() => setType(t)} className={chip(type === t)}>
            {t === "all"
              ? L ? "Tất cả" : "All"
              : t === "personal"
                ? L ? "Cá nhân" : "Personal"
                : L ? "Thương mại" : "Client"}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => setTech(null)} className={chip(tech === null)}>
          {L ? "Mọi công nghệ" : "All tech"}
        </button>
        {techs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTech(t === tech ? null : t)}
            className={chip(tech === t)}
          >
            {t}
          </button>
        ))}
      </div>

      <p className="mt-6 font-mono text-xs text-muted-foreground">
        {filtered.length} {L ? "dự án" : "projects"}
      </p>

      <div className="mt-4 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <Link
            key={`${p.chapterId}-${p.name}-${i}`}
            href={`/chapters/${p.chapterId}#projects`}
            data-cursor
            className="group flex flex-col bg-background p-5 transition-colors hover:bg-secondary"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-sm font-bold text-foreground">{p.name}</span>
              <span
                className="shrink-0 font-mono text-[10px] uppercase tracking-wide"
                style={{ color: p.accent }}
              >
                {p.privacy === "client" ? (L ? "Thương mại" : "Client") : L ? "Cá nhân" : "Personal"}
              </span>
            </div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
            <span className="mt-4 font-mono text-[10px] uppercase tracking-wide text-muted-foreground transition-colors group-hover:text-accent-c">
              {String(p.chapterOrder).padStart(2, "0")} · {p.chapterTitle} →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
