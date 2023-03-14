"use client"

import MagicNumber from "./MagicNumber"

interface Props {
  name: string
  value: number
  extra: string
  accent?: string
}

const MAX_VALUE_ALLOWED = 999999

export default function CardWithPrice({ value, ...props }: Props) {
  const v = Math.min(value, MAX_VALUE_ALLOWED)

  if (value > v) {
    console.warn("Maximum allowed value: %d, got: %d", MAX_VALUE_ALLOWED, value)
  }

  return (
    <div
      className="border rounded-lg p-4"
      style={{ borderColor: props.accent }}
    >
      <h4 className="text-lg" style={{ color: props.accent }}>
        {props.name}
      </h4>
      <span className="sm:text-4xl flex inline-flex mt-2 font-medium tabular-nums text-3xl">
        $
        <MagicNumber accent={props.accent} value={v} />
      </span>
      <p className="text-sm mt-1">{props.extra}</p>
    </div>
  )
}
