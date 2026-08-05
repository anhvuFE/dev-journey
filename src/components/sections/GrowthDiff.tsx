import CodeBlock from "@/components/CodeBlock";
import { chapters, type Chapter, type Snippet } from "@/data/chapters";

type Pick = { chapter: Chapter; snippet: Snippet };

/** "Ngày ấy & bây giờ": đặt cạnh nhau snippet sớm nhất và muộn nhất trong
 *  hành trình để thấy rõ sự trưởng thành trong cách viết code. */
export default function GrowthDiff({ locale }: { locale: "vi" | "en" }) {
  const picks: Pick[] = [];
  for (const c of chapters) {
    const r = c.repos.find((repo) => repo.snippet);
    if (r?.snippet) picks.push({ chapter: c, snippet: r.snippet });
  }
  if (picks.length < 2) return null;

  const first = picks[0];
  const last = picks[picks.length - 1];
  const L = locale === "vi";

  const Col = ({ item }: { item: Pick }) => (
    <div data-theme={item.chapter.theme.key}>
      <div className="mb-3 flex items-baseline gap-3">
        <span
          className="font-mono text-2xl font-extrabold tabular-nums"
          style={{ color: "var(--c-accent)" }}
        >
          {String(item.chapter.order).padStart(2, "0")}
        </span>
        <span className="text-sm font-semibold uppercase tracking-tight text-foreground">
          {item.chapter.title[locale]}
        </span>
      </div>
      <CodeBlock
        code={item.snippet.code}
        file={item.snippet.file}
        lang={item.snippet.lang}
      />
    </div>
  );

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-extrabold uppercase tracking-tight sm:text-3xl md:text-5xl">
          {L ? "Ngày ấy & bây giờ" : "Then & now"}
        </h2>
        <span className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:block">
          git diff --journey
        </span>
      </div>
      <div className="rule mt-6" />
      <p className="mt-6 max-w-2xl text-sm text-muted-foreground md:text-[15px]">
        {L
          ? "Cùng một người, cách nhau vài năm code. Dòng đầu tiên và dòng gần nhất — để thấy mình đã đi được bao xa."
          : "Same person, a few years of coding apart. The earliest snippet and a recent one — to see how far the journey went."}
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:gap-10">
        <Col item={first} />
        <Col item={last} />
      </div>
    </section>
  );
}
