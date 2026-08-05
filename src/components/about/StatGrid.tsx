export default function StatGrid({
  stats,
}: {
  stats: { n: string; l: string }[];
}) {
  return (
    <div className="mt-16 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.l} className="bg-background p-6 text-center">
          <div
            className="text-3xl font-extrabold"
            style={{ color: "var(--c-accent)" }}
          >
            {s.n}
          </div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
            {s.l}
          </div>
        </div>
      ))}
    </div>
  );
}
