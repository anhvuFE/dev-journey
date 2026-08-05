// Hiển thị đoạn code thật (mono, nền tối, có nhãn tên file + chấm accent).
// Không dùng thư viện highlight để nhẹ; style tối giản, hợp tông studio.

export default function CodeBlock({
  code,
  file,
  lang = "tsx",
}: {
  code: string;
  file?: string;
  lang?: string;
}) {
  return (
    <div className="my-6 overflow-hidden border border-border bg-[#0d0d0d]">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: "var(--c-accent, #c6ff3d)" }}
          />
          <span className="font-mono text-xs text-muted-foreground">
            {file ?? lang}
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
          {lang}
        </span>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono text-foreground/90">{code}</code>
      </pre>
    </div>
  );
}
