import CountUp from "@/components/CountUp";

export default function StatGrid({
  stats,
}: {
  stats: { n?: number; suffix?: string; sep?: boolean; text?: string; l: string }[];
}) {
  return (
    <div className="mt-16 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.l} className="bg-background p-4 text-center sm:p-6">
          <div
            className="text-2xl font-extrabold sm:text-3xl md:text-4xl"
            style={{ color: "var(--c-accent)" }}
          >
            {s.n !== undefined ? (
              <CountUp value={s.n} suffix={s.suffix} sep={s.sep} />
            ) : (
              s.text
            )}
          </div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
            {s.l}
          </div>
        </div>
      ))}
    </div>
  );
}
