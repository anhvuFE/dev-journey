import { setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/Reveal";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import ConstellationBg from "@/components/ConstellationBg";
import Certificates from "@/components/sections/Certificates";
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
      { n: "2022→nay", l: "hành trình" },
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
      { n: "2022→now", l: "the journey" },
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
    <div data-theme="growing-up" className="relative min-h-screen bg-background text-foreground">
      <ConstellationBg color="#a3e635" />
      <ScrollProgress />
      <SmoothScroll />

      <div className="relative z-10 mx-auto max-w-4xl px-5 py-14 md:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {c.back}
        </Link>

        {/* Masthead */}
        <header className="mt-12 border-t border-border pt-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
            {c.kicker}
          </p>
          <h1 className="mt-6 text-5xl font-extrabold uppercase leading-[1.02] tracking-tight md:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-4 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
            {profile.title[locale]}
          </p>
        </header>

        {/* Bio */}
        <div className="mt-12 max-w-2xl space-y-5">
          {c.body.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-lg leading-relaxed text-muted-foreground">{p}</p>
            </Reveal>
          ))}
        </div>

        {/* Số liệu — lưới hairline */}
        <div className="mt-16 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
          {c.stats.map((s) => (
            <div key={s.l} className="bg-background p-6 text-center">
              <div
                className="text-3xl font-extrabold"
                style={{ color: "var(--c-accent)" }}
              >
                {s.n}
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* Kỹ năng */}
        <section className="mt-16">
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
            {c.skillsLabel}
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {profile.skills.map((s) => (
              <span
                key={s}
                className="border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Chứng chỉ */}
        <Certificates />

        {/* Liên hệ */}
        <section className="mt-16">
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
            {c.connectLabel}
          </h2>
          <div className="mt-5 grid gap-px border border-border bg-border sm:grid-cols-2">
            {socialLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between bg-background p-5 transition-colors hover:text-accent-c"
              >
                <span className="font-mono text-sm uppercase tracking-wide">
                  {link.label}
                </span>
                <span
                  aria-hidden
                  className="text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent-c"
                >
                  ↗
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
