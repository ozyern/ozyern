import { DEVICES, QUOTE } from '../data/site'
import { usePointerCard } from '../hooks/usePointerCard'
import { useReveal, revealClass } from '../hooks/useReveal'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

/** Cards here only glow — no tilt, because two of them hold long body copy. */
function AboutCard({ className, delay, visible, children }) {
  const pointer = usePointerCard(0)

  return (
    <div
      className={revealClass(visible, `card ${className}`)}
      style={{ '--reveal-delay': `${delay}ms` }}
      ref={pointer.ref}
      onPointerMove={pointer.onPointerMove}
      onPointerLeave={pointer.onPointerLeave}
    >
      {children}
      <span className="card__glow" aria-hidden="true" />
    </div>
  )
}

export default function About() {
  const [ref, visible] = useReveal(0.08)

  return (
    <section id="about" className="section section--raised" ref={ref}>
      <SectionHeading eyebrow="About" title={<>Close to the <em>metal</em></>} />

      <div className="about">
        <AboutCard className="about__bio" delay={0} visible={visible}>
          <span className="about__icon">
            <Icon name="person" size={22} />
          </span>
          <h3 className="about__headline">
            Kernels, ROMs and interfaces that feel <i>alive</i>.
          </h3>
          <p>
            I&rsquo;m Ozi — a student and an active Android ROM porter. I maintain{' '}
            <strong>BrinaOS Ports</strong>, a bash framework for putting ColorOS and OxygenOS 16
            onto Snapdragon 888 devices, mostly the OnePlus 9 Pro.
          </p>
          <p>
            The work runs from partition images and smali patching all the way up to fan sites with
            liquid-glass CSS and Dynamic Island navigation. Alongside that I run{' '}
            <strong>ReVork</strong>, a ~370-member Telegram community for ROM developers.
          </p>
        </AboutCard>

        <AboutCard className="about__portrait" delay={90} visible={visible}>
          {/* Reuses the hero portrait rather than hot-linking a stock photo of
              a circuit board captioned with someone's actual name. It is
              already preloaded for the hero, so this costs nothing. */}
          <img
            src="./assets/hero-photo.jpg"
            alt=""
            width="480"
            height="700"
            loading="lazy"
            decoding="async"
          />
          <div className="about__portrait-caption">
            <p className="about__portrait-name">Aditya Jha</p>
            <p className="about__portrait-handle">@ozyern</p>
          </div>
        </AboutCard>

        <AboutCard className="about__quote" delay={140} visible={visible}>
          <span className="about__quote-mark" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote>{QUOTE}</blockquote>
        </AboutCard>

        <AboutCard className="about__devices" delay={190} visible={visible}>
          <p className="about__devices-title">
            <span className="pulse-dot" aria-hidden="true" />
            Device lineup
          </p>
          <ul>
            {DEVICES.map((device) => (
              <li key={device.name}>
                <span className="about__device-name">{device.name}</span>
                <span className="about__device-note">{device.note}</span>
              </li>
            ))}
          </ul>
        </AboutCard>
      </div>
    </section>
  )
}
