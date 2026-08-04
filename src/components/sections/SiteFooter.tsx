import { getTranslations } from "next-intl/server";
import { socialLinks, profile } from "@/data/profile";

export default async function SiteFooter() {
  const t = await getTranslations("footer");
  return (
    <footer className="border-t border-border/50 py-10">
      <div className="mx-auto max-w-6xl px-5 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">{profile.name}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
          {socialLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="mt-5">{t("madeWith")}</p>
        <p className="mt-2 font-mono text-xs opacity-60">
          © {"2026"} · dev/journey
        </p>
      </div>
    </footer>
  );
}
