// Số liệu THẬT lấy từ inventory repo local + GitHub của anhvuFE.
export const stats = {
  githubUser: "anhvuFE",
  counters: [
    { key: "projects", value: 62, suffix: "+", sep: false, label: { vi: "dự án", en: "projects" } },
    { key: "commits", value: 7300, suffix: "+", sep: true, label: { vi: "commit", en: "commits" } },
    { key: "langs", value: 8, suffix: "", sep: false, label: { vi: "ngôn ngữ", en: "languages" } },
    { key: "years", value: 4, suffix: "", sep: false, label: { vi: "năm (2022→nay)", en: "years (since 2022)" } },
  ],
  // số dự án dùng mỗi công nghệ (từ inventory thật)
  tech: [
    { name: "TypeScript", count: 21 },
    { name: "React", count: 15 },
    { name: "Vite", count: 12 },
    { name: "Tailwind", count: 12 },
    { name: "Node / NestJS", count: 6 },
    { name: "Prisma / Shopify", count: 3 },
    { name: "Go · C# · Java", count: 3 },
  ],
};
