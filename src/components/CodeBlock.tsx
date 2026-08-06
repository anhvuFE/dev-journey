import { codeToHtml } from "shiki";
import CopyButton from "@/components/CopyButton";

const LANG_MAP: Record<string, string> = {
  tsx: "tsx",
  ts: "ts",
  js: "js",
  jsx: "jsx",
  go: "go",
  html: "html",
  css: "css",
  json: "json",
  csharp: "csharp",
  "c#": "csharp",
  java: "java",
};

// Hiển thị code THẬT có syntax highlighting (Shiki, chạy lúc build → 0 chi phí
// client). Khung cửa sổ có tên file + chấm accent theo theme chương.
export default async function CodeBlock({
  code,
  file,
  lang = "tsx",
}: {
  code: string;
  file?: string;
  lang?: string;
}) {
  const html = await codeToHtml(code, {
    lang: LANG_MAP[lang] ?? "tsx",
    theme: "tokyo-night",
  });

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
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {lang}
          </span>
          <CopyButton code={code} />
        </div>
      </div>
      <div
        className="overflow-x-auto p-3 text-xs leading-relaxed [-webkit-overflow-scrolling:touch] [&_code]:font-mono [&_pre]:!m-0 [&_pre]:!bg-transparent sm:p-4 sm:text-[13px]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
