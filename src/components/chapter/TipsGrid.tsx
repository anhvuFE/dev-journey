import Reveal from "@/components/Reveal";
import type { Tip } from "@/data/chapters";

export default function TipsGrid({
  tips,
  locale,
}: {
  tips: Tip[];
  locale: "vi" | "en";
}) {
  if (!tips.length) return null;
  return (
    <section className="mt-20">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
        {locale === "vi" ? "Lỗi hay mắc & mẹo" : "Common pitfalls & tips"}
      </h2>
      <div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2">
        {tips.map((tip, i) => (
          <Reveal key={i}>
            <div className="h-full bg-background p-6">
              <h3 className="font-bold">{tip.title[locale]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {tip.body[locale]}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
