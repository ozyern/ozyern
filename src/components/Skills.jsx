import { SKILLS } from '../data/site'
import { usePointerCard } from '../hooks/usePointerCard'
import { useReveal, revealClass } from '../hooks/useReveal'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

function SkillCard({ skill, index, visible }) {
  const pointer = usePointerCard(5)

  return (
    <li
      className={revealClass(visible, 'card skill')}
      style={{ '--reveal-delay': `${index * 80}ms` }}
      ref={pointer.ref}
      onPointerMove={pointer.onPointerMove}
      onPointerLeave={pointer.onPointerLeave}
    >
      <span className="skill__ordinal" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="skill__head">
        <span className="skill__icon">
          <Icon name={skill.icon} size={24} />
        </span>
        <h3 className="skill__name">{skill.name}</h3>
      </div>

      <p className="skill__blurb">{skill.blurb}</p>

      <ul className="skill__tags">
        {skill.tags.map((tag) => (
          <li key={tag} className="chip chip--solid">
            {tag}
          </li>
        ))}
      </ul>

      <span className="card__glow" aria-hidden="true" />
      <span className="card__sheen" aria-hidden="true" />
    </li>
  )
}

export default function Skills() {
  const [ref, visible] = useReveal(0.06)

  return (
    <section id="skills" className="section" ref={ref}>
      <SectionHeading eyebrow="Toolkit" title={<>What I <em>actually know</em></>}>
        Not a list of logos — the four things I open a terminal for most weeks.
      </SectionHeading>

      <ul className="skills">
        {SKILLS.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} visible={visible} />
        ))}
      </ul>
    </section>
  )
}
