import { EXPERIENCE } from '../data/site'
import { usePointerCard } from '../hooks/usePointerCard'
import { useReveal, revealClass } from '../hooks/useReveal'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

function RoleCard({ role, index, visible }) {
  const pointer = usePointerCard(5)

  return (
    <li
      className={revealClass(visible, 'card role')}
      style={{ '--reveal-delay': `${index * 90}ms` }}
      ref={pointer.ref}
      onPointerMove={pointer.onPointerMove}
      onPointerLeave={pointer.onPointerLeave}
    >
      <div className="role__head">
        <span className="role__icon">
          <Icon name={role.icon} size={22} />
        </span>
        <div>
          <h3 className="role__company">{role.company}</h3>
          <p className="role__date">{role.date}</p>
        </div>
      </div>

      <div className="role__band">
        <span className="role__title">{role.role}</span>
        <span className="role__tag">{role.tag}</span>
      </div>

      <p className="role__summary">{role.summary}</p>

      <ul className="role__stack">
        {role.stack.map((item) => (
          <li key={item} className="chip">
            {item}
          </li>
        ))}
      </ul>

      <span className="card__glow" aria-hidden="true" />
      <span className="card__sheen" aria-hidden="true" />
    </li>
  )
}

export default function Experience() {
  const [ref, visible] = useReveal(0.06)

  return (
    <section id="experience" className="section" ref={ref}>
      <SectionHeading eyebrow="Experience" title={<>What I&rsquo;ve been <em>building</em></>}>
        A chronicle of the Android work, the communities and the sites that came out of them.
      </SectionHeading>

      <ul className="roles">
        {EXPERIENCE.map((role, index) => (
          <RoleCard key={role.company} role={role} index={index} visible={visible} />
        ))}
      </ul>
    </section>
  )
}
