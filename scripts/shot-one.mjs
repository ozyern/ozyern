import { chromium } from 'playwright'

const BASE = process.env.BASE_URL || 'http://localhost:5174/'
const browser = await chromium.launch({ channel: 'msedge' })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(3000)

const target = process.env.TARGET || '#about'
const mode = process.env.MODE || 'section'

if (mode === 'section') {
  const box = await page.locator(target).boundingBox()
  await page.evaluate(({ y }) => window.scrollTo(0, y), { y: box.y + box.height - 900 })
  await page.waitForTimeout(1600)
  await page.screenshot({ path: '/tmp/shots/target.png' })
} else {
  const index = Number(process.env.INDEX || 0)
  const locator = page.locator(target)
  await locator.nth(index).scrollIntoViewIfNeeded()
  await page.waitForTimeout(1600)
  await page.screenshot({ path: '/tmp/shots/target.png' })
}

await browser.close()
