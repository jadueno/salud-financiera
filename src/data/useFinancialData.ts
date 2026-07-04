import { useCallback, useEffect, useState } from "react";
import type { FinancialProfile, NewDebt, NewExpenseItem, NewIncomeSource, NewTransfer } from "../domain/types";
import { staticProfile } from "./finances";
import { createCrudClient } from "./api";
import {
  toApiDebt,
  toApiExpense,
  toDebt,
  toExpenseItem,
  type ApiDebt,
  type ApiExpense,
  type ApiIncome,
  type ApiTransfer,
} from "./apiMappers";

const incomeClient = createCrudClient<ApiIncome, NewIncomeSource>("/incomes");
const expenseClient = createCrudClient<ApiExpense, ReturnType<typeof toApiExpense>>("/expenses");
const debtClient = createCrudClient<ApiDebt, ReturnType<typeof toApiDebt>>("/debts");
const transferClient = createCrudClient<ApiTransfer, NewTransfer>("/transfers");

export function useFinancialData() {
  const [profile, setProfile] = useState<FinancialProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [incomes, apiExpenses, apiDebts, transfers] = await Promise.all([
        incomeClient.list(),
        expenseClient.list(),
        debtClient.list(),
        transferClient.list(),
      ]);
      setProfile({
        ...staticProfile,
        incomes,
        expenses: apiExpenses.map(toExpenseItem),
        debts: apiDebts.map(toDebt),
        transfers,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error cargando los datos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return {
    profile,
    loading,
    error,
    addIncome: async (entity: NewIncomeSource) => {
      await incomeClient.create(entity);
      await reload();
    },
    updateIncome: async (id: string, entity: NewIncomeSource) => {
      await incomeClient.update(id, entity);
      await reload();
    },
    removeIncome: async (id: string) => {
      await incomeClient.remove(id);
      await reload();
    },
    addExpense: async (entity: NewExpenseItem) => {
      await expenseClient.create(toApiExpense(entity));
      await reload();
    },
    removeExpense: async (id: string) => {
      await expenseClient.remove(id);
      await reload();
    },
    addDebt: async (entity: NewDebt) => {
      await debtClient.create(toApiDebt(entity));
      await reload();
    },
    removeDebt: async (id: string) => {
      await debtClient.remove(id);
      await reload();
    },
    addTransfer: async (entity: NewTransfer) => {
      await transferClient.create(entity);
      await reload();
    },
    removeTransfer: async (id: string) => {
      await transferClient.remove(id);
      await reload();
    },
  };
}
