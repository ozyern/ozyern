import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion'

// Quartic ease-out: fast off the line, long gentle landing. Counters that ease
// linearly look like a loading spinner rather than a number arriving.
const easeOut = (t) => 1 - Math.pow(1 - t, 4)

/**
 * Counts from zero to `target` once `active` turns true.
 * Every counter on screen shares one animation frame loop via React's batching,
 * and the whole thing is skipped entirely under reduced motion.
 */
export function useCountUp(target, active, duration = 1800) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return

    if (prefersReducedMotion()) {
      setValue(target)
      return
    }

    let frame = null
    let startedAt = null

    const tick = (now) => {
      if (startedAt === null) startedAt = now
      const progress = Math.min(1, (now - startedAt) / duration)
      setValue(Math.round(target * easeOut(progress)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => frame && cancelAnimationFrame(frame)
  }, [target, active, duration])

  return value
}
