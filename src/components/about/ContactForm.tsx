"use client";

import { useState, type FormEvent } from "react";
import { useLocale } from "next-intl";

const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

/** Form liên hệ gửi qua Formspree (không cần backend riêng). */
export default function ContactForm({ label }: { label: string }) {
  const L = useLocale() === "vi";
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!ENDPOINT) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full border border-border bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none";

  return (
    <section className="mt-16">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">{label}</h2>
      <form onSubmit={onSubmit} className="mt-6 grid max-w-xl gap-4">
        {/* honeypot chống spam */}
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="name" required placeholder={L ? "Tên của bạn" : "Your name"} className={field} />
          <input name="email" type="email" required placeholder="Email" className={field} />
        </div>
        <textarea name="message" required rows={4} placeholder={L ? "Lời nhắn…" : "Message…"} className={field} />
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {status === "sending" ? (L ? "Đang gửi…" : "Sending…") : L ? "Gửi lời nhắn" : "Send message"}
          </button>
          {status === "ok" && (
            <span className="font-mono text-xs text-accent-c">
              {L ? "Đã gửi — cảm ơn bạn!" : "Sent — thank you!"}
            </span>
          )}
          {status === "error" && (
            <span className="font-mono text-xs text-destructive">
              {ENDPOINT
                ? L
                  ? "Có lỗi, thử lại nhé"
                  : "Something went wrong"
                : L
                  ? "Form chưa được cấu hình endpoint"
                  : "Form endpoint not configured"}
            </span>
          )}
        </div>
      </form>
    </section>
  );
}
