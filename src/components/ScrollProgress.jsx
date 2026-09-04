import { useEffect, useRef } from 'react'
import { onScrollFrame } from '../lib/scroll'

/**
 * The hairline at the top of the window.
 *
 * Driven by a scaleX transform rather than a width, so it never triggers
 * layout — and by a ref rather than state, so scrolling the page doesn't
 * re-render React sixty times a second.
 */
export default function ScrollProgress() {
  const fillRef = useRef(null)

  useEffect(
    () =>
      onScrollFrame(({ scrollY, viewport, documentHeight }) => {
        const scrollable = documentHeight - viewport
        const progress = scrollable > 0 ? Math.min(1, scrollY / scrollable) : 0
        if (fillRef.current) fillRef.current.style.transform = `scaleX(${progress})`
      }),
    [],
  )

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__fill" ref={fillRef} />
    </div>
  )
}
