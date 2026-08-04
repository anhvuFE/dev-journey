import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16: file middleware đổi tên thành `proxy.ts`.
// next-intl xử lý việc chuyển hướng theo locale (vd "/" -> "/vi").
export const proxy = createMiddleware(routing);

export const config = {
  // Bỏ qua các đường dẫn nội bộ và file tĩnh
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
