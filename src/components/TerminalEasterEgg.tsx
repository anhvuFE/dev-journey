"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { chapters } from "@/data/chapters";

/** Easter egg: gõ ` (backtick) để mở một "terminal" mini. Gõ help để xem lệnh. */
export default function TerminalEasterEgg() {
  const locale = useLocale() as "vi" | "en";
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);
  const L = locale === "vi";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if (e.key === "`" && !typing) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    setLines((prev) =>
      prev.length
        ? prev
        : [
            L
              ? "dev-journey shell · gõ 'help' để xem lệnh, 'exit' để thoát"
              : "dev-journey shell · type 'help' for commands, 'exit' to quit",
          ],
    );
    prevFocus.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 10);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      prevFocus.current?.focus?.();
    };
  }, [open, L]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, open]);

  const print = (...l: string[]) => setLines((prev) => [...prev, ...l]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    print(`visitor@dev-journey:~$ ${cmd}`);
    const [name, ...args] = cmd.split(/\s+/);
    switch ((name || "").toLowerCase()) {
      case "":
        break;
      case "help":
        print(
          "help         — " + (L ? "danh sách lệnh" : "list commands"),
          "whoami       — " + (L ? "về chủ nhân trang này" : "about the author"),
          "ls           — " + (L ? "liệt kê các chương" : "list chapters"),
          "tree         — " + (L ? "cây cấu trúc site" : "site structure tree"),
          "neofetch     — " + (L ? "thông tin kiểu neofetch" : "neofetch-style info"),
          "goto <n>     — " + (L ? "mở chương số n" : "open chapter n"),
          "about        — " + (L ? "mở trang giới thiệu" : "open the about page"),
          "home         — " + (L ? "về trang chủ" : "go home"),
          "lang <vi|en> — " + (L ? "đổi ngôn ngữ" : "switch language"),
          "clear        — " + (L ? "xoá màn hình" : "clear the screen"),
          "exit         — " + (L ? "đóng terminal" : "close the terminal"),
        );
        break;
      case "whoami":
        print("Vũ Xuân Anh — Full Stack Developer", "→ github.com/anhvuFE");
        break;
      case "ls":
      case "ls-chapters":
        chapters.forEach((c) =>
          print(`${String(c.order).padStart(2, "0")}  ${c.id.padEnd(16)} ${c.title[locale]}`),
        );
        break;
      case "goto":
      case "cd": {
        const a = args[0];
        const c = chapters.find((x) => String(x.order) === a || x.id === a);
        if (!c) {
          print((L ? "không tìm thấy chương: " : "chapter not found: ") + (a ?? ""));
          break;
        }
        print((L ? "→ đang mở " : "→ opening ") + c.title[locale] + "…");
        setOpen(false);
        router.push(`/chapters/${c.id}`);
        break;
      }
      case "about":
        setOpen(false);
        router.push("/about");
        break;
      case "home":
        setOpen(false);
        router.push("/");
        break;
      case "lang": {
        const l = (args[0] || "").toLowerCase();
        if (l !== "vi" && l !== "en") {
          print("usage: lang <vi|en>");
          break;
        }
        setOpen(false);
        router.replace(pathname, { locale: l as "vi" | "en" });
        break;
      }
      case "tree":
        print(
          "dev-journey/",
          "├─ /              " + (L ? "trang chủ" : "home"),
          "├─ /about         " + (L ? "về mình" : "about"),
          "└─ /chapters/",
          ...chapters.map(
            (c, i) => `   ${i === chapters.length - 1 ? "└" : "├"}─ ${c.id}`,
          ),
        );
        break;
      case "neofetch":
        print(
          "      /\\         visitor@dev-journey",
          "     /  \\        ───────────────────",
          "    / /\\ \\       host   Vũ Xuân Anh (anhvuFE)",
          "   / /  \\ \\      role   Full Stack Developer",
          "  / /____\\ \\     stack  TS · React · Next · Node",
          " /__________\\    chương " + chapters.length,
          "                since  2022",
        );
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
      case "quit":
        setOpen(false);
        break;
      default:
        print(`bash: ${name}: ` + (L ? "không có lệnh này (thử 'help')" : "command not found (try 'help')"));
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      if (input.trim()) setHistory((h) => [...h, input]);
      setInput("");
      setHIdx(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const ni = hIdx < 0 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(ni);
      setInput(history[ni]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx < 0) return;
      const ni = hIdx + 1;
      if (ni >= history.length) {
        setHIdx(-1);
        setInput("");
      } else {
        setHIdx(ni);
        setInput(history[ni]);
      }
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label={L ? "Cửa sổ dòng lệnh" : "Terminal"}
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-[#0a0a0a]/95 backdrop-blur-md"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="mx-auto max-w-4xl px-4 py-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent-c" aria-hidden />
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            dev-journey — terminal ( ` · esc )
          </span>
        </div>
        <div
          ref={bodyRef}
          role="log"
          aria-live="polite"
          className="max-h-[38vh] overflow-y-auto font-mono text-[13px] leading-relaxed"
        >
          {lines.map((l, i) => (
            <div key={i} className="whitespace-pre-wrap text-foreground/90">
              {l}
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-accent-c">visitor@dev-journey:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              aria-label={L ? "Nhập lệnh" : "Type a command"}
              className="w-full flex-1 bg-transparent text-foreground focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
