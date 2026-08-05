import Reveal from "@/components/Reveal";
import { profile } from "@/data/profile";

export default function AboutIntro({
  kicker,
  body,
  locale,
}: {
  kicker: string;
  body: string[];
  locale: "vi" | "en";
}) {
  return (
    <header className="mt-12 border-t border-border pt-10">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
        {kicker}
      </p>
      {/* Tên: mobile cho xuống dòng tự nhiên; từ tablet trở lên giữ 1 dòng */}
      <h1 className="mt-6 text-4xl font-extrabold uppercase leading-[1.02] tracking-tight sm:whitespace-nowrap sm:text-5xl md:text-6xl lg:text-7xl">
        {profile.name}
      </h1>
      <p className="mt-4 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
        {profile.title[locale]}
      </p>

      {/* Giới thiệu: 2 đoạn xếp 2 cột song song -> cân bằng chiều ngang */}
      <div className="mt-10 grid gap-x-14 gap-y-4 md:mt-12 md:grid-cols-2 md:gap-y-5 lg:gap-x-20">
        {body.map((p, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {p}
            </p>
          </Reveal>
        ))}
      </div>
    </header>
  );
}
