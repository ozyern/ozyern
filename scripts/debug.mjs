import { chromium } from 'playwright'

const BASE = process.env.BASE_URL || 'http://localhost:5174/'
const browser = await chromium.launch({ channel: 'msedge' })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const errors = []
page.on('console', (m) => errors.push(`[${m.type()}] ${m.text()}`))
page.on('pageerror', (e) => errors.push(`PAGEERROR: ${e.stack || e.message}`))
page.on('requestfailed', (r) => errors.push(`REQFAIL: ${r.url()} ${r.failure()?.errorText}`))

const response = await page.goto(BASE, { waitUntil: 'load' })
console.log('STATUS:', response?.status(), response?.url())
await page.waitForTimeout(4000)

console.log('ROOT HTML LENGTH:', (await page.locator('#root').innerHTML()).length)
console.log('SECTIONS:', await page.evaluate(() =>
  [...document.querySelectorAll('section[id]')].map((s) => s.id).join(', '),
))
console.log('BODY CLASS:', await page.evaluate(() => document.body.className))
console.log('LOGS:')
for (const line of errors) console.log('  ', line)

await browser.close()
