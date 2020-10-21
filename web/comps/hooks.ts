import React from 'react'

export function useTicker(frequencyMs: number) {
  const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null)

  function execute(cb: () => void) {
    const timeout = setTimeout(() => {
      cb()
      execute(cb)
    }, frequencyMs)
    setTimer(timeout)
  }

  const start = (cb: () => void) => {
    if (timer !== null) return
    cb()
    execute(cb)
  }

  const stop = () => {
    if (timer === null) return
    clearTimeout(timer)
    setTimer(null)
  }

  React.useEffect(() => {
    return () => {
      stop()
    }
  }, [])

  return [start, stop]
}
