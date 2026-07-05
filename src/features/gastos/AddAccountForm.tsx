import { useState } from "react";
import type { NewAccount } from "../../domain/types";
import { Field, inputClass } from "../../components/Field";
import { Button } from "../../components/Button";

export function AddAccountForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (account: NewAccount) => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
          await onSubmit({ name });
          onCancel();
        } catch (err) {
          setError(err instanceof Error ? err.message : "No se ha podido crear la cuenta");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Field label="Nombre de la cuenta">
        <input
          required
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${inputClass} max-w-xs`}
        />
      </Field>
      {error && (
        <p className="text-xs" style={{ color: "var(--status-critical)" }}>
          {error}
        </p>
      )}
      <div className="flex gap-2">
        <Button type="submit" tone="ink" disabled={submitting}>
          {submitting ? "Guardando…" : "Guardar cuenta"}
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
