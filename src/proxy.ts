import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16: file middleware đổi tên thành `proxy.ts`.
// next-intl xử lý việc chuyển hướng theo locale (vd "/" -> "/vi").
export const proxy = createMiddleware(routing);

export const config = {
  // Bỏ qua đường dẫn nội bộ, file tĩnh, và các route metadata sinh động
  // (icon/apple-icon không có đuôi file nên phải loại tay).
  matcher: ["/((?!api|_next|_vercel|icon|apple-icon|manifest|sitemap|robots|.*\\..*).*)"],
};
