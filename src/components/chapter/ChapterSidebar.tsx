"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export default function ChapterSidebar({
  num,
  title,
  mood,
  backLabel,
  sections,
}: {
  num: string;
  title: string;
  mood: string;
  backLabel: string;
  sections: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((e): e is HTMLElement => Boolean(e));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const go = (e: MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="md:sticky md:top-24 md:self-start">
      <Link
        href="/#chapters"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <div
        className="mt-8 font-mono text-4xl font-extrabold leading-none sm:text-5xl md:mt-10 md:text-6xl"
        style={{ color: "var(--c-accent)" }}
      >
        {num}
      </div>
      <h1 className="mt-4 text-xl font-extrabold uppercase leading-[1.1] tracking-tight sm:text-2xl md:text-3xl">
        {title}
      </h1>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        {mood}
      </p>

      {/* Nav mục cho mobile: hàng chip cuộn ngang */}
      <nav className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
        {sections.map((s) => {
          const on = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => go(e, s.id)}
              className={cn(
                "shrink-0 whitespace-nowrap border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
                on
                  ? "border-transparent bg-accent-c text-background"
                  : "border-border text-muted-foreground",
              )}
            >
              {s.label}
            </a>
          );
        })}
      </nav>

      <nav className="mt-10 hidden flex-col gap-3.5 md:flex">
        {sections.map((s) => {
          const on = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => go(e, s.id)}
              className={cn(
                "font-mono text-xs uppercase tracking-[0.18em] transition-colors",
                on
                  ? "text-accent-c"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {s.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
