import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { profile } from "@/data/profile";
import { stats } from "@/data/stats";
import { chapters } from "@/data/chapters";
import { timeline } from "@/data/timeline";
import { certificates } from "@/data/certificates";
import { pageMetadata } from "@/lib/seo";
import PrintButton from "@/components/PrintButton";

type Locale = "vi" | "en";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/cv",
    title: "CV — Vũ Xuân Anh",
    description:
      locale === "vi"
        ? "Hồ sơ năng lực rút gọn của Vũ Xuân Anh — Full Stack Developer."
        : "One-page résumé of Vũ Xuân Anh — Full Stack Developer.",
  });
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-7">
      <h2 className="border-b border-neutral-200 pb-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default async function CvPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const L = locale === "vi";

  const clientProjects = chapters.flatMap((c) =>
    c.repos.filter((r) => r.privacy === "client").map((r) => ({ repo: r, chapter: c })),
  );

  return (
    <div className="cv-page relative min-h-screen bg-background py-24 md:py-28">
      <div
        id="main"
        tabIndex={-1}
        className="cv-sheet mx-auto max-w-3xl bg-white text-neutral-900 shadow-2xl outline-none"
      >
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">{profile.name}</h1>
              <p className="mt-1 font-mono text-sm uppercase tracking-wide text-neutral-500">
                {profile.title[locale]}
              </p>
            </div>
            <PrintButton />
          </div>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-neutral-600">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.links.github}>github.com/{profile.handle}</a>
            <a href={profile.links.linkedin}>LinkedIn</a>
            <a href={profile.links.portfolio}>Portfolio</a>
          </div>

          {/* Summary */}
          <Section title={L ? "Giới thiệu" : "Summary"}>
            <p className="text-sm leading-relaxed text-neutral-700">
              {L
                ? "Full Stack Developer với hành trình tự học từ 2022: từ những trang HTML đầu tiên tới các dự án full-stack cho khách hàng thật. Mạnh về React/Next.js, TypeScript và Node/NestJS."
                : "Self-taught Full Stack Developer since 2022 — from first HTML pages to full-stack products for real clients. Strong in React/Next.js, TypeScript and Node/NestJS."}
            </p>
          </Section>

          {/* Stats */}
          <Section title={L ? "Bằng những con số" : "By the numbers"}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.counters.map((c) => (
                <div key={c.key}>
                  <div className="text-xl font-extrabold text-neutral-900">
                    {c.sep ? c.value.toLocaleString("vi-VN") : c.value}
                    {c.suffix}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wide text-neutral-500">
                    {c.label[locale]}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Skills */}
          <Section title={L ? "Kỹ năng" : "Skills"}>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((s) => (
                <span
                  key={s}
                  className="border border-neutral-300 px-2 py-0.5 font-mono text-[11px] text-neutral-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>

          {/* Key projects */}
          <Section title={L ? "Dự án tiêu biểu" : "Selected projects"}>
            <ul className="space-y-3">
              {clientProjects.map(({ repo, chapter }) => (
                <li key={chapter.id + repo.name}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-bold text-neutral-900">{repo.name}</span>
                    <span className="font-mono text-[10px] text-neutral-500">
                      {repo.stack.slice(0, 4).join(" · ")}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm leading-snug text-neutral-600">{repo.blurb[locale]}</p>
                </li>
              ))}
            </ul>
          </Section>

          {/* Journey */}
          <Section title={L ? "Hành trình" : "Journey"}>
            <ul className="space-y-1.5">
              {timeline.map((m, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="w-20 shrink-0 font-mono text-xs text-neutral-500">{m.year}</span>
                  <span className="text-neutral-700">{m.title[locale]}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Certifications */}
          <Section title={L ? `Chứng chỉ (${certificates.length})` : `Certifications (${certificates.length})`}>
            <ul className="space-y-1">
              {certificates.slice(0, 6).map((c) => (
                <li key={c.title} className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-neutral-700">{c.title}</span>
                  <span className="shrink-0 font-mono text-[10px] text-neutral-500">
                    {c.issuer} · {c.date}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}
