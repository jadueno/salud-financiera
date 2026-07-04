import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createExtension("pgcrypto", { ifNotExists: true });

  pgm.createTable("incomes", {
    id: { type: "uuid", primaryKey: true, default: pgm.func("gen_random_uuid()") },
    account: { type: "text", notNull: true },
    label: { type: "text", notNull: true },
    monthly_amount: { type: "numeric(12,2)", notNull: true },
    created_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") },
    updated_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") },
  });

  pgm.createTable("expenses", {
    id: { type: "uuid", primaryKey: true, default: pgm.func("gen_random_uuid()") },
    category: { type: "text", notNull: true, check: "category in ('Fijos', 'Variables', 'Autónomo')" },
    account: { type: "text", notNull: true },
    property: { type: "text" },
    label: { type: "text", notNull: true },
    monthly_amount: { type: "numeric(12,2)", notNull: true },
    created_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") },
    updated_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") },
  });

  pgm.createTable("debts", {
    id: { type: "uuid", primaryKey: true, default: pgm.func("gen_random_uuid()") },
    name: { type: "text", notNull: true },
    monthly_payment: { type: "numeric(12,2)", notNull: true },
    due_date: { type: "text", notNull: true },
    remaining_balance: { type: "numeric(12,2)" },
    balance_as_of: { type: "text" },
    created_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") },
    updated_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") },
  });

  pgm.createTable("transfers", {
    id: { type: "uuid", primaryKey: true, default: pgm.func("gen_random_uuid()") },
    from_account: { type: "text", notNull: true },
    to_account: { type: "text", notNull: true },
    monthly_amount: { type: "numeric(12,2)", notNull: true },
    is_savings_or_investment: { type: "boolean", notNull: true, default: false },
    created_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") },
    updated_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("transfers");
  pgm.dropTable("debts");
  pgm.dropTable("expenses");
  pgm.dropTable("incomes");
}
