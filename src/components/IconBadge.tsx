import type { ComponentType, SVGProps } from "react";

export type IconBadgeTone = "income" | "savings" | "expense" | "violet" | "neutral";

const toneClass: Record<IconBadgeTone, string> = {
  income: "bg-[color-mix(in_srgb,var(--series-income)_16%,transparent)] text-[var(--series-income)]",
  savings: "bg-[color-mix(in_srgb,var(--series-savings)_16%,transparent)] text-[var(--series-savings)]",
  expense: "bg-[color-mix(in_srgb,var(--series-expense)_16%,transparent)] text-[var(--series-expense)]",
  violet: "bg-[color-mix(in_srgb,var(--series-violet)_16%,transparent)] text-[var(--series-violet)]",
  neutral: "bg-[var(--surface-2)] text-[var(--text-secondary)]",
};

/** Chip circular de color con un icono dentro; da jerarquía visual a títulos de tarjeta. */
export function IconBadge({
  icon: Icon,
  tone = "neutral",
  size = "md",
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone?: IconBadgeTone;
  size?: "sm" | "md";
}) {
  const dims = size === "sm" ? "size-8" : "size-10";
  const iconDims = size === "sm" ? "size-4" : "size-5";
  return (
    <span
      aria-hidden="true"
      className={`inline-flex ${dims} shrink-0 items-center justify-center rounded-full ${toneClass[tone]}`}
    >
      <Icon className={iconDims} />
    </span>
  );
}
