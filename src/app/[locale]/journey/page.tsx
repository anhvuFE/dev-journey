import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";
import ConstellationBg from "@/components/ConstellationBg";
import JourneyGraph from "@/components/journey/JourneyGraph";

type Locale = "vi" | "en";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/journey",
    title: locale === "vi" ? "Bản đồ hành trình" : "Journey map",
    description:
      locale === "vi"
        ? "Đồ thị nối các chương theo thời gian với công nghệ đã dùng — lần theo mạch học."
        : "A graph linking the chapters over time to the tech used — trace the learning thread.",
  });
}

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const L = locale === "vi";

  return (
    <div
      id="main"
      tabIndex={-1}
      className="relative min-h-screen bg-background text-foreground outline-none"
    >
      <ConstellationBg color="#c6ff3d" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 pt-24 pb-14 md:pt-28 md:pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {L ? "Về trang chủ" : "Back home"}
        </Link>

        <header className="mt-12 border-t border-border pt-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
            {L ? "Bản đồ hành trình" : "Journey map"}
          </p>
          <h1 className="mt-6 text-4xl font-extrabold uppercase leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
            {L ? "Năm · Chương · Công nghệ" : "Year · Chapter · Tech"}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {L
              ? "Mỗi chương là một chặng theo thời gian; đường nối chỉ ra công nghệ đã dùng ở chặng đó. Lần theo một chương hoặc một công nghệ để thấy mạch nối."
              : "Each chapter is a stop in time; the links show the tech used there. Follow a chapter or a tech to see the thread."}
          </p>
        </header>

        <div className="mt-12">
          <JourneyGraph />
        </div>
      </div>
    </div>
  );
}
