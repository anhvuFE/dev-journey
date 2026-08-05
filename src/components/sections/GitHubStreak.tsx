"use client";

import { useEffect, useState } from "react";

interface Day {
  date: string;
  count: number;
}
interface Streaks {
  longest: number;
  current: number;
}

/** Tính streak (chuỗi ngày liên tiếp có commit) từ cùng API mà lịch dùng. */
function computeStreaks(days: Day[]): Streaks {
  let longest = 0;
  let run = 0;
  for (const d of days) {
    if (d.count > 0) {
      run += 1;
      if (run > longest) longest = run;
    } else {
      run = 0;
    }
  }
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current += 1;
    else break;
  }
  return { longest, current };
}

export default function GitHubStreak({
  username,
  locale,
}: {
  username: string;
  locale: "vi" | "en";
}) {
  const [streaks, setStreaks] = useState<Streaks | null>(null);
  const L = locale === "vi";

  useEffect(() => {
    let alive = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (alive && Array.isArray(data?.contributions)) {
          setStreaks(computeStreaks(data.contributions as Day[]));
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [username]);

  if (!streaks) return null;

  const Stat = ({ n, label }: { n: number; label: string }) => (
    <div>
      <div className="font-mono text-2xl font-extrabold text-primary">
        {n}
        <span className="ml-1 text-sm font-medium text-muted-foreground">
          {L ? "ngày" : "d"}
        </span>
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );

  return (
    <div className="mt-6 flex gap-10">
      <Stat n={streaks.longest} label={L ? "chuỗi dài nhất" : "longest streak"} />
      <Stat n={streaks.current} label={L ? "chuỗi hiện tại" : "current streak"} />
    </div>
  );
}
