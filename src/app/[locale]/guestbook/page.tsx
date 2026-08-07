import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft, GitBranch } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";
import ConstellationBg from "@/components/ConstellationBg";
import GuestbookBoard from "@/components/guestbook/GuestbookBoard";

type Locale = "vi" | "en";

const DISCUSSION_URL = "https://github.com/anhvuFE/dev-journey/discussions/49";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/guestbook",
    title: locale === "vi" ? "Sổ lưu bút" : "Guestbook",
    description:
      locale === "vi"
        ? "Đăng nhập GitHub và để lại một dòng — ký tên vào hành trình."
        : "Sign in with GitHub and leave a mark on the journey.",
  });
}

export default async function GuestbookPage({
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

      <div className="relative z-10 mx-auto max-w-3xl px-5 pt-24 pb-14 md:pt-28 md:pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {L ? "Về trang chủ" : "Back home"}
        </Link>

        <header className="mt-12 border-t border-border pt-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
            {L ? "Sổ lưu bút" : "Guestbook"}
          </p>
          <h1 className="mt-6 text-4xl font-extrabold uppercase leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
            {L ? "Ký tên vào hành trình" : "Sign the journey"}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {L
              ? "Ghé qua rồi thì để lại một dòng nhé. Đăng nhập bằng GitHub, viết vài chữ — tên bạn sẽ nằm lại đây."
              : "If you made it here, leave a mark. Sign in with GitHub, write a few words — your name stays here."}
          </p>

          <a
            href={DISCUSSION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 border border-border px-5 py-3 font-mono text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:border-accent-c hover:text-foreground"
          >
            <GitBranch className="h-4 w-4" />
            {L ? "Ký tên trên GitHub" : "Sign on GitHub"}
          </a>
        </header>

        <GuestbookBoard />
      </div>
    </div>
  );
}
