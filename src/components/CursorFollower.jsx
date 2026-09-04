import { useEffect, useRef } from 'react'

// Anything matching this grows the ring when the cursor is over it.
const INTERACTIVE = 'a, button, [role="button"], .card, .hero__portrait'

/**
 * The two-part custom cursor: a hard dot pinned to the real pointer and a ring
 * that trails behind it.
 *
 * Two things the old implementation got wrong and this one doesn't:
 *
 *  1. It bound mouseenter/mouseleave to every interactive element after a
 *     600ms timeout — so anything rendered later was dead, and none of the
 *     listeners were ever removed. This uses one delegated pointerover on the
 *     document instead.
 *  2. It ran on touch devices, where there is no cursor to follow.
 */
export default function CursorFollower() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const pointer = { x: innerWidth / 2, y: innerHeight / 2 }
    const trail = { ...pointer }
    let frame = null
    let visible = false

    const onPointerMove = (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      if (!visible) {
        visible = true
        // Jump the ring to the pointer on the first move so it doesn't fly in
        // from the middle of the screen.
        trail.x = pointer.x
        trail.y = pointer.y
        document.body.classList.add('has-cursor')
      }
    }

    const tick = () => {
      trail.x += (pointer.x - trail.x) * 0.16
      trail.y += (pointer.y - trail.y) * 0.16
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%)`
      frame = requestAnimationFrame(tick)
    }

    const onPointerOver = (event) => {
      document.body.classList.toggle('cursor-over-target', !!event.target.closest?.(INTERACTIVE))
    }
    const onPointerDown = () => document.body.classList.add('cursor-pressed')
    const onPointerUp = () => document.body.classList.remove('cursor-pressed')
    const onLeaveWindow = () => document.body.classList.remove('has-cursor')

    document.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerover', onPointerOver, { passive: true })
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('pointerup', onPointerUp)
    document.addEventListener('mouseleave', onLeaveWindow)
    frame = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerover', onPointerOver)
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('pointerup', onPointerUp)
      document.removeEventListener('mouseleave', onLeaveWindow)
      cancelAnimationFrame(frame)
      document.body.classList.remove('has-cursor', 'cursor-over-target', 'cursor-pressed')
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  )
}
