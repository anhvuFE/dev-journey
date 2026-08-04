"use client";

import dynamic from "next/dynamic";

// Nạp động, ssr:false (bọc trong Client Component đúng chuẩn Next.js 16).
const PhoneScene = dynamic(() => import("./PhoneScene"), {
  ssr: false,
  loading: () => null,
});

export default function PhoneMockup3D(props: { accent?: string; glow?: string }) {
  return <PhoneScene {...props} />;
}
