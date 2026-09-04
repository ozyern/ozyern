import { STATS } from '../data/site'
import { useCountUp } from '../hooks/useCountUp'
import { usePointerCard } from '../hooks/usePointerCard'
import { useReveal, revealClass } from '../hooks/useReveal'

function StatCard({ stat, index, counting }) {
  const pointer = usePointerCard(5)
  const counted = useCountUp(stat.to ?? 0, counting && stat.to != null)

  return (
    <li
      className={revealClass(counting, `card stat${stat.live ? ' stat--live' : ''}`)}
      style={{ '--reveal-delay': `${index * 70}ms` }}
      ref={pointer.ref}
      onPointerMove={pointer.onPointerMove}
      onPointerLeave={pointer.onPointerLeave}
    >
      <p className="stat__label">{stat.label}</p>
      <div className="stat__figure">
        <p className="stat__value">
          {stat.text ?? counted}
          {stat.suffix && <b>{stat.suffix}</b>}
        </p>
        <p className="stat__note">{stat.note}</p>
      </div>
      <span className="card__glow" aria-hidden="true" />
    </li>
  )
}

export default function Stats() {
  const [ref, visible] = useReveal(0.15)

  return (
    <section id="stats" className="section section--tight" ref={ref}>
      <ul className="stats">
        {STATS.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} counting={visible} />
        ))}
      </ul>
    </section>
  )
}
