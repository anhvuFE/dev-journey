// Mốc hành trình (2022 → nay). Màu accent khớp neon theo chương.
export interface Milestone {
  year: string;
  accent: string;
  title: { vi: string; en: string };
}

export const timeline: Milestone[] = [
  { year: "2022", accent: "#ffb020", title: { vi: "Dòng HTML đầu tiên", en: "First lines of HTML" } },
  { year: "2023", accent: "#ffb020", title: { vi: "Trang tĩnh, vọc CSS", en: "Static pages, playing with CSS" } },
  { year: "2024", accent: "#38bdf8", title: { vi: "Bước vào React & TypeScript", en: "Into React & TypeScript" } },
  { year: "2024 cuối", accent: "#38bdf8", title: { vi: "Portfolio, deploy GitHub Pages", en: "Portfolio, GitHub Pages" } },
  { year: "2025 đầu", accent: "#c6ff3d", title: { vi: "Full-stack: LCMS, backend NestJS", en: "Full-stack: LCMS, NestJS backend" } },
  { year: "2025 giữa", accent: "#2dd4bf", title: { vi: "Shopify — monorepo 11 app", en: "Shopify — an 11-app monorepo" } },
  { year: "2025 giữa", accent: "#f472b6", title: { vi: "Mobile: React Native, shield iOS", en: "Mobile: React Native, iOS shield" } },
  { year: "2025 cuối", accent: "#c6ff3d", title: { vi: "Web khách: cigar, homestay, eco", en: "Client sites: cigar, homestay, eco" } },
  { year: "2026 đầu", accent: "#ff7a29", title: { vi: "Go: MCP server, backend Gin", en: "Go: MCP server, Gin backend" } },
  { year: "2026", accent: "#a3e635", title: { vi: "Monorepo công ty, đồ án lớn", en: "Company monorepo, big projects" } },
];
