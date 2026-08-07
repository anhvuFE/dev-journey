import { getLiveStats } from "@/lib/github";

/** Dải số liệu GitHub công khai cập nhật trực tiếp (cache 6h). Server component
 *  — nếu API lỗi thì trả về null và trang vẫn nguyên vẹn. */
export default async function LiveGitHubStrip({
  username,
  locale,
}: {
  username: string;
  locale: "vi" | "en";
}) {
  const s = await getLiveStats(username);
  if (!s) return null;

  const L = locale === "vi";
  const fmt = (n: number) => n.toLocaleString(L ? "vi-VN" : "en-US");

  const items: { value: string; label: string }[] = [
    { value: fmt(s.publicRepos), label: L ? "repo công khai" : "public repos" },
    { value: fmt(s.totalStars), label: L ? "sao ⭐" : "stars ⭐" },
    { value: fmt(s.followers), label: L ? "người theo dõi" : "followers" },
    {
      value: fmt(s.commitsThisYear),
      label: L ? `commit ${s.year}` : `commits ${s.year}`,
    },
  ];
  if (s.topLanguage) {
    items.push({
      value: s.topLanguage,
      label: L ? "ngôn ngữ chính" : "top language",
    });
  }

  return (
    <div className="mt-6 border border-border bg-background">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
          {L ? "Trực tiếp từ GitHub" : "Live from GitHub"}
        </span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          @{username} · {L ? "làm mới mỗi 6h" : "refreshes every 6h"}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-5">
        {items.map((it) => (
          <div key={it.label} className="bg-background px-4 py-4">
            <div className="font-mono text-xl font-extrabold text-foreground sm:text-2xl">
              {it.value}
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
