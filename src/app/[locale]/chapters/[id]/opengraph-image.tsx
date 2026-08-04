import { ImageResponse } from "next/og";
import { getChapter } from "@/data/chapters";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// OG image động cho từng chương (dùng tiêu đề tiếng Anh để an toàn font).
export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chapter = getChapter(id);
  const accent = chapter?.theme.accent ?? "#6366f1";
  const order = chapter ? String(chapter.order).padStart(2, "0") : "00";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: `radial-gradient(120% 120% at 0% 0%, ${accent}55 0%, #0b0b10 55%)`,
          color: "#f5f5f7",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 30, color: accent }}>dev/journey · chapter {order}</div>
        <div style={{ fontSize: 72, fontWeight: 800, marginTop: 24, lineHeight: 1.1 }}>
          {chapter?.title.en ?? "A coding journey"}
        </div>
        <div style={{ fontSize: 30, color: "#9aa0ad", marginTop: 24 }}>
          {chapter?.tagline.en ?? ""}
        </div>
      </div>
    ),
    { ...size },
  );
}
