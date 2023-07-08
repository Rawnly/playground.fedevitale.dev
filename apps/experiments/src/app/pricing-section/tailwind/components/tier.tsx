"use client"

import React, { FC, PropsWithChildren } from "react"
import clsx from "clsx"
import { useAtomValue } from "jotai"
import { Check as CheckIcon } from "lucide-react"

import MagicNumber from "../../components/MagicNumber"
import { FrequencyName, frequencyAtom } from "./state"

interface ItierProps {
  tier: Tier
}

export interface Tier {
  name: string
  id: string
  href: string
  price: Record<FrequencyName, number>
  description: string
  features: string[]
  mostPopular: boolean
}

export const Tier: FC<PropsWithChildren<ItierProps>> = ({ tier }) => {
  const frequency = useAtomValue(frequencyAtom)

  return (
    <div
      key={tier.id}
      className={clsx(
        tier.mostPopular
          ? "bg-slate-800 dark:bg-white/5 ring-2 ring-indigo-500"
          : "ring-1 ring-slate-800/10 dark:ring-white/10",
        "rounded-3xl p-8 xl:p-10"
      )}
    >
      <div className="flex items-center justify-between gap-x-4">
        <h3
          id={tier.id}
          className={clsx("text-lg dark:text-white font-semibold leading-8", {
            "text-white": tier.mostPopular,
          })}
        >
          {tier.name}
        </h3>
        {tier.mostPopular ? (
          <p className="rounded-full bg-indigo-500 py-1 px-2.5 text-xs font-semibold leading-5 text-white">
            Most popular
          </p>
        ) : null}
      </div>
      <p
        className={clsx("mt-4 text-sm leading-6", {
          "text-slate-500 dark:text-slate-300": !tier.mostPopular,
          "text-gray-300": tier.mostPopular,
        })}
      >
        {tier.description}
      </p>
      <p className="mt-6 flex items-baseline gap-x-1">
        <span
          className={clsx(
            "text-4xl flex inline-flex font-bold tabular-nums tracking-tight",
            {
              "text-slate-900 dark:text-white": !tier.mostPopular,
              "text-white": tier.mostPopular,
            }
          )}
        >
          $
          <MagicNumber
            accent="rgb(99, 102, 241)"
            value={tier.price[frequency.value as keyof typeof tier.price]}
          />
        </span>
        <span
          className={clsx("text-sm font-semibold leading-6 ", {
            "text-slate-900 dark:text-slate-400": !tier.mostPopular,
            "text-slate-400": tier.mostPopular,
          })}
        >
          {frequency.priceSuffix}
        </span>
      </p>
      <a
        href={tier.href}
        aria-describedby={tier.id}
        className={clsx(
          tier.mostPopular
            ? "bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500"
            : "bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white",
          "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        )}
      >
        Buy plan
      </a>
      <ul
        role="list"
        className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10"
      >
        {tier.features.map((feature) => (
          <li key={feature} className="flex gap-x-3">
            <CheckIcon
              className="h-6 w-5 flex-none text-white"
              aria-hidden="true"
            />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tier
