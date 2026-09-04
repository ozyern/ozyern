import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion'

/**
 * Observers are shared per threshold. A page with ~30 revealing elements was
 * creating ~30 IntersectionObservers; three is plenty.
 */
const observers = new Map()
const callbacks = new WeakMap()

function observerFor(threshold) {
  let observer = observers.get(threshold)
  if (observer) return observer

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        callbacks.get(entry.target)?.()
        observer.unobserve(entry.target)
      }
    },
    // The bottom inset means an element commits to revealing slightly before
    // it reaches the fold, so it has finished settling by the time you read it.
    { threshold, rootMargin: '0px 0px -8% 0px' },
  )

  observers.set(threshold, observer)
  return observer
}

/**
 * Reveal-on-scroll. Returns a ref to attach and whether it has been seen yet.
 * Fires once — things that have already animated in stay in.
 */
export function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  // Someone who has asked for reduced motion should just see the content.
  const [visible, setVisible] = useState(prefersReducedMotion)

  useEffect(() => {
    const node = ref.current
    if (!node || visible) return

    const observer = observerFor(threshold)
    callbacks.set(node, () => setVisible(true))
    observer.observe(node)

    return () => {
      observer.unobserve(node)
      callbacks.delete(node)
    }
  }, [threshold, visible])

  return [ref, visible]
}

/** Small helper so components don't repeat the same ternary in every className. */
export function revealClass(visible, extra = '') {
  return `reveal${visible ? ' is-visible' : ''}${extra ? ` ${extra}` : ''}`
}
