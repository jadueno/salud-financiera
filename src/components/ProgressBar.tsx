export function ProgressBar({
  progress,
  color = "var(--series-savings)",
  label,
}: {
  progress: number; // 0..1
  color?: string;
  label?: string;
}) {
  const pct = Math.round(Math.min(1, Math.max(0, progress)) * 100);
  return (
    <div
      className="h-3 w-full overflow-hidden rounded-full bg-[var(--gridline)]"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className="h-3 rounded-full transition-[width] duration-500 ease-out"
        style={{
          width: `${Math.max(2, pct)}%`,
          background: `linear-gradient(90deg, color-mix(in srgb, ${color} 80%, black), ${color})`,
        }}
      />
    </div>
  );
}
