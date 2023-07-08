"use client"

import { useIntervalCounter } from "@/hooks/useIntervalCounter"

import { ScrollingElement } from "../../components/MagicNumber"

export default function Header() {
  const items = ["teams", "companies"]
  const activeEl = useIntervalCounter(items.length - 1, 3000)

  return (
    <div className="mt-2 gap-2.5 overflow-hidden relative flex inline-flex text-4xl font-bold tracking-tight sm:text-5xl">
      Pricing plans for{" "}
      <ScrollingElement
        accent="rgb(99, 102, 241)"
        elements={items}
        activeElement={items[activeEl]}
      />{" "}
      of all sizes
    </div>
  )
}
