import { getTranslations } from "next-intl/server";
import ProjectArticle from "./ProjectArticle";
import type { RepoItem } from "@/data/chapters";

export default async function ProjectList({
  repos,
  locale,
}: {
  repos: RepoItem[];
  locale: "vi" | "en";
}) {
  const t = await getTranslations("chapters");
  return (
    <section className="mt-20">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
        {t("projects")}
      </h2>
      <div className="mt-6 border-t border-border">
        {repos.map((repo) => (
          <ProjectArticle
            key={repo.name}
            repo={repo}
            locale={locale}
            commitsLabel={t("commits")}
            clientLabel={t("clientBadge")}
          />
        ))}
      </div>
    </section>
  );
}
