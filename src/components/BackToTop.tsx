"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLocale } from "next-intl";

/** Nút về đầu trang, hiện khi cuộn xuống đủ xa. */
export default function BackToTop() {
  const [show, setShow] = useState(false);
  const L = useLocale() === "vi";

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      aria-label={L ? "Về đầu trang" : "Back to top"}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center border border-border bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-secondary hover:text-accent-c"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
