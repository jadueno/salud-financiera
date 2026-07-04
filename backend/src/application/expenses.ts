import type { Repository } from "../domain/ports.js";
import type { Expense, NewExpense } from "../domain/types.js";
import { assertNonEmpty, assertNonNegativeAmount, ValidationError } from "./errors.js";

const validCategories = ["Fijos", "Variables", "Autónomo"];

function validate(entity: NewExpense): void {
  if (!validCategories.includes(entity.category)) {
    throw new ValidationError(`La categoría debe ser una de: ${validCategories.join(", ")}`);
  }
  assertNonEmpty(entity.account, "La cuenta");
  assertNonEmpty(entity.label, "El concepto");
  assertNonNegativeAmount(entity.monthlyAmount, "El importe mensual");
}

export function createExpenseUseCases(repo: Repository<Expense, NewExpense>) {
  return {
    list: () => repo.list(),
    create: (entity: NewExpense) => {
      validate(entity);
      return repo.create(entity);
    },
    update: (id: string, entity: NewExpense) => {
      validate(entity);
      return repo.update(id, entity);
    },
    remove: (id: string) => repo.remove(id),
  };
}
