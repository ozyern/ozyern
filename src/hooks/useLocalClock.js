import { useEffect, useState } from 'react'

const TIME_ZONE = 'Asia/Kolkata'

function format() {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())
}

/**
 * The local time, on the clock the rest of the site is written in.
 *
 * The site is built and deployed from UTC, so "what time is it there" is
 * never the interesting question. The interesting one is what time it is where
 * the work happens, which is IST.
 *
 * It ticks on a half-minute interval rather than a second one: a clock that
 * changes every second pulls the eye, and the only thing this needs to say is
 * "these people are awake right now".
 */
export function useLocalClock(intervalMs = 30000) {
  const [time, setTime] = useState(format)

  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])

  return time
}
