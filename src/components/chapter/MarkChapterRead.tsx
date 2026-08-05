"use client";

import { useEffect } from "react";
import { markChapterRead } from "@/lib/progress";

/** Đánh dấu chương đã đọc khi mở trang (dùng cho vòng tiến độ ở header). */
export default function MarkChapterRead({ id }: { id: string }) {
  useEffect(() => {
    markChapterRead(id);
  }, [id]);
  return null;
}
