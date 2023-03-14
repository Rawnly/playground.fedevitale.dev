"use client"

import React, { FC, PropsWithChildren } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import {
  Button,
  Card,
  DateRangePicker,
  Flex,
  Text,
  TextInput,
  Title,
} from "@tremor/react"
import clsx from "clsx"
import { useSetAtom } from "jotai"
import { nanoid } from "nanoid"
import { Controller, useForm } from "react-hook-form"

import { isTransactionModalOpenAtom, transactionsAtom } from "../state"

interface IInsertTransactionDialogProps { }

interface CreateTransactionPayload {
  amount: number
  description: string
  date: [Date, Date | undefined, string | undefined]
}

const InsertTransactionDialog: FC<
  PropsWithChildren<IInsertTransactionDialogProps>
> = (props) => {
  const { register, handleSubmit, control } = useForm<CreateTransactionPayload>(
    {}
  )
  const setTransactions = useSetAtom(transactionsAtom)
  const setOpen = useSetAtom(isTransactionModalOpenAtom)

  function onSubmit(values: CreateTransactionPayload) {
    console.log(values)
    const tx = {
      ...values,
      date: values.date?.[0]?.toISOString() ?? new Date().toISOString(),
      id: nanoid(),
    }

    setTransactions((s) => [...s, tx])
    setOpen(false)
  }

  return (
    <>
      <Dialog.Overlay className="bg-white/50 w-screen h-screen inset-0 absolute backdrop-blur" />
      <Dialog.Content asChild>
        <Card className="max-w-[80vw] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full mx-auto">
          <Title>Insert Transaction</Title>
          <Text>Insert a new transaction</Text>

          <form
            onSubmit={handleSubmit(onSubmit, console.warn)}
            className="mt-8 flex flex-col gap-4"
          >
            <div>
              <Text>Amount</Text>
              <input
                {...register("amount", { valueAsNumber: true, required: true })}
                type="number"
                placeholder="300"
                className={clsx(
                  "min-w-[10rem] focus:ring-2 w-full ",
                  "relative w-full flex items-center min-w-[10rem] focus:outline-none focus:ring-2",
                  "py-2 rounded-md shadow-sm border text-sm font-medium bg-transparent",
                  "w-full focus:outline-none text-gray-800 border-gray-300 px-4"
                )}
              />
            </div>
            <div>
              <Text>Description</Text>
              <TextInput
                placeholder="Groceries"
                {...register("description", { required: true })}
              />
            </div>
            <div>
              <Text>Date</Text>
              <Controller
                control={control}
                name="date"
                rules={{ required: true }}
                render={({ field }) => (
                  <DateRangePicker {...field} onValueChange={field.onChange} />
                )}
              />
            </div>

            <Flex className="w-full" justifyContent="end">
              <Button type="submit">Add Transaction</Button>
            </Flex>
          </form>
        </Card>
      </Dialog.Content>
    </>
  )
}

InsertTransactionDialog.displayName = "InsertTransactionDialog"

export default InsertTransactionDialog
