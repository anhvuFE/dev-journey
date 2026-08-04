import { getTranslations } from "next-intl/server";

export default async function SiteFooter() {
  const t = await getTranslations("footer");
  return (
    <footer className="border-t border-border/50 py-10">
      <div className="mx-auto max-w-6xl px-5 text-center text-sm text-muted-foreground">
        <p>{t("madeWith")}</p>
        <p className="mt-2 font-mono text-xs opacity-60">
          © {"2026"} · dev/journey
        </p>
      </div>
    </footer>
  );
}
