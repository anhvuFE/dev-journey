"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Nút copy nội dung code (dùng trong header của CodeBlock). */
export default function CopyButton({ code, locale = "vi" }: { code: string; locale?: "vi" | "en" }) {
  const [copied, setCopied] = useState(false);
  const L = locale === "vi";

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // trình duyệt chặn clipboard -> bỏ qua
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? (L ? "Đã sao chép" : "Copied") : (L ? "Sao chép code" : "Copy code")}
      className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent-c"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? (L ? "đã copy" : "copied") : "copy"}
    </button>
  );
}
