import { useEffect, useState } from "react"

export function useIntervalCounter(max: number, delay = 1000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () => setCount((c) => (c + 1 > max ? 0 : c + 1)),
      delay
    )

    return () => {
      clearInterval(interval)
    }
  }, [setCount, max])

  return count
}
