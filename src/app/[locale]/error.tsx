"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const L = useLocale() === "vi";

  useEffect(() => {
    // Log lỗi để debug (thay bằng dịch vụ logging nếu cần)
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-5 pb-16 pt-28">
      <div className="border border-border bg-[#0d0d0d]">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--neon)" }} />
          <span className="font-mono text-xs text-muted-foreground">zsh — error</span>
        </div>
        <div className="p-5 font-mono text-sm leading-relaxed sm:p-6">
          <p className="text-destructive">Error: unhandled exception</p>
          <p className="mt-4 font-sans text-base text-foreground/90">
            {L
              ? "Có gì đó vừa hỏng — mình đã ghi lại lỗi. Thử tải lại nhé."
              : "Something just broke — the error was logged. Try reloading."}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-7 inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            {L ? "thử lại" : "try again"}
          </button>
        </div>
      </div>
    </main>
  );
}
