import { ImageResponse } from "next/og";
import { getChapter } from "@/data/chapters";
import {
  OG_SIZE,
  OG_CONTENT_TYPE,
  OgFrame,
  FG,
  MUTED,
  NEON,
  RULE,
} from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// OG động cho từng chương — màu accent riêng của chương, phẳng, đen + neon.
// Dùng tiêu đề tiếng Anh để font mặc định render an toàn (không dấu).
export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chapter = getChapter(id);
  const accent = chapter?.theme.accent ?? NEON;
  const order = chapter ? String(chapter.order).padStart(2, "0") : "00";
  const title = chapter?.title.en ?? "A coding journey";
  const tagline = chapter?.tagline.en ?? "";
  const repoCount = chapter?.repos.length ?? 0;

  // Vài công nghệ tiêu biểu của chương (khử trùng lặp, tối đa 4).
  const stack = chapter
    ? [...new Set(chapter.repos.flatMap((r) => r.stack))].slice(0, 4)
    : [];

  return new ImageResponse(
    (
      <OgFrame brand={`dev/journey · chapter ${order}`} accent={accent}>
        <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: -1,
              textTransform: "uppercase",
              color: FG,
            }}
          >
            {title}
          </div>
          {tagline ? (
            <div style={{ fontSize: 30, color: MUTED, marginTop: 24 }}>{tagline}</div>
          ) : null}

          {/* Chân trang: số dự án + stack */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 40,
              paddingTop: 24,
              borderTop: `1px solid ${RULE}`,
              fontSize: 22,
              color: MUTED,
            }}
          >
            <span style={{ color: accent }}>
              {repoCount} {repoCount === 1 ? "project" : "projects"}
            </span>
            {stack.map((s) => (
              <span
                key={s}
                style={{
                  border: `1px solid ${RULE}`,
                  padding: "4px 14px",
                  color: FG,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </OgFrame>
    ),
    { ...size },
  );
}
