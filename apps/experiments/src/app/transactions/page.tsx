"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { Button, Col, Flex, Grid } from "@tremor/react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"

import Context from "./components/Context"
import EditCardsButton from "./components/EditCardsButton"
import InsertTransactionDialog from "./components/InsertTransactionDialog"
import { SortableMetricCard } from "./components/SortableMetricCard"
import TransactionsTable from "./components/TransactionsTable"
import {
  dataAtom,
  isTransactionModalOpenAtom,
  last7DaysTransactionsTotal,
  lastMonthTransactionsTotal,
  todaysTransactionsTotal,
  totalsAtom,
} from "./state"

export default function Page() {
  const items = useAtomValue(totalsAtom)

  const [open, setOpen] = useAtom(isTransactionModalOpenAtom)

  return (
    <Context>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Flex justifyContent="end">
          <EditCardsButton />
        </Flex>
        <Grid numCols={2} numColsMd={3} className="gap-4 my-4">
          {items.map((item, idx) => (
            <Col key={item.id} numColSpan={idx === 2 ? 2 : 1} numColSpanMd={1}>
              <SortableMetricCard item={item} />
            </Col>
          ))}
        </Grid>
        <Flex flexDirection="col" className="mb-4">
          <Flex justifyContent="end">
            <Dialog.Trigger asChild>
              <Button onClick={() => setOpen(true)}>Insert Transaction</Button>
            </Dialog.Trigger>
          </Flex>
        </Flex>
        <TransactionsTable />
        <InsertTransactionDialog />
      </Dialog.Root>
    </Context>
  )
}
