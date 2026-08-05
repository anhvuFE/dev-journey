import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

/** Trang 404 dạng terminal — "command not found". */
export default async function NotFound() {
  const L = (await getLocale()) === "vi";

  return (
    <main className="relative z-10 mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-5 pb-16 pt-28 md:pt-32">
      <div className="border border-border bg-[#0d0d0d]">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--neon)" }} />
          <span className="font-mono text-xs text-muted-foreground">zsh — 404</span>
        </div>
        <div className="p-5 font-mono text-sm leading-relaxed sm:p-6">
          <p className="text-muted-foreground">visitor@dev-journey:~$ open .</p>
          <p className="mt-2 text-destructive">zsh: no such file or directory: 404</p>
          <p className="mt-5 font-sans text-base text-foreground/90">
            {L
              ? "Trang bạn tìm không tồn tại — có thể nó đã bị refactor 😅"
              : "The page you're looking for doesn't exist — maybe it got refactored 😅"}
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground"
          >
            cd ~ · {L ? "về trang chủ" : "go home"}
          </Link>
        </div>
      </div>
    </main>
  );
}
