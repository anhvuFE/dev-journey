import { getLocale } from "next-intl/server";
import { certificates } from "@/data/certificates";

export default async function Certificates() {
  const locale = (await getLocale()) as "vi" | "en";
  return (
    <section className="mt-16">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
          {locale === "vi" ? "Chứng chỉ" : "Certifications"}
        </h2>
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          {certificates.length} {locale === "vi" ? "chứng chỉ" : "certs"}
        </span>
      </div>

      <div className="mt-6 border-t border-border">
        {certificates.map((c, i) => (
          <div
            key={i}
            className="flex items-baseline justify-between gap-4 border-b border-border py-4"
          >
            <div className="min-w-0">
              <div className="text-sm font-semibold leading-snug md:text-base">
                {c.title}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                {c.issuer}
              </div>
            </div>
            <span
              className="shrink-0 font-mono text-xs tabular-nums"
              style={{ color: "var(--c-accent)" }}
            >
              {c.date}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
