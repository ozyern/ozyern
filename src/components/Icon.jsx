/**
 * One icon component with a keyed registry, so the content in data/site.js can
 * refer to icons by name instead of importing JSX. Everything is drawn on a
 * 24×24 grid and inherits `currentColor`, which is what lets a single CSS rule
 * recolour an icon on hover.
 *
 * The seven navigation glyphs are deliberately conventional — a house is a
 * house. A nav icon has about a tenth of a second to say what it is, which is
 * not enough time to decode a metaphor, however good the metaphor is. The
 * craft goes into the drawing: consistent optical weight, one stroke width, a
 * shared 4–20 live area so none of them looks bigger than its neighbours.
 */

const PATHS = {
  home: (
    <>
      <path d="M3.6 10.4 12 3.4l8.4 7" />
      <path d="M5.7 9.6V20a.9.9 0 0 0 .9.9h10.8a.9.9 0 0 0 .9-.9V9.6" />
      <path d="M9.8 20.9v-6.1h4.4v6.1" />
    </>
  ),
  chart: (
    <>
      <rect x="4.2" y="12.6" width="4" height="7.2" rx="1.2" />
      <rect x="10" y="8.4" width="4" height="11.4" rx="1.2" />
      <rect x="15.8" y="4.2" width="4" height="15.6" rx="1.2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7.6" width="18" height="12.8" rx="2.6" />
      <path d="M15.6 7.6V6a2.2 2.2 0 0 0-2.2-2.2h-2.8A2.2 2.2 0 0 0 8.4 6v1.6" />
      <path d="M3 12.8h18" />
    </>
  ),
  bolt: <path d="M13.2 2.8 4.5 13.9h6.5l-1.2 7.3 8.7-11.1h-6.5z" />,
  person: (
    <>
      <circle cx="12" cy="8.2" r="3.6" />
      <path d="M4.9 20.6v-1a5 5 0 0 1 5-5h4.2a5 5 0 0 1 5 5v1" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.2" width="18" height="13.6" rx="2.6" />
      <path d="M3.6 7.6 11 13.1a1.8 1.8 0 0 0 2 0l7.4-5.5" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.2 8.8 4.6L12 12.4 3.2 7.8z" />
      <path d="m3.2 12.4 8.8 4.6 8.8-4.6" />
      <path d="m3.2 16.8 8.8 4.6 8.8-4.6" />
    </>
  ),
  github: (
    <>
      <path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 6.96A3.37 3.37 0 0 0 8 18.13V22" />
      <path d="M9 19c-4.3 1.4-5-2.5-7-3" />
    </>
  ),
  telegram: (
    <>
      <path d="m21.5 2.5-7 19-3.9-8.4-8.1-3.7z" />
      <path d="M21.5 2.5 10.6 13.1" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M2.8 12h18.4" />
      <path d="M12 2.8a15 15 0 0 1 3.9 9.2A15 15 0 0 1 12 21.2 15 15 0 0 1 8.1 12 15 15 0 0 1 12 2.8z" />
    </>
  ),
  terminal: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="m7 10 2.8 2.6L7 15.2" />
      <path d="M12.8 15.4h4.4" />
    </>
  ),
  chip: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2.5" />
      <path d="M10 3v3.5M14 3v3.5M10 17.5V21M14 17.5V21M3 10h3.5M3 14h3.5M17.5 10H21M17.5 14H21" />
    </>
  ),
  arrow: (
    <>
      <path d="M4.5 12h14" />
      <path d="m12.5 5.5 6.5 6.5-6.5 6.5" />
    </>
  ),
}

export default function Icon({ name, size = 24, strokeWidth = 1.7, ...rest }) {
  const glyph = PATHS[name]
  if (!glyph) return null

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {glyph}
    </svg>
  )
}
