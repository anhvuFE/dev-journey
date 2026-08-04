"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

/** Nút "nam châm" — nhích theo con trỏ khi rê chuột (hiệu ứng studio). */
export default function MagneticButton({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
      style={{ transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)" }}
    >
      {children}
    </a>
  );
}
