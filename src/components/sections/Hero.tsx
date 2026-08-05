"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene3D from "@/components/three/Scene3D";
import MagneticButton from "@/components/MagneticButton";
import { profile } from "@/data/profile";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const t = useTranslations("hero");
  const words = t("title").split(" ");
  const ticker = [...profile.skills, ...profile.skills];

  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const st = {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      };
      gsap.to(textRef.current, {
        yPercent: -35,
        opacity: 0,
        ease: "none",
        scrollTrigger: st,
      });
      gsap.to(sceneRef.current, {
        yPercent: 18,
        scale: 0.82,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: st,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] overflow-hidden">
      <div className="mx-auto grid min-h-[100svh] max-w-6xl grid-cols-1 items-center gap-4 px-5 pb-24 pt-24 md:grid-cols-12 md:gap-8 md:pb-16">
        {/* Cột chữ */}
        <div ref={textRef} className="order-2 md:order-1 md:col-span-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 font-mono text-xs uppercase tracking-[0.35em] text-primary"
          >
            // {t("kicker")}
          </motion.p>

          <h1 className="text-[11vw] font-extrabold uppercase leading-[1.08] tracking-[-0.01em] sm:text-6xl md:text-7xl">
            {words.map((w, i) => (
              <span key={i} className="mr-[0.22em] inline-block">
                <motion.span
                  className="inline-block will-change-transform"
                  initial={{ y: 44, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease }}
            className="mt-8 max-w-md text-base text-muted-foreground sm:text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease }}
          >
            <MagneticButton
              href="#chapters"
              className="mt-9 inline-flex items-center gap-3 bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground"
            >
              {t("cta")} <span aria-hidden>→</span>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Cột Rubik 3D — tách riêng, không chồng chữ */}
        <div
          ref={sceneRef}
          className="relative order-1 h-[38vh] w-full md:order-2 md:col-span-5 md:h-[68vh]"
        >
          <Scene3D accent="#c6ff3d" />
        </div>
      </div>

      {/* Ticker chạy ngang dưới cùng */}
      <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t border-border bg-background/70 py-4 backdrop-blur-sm">
        <div className="animate-marquee flex w-max whitespace-nowrap font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
          {ticker.map((s, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6">{s}</span>
              <span className="text-primary">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
