import type { Repository } from "../domain/ports.js";
import type { Debt, NewDebt } from "../domain/types.js";
import { assertNonEmpty, assertNonNegativeAmount } from "./errors.js";

function validate(entity: NewDebt): void {
  assertNonEmpty(entity.name, "El nombre");
  assertNonEmpty(entity.dueDate, "La fecha de fin");
  assertNonNegativeAmount(entity.monthlyPayment, "La cuota mensual");
  if (entity.remainingBalance !== null) {
    assertNonNegativeAmount(entity.remainingBalance, "El saldo pendiente");
  }
}

export function createDebtUseCases(repo: Repository<Debt, NewDebt>) {
  return {
    list: () => repo.list(),
    create: (entity: NewDebt) => {
      validate(entity);
      return repo.create(entity);
    },
    update: (id: string, entity: NewDebt) => {
      validate(entity);
      return repo.update(id, entity);
    },
    remove: (id: string) => repo.remove(id),
  };
}
