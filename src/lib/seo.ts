import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

/** URL gốc của site (bỏ dấu "/" cuối). Dùng cho canonical, sitemap, robots. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const SITE_NAME = "dev/journey";

/** Chuẩn hoá path: rỗng cho trang chủ, còn lại luôn bắt đầu bằng "/". */
function norm(path: string) {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

/** Canonical + hreflang (vi/en/x-default) cho một trang theo locale hiện tại. */
export function buildAlternates(locale: string, path = ""): Metadata["alternates"] {
  const p = norm(path);
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = `/${l}${p}`;
  languages["x-default"] = `/${routing.defaultLocale}${p}`;
  return { canonical: `/${locale}${p}`, languages };
}

/** Metadata đầy đủ cho một trang: title/description + canonical/hreflang + OG + Twitter. */
export function pageMetadata(opts: {
  locale: string;
  path?: string;
  title: string;
  description: string;
  type?: "website" | "article";
  absoluteTitle?: boolean;
}): Metadata {
  const { locale, path = "", title, description, type = "website", absoluteTitle } = opts;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      type,
      siteName: SITE_NAME,
      title,
      description,
      url: `/${locale}${norm(path)}`,
      locale: locale === "vi" ? "vi_VN" : "en_US",
      alternateLocale: locale === "vi" ? "en_US" : "vi_VN",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
