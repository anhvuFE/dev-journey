"use client";

import { useEffect, useRef } from "react";

/** Con trỏ neon: chấm bám sát + vòng sáng theo con trỏ (nhạy), phóng to khi rê
 *  qua phần tử tương tác. Tự tắt trên cảm ứng; dừng vòng lặp khi chuột đứng yên. */
export default function NeonCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return; // thiết bị cảm ứng -> bỏ qua
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const k = reduce ? 1 : 0.35; // hệ số bám: cao = nhạy (ít trễ)

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let moved = false;

    const loop = () => {
      rx += (mx - rx) * k;
      ry += (my - ry) * k;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      // Đã bắt kịp con trỏ và không còn di chuyển -> ngủ (tiết kiệm CPU/GPU)
      if (!moved && Math.abs(mx - rx) < 0.1 && Math.abs(my - ry) < 0.1) {
        raf = 0;
        return;
      }
      moved = false;
      raf = requestAnimationFrame(loop);
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      moved = true;
      wake();
    };
    const over = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement)?.closest(
        "a, button, [role=button], input, textarea, [data-cursor]",
      );
      ring.current?.classList.toggle("cursor-ring--active", Boolean(hit));
    };

    document.documentElement.classList.add("has-neon-cursor");
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    wake();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("has-neon-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden />
    </>
  );
}
