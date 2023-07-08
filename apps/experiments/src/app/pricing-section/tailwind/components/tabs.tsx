"use client"

import React, { FC, PropsWithChildren } from "react"
import clsx from "clsx"
import { useAtom } from "jotai"

import { MONTHLY, YEARLY, frequencyAtom } from "./state"

interface ItabsProps { }

const Tabs: FC<PropsWithChildren<ItabsProps>> = (props) => {
  const [frequency, setFrequency] = useAtom(frequencyAtom)

  return (
    <div className="grid mx-auto grid-cols-2 gap-x-1 rounded-full bg-slate-900/5 dark:bg-white/5 p-1 text-center text-xs font-semibold leading-5 ">
      {[MONTHLY, YEARLY].map((item) => (
        <button
          key={item.value}
          onClick={() => setFrequency(item)}
          className={clsx(
            frequency.value === item.value ? "bg-indigo-500 text-white" : "",
            "cursor-pointer rounded-full py-1 px-2.5"
          )}
        >
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  )
}

Tabs.displayName = "tabs"

export default Tabs
