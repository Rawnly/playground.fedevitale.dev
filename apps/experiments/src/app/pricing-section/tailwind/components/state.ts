import { atom } from "jotai"

export type FrequencyName = "monthly" | "yearly"

export type Frequency = {
  value: FrequencyName
  priceSuffix: "/month" | "/year"
  label: string
}

export const YEARLY: Frequency = {
  value: "yearly",
  priceSuffix: "/year",
  label: "Annually",
}

export const MONTHLY: Frequency = {
  value: "monthly",
  priceSuffix: "/month",
  label: "Monthly",
}

export const frequencyAtom = atom<Frequency>(MONTHLY)
