"use client";

import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

/** Đồ thị đóng góp GitHub THẬT. Chỉ render sau khi mounted để tránh lệch
 *  hydration (thư viện fetch & render khác nhau giữa server/client). */
export default function GitHubGraph({
  username,
  color = "#c6ff3d",
}: {
  username: string;
  color?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="h-[112px] w-full animate-pulse rounded-sm bg-white/[0.04]" />
    );
  }

  return (
    <GitHubCalendar
      username={username}
      colorScheme="dark"
      theme={{
        dark: ["#1a1a1a", `${color}44`, `${color}77`, `${color}bb`, color],
      }}
      blockSize={11}
      blockMargin={3}
      fontSize={12}
      style={{ color: "#8a8a82" }}
    />
  );
}
