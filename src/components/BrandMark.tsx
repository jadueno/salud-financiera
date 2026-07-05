/**
 * Marca de la app: dos formas orgánicas (amarillo + violeta) superpuestas sobre un
 * fondo tinta, ecoando el lenguaje visual de bloques de color planos de la app.
 */
export function BrandMark({ size = "md" }: { size?: "sm" | "md" }) {
  const dims = size === "sm" ? "size-8" : "size-9";
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex ${dims} shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--ink)]`}
    >
      <span className="absolute -top-2 -left-2 size-6 rounded-full bg-[var(--accent-yellow)]" />
      <span className="absolute -right-2 -bottom-2 size-6 rounded-full bg-[var(--series-violet)]" />
    </span>
  );
}
