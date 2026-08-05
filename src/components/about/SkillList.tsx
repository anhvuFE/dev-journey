import { profile } from "@/data/profile";

export default function SkillList({ label }: { label: string }) {
  return (
    <section className="mt-16">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
        {label}
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
  );
}
