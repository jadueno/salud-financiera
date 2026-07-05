import type { Repository } from "../domain/ports.js";
import type { NewSavingsTracker, SavingsTracker } from "../domain/types.js";
import { assertNonEmpty, assertNonNegativeAmount, ValidationError } from "./errors.js";

const validKinds = ["emergency_fund", "investment"];

function validate(entity: NewSavingsTracker): void {
  if (!validKinds.includes(entity.kind)) {
    throw new ValidationError(`El tipo debe ser uno de: ${validKinds.join(", ")}`);
  }
  assertNonEmpty(entity.name, "El nombre");
  assertNonEmpty(entity.account, "La cuenta");
  assertNonEmpty(entity.initialBalanceAsOf, "El mes de partida");
  assertNonNegativeAmount(entity.initialBalance, "El saldo inicial");
}

export function createSavingsTrackerUseCases(repo: Repository<SavingsTracker, NewSavingsTracker>) {
  async function assertAccountFree(entity: NewSavingsTracker, excludeId?: string): Promise<void> {
    const existing = await repo.list();
    const conflict = existing.find((t) => t.id !== excludeId && t.account === entity.account);
    if (conflict) {
      throw new ValidationError(
        `La cuenta "${entity.account}" ya está vinculada a otro seguimiento ("${conflict.name}"). Usa una cuenta distinta para no contar el mismo dinero dos veces.`,
      );
    }
  }

  return {
    list: () => repo.list(),

    create: async (entity: NewSavingsTracker) => {
      validate(entity);
      if (entity.kind === "emergency_fund") {
        const existing = await repo.list();
        if (existing.some((t) => t.kind === "emergency_fund")) {
          throw new ValidationError("Ya existe un fondo de emergencia. Bórralo primero si quieres cambiar de cuenta.");
        }
      }
      await assertAccountFree(entity);
      return repo.create(entity);
    },

    update: async (id: string, entity: NewSavingsTracker) => {
      validate(entity);
      await assertAccountFree(entity, id);
      return repo.update(id, entity);
    },

    remove: (id: string) => repo.remove(id),
  };
}
