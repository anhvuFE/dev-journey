import { getLocale } from "next-intl/server";
import { stats } from "@/data/stats";
import CountUp from "@/components/CountUp";
import GitHubGraph from "@/components/GitHubGraph";
import TechBars from "@/components/sections/TechBars";
import TechDonut from "@/components/sections/TechDonut";
import GitHubStreak from "@/components/sections/GitHubStreak";

export default async function StatsSection() {
  const locale = (await getLocale()) as "vi" | "en";

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
          <div key={c.key} className="bg-background p-4 sm:p-6">
            <div className="text-3xl font-extrabold text-primary sm:text-4xl md:text-5xl">
              <CountUp value={c.value} suffix={c.suffix} sep={c.sep} />
            </div>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              {c.label[locale]}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-12 md:grid-cols-2">
        {/* Bar công nghệ + vòng tỉ trọng */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
              {locale === "vi" ? "Công nghệ dùng nhiều nhất" : "Most-used tech"}
            </p>
            <TechDonut tech={stats.tech} label={locale === "vi" ? "công nghệ" : "tech"} />
          </div>
          <TechBars tech={stats.tech} locale={locale} />
        </div>

        {/* GitHub activity thật + streak */}
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            {locale === "vi" ? "Hoạt động GitHub thật" : "Real GitHub activity"}
          </p>
          <div className="mt-6 overflow-x-auto [-webkit-overflow-scrolling:touch]">
            <GitHubGraph username={stats.githubUser} />
          </div>
          <GitHubStreak username={stats.githubUser} locale={locale} />
        </div>
      </div>
    </section>
  );
}
