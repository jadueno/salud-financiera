import type { Pool } from "pg";
import type { NewTransfer, Transfer } from "../../../domain/types.js";
import type { Repository } from "../../../domain/ports.js";

interface TransferRow {
  id: string;
  from_account: string;
  to_account: string;
  monthly_amount: string;
  is_savings_or_investment: boolean;
}

function toTransfer(row: TransferRow): Transfer {
  return {
    id: row.id,
    fromAccount: row.from_account,
    toAccount: row.to_account,
    monthlyAmount: Number(row.monthly_amount),
    isSavingsOrInvestment: row.is_savings_or_investment,
  };
}

export function createTransferRepository(pool: Pool): Repository<Transfer, NewTransfer> {
  return {
    async list() {
      const { rows } = await pool.query<TransferRow>(
        `select id, from_account, to_account, monthly_amount, is_savings_or_investment
         from transfers order by created_at`,
      );
      return rows.map(toTransfer);
    },

    async create(entity) {
      const { rows } = await pool.query<TransferRow>(
        `insert into transfers (from_account, to_account, monthly_amount, is_savings_or_investment)
         values ($1, $2, $3, $4)
         returning id, from_account, to_account, monthly_amount, is_savings_or_investment`,
        [entity.fromAccount, entity.toAccount, entity.monthlyAmount, entity.isSavingsOrInvestment],
      );
      return toTransfer(rows[0]);
    },

    async update(id, entity) {
      const { rows } = await pool.query<TransferRow>(
        `update transfers
         set from_account = $1, to_account = $2, monthly_amount = $3, is_savings_or_investment = $4,
             updated_at = now()
         where id = $5
         returning id, from_account, to_account, monthly_amount, is_savings_or_investment`,
        [entity.fromAccount, entity.toAccount, entity.monthlyAmount, entity.isSavingsOrInvestment, id],
      );
      return rows[0] ? toTransfer(rows[0]) : null;
    },

    async remove(id) {
      const { rowCount } = await pool.query("delete from transfers where id = $1", [id]);
      return (rowCount ?? 0) > 0;
    },
  };
}
