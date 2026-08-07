/**
 * Server-only (chỉ gọi từ server component). Không import ở client.
 * Số liệu GitHub công khai — lấy TRỰC TIẾP từ GitHub REST + API lịch đóng góp.
 * Cache lại 6h (model không-cacheComponents: fetch với next.revalidate).
 * Không có token vẫn chạy (giới hạn 60 req/h/IP là đủ nhờ cache); nếu Vercel
 * có đặt GITHUB_TOKEN thì tự dùng để nâng hạn mức.
 */
export interface LiveStats {
  publicRepos: number;
  totalStars: number;
  followers: number;
  commitsThisYear: number;
  year: number;
  topLanguage: string | null;
  languages: number;
}

const REVALIDATE = 60 * 60 * 6; // 6 giờ

function ghHeaders(): Record<string, string> {
  const h: Record<string, string> = { Accept: "application/vnd.github+json" };
  const token = process.env.GITHUB_TOKEN;
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

async function ghJson<T>(url: string): Promise<T> {
  const r = await fetch(url, { headers: ghHeaders(), next: { revalidate: REVALIDATE } });
  if (!r.ok) throw new Error(`GitHub ${r.status} @ ${url}`);
  return r.json() as Promise<T>;
}

interface Profile {
  public_repos: number;
  followers: number;
}
interface Repo {
  fork: boolean;
  stargazers_count: number;
  language: string | null;
}
interface Contrib {
  total: Record<string, number>;
}

/** Trả về số liệu sống; null nếu mọi nguồn đều lỗi (để UI ẩn gọn gàng). */
export async function getLiveStats(user: string): Promise<LiveStats | null> {
  const year = new Date().getFullYear();

  const [profileR, reposR, contribR] = await Promise.allSettled([
    ghJson<Profile>(`https://api.github.com/users/${user}`),
    ghJson<Repo[]>(`https://api.github.com/users/${user}/repos?per_page=100&type=owner&sort=pushed`),
    fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=${year}`, {
      next: { revalidate: REVALIDATE },
    })
      .then((r) => (r.ok ? (r.json() as Promise<Contrib>) : Promise.reject(new Error("contrib"))))
      .catch(() => null),
  ]);

  const profile = profileR.status === "fulfilled" ? profileR.value : null;
  const repos = reposR.status === "fulfilled" ? reposR.value : null;
  const contrib =
    contribR.status === "fulfilled" && contribR.value ? contribR.value : null;

  // Nếu không lấy được gì đáng kể thì báo null.
  if (!profile && !repos && !contrib) return null;

  let totalStars = 0;
  const langCount = new Map<string, number>();
  if (repos) {
    for (const r of repos) {
      if (r.fork) continue;
      totalStars += r.stargazers_count || 0;
      if (r.language) langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1);
    }
  }
  const langs = [...langCount.entries()].sort((a, b) => b[1] - a[1]);

  return {
    publicRepos: profile?.public_repos ?? repos?.filter((r) => !r.fork).length ?? 0,
    totalStars,
    followers: profile?.followers ?? 0,
    commitsThisYear: contrib?.total?.[String(year)] ?? 0,
    year,
    topLanguage: langs[0]?.[0] ?? null,
    languages: langs.length,
  };
}
