"use client";

import { useState, type FormEvent } from "react";
import { useLocale } from "next-intl";
import { ArrowRight, Check } from "lucide-react";

// Endpoint Formspree là công khai (đặt trong action của form) -> để mặc định
// ngay trong code cho tiện; vẫn cho phép override qua biến môi trường.
const ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/maewyvka";

export default function ContactForm({ label }: { label: string }) {
  const L = useLocale() === "vi";
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
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

  const label2 = "font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground";
  const field =
    "mt-1.5 w-full border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-accent-c focus:outline-none";

  return (
    <section className="mt-16">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">{label}</h2>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-[15px]">
        {L
          ? "Có dự án, cơ hội hợp tác, hay chỉ muốn chào hỏi? Gửi mình vài dòng — mình sẽ phản hồi sớm nhất có thể."
          : "Got a project, an opportunity, or just want to say hi? Drop me a line — I'll get back to you soon."}
      </p>

      {status === "ok" ? (
        <div className="mt-6 flex max-w-xl items-center gap-4 border border-accent-c/40 bg-card/50 p-6">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-c text-background">
            <Check className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold text-foreground">
              {L ? "Đã gửi — cảm ơn bạn!" : "Sent — thank you!"}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {L ? "Mình sẽ trả lời qua email sớm nhất." : "I'll reply by email shortly."}
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 max-w-xl border border-border bg-card/40 p-5 sm:p-7">
          {/* honeypot chống spam */}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className={label2}>{L ? "Tên" : "Name"}</span>
              <input name="name" required placeholder={L ? "Tên của bạn" : "Your name"} className={field} />
            </label>
            <label className="block">
              <span className={label2}>Email</span>
              <input name="email" type="email" required placeholder="you@email.com" className={field} />
            </label>
          </div>
          <label className="mt-5 block">
            <span className={label2}>{L ? "Lời nhắn" : "Message"}</span>
            <textarea
              name="message"
              required
              rows={4}
              placeholder={L ? "Bạn muốn nói gì với mình?" : "What would you like to say?"}
              className={`${field} resize-none`}
            />
          </label>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex items-center gap-2 bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {status === "sending" ? (L ? "Đang gửi…" : "Sending…") : L ? "Gửi lời nhắn" : "Send message"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            {status === "error" && (
              <span className="font-mono text-xs text-destructive">
                {L ? "Có lỗi, thử lại giúp mình nhé" : "Something went wrong, please retry"}
              </span>
            )}
          </div>
        </form>
      )}
    </section>
  );
}
