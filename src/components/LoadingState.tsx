function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`skeleton-shimmer rounded-lg bg-[var(--gridline)] ${className}`} />;
}

/** Skeleton de carga inicial, mientras se obtienen los datos financieros del backend. */
export function LoadingState() {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-6">
      <span className="sr-only">Cargando datos…</span>

      <div className="flex flex-col gap-2" aria-hidden="true">
        <SkeletonBlock className="h-7 w-40" />
        <SkeletonBlock className="h-4 w-64 max-w-full" />
      </div>

      <div
        aria-hidden="true"
        className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-1)] p-5 shadow-card sm:p-6"
      >
        <SkeletonBlock className="h-4 w-48" />
        <SkeletonBlock className="mt-4 h-28 w-full" />
        <SkeletonBlock className="mt-4 h-4 w-56 max-w-full" />
      </div>

      <div aria-hidden="true" className="grid gap-6 sm:grid-cols-2">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-1)] p-5 shadow-card sm:p-6"
          >
            <SkeletonBlock className="h-4 w-32" />
            <SkeletonBlock className="mt-4 h-9 w-24" />
            <SkeletonBlock className="mt-3 h-3 w-40 max-w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
