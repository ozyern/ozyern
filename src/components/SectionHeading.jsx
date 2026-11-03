import { useReveal, revealClass } from '../hooks/useReveal'
import SplitText from './SplitText'

/**
 * Every section opens the same way: a small mono eyebrow, a serif headline and
 * an optional line of context. Sharing it keeps the vertical rhythm identical
 * down the page, which is most of what makes a long scroll feel composed.
 *
 * The headline is split into words so each one arrives on its own beat, and
 * a hairline rule draws itself underneath once the words have landed.
 */
export default function SectionHeading({ eyebrow, title, children }) {
  const [ref, visible] = useReveal(0.4)

  return (
    <header className={`section__heading${visible ? ' is-visible' : ''}`} ref={ref}>
      <p className={revealClass(visible, 'section__eyebrow')}>{eyebrow}</p>

      {/* The words carry the reveal themselves, so the heading block does not
          fade in a second time on top of them. */}
      <h2 className="section__title">
        <SplitText visible={visible}>{title}</SplitText>
      </h2>

      <span className="section__rule" aria-hidden="true" />

      {children && <p className={revealClass(visible, 'section__lede')}>{children}</p>}
    </header>
  )
}
