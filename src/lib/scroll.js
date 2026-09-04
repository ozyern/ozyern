/**
 * A single scroll listener for the whole page.
 *
 * The progress bar, the side navigation and the hero parallax all care about
 * the scroll position. Before this they each registered their own listener and
 * their own requestAnimationFrame, so one scroll gesture scheduled three
 * layout reads per frame. Now they subscribe here, we measure once, and every
 * subscriber gets the same numbers.
 */

const subscribers = new Set()

let frame = null
let listening = false

function measure() {
  return {
    scrollY: window.scrollY,
    viewport: window.innerHeight,
    // Cached per frame rather than per subscriber: reading scrollHeight forces
    // a layout flush, and doing that three times a frame was measurable.
    documentHeight: document.documentElement.scrollHeight,
  }
}

function flush() {
  frame = null
  const metrics = measure()
  for (const subscriber of subscribers) subscriber(metrics)
}

function schedule() {
  if (frame === null) frame = requestAnimationFrame(flush)
}

function startListening() {
  if (listening) return
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })
  listening = true
}

function stopListening() {
  if (!listening) return
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  if (frame !== null) cancelAnimationFrame(frame)
  frame = null
  listening = false
}

/**
 * Run `callback` on every scroll/resize frame, plus once immediately so the
 * subscriber can paint its initial state.
 *
 * @returns {() => void} unsubscribe
 */
export function onScrollFrame(callback) {
  subscribers.add(callback)
  startListening()
  callback(measure())

  return () => {
    subscribers.delete(callback)
    if (subscribers.size === 0) stopListening()
  }
}
