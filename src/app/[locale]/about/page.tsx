import { setRequestLocale } from "next-intl/server";
import { ArrowLeft, Mail, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/Reveal";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import { profile, socialLinks } from "@/data/profile";

type Locale = "vi" | "en";

const copy = {
  vi: {
    back: "Về trang chủ",
    kicker: "Về mình",
    body: [
      "Mình là Vũ Xuân Anh, một Full Stack Developer vẫn đang học mỗi ngày. Trang này gom lại gần như tất cả những gì mình từng gõ ra: từ mấy trang HTML ngây ngô đầu tiên, tới các dự án full-stack cho khách hàng thật.",
      "Mình không phải thiên tài lập trình. Mình chỉ làm nhiều, sai nhiều, và ghi lại. Nếu bạn là newbie, hy vọng hành trình này khiến bạn thấy: ai cũng bắt đầu từ số 0.",
    ],
    skillsLabel: "Mình làm việc với",
    connectLabel: "Kết nối với mình",
    stats: [
      { n: "60+", l: "dự án" },
      { n: "7.000+", l: "commit" },
      { n: "8+", l: "ngôn ngữ" },
      { n: "2024→nay", l: "hành trình" },
    ],
  },
  en: {
    back: "Back home",
    kicker: "About",
    body: [
      "I'm Vũ Xuân Anh, a Full Stack Developer still learning every day. This page gathers almost everything I've ever typed out: from my first naive HTML pages to full-stack projects for real clients.",
      "I'm no coding genius. I just build a lot, break a lot, and write it down. If you're a beginner, I hope this journey shows you that everyone starts at zero.",
    ],
    skillsLabel: "I work with",
    connectLabel: "Connect with me",
    stats: [
      { n: "60+", l: "projects" },
      { n: "7,000+", l: "commits" },
      { n: "8+", l: "languages" },
      { n: "2024→now", l: "the journey" },
    ],
  },
} satisfies Record<Locale, unknown>;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = copy[locale];

  return (
    <div
      data-theme="growing-up"
      className="grain relative min-h-screen"
      style={{ background: "var(--c-bg)", color: "var(--c-fg)" }}
    >
      <ScrollProgress />
      <SmoothScroll />
      <div
        className="pointer-events-none fixed left-1/2 top-0 -z-0 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: "var(--c-glow)" }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-5 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm opacity-70 transition-opacity hover:opacity-100"
        >
          <ArrowLeft className="h-4 w-4" />
          {c.back}
        </Link>

        <Reveal>
          <p
            className="mt-10 font-mono text-xs uppercase tracking-[0.3em]"
            style={{ color: "var(--c-accent)" }}
          >
            {c.kicker}
          </p>
          <h1 className="glow-text mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-lg" style={{ color: "var(--c-accent)" }}>
            {profile.title[locale]}
          </p>
        </Reveal>

        <div className="mt-10 space-y-5">
          {c.body.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--c-muted)" }}
              >
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Kỹ năng */}
        <Reveal>
          <div className="mt-12">
            <p
              className="text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--c-accent)" }}
            >
              {c.skillsLabel}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 px-3 py-1 text-sm"
                  style={{
                    background:
                      "color-mix(in oklab, var(--c-accent) 10%, transparent)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Số liệu */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {c.stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.05}>
              <div className="glow-ring rounded-2xl border border-white/10 bg-black/20 p-5 text-center">
                <div
                  className="text-2xl font-bold"
                  style={{ color: "var(--c-accent)" }}
                >
                  {s.n}
                </div>
                <div className="mt-1 text-xs" style={{ color: "var(--c-muted)" }}>
                  {s.l}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Liên hệ */}
        <Reveal>
          <div className="mt-12">
            <p
              className="text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--c-accent)" }}
            >
              {c.connectLabel}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm transition-colors hover:border-white/40"
                >
                  {link.key === "email" ? (
                    <Mail className="h-4 w-4" style={{ color: "var(--c-accent)" }} />
                  ) : (
                    <ExternalLink
                      className="h-4 w-4"
                      style={{ color: "var(--c-accent)" }}
                    />
                  )}
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
