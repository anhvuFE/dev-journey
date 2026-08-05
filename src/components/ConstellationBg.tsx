"use client";

import { useEffect, useRef } from "react";

/**
 * Nền "chòm sao": các điểm sáng trôi nhẹ, nối với nhau bằng đường mảnh khi ở
 * gần. Canvas 2D — nhẹ, không tốn WebGL context. Màu theo tông chương.
 * Tự vẽ tĩnh (không animate) nếu người dùng bật giảm hiệu ứng.
 */
export default function ConstellationBg({ color = "#38bdf8" }: { color?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const MAX = 130;
    let w = 0;
    let h = 0;
    let raf = 0;
    let pts: { x: number; y: number; vx: number; vy: number }[] = [];

    const seed = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // cap thấp hơn để giảm phép tính O(n²) mỗi khung hình
      const n = Math.max(20, Math.min(64, Math.floor((w * h) / 24000)));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
      }));
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        else if (p.y > h) p.y = 0;
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < MAX) {
            ctx.globalAlpha = (1 - d / MAX) * 0.16;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = color;
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (animate) raf = requestAnimationFrame(frame);
    };

    const onResize = () => {
      seed();
      if (!animate) frame();
    };

    seed();
    if (animate) raf = requestAnimationFrame(frame);
    else frame();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [color]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ opacity: 0.55 }}
    />
  );
}
