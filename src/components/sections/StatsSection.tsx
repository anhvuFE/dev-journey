import { getLocale } from "next-intl/server";
import { stats } from "@/data/stats";
import CountUp from "@/components/CountUp";
import GitHubGraph from "@/components/GitHubGraph";

export default async function StatsSection() {
  const locale = (await getLocale()) as "vi" | "en";
  const max = Math.max(...stats.tech.map((t) => t.count));

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-3xl font-extrabold uppercase tracking-tight sm:text-5xl">
          {locale === "vi" ? "Bằng những con số" : "By the numbers"}
        </h2>
        <span className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:block">
          git log · wc -l
        </span>
      </div>
      <div className="rule mt-6" />

      {/* Đếm động */}
      <div className="mt-10 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
        {stats.counters.map((c) => (
          <div key={c.key} className="bg-background p-6">
            <div className="text-4xl font-extrabold text-primary md:text-5xl">
              <CountUp value={c.value} suffix={c.suffix} sep={c.sep} />
            </div>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              {c.label[locale]}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-12 md:grid-cols-2">
        {/* Bar công nghệ */}
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            {locale === "vi" ? "Công nghệ dùng nhiều nhất" : "Most-used tech"}
          </p>
          <div className="mt-6 space-y-4">
            {stats.tech.map((t) => (
              <div key={t.name}>
                <div className="flex items-baseline justify-between font-mono text-xs text-muted-foreground">
                  <span>{t.name}</span>
                  <span>{t.count}</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full bg-white/[0.06]">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${(t.count / max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub activity thật */}
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            {locale === "vi" ? "Hoạt động GitHub thật" : "Real GitHub activity"}
          </p>
          <div className="mt-6 overflow-x-auto">
            <GitHubGraph username={stats.githubUser} />
          </div>
        </div>
      </div>
    </section>
  );
}
