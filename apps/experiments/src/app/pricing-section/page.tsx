"use client"

import { useEffect, useState } from "react"
import clsx from "clsx"

import CardWithPrice from "./components/CardWithPrice"
import MagicNumber, { ScrollingElement } from "./components/MagicNumber"

const MAX_VALUE = 999999

const VALUES = [25, 50, 75, 135, 959, 373, 8217, 1500, 90386, 12457]

export default function Page() {
  const [values, setValue] = useState([50, 200, 500])

  function randomValue() {
    const randomNumber = () =>
      VALUES[Math.max(0, Math.floor(Math.random() * VALUES.length))]

    setValue([randomNumber(), randomNumber(), randomNumber()])
  }

  function onButtonClick() {
    randomValue()
  }

  const [count, setCount] = useState(() => Math.floor(Math.random() * 1000))

  const items = ["Hello World", "this is", "a test"]
  const activeEl = useIntervalCounter(items.length - 1)

  return (
    <div>
      <section className="flex bg-slate-900 text-white p-8 h-screen items-center justify-center flex-col gap-4">
        <div className="grid grid-cols-[250px,250px,250px] gap-4">
          <CardWithPrice
            name="Pro"
            extra="per month, billed annually"
            value={values[0]}
            accent="#fff000"
          />
          <CardWithPrice
            name="Startup"
            extra="per month, billed annually"
            value={values[1]}
            accent="#ff00ff"
          />
          <CardWithPrice
            name="Enterprise"
            extra="per month, billed annually"
            value={values[2]}
            accent="#ff0080"
          />
        </div>
        <div className="max-w-[300px] w-full space-y-4">
          <button
            onClick={onButtonClick}
            className={clsx(
              "px-4 border border-transparent w-full transition-colors py-2 rounded active:scale-[.96] hover:bg-slate-800 active:bg-slate-700"
            )}
          >
            Random Price
          </button>
        </div>
      </section>
      <div
        className="h-[500px] bg-slate-900"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0), #000)`,
        }}
      ></div>
      <section className="h-screen bg-black flex items-center flex-col justify-center">
        <h1 className="text-7xl font-mono font-bold">
          <MagicNumber value={count} />
        </h1>
        <div className="flex flex-col gap-4 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() =>
                setCount((s) =>
                  parseInt(s.toString().split("").reverse().join(""))
                )
              }
              className={
                "px-4 border text-base font-medium border-transparent w-full transition-colors py-2 rounded active:scale-[.96] hover:bg-white/10 active:bg-white/25"
              }
            >
              Reverse
            </button>
            <button
              onClick={() => setCount(123456)}
              className={
                "px-4 border text-base font-medium border-transparent w-full transition-colors py-2 rounded active:scale-[.96] hover:bg-white/10 active:bg-white/25"
              }
            >
              Set
            </button>
          </div>
          <input
            className="w-full"
            type="range"
            value={count}
            style={{ accentColor: "fuchsia" }}
            onChange={(e) => setCount(parseInt(e.target.value) ?? 0)}
            min={0}
            max={MAX_VALUE}
          />
        </div>
      </section>
      <section className="h-screen flex items-center justify-center bg-white flex-col">
        <h1 className="text-5xl font-bold tabular-nums text-black">
          <div className="relative tabular-nums min-w-[300px] flex overflow-hidden inline-flex">
            <ScrollingElement
              activeElement={items[activeEl]}
              accent="fuchsia"
              elements={items}
            />
          </div>
        </h1>
      </section>
    </div>
  )
}

function useIntervalCounter(max: number) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () => setCount((c) => (c + 1 > max ? 0 : c + 1)),
      1250
    )

    return () => {
      clearInterval(interval)
    }
  }, [setCount, max])

  return count
}
