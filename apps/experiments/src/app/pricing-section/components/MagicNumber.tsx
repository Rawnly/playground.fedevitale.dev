"use client"

import { useMemo, useState } from "react"
import clsx from "clsx"
import { motion } from "framer-motion"

const OFFSET = 10

interface ScrollingElementProps {
  elements: string[]
  accent: string
  activeElement?: string
}

export function ScrollingElement(props: ScrollingElementProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const index = useMemo(() => {
    const idx = props.elements.indexOf(props.activeElement as any)
    return Math.min(Math.max(0, idx), props.elements.length)
  }, [props.elements, props.activeElement])

  const offset = useMemo(() => 100 / props.elements.length, [props.elements])

  return (
    <div className="relative w-full">
      <motion.div className="opacity-0 w-full">
        {props.activeElement}
      </motion.div>
      <div
        className="absolute z-50 w-full top-0 inset-x-0"
        style={{
          height: 15,
          background: "linear-gradient(#fff, rgba(0,0,0,0) 100%)",
        }}
      />
      <div
        className="absolute z-50 w-full inset-x-0"
        style={{
          height: 15,
          bottom: -5,
          background: "linear-gradient(rgba(0,0,0,0), #fff 100%)",
        }}
      />
      <motion.div
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={() => setIsAnimating(false)}
        initial={{ translateY: `-${offset}%`, opacity: 0 }}
        animate={{ translateY: `-${index * offset}%`, opacity: 1 }}
        transition={{
          type: "spring",
          duration: 0.8,
        }}
        style={{
          opacity: isAnimating ? 0.8 : 1,
          color: isAnimating ? props.accent : undefined,
        }}
        className={clsx(
          "absolute top-0 left-0",
          "pointer-events-none transition-colors flex flex-col"
        )}
      >
        {props.elements.map((el, idx) => (
          <span className="select-none" key={idx} data-active={index === idx}>
            {el}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function SingleMagicNumber({
  value,
  accent = "fuchsia",
}: {
  value: string
  accent?: string
}) {
  const [isAnimating, setIsAnimating] = useState(false)

  const index = useMemo(() => {
    return Math.min(Math.max(0, parseInt(value)), 10)
  }, [value])

  return (
    <div className="relative">
      <motion.div className="opacity-0">{value}</motion.div>
      <motion.div
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={() => setIsAnimating(false)}
        initial={{ translateY: `-${OFFSET}%`, opacity: 0 }}
        animate={{ translateY: `-${index * OFFSET}%`, opacity: 1 }}
        transition={{
          type: "spring",
          duration: 0.8,
        }}
        style={{ color: isAnimating ? accent : undefined }}
        className={clsx(
          "absolute top-0 left-0",
          "pointer-events-none transition-colors flex flex-col"
        )}
      >
        {Array.from(new Array(10)).map((_, idx) => (
          <span className="select-none" key={idx} data-active={index === idx}>
            {idx}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

interface IMagicNumberProps {
  value: number
  accent?: string
}

export default function MagicNumber({ value, ...props }: IMagicNumberProps) {
  const digits = useMemo(() => {
    const chars = value.toString().split("")

    return [
      ...Array.from(new Array(6 - chars.length)).fill(undefined),
      ...chars,
    ]
  }, [value])

  return (
    <div
      data-value={value}
      className="relative tabular-nums flex overflow-hidden inline-flex"
    >
      {Array.from(new Array(6)).map(
        (_, idx) =>
          digits[idx] && (
            <SingleMagicNumber
              key={idx}
              value={digits?.[idx] ?? "0"}
              {...props}
            />
          )
      )}
    </div>
  )
}
