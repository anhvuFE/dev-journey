"use client";

import { useRef, useState } from "react";
import { useLocale } from "next-intl";
import TechConstellation from "./TechConstellation";
import ProjectsExplorer, { type Proj } from "./ProjectsExplorer";

export default function ProjectsView({
  projects,
  initialTech = null,
}: {
  projects: Proj[];
  initialTech?: string | null;
}) {
  const [tech, setTech] = useState<string | null>(initialTech);
  const gridRef = useRef<HTMLDivElement>(null);
  const L = useLocale() === "vi";

  // Bấm 1 sao -> lọc theo tech + cuộn xuống danh sách dự án
  const pick = (t: string) => {
    setTech(t);
    setTimeout(
      () => gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      60,
    );
  };

  return (
    <div className="mt-10">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-c">
        {L
          ? "Bản đồ công nghệ · di chuột xem tên · bấm để lọc"
          : "Tech map · hover for name · tap to filter"}
      </p>
      <div className="mt-4">
        <TechConstellation onSelect={pick} active={tech} />
      </div>

      <div ref={gridRef} className="mt-12 scroll-mt-24">
        <ProjectsExplorer projects={projects} tech={tech} onTech={setTech} />
      </div>
    </div>
  );
}
