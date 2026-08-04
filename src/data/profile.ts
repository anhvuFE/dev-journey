// Thông tin cá nhân thật (lấy từ portfolio anhvufe.github.io/portfolio).
// Dùng chung cho trang About và footer.

export const profile = {
  name: "Vũ Xuân Anh",
  handle: "anhvuFE",
  title: { vi: "Full Stack Developer", en: "Full Stack Developer" },
  email: "vuxuananh22@gmail.com",
  links: {
    portfolio: "https://anhvufe.github.io/portfolio/",
    github: "https://github.com/anhvuFE",
    linkedin: "https://www.linkedin.com/in/xu%C3%A2n-anh-v%C5%A9-515580367/",
    facebook: "https://www.facebook.com/xuananhvu2312/",
  },
  skills: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "React Native",
    "Node.js",
    "NestJS",
    "Express",
    "Tailwind CSS",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Prisma",
    "Docker",
    "Shopify",
    "Figma",
  ],
} as const;

export const socialLinks = [
  { key: "portfolio", label: "Portfolio", href: profile.links.portfolio },
  { key: "github", label: "GitHub", href: profile.links.github },
  { key: "linkedin", label: "LinkedIn", href: profile.links.linkedin },
  { key: "facebook", label: "Facebook", href: profile.links.facebook },
  { key: "email", label: "Email", href: `mailto:${profile.email}` },
] as const;
