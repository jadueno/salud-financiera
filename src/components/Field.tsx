import type { ReactNode } from "react";

/** Anillo de foco consistente para toda la app (mismo patrón que la navegación). */
export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--series-income)]";

/** Estilo compartido para inputs y selects de los formularios. */
export const inputClass = `w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)] transition-colors focus-visible:border-[var(--series-income)] ${focusRing}`;

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-[var(--text-secondary)]">{label}</span>
      {children}
    </label>
  );
}
