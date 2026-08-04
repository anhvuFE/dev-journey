"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Thanh tiến trình đọc (scrub theo cuộn) bằng GSAP ScrollTrigger. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      },
    );
  });

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left"
      style={{ background: "var(--c-accent, #6366f1)", transform: "scaleX(0)" }}
    />
  );
}
