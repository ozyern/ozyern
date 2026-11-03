import { useEffect, useRef } from 'react'
import { onScrollFrame } from '../lib/scroll'
import { damp, NEARLY_ZERO, prefersReducedMotion } from '../lib/motion'

/**
 * The slow atmospheric light behind the page.
 *
 * Four soft gradient orbs drifting on long loops, responding to both scroll
 * progress and pointer coordinates with smooth damping, giving the canvas an
 * organic spatial depth.
 *
 * All animations use transforms on compositor-only layers with no expensive
 * blur filters, ensuring fluid 60-120fps across all viewports.
 */
export default function Ambience() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const node = ref.current
    if (!node) return

    // Scroll parallax tracking
    const unbindScroll = onScrollFrame(({ scrollY, viewport, documentHeight }) => {
      const scrollable = documentHeight - viewport
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, scrollY / scrollable)) : 0
      node.style.setProperty('--ambience-y', `${(progress * 100).toFixed(2)}%`)
    })

    // Pointer-driven subtle ambient lean
    let frame = null
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let lastTime = 0

    const tick = (now) => {
      const delta = lastTime ? Math.min(now - lastTime, 64) : 16.67
      lastTime = now

      currentX = damp(currentX, targetX, 0.03, delta)
      currentY = damp(currentY, targetY, 0.03, delta)

      node.style.setProperty('--ambience-mx', `${currentX.toFixed(2)}px`)
      node.style.setProperty('--ambience-my', `${currentY.toFixed(2)}px`)

      const settled =
        Math.abs(currentX - targetX) < NEARLY_ZERO &&
        Math.abs(currentY - targetY) < NEARLY_ZERO

      if (!settled) {
        frame = requestAnimationFrame(tick)
      } else {
        frame = null
      }
    }

    const onPointerMove = (e) => {
      if (e.pointerType !== 'mouse') return
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      // Maximum travel: subtle 24px drift across the full viewport
      targetX = ((e.clientX - cx) / cx) * 24
      targetY = ((e.clientY - cy) / cy) * 24

      if (frame === null) {
        lastTime = 0
        frame = requestAnimationFrame(tick)
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      unbindScroll()
      window.removeEventListener('pointermove', onPointerMove)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="ambience" ref={ref} aria-hidden="true">
      <span className="ambience__orb ambience__orb--warm" />
      <span className="ambience__orb ambience__orb--cool" />
      <span className="ambience__orb ambience__orb--deep" />
      <span className="ambience__orb ambience__orb--aurora" />
    </div>
  )
}
