import type { Pool } from "pg";
import type { Debt, NewDebt } from "../../../domain/types.js";
import type { Repository } from "../../../domain/ports.js";

interface DebtRow {
  id: string;
  name: string;
  monthly_payment: string;
  due_date: string;
  remaining_balance: string | null;
  balance_as_of: string | null;
}

function toDebt(row: DebtRow): Debt {
  return {
    id: row.id,
    name: row.name,
    monthlyPayment: Number(row.monthly_payment),
    dueDate: row.due_date,
    remainingBalance: row.remaining_balance === null ? null : Number(row.remaining_balance),
    balanceAsOf: row.balance_as_of,
  };
}

export function createDebtRepository(pool: Pool): Repository<Debt, NewDebt> {
  return {
    async list() {
      const { rows } = await pool.query<DebtRow>(
        `select id, name, monthly_payment, due_date, remaining_balance, balance_as_of
         from debts order by created_at`,
      );
      return rows.map(toDebt);
    },

    async create(entity) {
      const { rows } = await pool.query<DebtRow>(
        `insert into debts (name, monthly_payment, due_date, remaining_balance, balance_as_of)
         values ($1, $2, $3, $4, $5)
         returning id, name, monthly_payment, due_date, remaining_balance, balance_as_of`,
        [entity.name, entity.monthlyPayment, entity.dueDate, entity.remainingBalance, entity.balanceAsOf],
      );
      return toDebt(rows[0]);
    },

    async update(id, entity) {
      const { rows } = await pool.query<DebtRow>(
        `update debts
         set name = $1, monthly_payment = $2, due_date = $3, remaining_balance = $4,
             balance_as_of = $5, updated_at = now()
         where id = $6
         returning id, name, monthly_payment, due_date, remaining_balance, balance_as_of`,
        [entity.name, entity.monthlyPayment, entity.dueDate, entity.remainingBalance, entity.balanceAsOf, id],
      );
      return rows[0] ? toDebt(rows[0]) : null;
    },

    async remove(id) {
      const { rowCount } = await pool.query("delete from debts where id = $1", [id]);
      return (rowCount ?? 0) > 0;
    },
  };
}
