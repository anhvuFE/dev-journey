import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// OG image cho trang chủ. Dùng chữ Latin để tránh lỗi font dấu tiếng Việt.
export default async function Image() {
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
          background:
            "radial-gradient(120% 120% at 0% 0%, #312e81 0%, #0b0b10 55%)",
          color: "#f5f5f7",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 34, color: "#a5b4fc" }}>dev/journey</div>
        <div style={{ fontSize: 76, fontWeight: 800, marginTop: 24, lineHeight: 1.1 }}>
          From zero to full-stack
        </div>
        <div style={{ fontSize: 32, color: "#9aa0ad", marginTop: 24 }}>
          A real coding journey, told in 7 chapters
        </div>
      </div>
    ),
    { ...size },
  );
}
