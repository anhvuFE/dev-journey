import type { MetadataRoute } from "next";
import { chapters } from "@/data/chapters";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";

/** Sitemap song ngữ: trang chủ, About, và 7 chương × (vi, en), kèm hreflang. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["", "/about", ...chapters.map((c) => `/chapters/${c.id}`)];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "" ? 1 : path === "/about" ? 0.6 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
        ),
      },
    })),
  );
}
