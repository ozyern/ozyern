/**
 * Reduced-motion plumbing.
 *
 * CSS handles most of it, but the pointer-driven effects are written straight
 * to the DOM from JS, so those need to ask too — otherwise a user who has
 * asked for less motion still gets tilting cards.
 */

const QUERY = '(prefers-reduced-motion: reduce)'

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(QUERY).matches
}

/** Subscribe to changes; returns an unsubscribe function. */
export function onMotionPreferenceChange(handler) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {}

  const mq = window.matchMedia(QUERY)
  const listener = (event) => handler(event.matches)
  mq.addEventListener('change', listener)
  return () => mq.removeEventListener('change', listener)
}

/**
 * Frame-rate independent damping. The naive `current += (target - current) * f`
 * moves faster on a 144Hz screen than on a 60Hz one; this normalises it so the
 * animation feels identical everywhere.
 *
 * @param {number} current   value now
 * @param {number} target    value we're heading towards
 * @param {number} smoothing fraction of the remaining distance left after 16ms
 * @param {number} deltaMs   time since the previous frame
 */
export function damp(current, target, smoothing, deltaMs) {
  const factor = 1 - Math.pow(smoothing, deltaMs / 16.667)
  return current + (target - current) * factor
}

export const NEARLY_ZERO = 0.01
