import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Tiếng Việt là ngôn ngữ canonical (mặc định), tiếng Anh bổ sung
  locales: ["vi", "en"],
  defaultLocale: "vi",
});

export type Locale = (typeof routing.locales)[number];
