import type { Repository } from "../domain/ports.js";
import type { NewTransfer, Transfer } from "../domain/types.js";
import { assertNonEmpty, assertNonNegativeAmount, ValidationError } from "./errors.js";

function validate(entity: NewTransfer): void {
  assertNonEmpty(entity.fromAccount, "La cuenta de origen");
  assertNonEmpty(entity.toAccount, "La cuenta de destino");
  assertNonNegativeAmount(entity.monthlyAmount, "El importe mensual");
  if (entity.fromAccount === entity.toAccount) {
    throw new ValidationError("El origen y el destino no pueden ser la misma cuenta.");
  }
}

export function createTransferUseCases(repo: Repository<Transfer, NewTransfer>) {
  return {
    list: () => repo.list(),
    create: (entity: NewTransfer) => {
      validate(entity);
      return repo.create(entity);
    },
    update: (id: string, entity: NewTransfer) => {
      validate(entity);
      return repo.update(id, entity);
    },
    remove: (id: string) => repo.remove(id),
  };
}
