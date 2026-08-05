"use client";

import { GitHubCalendar } from "react-github-calendar";

/** Đồ thị đóng góp GitHub THẬT (fetch client-side), tô màu neon. */
export default function GitHubGraph({
  username,
  color = "#c6ff3d",
}: {
  username: string;
  color?: string;
}) {
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
