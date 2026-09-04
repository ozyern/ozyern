import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion'

const MINIMUM_VISIBLE_MS = 420
const FADE_MS = 650

/**
 * The intro overlay.
 *
 * It deliberately sits *on top of* the finished page rather than replacing it.
 * The previous version rendered `{ready && <Site/>}`, which meant the browser
 * had nothing to paint until a random timer finished — the largest element on
 * screen arrived a second late for no reason. Now the page renders and loads
 * behind the overlay, and the overlay leaves as soon as the fonts and images
 * are actually in.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [removed, setRemoved] = useState(false)
  const mountedAt = useRef(performance.now())

  useEffect(() => {
    let frame = null
    let finished = false

    // Creep towards 90% while we wait. It never reaches the end on its own —
    // the last 10% belongs to the real load event, so the bar can't lie.
    const creep = () => {
      setProgress((value) => (value < 90 ? value + (90 - value) * 0.06 + 0.4 : value))
      frame = requestAnimationFrame(creep)
    }
    frame = requestAnimationFrame(creep)

    const finish = () => {
      if (finished) return
      finished = true
      cancelAnimationFrame(frame)
      setProgress(100)

      const elapsed = performance.now() - mountedAt.current
      const hold = prefersReducedMotion() ? 0 : Math.max(0, MINIMUM_VISIBLE_MS - elapsed)

      window.setTimeout(() => {
        setLeaving(true)
        window.setTimeout(() => setRemoved(true), FADE_MS)
      }, hold)
    }

    const ready = [
      // `document.fonts` is what actually causes the visible reflow, so it is
      // worth waiting for even though `load` usually resolves later.
      document.fonts ? document.fonts.ready : Promise.resolve(),
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise((resolve) => window.addEventListener('load', resolve, { once: true })),
    ]

    Promise.all(ready).then(finish)

    // Never hold the page hostage to a stalled font CDN.
    const bailout = window.setTimeout(finish, 3500)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(bailout)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-preloading', !removed)
    return () => document.body.classList.remove('is-preloading')
  }, [removed])

  if (removed) return null

  return (
    <div className={`preloader${leaving ? ' is-leaving' : ''}`} aria-hidden="true">
      <div className="preloader__mark">
        @ozy<b>ern</b>
      </div>
      <div className="preloader__track">
        <div className="preloader__fill" style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
      <div className="preloader__pct">{Math.round(progress)}%</div>
    </div>
  )
}
