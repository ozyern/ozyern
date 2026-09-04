import { useCallback, useEffect, useRef } from 'react'
import { NEARLY_ZERO, damp, prefersReducedMotion } from '../lib/motion'

/**
 * The pointer effect shared by every card on the site: a light that tracks the
 * cursor plus a small parallax tilt.
 *
 * The old version of this kept the tilt in React state, so a single mousemove
 * across the projects grid re-rendered the whole section a hundred times a
 * second. Here the values are damped in an animation frame and written
 * straight to the node as custom properties, so React never hears about it.
 *
 * The loop only runs while the pointer is over the card and for the half
 * second it takes to settle back to rest afterwards.
 *
 * @param {number} maxTilt degrees of rotation at the corners; 0 disables tilt
 */
export function usePointerCard(maxTilt = 6) {
  const ref = useRef(null)
  const frame = useRef(null)
  const lastFrameTime = useRef(0)

  const target = useRef({ tiltX: 0, tiltY: 0, glowX: 50, glowY: 50 })
  const current = useRef({ tiltX: 0, tiltY: 0, glowX: 50, glowY: 50 })

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

      // 0.045 leaves ~4.5% of the gap after a frame: quick enough to feel
      // attached to the cursor, slow enough to smooth out jittery input.
      at.tiltX = damp(at.tiltX, to.tiltX, 0.045, delta)
      at.tiltY = damp(at.tiltY, to.tiltY, 0.045, delta)
      at.glowX = damp(at.glowX, to.glowX, 0.02, delta)
      at.glowY = damp(at.glowY, to.glowY, 0.02, delta)

      node.style.setProperty('--tilt-x', `${at.tiltX.toFixed(3)}deg`)
      node.style.setProperty('--tilt-y', `${at.tiltY.toFixed(3)}deg`)
      node.style.setProperty('--pointer-x', `${at.glowX.toFixed(2)}%`)
      node.style.setProperty('--pointer-y', `${at.glowY.toFixed(2)}%`)

      const settled =
        Math.abs(at.tiltX - to.tiltX) < NEARLY_ZERO &&
        Math.abs(at.tiltY - to.tiltY) < NEARLY_ZERO &&
        Math.abs(at.glowX - to.glowX) < NEARLY_ZERO &&
        Math.abs(at.glowY - to.glowY) < NEARLY_ZERO

      if (settled) {
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
      // Touch drags shouldn't leave a card frozen mid-tilt.
      if (event.pointerType !== 'mouse' || prefersReducedMotion()) return

      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      target.current = {
        tiltX: (0.5 - y / rect.height) * maxTilt * 2,
        tiltY: (x / rect.width - 0.5) * maxTilt * 2,
        glowX: (x / rect.width) * 100,
        glowY: (y / rect.height) * 100,
      }
      start()
    },
    [maxTilt, start],
  )

  const onPointerLeave = useCallback(() => {
    target.current = { ...target.current, tiltX: 0, tiltY: 0 }
    start()
  }, [start])

  useEffect(() => stop, [stop])

  return { ref, onPointerMove, onPointerLeave }
}
