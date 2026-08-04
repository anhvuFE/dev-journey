"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-foreground"
        >
          dev<span className="text-accent-c">/</span>journey
        </Link>

        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            {t("home")}
          </Link>
          <Link
            href="/#chapters"
            className="transition-colors hover:text-foreground"
          >
            {t("chapters")}
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-foreground"
          >
            {t("about")}
          </Link>

          <div className="flex items-center gap-1 rounded-full border border-border/60 p-0.5">
            {routing.locales.map((l) => (
              <Link
                key={l}
                href={pathname}
                locale={l}
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
        </nav>
      </div>
    </header>
  );
}
