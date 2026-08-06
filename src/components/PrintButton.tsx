"use client";

import { Printer } from "lucide-react";
import { useLocale } from "next-intl";

export default function PrintButton() {
  const L = useLocale() === "vi";
  return (
    <button
      type="button"
      data-noprint
      onClick={() => window.print()}
      className="inline-flex shrink-0 items-center gap-2 border border-neutral-300 px-4 py-2 font-mono text-xs uppercase tracking-wide text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900"
    >
      <Printer className="h-4 w-4" />
      {L ? "In / Lưu PDF" : "Print / Save PDF"}
    </button>
  );
}
