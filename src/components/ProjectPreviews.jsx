import { useState } from 'react'

/**
 * The little mock screens inside each project's browser frame.
 *
 * These used to be several hundred characters of inline style objects sitting
 * in the middle of the data file. They're markup, so they live with the other
 * markup, and their styling lives in the stylesheet with everything else.
 */

function BrinaOsPreview() {
  return (
    <div className="preview preview--brinaos">
      <p className="preview__repo">ozyern / BrinaOS-Ports</p>
      <h4 className="preview__headline">
        Port anything.
        <br />
        <span>Fast.</span>
      </h4>
      <p className="preview__meta">ColorOS 16 · OxygenOS 16 · SM8350</p>
      <ul className="preview__tags">
        {['Bash', 'OTA', 'SM8350'].map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <pre className="preview__terminal">
        <code>
          <span className="preview__prompt">$ ./port.sh --device lemonadep</span>
          <span className="preview__ok">✓ Extracted system partitions</span>
          <span className="preview__ok">✓ Applied smali patches (AI)</span>
          <span className="preview__pending">
            ↳ Building OTA package
            <i className="preview__caret" />
          </span>
        </code>
      </pre>
    </div>
  )
}

function SabrinaPreview() {
  return (
    <div className="preview preview--sabrina">
      <p className="preview__kicker">Fan Site</p>
      <h4 className="preview__serif">Sabrina</h4>
      <p className="preview__sub">Carpenter</p>
      <span className="preview__rule" />
      <ul className="preview__pills">
        {["Short n' Sweet", 'Espresso', 'Feather'].map((era) => (
          <li key={era}>{era}</li>
        ))}
      </ul>
      <p className="preview__meta">Dynamic Island · Liquid Glass</p>
    </div>
  )
}

/**
 * Exhale is a music player, so the mock is a player rather than a logo on a
 * background — that is the only one of the three that can show what the
 * project actually does.
 *
 * The album art loads `assets/exhale-art.jpg` if it is there and falls back to
 * a generated sleeve if it is not, so dropping a real screenshot into
 * `public/assets/` is the whole job — no code change, no broken image.
 */
function ExhalePreview() {
  const [artLoaded, setArtLoaded] = useState(false)

  return (
    <div className="preview preview--exhale">
      <div className="exhale__bar">
        <span className="exhale__kicker">Now playing</span>
        <span className="exhale__wordmark">
          Ex<span>ha</span>le
        </span>
      </div>

      <div className="exhale__art" data-art={artLoaded ? 'photo' : 'generated'}>
        <img
          src="./assets/exhale-art.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={() => setArtLoaded(true)}
        />
      </div>

      <div className="exhale__track">
        <p className="exhale__title">Espresso</p>
        <p className="exhale__artist">Sabrina Carpenter</p>
      </div>

      <div className="exhale__scrub" aria-hidden="true">
        <span />
      </div>

      <div className="exhale__controls" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 5.5v13L17 12z" transform="rotate(180 12 12)" />
          <rect x="16" y="5.5" width="2" height="13" rx="1" />
        </svg>
        <span className="exhale__play">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.5 5.8v12.4L18.5 12z" />
          </svg>
        </span>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 5.5v13L17 12z" />
          <rect x="16" y="5.5" width="2" height="13" rx="1" />
        </svg>
      </div>
    </div>
  )
}

const PREVIEWS = {
  brinaos: BrinaOsPreview,
  sabrina: SabrinaPreview,
  exhale: ExhalePreview,
}

export default function ProjectPreview({ name }) {
  const Preview = PREVIEWS[name]
  return Preview ? <Preview /> : null
}
