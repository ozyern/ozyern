import { useCallback, useEffect, useRef } from 'react'
import { NEARLY_ZERO, damp, prefersReducedMotion } from '../lib/motion'

/**
 * Makes a small control lean towards the cursor while it is nearby, then
 * spring back when it leaves.
 *
 * Same trick as usePointerCard — damped in an animation frame, written
 * directly to the node — because the navigation rail has seven of these and
 * they used to fight each other for renders.
 *
 * @param {number} pull how far the element travels, as a fraction of the
 *                      cursor's offset from its centre
 */
export function useMagnetic(pull = 0.35) {
  const ref = useRef(null)
  const frame = useRef(null)
  const lastFrameTime = useRef(0)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  const stop = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    frame.current = null
  }, [])

  const tick = useCallback(
    (now) => {
      const node = ref.current
      if (!node) return stop()

      const delta = lastFrameTime.current ? Math.min(now - lastFrameTime.current, 64) : 16.667
      lastFrameTime.current = now

      const at = current.current
      const to = target.current
      at.x = damp(at.x, to.x, 0.05, delta)
      at.y = damp(at.y, to.y, 0.05, delta)

      node.style.setProperty('--magnet-x', `${at.x.toFixed(2)}px`)
      node.style.setProperty('--magnet-y', `${at.y.toFixed(2)}px`)

      if (Math.abs(at.x - to.x) < NEARLY_ZERO && Math.abs(at.y - to.y) < NEARLY_ZERO) {
        stop()
        return
      }
      frame.current = requestAnimationFrame(tick)
    },
    [stop],
  )

  const start = useCallback(() => {
    if (frame.current !== null) return
    lastFrameTime.current = 0
    frame.current = requestAnimationFrame(tick)
  }, [tick])

  const onPointerMove = useCallback(
    (event) => {
      if (event.pointerType !== 'mouse' || prefersReducedMotion()) return
      const rect = event.currentTarget.getBoundingClientRect()
      target.current = {
        x: (event.clientX - rect.left - rect.width / 2) * pull,
        y: (event.clientY - rect.top - rect.height / 2) * pull,
      }
      start()
    },
    [pull, start],
  )

  const onPointerLeave = useCallback(() => {
    target.current = { x: 0, y: 0 }
    start()
  }, [start])

  useEffect(() => stop, [stop])

  return { ref, onPointerMove, onPointerLeave }
}
