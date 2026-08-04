"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Kể chuyện theo cuộn: mỗi đoạn văn sáng dần và trôi lên khi bạn cuộn tới
 * (scrub theo vị trí cuộn). Tự bỏ qua nếu người dùng bật giảm hiệu ứng.
 */
export default function ChapterScrollStory({
  paragraphs,
}: {
  paragraphs: string[];
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return;

      const lines = gsap.utils.toArray<HTMLElement>(".story-line");
      lines.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.12, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 45%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="space-y-8">
      {paragraphs.map((para, i) => (
        <p key={i} className="story-line text-xl leading-relaxed">
          {para}
        </p>
      ))}
    </div>
  );
}
