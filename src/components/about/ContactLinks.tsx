import { socialLinks } from "@/data/profile";

export default function ContactLinks({ label }: { label: string }) {
  return (
    <section className="mt-16">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
        {label}
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
  );
}
