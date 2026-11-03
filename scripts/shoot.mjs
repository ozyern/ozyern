import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE_URL || 'http://localhost:5174/'
const OUT = process.env.OUT_DIR || '/tmp/shots'
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ channel: 'msedge' })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })

const errors = []
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text())
})
page.on('pageerror', (e) => errors.push(`PAGEERROR: ${e.message}`))

await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(3500)

const shots = [
  ['hero', 0],
  ['stats', 1],
  ['experience', 2],
  ['projects', 3],
  ['skills', 4],
  ['about', 5],
  ['contact', 6],
]

for (const [name, index] of shots) {
  const section = page.locator(`#${name === 'hero' ? 'home' : name}`)
  if (await section.count()) {
    await section.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1400)
  }
  await page.screenshot({ path: `${OUT}/${name}.png` })
}

// A close-up of the section heading, to check the word-by-word reveal landed
// and the gradient survived the split.
const about = page.locator('#about')
await about.scrollIntoViewIfNeeded()
await page.waitForTimeout(1600)
await page.screenshot({ path: `${OUT}/about-full.png`, fullPage: false })

const heading = page.locator('.section__heading').first()
if (await heading.count()) {
  await heading.screenshot({ path: `${OUT}/heading.png` })
}

const split = await page.evaluate(() => {
  const word = document.querySelector('.section__title .split__word')
  if (!word) return { found: false }
  const style = getComputedStyle(word)
  const parent = getComputedStyle(word.parentElement)
  return {
    found: true,
    text: word.textContent,
    opacity: style.opacity,
    color: style.color,
    fill: style.webkitTextFillColor,
    backgroundClip: style.backgroundClip || style.webkitBackgroundClip,
    parentBackgroundClip: parent.backgroundClip || parent.webkitBackgroundClip,
    inline: style.display,
  }
})

console.log('SPLIT WORD:', JSON.stringify(split, null, 2))
console.log('ERRORS:', errors.length ? errors : 'none')

await browser.close()
