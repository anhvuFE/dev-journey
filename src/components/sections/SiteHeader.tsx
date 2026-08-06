"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import ChapterProgress from "./ChapterProgress";

export default function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Tự đóng menu khi đổi trang
  useEffect(() => setOpen(false), [pathname]);

  // Khoá cuộn nền khi menu mobile mở
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const links = [
    { href: "/", label: t("home") },
    { href: "/#chapters", label: t("chapters") },
    { href: "/projects", label: t("projects") },
    { href: "/about", label: t("about") },
  ] as const;

  const localeToggle = (
    <div className="flex items-center gap-1 rounded-full border border-border/60 p-0.5">
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          onClick={() => setOpen(false)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium uppercase transition-colors",
            l === locale
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </Link>
      ))}
    </div>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group inline-flex items-center gap-2.5"
        >
          <span className="grid h-7 w-7 place-items-center rounded-[3px] bg-primary font-mono text-[15px] font-bold leading-none text-primary-foreground transition-transform duration-300 group-hover:rotate-[10deg]">
            /
          </span>
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-foreground">
            dev journey
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <ChapterProgress />
          {localeToggle}
        </nav>

        {/* Mobile: đổi ngôn ngữ + nút mở menu */}
        <div className="flex items-center gap-3 md:hidden">
          {localeToggle}
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-[3px] border border-border text-foreground transition-colors hover:bg-secondary"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Panel menu trên mobile */}
      {open && (
        <nav className="border-t border-border bg-background/95 px-5 py-3 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3.5 font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground transition-colors last:border-0 hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
