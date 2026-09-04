import { PROJECTS } from '../data/site'
import { usePointerCard } from '../hooks/usePointerCard'
import { useReveal, revealClass } from '../hooks/useReveal'
import Icon from './Icon'
import ProjectPreview from './ProjectPreviews'
import SectionHeading from './SectionHeading'

/** A macOS-ish chrome so the previews read as real pages rather than graphics. */
function BrowserFrame({ url, children }) {
  return (
    <div className="browser">
      <div className="browser__bar">
        <span className="browser__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="browser__url">{url}</span>
      </div>
      <div className="browser__viewport">{children}</div>
    </div>
  )
}

function ProjectCard({ project, index, visible }) {
  const pointer = usePointerCard(3.5)

  return (
    <li
      className={revealClass(visible, 'card project')}
      style={{ '--reveal-delay': `${index * 100}ms` }}
      ref={pointer.ref}
      onPointerMove={pointer.onPointerMove}
      onPointerLeave={pointer.onPointerLeave}
    >
      <div className="project__body">
        <p className="project__index">{String(index + 1).padStart(2, '0')}</p>
        <h3 className="project__name">{project.name}</h3>
        <p className="project__summary">{project.summary}</p>

        <div className="project__footer">
          <span className="project__date">{project.date}</span>
          <a
            className="project__open"
            href={project.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Open ${project.name}`}
          >
            <Icon name="arrow" size={20} strokeWidth={2} />
          </a>
        </div>
      </div>

      <div className="project__stage">
        <BrowserFrame url={project.url}>
          <ProjectPreview name={project.preview} />
        </BrowserFrame>
      </div>

      <span className="card__glow" aria-hidden="true" />
    </li>
  )
}

export default function Projects() {
  const [ref, visible] = useReveal(0.05)

  return (
    <section id="projects" className="section section--raised" ref={ref}>
      <SectionHeading eyebrow="Selected work" title={<>Things I&rsquo;ve <em>actually shipped</em></>}>
        Three projects that went from a folder on my desk to something other people use.
      </SectionHeading>

      <ul className="projects">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} visible={visible} />
        ))}
      </ul>
    </section>
  )
}
