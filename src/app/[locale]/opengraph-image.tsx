import { ImageResponse } from "next/og";
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
export const alt = "dev/journey — a real coding journey in 7 chapters";

// OG trang chủ — phẳng, đen, neon. Chữ Latin để font mặc định render sạch.
export default async function Image() {
  return new ImageResponse(
    (
      <OgFrame brand="dev/journey">
        <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1,
              textTransform: "uppercase",
              color: FG,
            }}
          >
            <span>From zero to</span>
            <span>
              <span style={{ color: NEON }}>full-stack</span>
            </span>
          </div>
          <div style={{ fontSize: 30, color: MUTED, marginTop: 26 }}>
            A real coding journey, told in 7 chapters.
          </div>

          {/* Chân trang: handle + số liệu tóm tắt */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 40,
              paddingTop: 24,
              borderTop: `1px solid ${RULE}`,
              fontSize: 24,
              color: MUTED,
            }}
          >
            <span style={{ color: FG }}>@anhvuFE</span>
            <span>·</span>
            <span>7 chapters</span>
            <span>·</span>
            <span>4 years</span>
            <span>·</span>
            <span>60+ projects</span>
          </div>
        </div>
      </OgFrame>
    ),
    { ...size },
  );
}
