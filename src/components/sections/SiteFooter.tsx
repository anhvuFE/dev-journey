import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { socialLinks, profile } from "@/data/profile";

export default async function SiteFooter() {
  const t = await getTranslations("footer");
  const L = (await getLocale()) === "vi";
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
          <Link href="/cv" className="transition-colors hover:text-foreground">
            {L ? "CV / Hồ sơ" : "CV / Résumé"}
          </Link>
          <Link href="/guestbook" className="transition-colors hover:text-foreground">
            {L ? "Sổ lưu bút" : "Guestbook"}
          </Link>
        </div>
        <p className="mt-5">{t("madeWith")}</p>
        <p className="mt-4 font-mono text-[11px] text-muted-foreground">
          <kbd className="rounded-[3px] border border-border px-1.5 py-0.5">⌘K</kbd>{" "}
          {L ? "lệnh" : "commands"} ·{" "}
          <kbd className="rounded-[3px] border border-border px-1.5 py-0.5">`</kbd>{" "}
          terminal · <span className="tracking-widest">← →</span>{" "}
          {L ? "chuyển chương" : "switch chapters"} ·{" "}
          <kbd className="rounded-[3px] border border-border px-1.5 py-0.5">?</kbd>{" "}
          {L ? "phím tắt" : "shortcuts"}
        </p>
        <p className="mt-3 font-mono text-xs text-muted-foreground">© {"2026"} · dev/journey</p>
      </div>
    </footer>
  );
}
