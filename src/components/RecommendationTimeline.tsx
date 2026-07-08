import type { Recommendation } from "../domain/calculations";
import { Card } from "./Card";
import { SeverityBadge } from "./StatusBadge";

/**
 * Lista de recomendaciones en formato "timeline": un punto por ítem conectado por una
 * línea vertical fina, con la recomendación más urgente (la primera, ya vienen
 * ordenadas por prioridad) destacada en una tarjeta de color sólido en vez de solo un
 * badge — así se ve de un vistazo cuál es la próxima acción a tomar.
 */
export function RecommendationTimeline({ items }: { items: Recommendation[] }) {
  const Heading = "h3";
  return (
    <ol aria-label="Recomendaciones ordenadas por prioridad" className="flex flex-col">
      {items.map((rec, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        return (
          <li key={rec.title} className="grid grid-cols-[1.25rem_1fr] gap-4">
            <div className="flex flex-col items-center" aria-hidden="true">
              <span
                className={
                  isFirst
                    ? "mt-2 size-3 shrink-0 rounded-full bg-[var(--ink)]"
                    : "mt-2 size-3 shrink-0 rounded-full border-2 border-[var(--text-muted)] bg-[var(--surface-1)]"
                }
              />
              {!isLast && <span className="mt-1 w-px flex-1 bg-[var(--gridline)]" />}
            </div>

            {isFirst ? (
              <div
                className={`rounded-[1.75rem] bg-[var(--accent-yellow)] p-5 sm:p-6 ${isLast ? "" : "mb-4"}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <Heading className="font-bold text-[var(--on-accent-yellow)]">{rec.title}</Heading>
                  <SeverityBadge severity={rec.severity} />
                </div>
                <p className="mt-1.5 text-sm font-medium text-[var(--on-accent-yellow)]">{rec.detail}</p>
              </div>
            ) : (
              <Card className={isLast ? "" : "mb-4"}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <Heading className="font-semibold text-[var(--text-primary)]">{rec.title}</Heading>
                  <SeverityBadge severity={rec.severity} />
                </div>
                <p className="mt-1.5 text-sm text-[var(--text-secondary)]">{rec.detail}</p>
              </Card>
            )}
          </li>
        );
      })}
    </ol>
  );
}
