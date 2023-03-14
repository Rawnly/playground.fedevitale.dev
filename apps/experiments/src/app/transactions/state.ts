import { isAfter, isBefore, isToday, subDays } from "date-fns"
import { atom } from "jotai"

import { Item } from "./components/MetricCard"

export const isEditingAtom = atom(false)
export const dataAtom = atom<Item[]>([
  {
    id: "today",
    label: "Today",
    value: 10,
    budget: 30,
  },
  {
    id: "last-7-days",
    label: "Last 7 days",
    value: 250,
    budget: 200,
  },
  {
    id: "last-month",
    label: "Last month",
    value: 800,
    budget: 1000,
  },
])

export const totalsAtom = atom(
  (get) => {
    const today = get(todaysTransactionsTotal)
    const last7Days = get(last7DaysTransactionsTotal)
    const lastMonth = get(lastMonthTransactionsTotal)

    return [
      {
        id: "today",
        label: "Today",
        value: today,
        budget: 30,
      },
      {
        id: "last-7-days",
        label: "Last 7 days",
        value: last7Days,
        budget: 200,
      },
      {
        id: "last-month",
        label: "Last month",
        value: lastMonth,
        budget: 1000,
      },
    ]
  },
  (get, set, update: Item[]) => {
    // const today = get(todaysTransactionsTotal)
    // const last7Days = get(last7DaysTransactionsTotal)
    // const lastMonth = get(lastMonthTransactionsTotal)

    return set(dataAtom, update)
  }
)

export const todaysTransactionsTotal = atom((get) =>
  get(transactionsAtom)
    .filter((p) => isToday(new Date(p.date)))
    .reduce((acc, p) => acc + p.amount, 0)
)

export const last7DaysTransactionsTotal = atom((get) =>
  get(transactionsAtom)
    .filter(
      (p) =>
        isBefore(new Date(p.date), new Date()) &&
        isAfter(new Date(p.date), subDays(new Date(), 7))
    )
    .reduce((acc, p) => acc + p.amount, 0)
)

export const lastMonthTransactionsTotal = atom((get) =>
  get(transactionsAtom)
    .filter(
      (p) =>
        isBefore(new Date(p.date), new Date()) &&
        isAfter(new Date(p.date), subDays(new Date(), 30))
    )
    .reduce((acc, p) => acc + p.amount, 0)
)

export const totals = atom

export interface Transaction {
  id: string
  amount: number
  date: string
  description: string
}

export const transactionsAtom = atom<Transaction[]>([])
export const selectedTransactionAtom = atom<Transaction | null>(null)
export const isTransactionModalOpenAtom = atom(false)
