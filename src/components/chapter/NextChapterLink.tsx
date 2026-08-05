import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Chapter } from "@/data/chapters";

export default function NextChapterLink({
  next,
  locale,
}: {
  next: Chapter;
  locale: "vi" | "en";
}) {
  return (
    <Link
      href={`/chapters/${next.id}`}
      data-theme={next.theme.key}
      className="group mt-20 flex items-center justify-between border-t border-border pt-8"
    >
      <div>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {locale === "vi" ? "Chương tiếp theo" : "Next chapter"} —{" "}
          {String(next.order).padStart(2, "0")}
        </span>
        <div className="mt-2 text-2xl font-extrabold uppercase tracking-tight transition-colors group-hover:text-accent-c md:text-3xl">
          {next.title[locale]}
        </div>
      </div>
      <ArrowRight className="h-7 w-7 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent-c" />
    </Link>
  );
}
