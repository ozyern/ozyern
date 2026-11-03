import { Children, cloneElement, isValidElement } from 'react'

/**
 * Breaks a heading into words so that each one can arrive on its own beat.
 *
 * The headings used to fade in as a single block, which is the one animation
 * every site has and the one that says the least. Splitting the words lets
 * the line build itself — the accent word lands last.
 *
 * Two details make this safe to use with real markup:
 *
 *  1. Elements are kept, not flattened. A heading like `Things I've
 *     <em>actually shipped</em>` keeps its <em>, so the stylesheet can still
 *     reach in and colour it. Only the text inside is broken up.
 *
 *  2. The whitespace between words is preserved as real text nodes, so the
 *     line can still wrap where it used to. Words are inline-block, which is
 *     what lets them be transformed, and an inline-block between two words
 *     still breaks the line normally.
 */
/**
 * Tags that may not be given children. React throws if you hand a <br> an
 * empty array, and a heading that contains line breaks has to keep them.
 */
const VOID_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
])

function buildWords(children, state) {
  const nodes = []

  for (const child of Children.toArray(children)) {
    if (child === null || child === undefined || typeof child === 'boolean') continue

    if (typeof child === 'string' || typeof child === 'number') {
      // Split on the spaces but keep them, so the words stay separable.
      for (const part of String(child).split(/(\s+)/)) {
        if (!part) continue

        if (/^\s+$/.test(part)) {
          nodes.push(' ')
          continue
        }

        const index = state.index++
        nodes.push(
          <span
            key={`word-${index}`}
            className="split__word"
            style={{ '--word-index': index }}
          >
            {part}
          </span>,
        )
      }
      continue
    }

    if (isValidElement(child)) {
      if (typeof child.type === 'string' && VOID_TAGS.has(child.type)) {
        // A line break is a line break; there is nothing inside it to split.
        nodes.push(cloneElement(child, { key: `node-${state.index}` }))
        continue
      }

      nodes.push(
        cloneElement(
          child,
          { key: `node-${state.index}` },
          buildWords(child.props.children, state),
        ),
      )
      continue
    }

    nodes.push(child)
  }

  return nodes
}

export default function SplitText({ children, visible = false, className = '' }) {
  const state = { index: 0 }
  const words = buildWords(children, state)

  return (
    <span className={`split${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}>
      {words}
    </span>
  )
}
