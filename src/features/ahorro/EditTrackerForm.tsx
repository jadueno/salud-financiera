import { useState } from "react";
import type { NewSavingsTracker, SavingsTracker } from "../../domain/types";
import { Field, inputClass } from "../../components/Field";
import { Button } from "../../components/Button";

export function EditTrackerForm({
  tracker,
  accountNames,
  onSubmit,
  onCancel,
}: {
  tracker: SavingsTracker;
  accountNames: string[];
  onSubmit: (id: string, tracker: NewSavingsTracker) => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState(tracker.name);
  const [account, setAccount] = useState(tracker.account);
  const [initialBalance, setInitialBalance] = useState<number | "">(tracker.initialBalance);
  const [initialBalanceAsOf, setInitialBalanceAsOf] = useState(tracker.initialBalanceAsOf);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="mt-3 flex flex-col gap-3 border-t border-[var(--gridline)] pt-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
          await onSubmit(tracker.id, {
            kind: tracker.kind,
            name,
            account,
            initialBalance: Number(initialBalance),
            initialBalanceAsOf,
          });
          onCancel();
        } catch (err) {
          setError(err instanceof Error ? err.message : "No se ha podido actualizar el seguimiento");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {tracker.kind === "investment" && (
          <Field label="Nombre">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </Field>
        )}
        <Field label="Cuenta">
          <select
            required
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className={inputClass}
          >
            {accountNames.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Saldo de partida (€)">
          <input
            required
            type="number"
            min={0}
            step={0.01}
            value={initialBalance}
            onChange={(e) => setInitialBalance(e.target.value === "" ? "" : Number(e.target.value))}
            className={inputClass}
          />
        </Field>
        <Field label="Mes de partida">
          <input
            required
            type="month"
            value={initialBalanceAsOf}
            onChange={(e) => setInitialBalanceAsOf(e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>
      {error && (
        <p className="text-xs" style={{ color: "var(--status-critical)" }}>
          {error}
        </p>
      )}
      <div className="flex gap-2">
        <Button type="submit" tone="ink" disabled={submitting}>
          {submitting ? "Guardando…" : "Guardar cambios"}
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
