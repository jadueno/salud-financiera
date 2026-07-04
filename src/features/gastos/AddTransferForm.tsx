import { useState } from "react";
import type { NewTransfer } from "../../domain/types";
import { Field } from "../../components/Field";

export function AddTransferForm({
  knownAccounts,
  onSubmit,
  onCancel,
}: {
  knownAccounts: string[];
  onSubmit: (transfer: NewTransfer) => Promise<void>;
  onCancel: () => void;
}) {
  const [fromAccount, setFromAccount] = useState(knownAccounts[0] ?? "");
  const [toAccount, setToAccount] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [isSavingsOrInvestment, setIsSavingsOrInvestment] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      className="mt-4 flex flex-col gap-3 border-t border-[var(--gridline)] pt-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
          await onSubmit({ fromAccount, toAccount, monthlyAmount, isSavingsOrInvestment });
          onCancel();
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Desde">
          <input
            required
            list="known-accounts-transfer"
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-1)] px-2.5 py-1.5 text-sm text-[var(--text-primary)]"
          />
        </Field>
        <Field label="Hasta (cuenta o producto)">
          <input
            required
            list="known-accounts-transfer"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-1)] px-2.5 py-1.5 text-sm text-[var(--text-primary)]"
          />
        </Field>
        <Field label="Importe mensual (€)">
          <input
            required
            type="number"
            min={0}
            step={0.01}
            value={monthlyAmount}
            onChange={(e) => setMonthlyAmount(Number(e.target.value))}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-1)] px-2.5 py-1.5 text-sm text-[var(--text-primary)]"
          />
        </Field>
        <label className="mt-6 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <input
            type="checkbox"
            checked={isSavingsOrInvestment}
            onChange={(e) => setIsSavingsOrInvestment(e.target.checked)}
          />
          Es ahorro o inversión real
        </label>
      </div>
      <datalist id="known-accounts-transfer">
        {knownAccounts.map((a) => (
          <option key={a} value={a} />
        ))}
      </datalist>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
          style={{ backgroundColor: "var(--series-violet)" }}
        >
          {submitting ? "Guardando…" : "Guardar transferencia"}
        </button>
        <button type="button" onClick={onCancel} className="rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)]">
          Cancelar
        </button>
      </div>
    </form>
  );
}
