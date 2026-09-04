import { useEffect, useRef, useState } from 'react'
import { PROFILE, SOCIALS } from '../data/site'
import { onScrollFrame } from '../lib/scroll'
import { prefersReducedMotion } from '../lib/motion'
import { useMagnetic } from '../hooks/useMagnetic'
import { usePointerCard } from '../hooks/usePointerCard'
import Icon from './Icon'

const PORTRAIT = './assets/hero-photo.jpg'

function SocialButton({ social }) {
  const magnet = useMagnetic(0.28)

  return (
    <a
      ref={magnet.ref}
      className="hero__social"
      href={social.href}
      target={social.href.startsWith('mailto:') ? undefined : '_blank'}
      rel="noreferrer noopener"
      aria-label={social.label}
      onPointerMove={magnet.onPointerMove}
      onPointerLeave={magnet.onPointerLeave}
    >
      <Icon name={social.icon} size={19} />
    </a>
  )
}

/**
 * Deliberately quiet.
 *
 * This used to run five ambient layers behind the text — a drifting mesh, a
 * cursor-tracking spotlight, ten floating embers — on top of a shimmering role
 * line, a blinking dot, a bobbing portrait and a sheen that swept across it.
 * All of it moving, all of the time, none of it saying anything. What is left
 * is a static gradient, a grain plate, and motion only where you actually
 * touch something.
 */
export default function Hero() {
  const portraitRef = useRef(null)
  const portrait = usePointerCard(7)
  const [imageState, setImageState] = useState('loading')

  // Parallax. Scroll-linked, so it is invisible until the reader asks for it —
  // and translating the wrapper (never the <img>) keeps the browser on the
  // compositor and off the paint path.
  useEffect(() => {
    if (prefersReducedMotion()) return

    return onScrollFrame(({ scrollY, viewport }) => {
      const node = portraitRef.current
      if (!node || scrollY > viewport) return
      node.style.setProperty('--parallax', `${scrollY * 0.12}px`)
    })
  }, [])

  return (
    <section id="home" className="hero">
      <div className="hero__aura" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__lead">
          <p className="hero__status">
            <span className="hero__status-dot" aria-hidden="true" />
            {PROFILE.availability}
            <span className="hero__status-sep" aria-hidden="true" />
            <span className="hero__status-handle">{PROFILE.handle}</span>
          </p>

          <h1 className="hero__name">
            {/* Split so every letter can sit at its own angle. The tilts are
                fixed in CSS rather than generated, so the name looks identical
                on every render — and each letter springs upright when you put
                the cursor on it. */}
            <span className="hero__name-first" aria-label="Aditya">
              {[...'Aditya'].map((letter, index) => (
                <span key={index} className="hero__name-letter" aria-hidden="true">
                  {letter}
                </span>
              ))}
            </span>
            <span className="hero__name-last">
              Jha
              <span className="hero__name-dot" aria-hidden="true">
                .
              </span>
            </span>
          </h1>

          <p className="hero__role">{PROFILE.role}</p>

          <p className="hero__lede">{PROFILE.lede}</p>

          <div className="hero__actions">
            <a className="button button--primary" href="#projects">
              See the work
              <Icon name="arrow" size={18} />
            </a>
            <a className="button button--ghost" href={`mailto:${PROFILE.email}`}>
              Say hello
            </a>

            <div className="hero__socials">
              {SOCIALS.map((social) => (
                <SocialButton key={social.id} social={social} />
              ))}
            </div>
          </div>
        </div>

        <div className="hero__aside">
          <div className="hero__portrait-wrap" ref={portraitRef}>
            <div
              className="hero__portrait"
              ref={portrait.ref}
              onPointerMove={portrait.onPointerMove}
              onPointerLeave={portrait.onPointerLeave}
            >
              <img
                src={PORTRAIT}
                alt={`${PROFILE.name}, ${PROFILE.handle}`}
                width="480"
                height="600"
                decoding="async"
                fetchPriority="high"
                data-state={imageState}
                onLoad={() => setImageState('loaded')}
                onError={() => setImageState('failed')}
              />
              {imageState === 'loading' && (
                <div className="hero__portrait-skeleton" aria-hidden="true" />
              )}
              {imageState === 'failed' && (
                <div className="hero__portrait-fallback" aria-hidden="true">
                  <Icon name="person" size={72} strokeWidth={1.2} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <a className="hero__scroll" href="#stats">
        <span className="hero__scroll-track" aria-hidden="true" />
        <span>scroll</span>
      </a>
    </section>
  )
}
