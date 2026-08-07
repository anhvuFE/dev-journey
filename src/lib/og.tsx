import type { ReactElement } from "react";

/** Tông thương hiệu dùng chung cho mọi ảnh OG (phẳng, đen + 1 màu neon). */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export const BG = "#0a0a0a";
export const FG = "#f3f3ee";
export const MUTED = "#8a8a82";
export const NEON = "#c6ff3d";
export const RULE = "rgba(255,255,255,0.12)";

/**
 * Khung nền chung: nền đen phẳng, viền mảnh bo trong, nhãn thương hiệu trên
 * cùng và dấu "/" neon lớn ở góc. `accent` cho phép mỗi chương dùng màu riêng.
 */
export function OgFrame({
  accent = NEON,
  brand,
  children,
}: {
  accent?: string;
  brand: string;
  children: ReactElement;
}) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        background: BG,
        color: FG,
        padding: 40,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: `1px solid ${RULE}`,
          padding: "56px 64px",
          overflow: "hidden",
        }}
      >
        {/* Dấu "/" neon khổng lồ, mờ, làm nền góc phải */}
        <div
          style={{
            position: "absolute",
            right: -40,
            bottom: -140,
            fontSize: 560,
            fontWeight: 800,
            lineHeight: 1,
            color: accent,
            opacity: 0.1,
          }}
        >
          /
        </div>

        {/* Nhãn thương hiệu */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, zIndex: 1 }}>
          <div
            style={{
              width: 12,
              height: 12,
              background: accent,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: accent,
            }}
          >
            {brand}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
