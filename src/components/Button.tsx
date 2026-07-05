import type { ButtonHTMLAttributes } from "react";
import { focusRing } from "./Field";

export type ButtonTone = "ink" | "income" | "savings" | "expense" | "violet" | "critical" | "neutral";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Color del botón. "ink" (negro/blanco según tema) es el tono por defecto para la
   * acción principal de cada pantalla o formulario. Los tonos de color (income/savings/
   * expense/violet) se reservan para acciones agrupadas que se benefician de distinguirse
   * por color (p. ej. añadir cuenta/gasto/transferencia en la misma fila).
   */
  tone?: ButtonTone;
  /**
   * "solid": botón principal, píldora rellena — reservado para la acción principal de
   * cada pantalla (normalmente tone="ink") y para confirmaciones destructivas (tone="critical").
   * "tint": píldora con fondo muy suave del color del tono y texto/borde en ese color —
   * para acciones secundarias agrupadas que se benefician de distinguirse por color, sin
   * competir en peso visual con el botón sólido principal.
   * "ghost": botón terciario, sin fondo ni color de marca.
   */
  variant?: "solid" | "tint" | "ghost";
  /** Reduce el padding para usos compactos (p. ej. junto a un título). */
  size?: "sm" | "md";
}

const toneVars: Record<Exclude<ButtonTone, "neutral">, { bg: string; fg: string }> = {
  ink: { bg: "var(--ink)", fg: "var(--on-ink)" },
  income: { bg: "var(--series-income)", fg: "var(--on-series-income)" },
  savings: { bg: "var(--series-savings)", fg: "var(--on-series-savings)" },
  expense: { bg: "var(--series-expense)", fg: "var(--on-series-expense)" },
  violet: { bg: "var(--series-violet)", fg: "var(--on-series-violet)" },
  critical: { bg: "var(--status-critical)", fg: "var(--on-status-critical)" },
};

/**
 * Botón compartido por toda la app: misma forma de píldora, radios y transiciones en
 * cualquier pantalla o formulario. No lleva lógica de negocio, solo presentación.
 */
export function Button({
  tone = "ink",
  variant = "solid",
  size = "md",
  className = "",
  style,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const sizeClass = size === "sm" ? "px-3.5 py-1.5 text-sm" : "px-4 py-2.5 text-sm";
  const base = `inline-flex items-center justify-center gap-1.5 rounded-full font-semibold whitespace-nowrap transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`;

  if (variant === "ghost") {
    return (
      <button
        type="button"
        disabled={disabled}
        className={`${base} ${sizeClass} text-[var(--text-secondary)] hover:bg-[var(--gridline)] active:scale-[0.98] ${className}`}
        style={style}
        {...rest}
      >
        {children}
      </button>
    );
  }

  const colors = tone === "neutral" ? { bg: "var(--text-secondary)", fg: "var(--surface-1)" } : toneVars[tone];

  if (variant === "tint") {
    return (
      <button
        type="button"
        disabled={disabled}
        className={`${base} ${sizeClass} border hover:brightness-95 active:scale-[0.98] ${className}`}
        style={{
          backgroundColor: `color-mix(in srgb, ${colors.bg} 14%, var(--surface-1))`,
          borderColor: `color-mix(in srgb, ${colors.bg} 30%, transparent)`,
          color: colors.bg,
          ...style,
        }}
        {...rest}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={`${base} ${sizeClass} shadow-card hover:shadow-card-hover hover:brightness-110 active:scale-[0.98] ${className}`}
      style={{ backgroundColor: colors.bg, color: colors.fg, ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
