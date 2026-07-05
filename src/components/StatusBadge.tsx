import type { Recommendation } from "../domain/calculations";

const config: Record<
  Recommendation["severity"],
  { label: string; background: string; textColor: string; icon: string }
> = {
  alta: { label: "Alta", background: "var(--status-critical)", textColor: "var(--on-status-critical)", icon: "!" },
  media: { label: "Media", background: "var(--status-warning)", textColor: "var(--on-status-warning)", icon: "!" },
  baja: { label: "Baja", background: "var(--status-good)", textColor: "var(--on-status-good)", icon: "✓" },
};

export function SeverityBadge({ severity }: { severity: Recommendation["severity"] }) {
  const { label, background, textColor, icon } = config[severity];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide shadow-card"
      style={{ backgroundColor: background, color: textColor }}
    >
      <span aria-hidden="true">{icon}</span>
      Prioridad {label}
    </span>
  );
}
