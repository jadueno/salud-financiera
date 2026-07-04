export class ValidationError extends Error {}

export function assertNonEmpty(value: string, field: string): void {
  if (!value || !value.trim()) throw new ValidationError(`${field} no puede estar vacío`);
}

export function assertNonNegativeAmount(value: number, field: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new ValidationError(`${field} debe ser un número mayor o igual que 0`);
  }
}
