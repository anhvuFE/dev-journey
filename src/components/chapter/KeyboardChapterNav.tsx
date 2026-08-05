"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";

/** Phím ← / → nhảy tới chương trước / sau. Bỏ qua khi đang gõ trong ô nhập. */
export default function KeyboardChapterNav({
  prevId,
  nextId,
}: {
  prevId?: string;
  nextId?: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowLeft" && prevId) router.push(`/chapters/${prevId}`);
      else if (e.key === "ArrowRight" && nextId) router.push(`/chapters/${nextId}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevId, nextId, router]);

  return null;
}
