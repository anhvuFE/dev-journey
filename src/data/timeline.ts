// Mốc hành trình (2022 → nay), ngày theo LinkedIn thật. Màu accent khớp neon theo chương.
export interface Milestone {
  year: string;
  accent: string;
  title: { vi: string; en: string };
}

export const timeline: Milestone[] = [
  { year: "2022", accent: "#ffb020", title: { vi: "Dòng HTML đầu tiên", en: "First lines of HTML" } },
  { year: "2023", accent: "#ffb020", title: { vi: "Trang tĩnh, vọc CSS", en: "Static pages, playing with CSS" } },
  { year: "2024", accent: "#38bdf8", title: { vi: "Bước vào React & TypeScript", en: "Into React & TypeScript" } },
  { year: "2024", accent: "#ff7a29", title: { vi: "Unity (C#) + Android (Java, Thriftly)", en: "Unity (C#) + Android (Java, Thriftly)" } },
  { year: "cuối 2024", accent: "#c6ff3d", title: { vi: "LCMS — capstone FPT (C#/.NET) bắt đầu", en: "LCMS — FPT capstone (C#/.NET) begins" } },
  { year: "đầu 2025", accent: "#c6ff3d", title: { vi: "LCMS: quản lý chuỗi giặt là", en: "LCMS: laundry chain management" } },
  { year: "giữa 2025", accent: "#2dd4bf", title: { vi: "Kiosko (đọc báo) + Shopify apps", en: "Kiosko (news) + Shopify apps" } },
  { year: "cuối 2025", accent: "#c6ff3d", title: { vi: "EcoCau + Ohana handyman", en: "EcoCau + Ohana handyman" } },
  { year: "đầu 2026", accent: "#ff7a29", title: { vi: "Go: MCP server, backend Gin", en: "Go: MCP server, Gin backend" } },
  { year: "giữa 2026", accent: "#f472b6", title: { vi: "ScreenMindr: screen-time, RN + iOS", en: "ScreenMindr: screen-time, RN + iOS" } },
  { year: "2026", accent: "#a3e635", title: { vi: "Monorepo công ty, đồ án lớn", en: "Company monorepo, big projects" } },
];
