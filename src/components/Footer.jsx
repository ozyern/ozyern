import { PROFILE } from '../data/site'

const LINKS = [
  { label: 'sabrina', href: 'https://sabrina.ozyern.me' },
  { label: 'exhale', href: 'https://github.com/ozyern/Exhale' },
  { label: 'github', href: 'https://github.com/ozyern' },
  { label: 'top ↑', href: '#home' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__note">
        © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.handle} · Crafted with obsession.
      </p>
      <nav className="footer__links" aria-label="Elsewhere">
        {LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
    </footer>
  )
}
