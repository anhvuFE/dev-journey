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
    <>
      <header className="mt-12 border-t border-border pt-8">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
          {kicker}
        </p>
        <h1 className="mt-6 text-5xl font-extrabold uppercase leading-[1.02] tracking-tight md:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-4 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
          {profile.title[locale]}
        </p>
      </header>

      <div className="mt-12 max-w-2xl space-y-5">
        {body.map((p, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p className="text-lg leading-relaxed text-muted-foreground">{p}</p>
          </Reveal>
        ))}
      </div>
    </>
  );
}
