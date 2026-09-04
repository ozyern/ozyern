import { PROFILE, SOCIALS } from '../data/site'
import { usePointerCard } from '../hooks/usePointerCard'
import { useReveal, revealClass } from '../hooks/useReveal'
import Icon from './Icon'

function ContactCard({ social, index, visible }) {
  const pointer = usePointerCard(6)

  return (
    <a
      className={revealClass(visible, 'card contact__card')}
      style={{ '--reveal-delay': `${index * 70}ms` }}
      href={social.href}
      target={social.href.startsWith('mailto:') ? undefined : '_blank'}
      rel="noreferrer noopener"
      ref={pointer.ref}
      onPointerMove={pointer.onPointerMove}
      onPointerLeave={pointer.onPointerLeave}
    >
      <span className="contact__card-icon">
        <Icon name={social.icon} size={22} />
      </span>
      <span className="contact__card-text">
        <span className="contact__card-name">{social.label}</span>
        <span className="contact__card-handle">{social.handle}</span>
      </span>
      <span className="contact__card-arrow" aria-hidden="true">
        <Icon name="arrow" size={14} strokeWidth={2.2} />
      </span>
      <span className="card__glow" aria-hidden="true" />
    </a>
  )
}

export default function Contact() {
  const [ref, visible] = useReveal(0.1)

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="contact__aura" aria-hidden="true" />
      <div className="contact__grain" aria-hidden="true" />

      <div className="contact__grid">
        <div className={revealClass(visible, 'contact__intro')}>
          <p className="section__eyebrow">Get in touch</p>
          <h2 className="contact__headline">
            Let&rsquo;s <i>build</i>
            <br />
            something
            <br />
            together.
          </h2>

          <p className="contact__status">
            <span className="pulse-dot" aria-hidden="true" />
            <span>
              <span className="contact__status-label">Status</span>
              <span className="contact__status-value">{PROFILE.availability}</span>
            </span>
          </p>

          <p className="contact__copy">
            Currently heads-down on BrinaOS Ports and the ReVork community. If you want to make
            something odd and well-built, my inbox is open.
          </p>

          <p className="contact__aside">
            <span>Fun fact</span>
            Every project ends up named after a Sabrina song.
          </p>
        </div>

        <div className="contact__cards">
          {SOCIALS.map((social, index) => (
            <ContactCard key={social.id} social={social} index={index} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
