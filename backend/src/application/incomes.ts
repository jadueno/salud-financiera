import type { Repository } from "../domain/ports.js";
import type { Income, NewIncome } from "../domain/types.js";
import { assertNonEmpty, assertNonNegativeAmount } from "./errors.js";

function validate(entity: NewIncome): void {
  assertNonEmpty(entity.account, "La cuenta");
  assertNonEmpty(entity.label, "El concepto");
  assertNonNegativeAmount(entity.monthlyAmount, "El importe mensual");
}

export function createIncomeUseCases(repo: Repository<Income, NewIncome>) {
  return {
    list: () => repo.list(),
    create: (entity: NewIncome) => {
      validate(entity);
      return repo.create(entity);
    },
    update: (id: string, entity: NewIncome) => {
      validate(entity);
      return repo.update(id, entity);
    },
    remove: (id: string) => repo.remove(id),
  };
}
