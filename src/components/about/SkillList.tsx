import { profile } from "@/data/profile";

// Chip kỹ năng — dùng chung cho 2 hàng marquee
const chip =
  "shrink-0 whitespace-nowrap border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-muted-foreground";

export default function SkillList({ label }: { label: string }) {
  // Hàng trên chạy trái, hàng dưới đảo thứ tự + chạy phải -> đối nhau cho sinh động.
  // Nhân đôi danh sách để vòng lặp liền mạch (marquee dịch -50%).
  const top = [...profile.skills, ...profile.skills];
  const bottom = [...profile.skills].reverse();
  const bottomLoop = [...bottom, ...bottom];

  return (
    <section className="mt-16">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
        {label}
      </h2>

      <div className="mt-6 space-y-3 overflow-hidden">
        <div className="flex w-max animate-marquee gap-2" style={{ animationDuration: "34s" }}>
          {top.map((s, i) => (
            <span key={`t-${i}`} className={chip}>
              {s}
            </span>
          ))}
        </div>
        <div
          className="flex w-max animate-marquee gap-2 [animation-direction:reverse]"
          style={{ animationDuration: "42s" }}
        >
          {bottomLoop.map((s, i) => (
            <span key={`b-${i}`} className={chip}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
