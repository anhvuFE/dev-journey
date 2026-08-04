"use client";

import dynamic from "next/dynamic";

// Next.js 16: ssr:false CHỈ được dùng bên trong Client Component.
// Đây là lớp bọc client để nạp động cảnh 3D, tránh chạy trên server.
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function Scene3D(props: { accent?: string; glow?: string }) {
  return <HeroScene {...props} />;
}
