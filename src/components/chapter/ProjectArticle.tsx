import Reveal from "@/components/Reveal";
import CodeBlock from "@/components/CodeBlock";
import type { RepoItem } from "@/data/chapters";

export default function ProjectArticle({
  repo,
  locale,
  commitsLabel,
  clientLabel,
}: {
  repo: RepoItem;
  locale: "vi" | "en";
  commitsLabel: string;
  clientLabel: string;
}) {
  return (
    <Reveal>
      <article className="border-b border-border py-8">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-mono text-base font-bold md:text-lg">
            {repo.name}
          </h3>
          {repo.commits ? (
            <span className="shrink-0 font-mono text-xs text-muted-foreground">
              {repo.commits} {commitsLabel}
            </span>
          ) : null}
        </div>

        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          {repo.blurb[locale]}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {repo.stack.map((s) => (
            <span
              key={s}
              className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground"
            >
              {s}
            </span>
          ))}
          {repo.privacy === "client" ? (
            <span className="px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground/60">
              · {clientLabel}
            </span>
          ) : null}
        </div>

        {repo.snippet ? (
          <CodeBlock
            code={repo.snippet.code}
            file={repo.snippet.file}
            lang={repo.snippet.lang}
          />
        ) : null}

        {repo.caseStudy ? (
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div
              className="border-l-2 pl-4"
              style={{ borderColor: "var(--c-accent)" }}
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-accent-c">
                {locale === "vi" ? "Thử thách" : "The challenge"}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {repo.caseStudy.challenge[locale]}
              </p>
            </div>
            <div className="border-l-2 border-border pl-4">
              <p className="font-mono text-[11px] uppercase tracking-wider">
                {locale === "vi" ? "Cách xử lý" : "The fix"}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {repo.caseStudy.fix[locale]}
              </p>
            </div>
          </div>
        ) : null}

        {repo.commitsShown && repo.commitsShown.length > 0 ? (
          <div className="mt-5 space-y-1">
            {repo.commitsShown.map((c, j) => (
              <div
                key={j}
                className="flex items-start gap-2 font-mono text-xs text-muted-foreground"
              >
                <span className="text-accent-c">$</span>
                <span>git commit -m &quot;{c}&quot;</span>
              </div>
            ))}
          </div>
        ) : null}
      </article>
    </Reveal>
  );
}
