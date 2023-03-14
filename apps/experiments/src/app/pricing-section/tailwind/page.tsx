"use client"

import { useState } from "react"
import clsx from "clsx"
import { Check as CheckIcon } from "lucide-react"

import MagicNumber from "../components/MagicNumber"

const frequencies = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  { value: "annually", label: "Annually", priceSuffix: "/year" },
]
const tiers = [
  {
    name: "Freelancer",
    id: "tier-freelancer",
    href: "#",
    price: { monthly: 15, annually: 144 },
    description: "The essentials to provide your best work for clients.",
    features: [
      "5 products",
      "Up to 1,000 subscribers",
      "Basic analytics",
      "48-hour support response time",
    ],
    mostPopular: false,
  },
  {
    name: "Startup",
    id: "tier-startup",
    href: "#",
    price: { monthly: 30, annually: 288 },
    description: "A plan that scales with your rapidly growing business.",
    features: [
      "25 products",
      "Up to 10,000 subscribers",
      "Advanced analytics",
      "24-hour support response time",
      "Marketing automations",
    ],
    mostPopular: true,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    price: { monthly: 48, annually: 576 },
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Unlimited products",
      "Unlimited subscribers",
      "Advanced analytics",
      "1-hour, dedicated support response time",
      "Marketing automations",
      "Custom reporting tools",
    ],
    mostPopular: false,
  },
]

export default function Example() {
  const [frequency, setFrequency] = useState(frequencies[0])

  return (
    <div className="bg-white text-slate-900 dark:text-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Pricing plans for teams of&nbsp;all&nbsp;sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          Choose an affordable plan that’s packed with the best features for
          engaging your audience, creating customer loyalty, and driving sales.
        </p>
        <div className="mt-16 flex justify-center">
          <div className="grid grid-cols-2 gap-x-1 rounded-full bg-slate-900/5 dark:bg-white/5 p-1 text-center text-xs font-semibold leading-5 ">
            {frequencies.map((option) => (
              <button
                key={option.value}
                onClick={() => setFrequency(option)}
                className={clsx(
                  option.value === frequency.value
                    ? "bg-indigo-500 text-white"
                    : "",
                  "cursor-pointer rounded-full py-1 px-2.5"
                )}
              >
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
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
                  className={clsx(
                    "text-lg dark:text-white font-semibold leading-8",
                    {
                      "text-white": tier.mostPopular,
                    }
                  )}
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
                    value={
                      tier.price[frequency.value as keyof typeof tier.price]
                    }
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
          ))}
        </div>
      </div>
    </div>
  )
}
