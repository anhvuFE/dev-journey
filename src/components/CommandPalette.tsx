"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { chapters } from "@/data/chapters";
import { cn } from "@/lib/utils";

interface Item {
  id: string;
  label: string;
  hint: string;
  keywords: string;
  run: () => void;
}

/** Bảng lệnh kiểu VSCode: ⌘K / Ctrl+K để mở, nhảy nhanh tới trang/chương/đổi ngôn ngữ. */
export default function CommandPalette() {
  const locale = useLocale() as "vi" | "en";
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);
  const L = locale === "vi";

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => {
      setOpen(false);
      router.push(href);
    };
    const nav: Item[] = [
      { id: "home", label: L ? "Trang chủ" : "Home", hint: "/", keywords: "home trang chu index", run: go("/") },
      { id: "projects", label: L ? "Dự án" : "Projects", hint: "/projects", keywords: "projects du an kho du an portfolio", run: go("/projects") },
      { id: "about", label: L ? "Về mình" : "About", hint: "/about", keywords: "about ve minh gioi thieu profile", run: go("/about") },
      { id: "cv", label: "CV / Résumé", hint: "/cv", keywords: "cv resume ho so nang luc print pdf", run: go("/cv") },
      { id: "guestbook", label: L ? "Sổ lưu bút" : "Guestbook", hint: "/guestbook", keywords: "guestbook so luu but ky ten sign comment", run: go("/guestbook") },
    ];
    const chs: Item[] = chapters.map((c) => ({
      id: c.id,
      label: `${String(c.order).padStart(2, "0")} · ${c.title[locale]}`,
      hint: `/chapters/${c.id}`,
      keywords: `chapter chuong ${c.order} ${c.title.vi} ${c.title.en} ${c.id}`,
      run: go(`/chapters/${c.id}`),
    }));
    const langs: Item[] = routing.locales
      .filter((l) => l !== locale)
      .map((l) => ({
        id: `lang-${l}`,
        label: (L ? "Đổi ngôn ngữ → " : "Switch language → ") + l.toUpperCase(),
        hint: "i18n",
        keywords: "language ngon ngu lang locale en vi switch doi",
        run: () => {
          setOpen(false);
          router.replace(pathname, { locale: l });
        },
      }));
    return [...nav, ...chs, ...langs];
  }, [L, locale, pathname, router]);

  // Chỉ mục nội dung: câu chuyện, bài học, mẹo trong mọi chương -> nhảy tới đúng mục
  const contentItems = useMemo<Item[]>(() => {
    const sectionLabel = (s: string) =>
      s === "story"
        ? L ? "Câu chuyện" : "Story"
        : s === "lessons"
          ? L ? "Bài học" : "Lessons"
          : L ? "Mẹo" : "Tips";
    const out: Item[] = [];
    const add = (c: (typeof chapters)[number], section: string, text?: string) => {
      if (!text) return;
      out.push({
        id: `${c.id}-${section}-${out.length}`,
        label: text.length > 72 ? text.slice(0, 72) + "…" : text,
        hint: `${String(c.order).padStart(2, "0")} · ${sectionLabel(section)}`,
        keywords: `${text} ${c.title.vi} ${c.title.en}`,
        run: () => {
          setOpen(false);
          router.push(`/chapters/${c.id}#${section}`);
        },
      });
    };
    for (const c of chapters) {
      add(c, "story", c.intro?.[locale]);
      c.story[locale].forEach((p) => add(c, "story", p));
      c.lessons.forEach((l) => {
        add(c, "lessons", l.title[locale]);
        add(c, "lessons", l.body[locale]);
      });
      c.tips?.forEach((t) => {
        add(c, "tips", t.title[locale]);
        add(c, "tips", t.body[locale]);
      });
    }
    return out;
  }, [L, locale, router]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    const base = items.filter((it) => `${it.label} ${it.keywords}`.toLowerCase().includes(s));
    const content = contentItems
      .filter((it) => it.keywords.toLowerCase().includes(s))
      .slice(0, 8);
    return [...base, ...content];
  }, [q, items, contentItems]);

  // Mở/đóng bằng ⌘K / Ctrl+K, đóng bằng Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Khi mở: nhớ focus cũ, khoá cuộn nền, focus input; khi đóng: khôi phục
  useEffect(() => {
    if (!open) return;
    prevFocus.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setQ("");
    setActive(0);
    const t = setTimeout(() => inputRef.current?.focus(), 10);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      prevFocus.current?.focus?.();
    };
  }, [open]);

  useEffect(() => setActive(0), [q]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  };

  // Giữ Tab quẩn trong hộp thoại (focus trap tối giản)
  const onTrapKey = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button, input, [tabindex]:not([tabindex="-1"])',
    );
    if (!nodes || nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={L ? "Bảng lệnh" : "Command palette"}
        onKeyDown={onTrapKey}
        className="w-full max-w-lg border border-border bg-[#0d0d0d] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <span className="font-mono text-xs font-bold text-accent-c" aria-hidden>
            ⌘K
          </span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onInputKey}
            spellCheck={false}
            aria-label={L ? "Tìm trang, chương hoặc lệnh" : "Search pages, chapters or commands"}
            placeholder={L ? "Nhảy tới chương, trang, đổi ngôn ngữ…" : "Jump to a chapter, page, switch language…"}
            className="w-full bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <ul className="max-h-[52vh] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <li className="px-4 py-3 font-mono text-sm text-muted-foreground">
              {L ? "Không có kết quả" : "No results"}
            </li>
          ) : (
            filtered.map((it, i) => (
              <li key={it.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => it.run()}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left font-mono text-sm transition-colors",
                    i === active ? "bg-secondary text-foreground" : "text-muted-foreground",
                  )}
                >
                  <span className="truncate">{it.label}</span>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{it.hint}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
