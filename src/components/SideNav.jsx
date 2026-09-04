import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SECTIONS } from '../data/site'
import { onScrollFrame } from '../lib/scroll'
import { useMagnetic } from '../hooks/useMagnetic'
import Icon from './Icon'

function NavLink({ section, isActive, registerNode }) {
  const magnet = useMagnetic(0.3)

  return (
    <a
      ref={(node) => {
        magnet.ref.current = node
        registerNode(section.id, node)
      }}
      href={`#${section.id}`}
      className={`sidenav__link${isActive ? ' is-active' : ''}`}
      aria-current={isActive ? 'true' : undefined}
      onPointerMove={magnet.onPointerMove}
      onPointerLeave={magnet.onPointerLeave}
    >
      <Icon name={section.icon} size={20} />
      <span className="sidenav__label">{section.label}</span>
    </a>
  )
}

/**
 * The floating rail, and the pill that slides between its icons.
 *
 * Section detection reads offsets that are measured once and re-measured only
 * when the document height changes — the old version called `getElementById`
 * plus `offsetTop` for all seven sections on every single scroll frame, which
 * forced a layout flush each time.
 */
export default function SideNav() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id)
  const [pill, setPill] = useState(null)

  const nodes = useRef(new Map())
  const registerNode = useCallback((id, node) => {
    if (node) nodes.current.set(id, node)
    else nodes.current.delete(id)
  }, [])

  useEffect(() => {
    let offsets = []
    let measuredFor = -1

    const measure = () => {
      offsets = SECTIONS.map(({ id }) => {
        const element = document.getElementById(id)
        return { id, top: element ? element.offsetTop : Infinity }
      })
    }

    return onScrollFrame(({ scrollY, viewport, documentHeight }) => {
      if (documentHeight !== measuredFor) {
        measure()
        measuredFor = documentHeight
      }

      // Whatever sits under the upper third of the window is what you're
      // reading; the two edge cases stop the first and last entries from being
      // unreachable on short sections.
      if (scrollY <= 40) return setActiveId(SECTIONS[0].id)
      if (scrollY >= documentHeight - viewport - 60) {
        return setActiveId(SECTIONS[SECTIONS.length - 1].id)
      }

      const line = scrollY + viewport * 0.35
      let current = SECTIONS[0].id
      for (const section of offsets) {
        if (section.top <= line) current = section.id
      }
      setActiveId(current)
    })
  }, [])

  // Position the sliding pill. useLayoutEffect so it is never painted at the
  // wrong offset for a frame.
  useLayoutEffect(() => {
    const move = () => {
      const node = nodes.current.get(activeId)
      // Width and height come from the node too, not from CSS — on the mobile
      // bar the links are labelled, so each one is a different width.
      if (node) {
        setPill({
          x: node.offsetLeft,
          y: node.offsetTop,
          width: node.offsetWidth,
          height: node.offsetHeight,
        })
      }
    }
    move()

    window.addEventListener('resize', move)
    return () => window.removeEventListener('resize', move)
  }, [activeId])

  return (
    <nav className="sidenav" aria-label="Sections">
      <div className="sidenav__rail">
        {pill && (
          <span
            className="sidenav__pill"
            style={{
              transform: `translate3d(${pill.x}px, ${pill.y}px, 0)`,
              width: pill.width,
              height: pill.height,
            }}
            aria-hidden="true"
          />
        )}
        {SECTIONS.map((section) => (
          <NavLink
            key={section.id}
            section={section}
            isActive={activeId === section.id}
            registerNode={registerNode}
          />
        ))}
      </div>
    </nav>
  )
}
