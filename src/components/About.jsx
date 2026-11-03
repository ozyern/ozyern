import { DEVICES, QUOTE, SHIPPING } from '../data/site'
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
            <strong>ReVork</strong>, a ~430-member Telegram community for ROM developers.
          </p>
          <p>
            And I build my own things too — most passionately{' '}
            <strong>Exhale</strong>, an open-source Android music player that brings that exact
            close-to-the-metal discipline to userland software. Most music apps choke on large
            libraries or wrap sluggish web views around basic APIs; Exhale runs a custom,
            asynchronous MediaStore and taglib indexing engine that parses tens of thousands of
            lossless tracks in milliseconds without dropping a single frame from the 120Hz display pipeline.
          </p>
          <p>
            Under the hood, a direct-to-HAL low-latency audio pipeline guarantees bit-perfect
            DAC output, wrapped in a tactile Liquid Glass interface with hardware-accelerated shaders
            and album-palette luminosity.
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

        <AboutCard className="about__exhale" delay={220} visible={visible}>
          <div className="about__exhale-top">
            <div className="about__exhale-badge">
              <span className="about__exhale-pill">
                <Icon name="music" size={14} />
                Exhale Spotlight
              </span>
              <span className="about__exhale-eq" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
            </div>
            <a
              href="https://github.com/ozyern/Exhale"
              target="_blank"
              rel="noreferrer noopener"
              className="about__exhale-link"
            >
              <span>github.com/ozyern/Exhale</span>
              <Icon name="arrow" size={14} />
            </a>
          </div>

          <h3 className="about__headline about__exhale-heading">
            Built for <i>sound</i>. Engineered at the <i>metal</i>.
          </h3>

          <p className="about__exhale-desc">
            Exhale was born from a simple frustration: mobile players are either cluttered with cloud subscriptions
            or painfully sluggish when handling massive lossless collections. Applying kernel-grade optimization
            to Kotlin and Jetpack Compose gives you instant response and pure acoustic clarity.
          </p>

          <div className="about__exhale-pillars">
            <div className="about__exhale-pillar">
              <span className="about__exhale-metric">~4ms</span>
              <strong className="about__exhale-pillar-name">Async Scanner</strong>
              <p className="about__exhale-pillar-text">
                Custom low-overhead MediaStore indexing and parallel taglib metadata parsing that
                ingests 10k+ FLAC and MP3 tracks instantaneously.
              </p>
            </div>
            <div className="about__exhale-pillar">
              <span className="about__exhale-metric">0 Jitter</span>
              <strong className="about__exhale-pillar-name">Direct-to-HAL Audio</strong>
              <p className="about__exhale-pillar-text">
                Bypasses non-essential Android audio mixer stages for low-latency, bit-perfect
                playback directly through the hardware DAC.
              </p>
            </div>
            <div className="about__exhale-pillar">
              <span className="about__exhale-metric">120 fps</span>
              <strong className="about__exhale-pillar-name">Liquid Glass Engine</strong>
              <p className="about__exhale-pillar-text">
                Real-time GPU RenderEffect blur shaders, adaptive glass refraction, and
                momentum physics tuned for high-refresh displays.
              </p>
            </div>
            <div className="about__exhale-pillar">
              <span className="about__exhale-metric">100%</span>
              <strong className="about__exhale-pillar-name">Pure Open Source</strong>
              <p className="about__exhale-pillar-text">
                Zero telemetry, zero ads, zero background daemon drain. Your files and your
                listening habits stay strictly on your device.
              </p>
            </div>
          </div>
        </AboutCard>

        <AboutCard className="about__shipping" delay={240} visible={visible}>
          <p className="about__devices-title">
            <span className="pulse-dot" aria-hidden="true" />
            Currently shipping
          </p>
          <ul className="about__shipping-list">
            {SHIPPING.map((item) => (
              <li key={item.name}>
                <a href={item.href} target="_blank" rel="noreferrer noopener">
                  <span className="about__shipping-name">{item.name}</span>
                  <span className="about__shipping-note">{item.note}</span>
                  <span className="about__shipping-arrow" aria-hidden="true">
                    <Icon name="arrow" size={16} strokeWidth={2} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </AboutCard>
      </div>
    </section>
  )
}
