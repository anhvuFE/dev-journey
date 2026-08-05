export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="flex flex-col items-center gap-4">
        <span className="grid h-11 w-11 animate-pulse place-items-center rounded-[4px] bg-primary font-mono text-xl font-bold leading-none text-primary-foreground">
          /
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          loading…
        </span>
      </div>
    </div>
  );
}
