"use client"

import React, { FC, PropsWithChildren } from "react"
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react"
import { useAtom, useAtomValue } from "jotai"

import { selectedTransactionAtom, transactionsAtom } from "../state"

interface ITransactionsTableProps { }

const TransactionsTable: FC<PropsWithChildren<ITransactionsTableProps>> = (
  props
) => {
  const transactions = useAtomValue(transactionsAtom)
  const [selected, setSelected] = useAtom(selectedTransactionAtom)

  return (
    <Card className="p-2">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              onClick={() =>
                setSelected((t) =>
                  t?.id === transaction.id ? null : transaction
                )
              }
              className={selected?.id === transaction.id ? "bg-gray-200" : ""}
            >
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell className="tabular-nums font-mono">
                $ {transaction.amount}
              </TableCell>
              <TableCell>{transaction.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

TransactionsTable.displayName = "TransactionsTable"

export default TransactionsTable
