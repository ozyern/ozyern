import { useReveal, revealClass } from '../hooks/useReveal'

/**
 * Every section opens the same way: a small mono eyebrow, a serif headline and
 * an optional line of context. Sharing it keeps the vertical rhythm identical
 * down the page, which is most of what makes a long scroll feel composed.
 */
export default function SectionHeading({ eyebrow, title, children }) {
  const [ref, visible] = useReveal(0.4)

  return (
    <header className="section__heading" ref={ref}>
      <p className={revealClass(visible, 'section__eyebrow')}>{eyebrow}</p>
      <h2 className={revealClass(visible, 'section__title')} style={{ '--reveal-delay': '60ms' }}>
        {title}
      </h2>
      {children && (
        <p className={revealClass(visible, 'section__lede')} style={{ '--reveal-delay': '120ms' }}>
          {children}
        </p>
      )}
    </header>
  )
}
