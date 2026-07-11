import { test, expect } from '@playwright/test'
import { PDFDocument } from 'pdf-lib'
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs'
import { readFileSync } from 'node:fs'

const PAGE = 300 // square page → normalised x/y share a scale
const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAEUlEQVR4nGP8z8Dwn4EIwDiqEAAqjQMOQ2Y4XwAAAABJRU5ErkJggg==',
  'base64',
)

async function makePdf(): Promise<Buffer> {
  const pdf = await PDFDocument.create()
  const pg = pdf.addPage([PAGE, PAGE])
  pg.drawImage(await pdf.embedPng(PNG), { x: 100, y: 100, width: 80, height: 80 })
  return Buffer.from(await pdf.save())
}

type M = [number, number, number, number, number, number]
const mul = (m: M, n: M): M => [
  m[0] * n[0] + m[1] * n[2], m[0] * n[1] + m[1] * n[3],
  m[2] * n[0] + m[3] * n[2], m[2] * n[1] + m[3] * n[3],
  m[4] * n[0] + m[5] * n[2] + n[4], m[4] * n[1] + m[5] * n[3] + n[5],
]

/** The CTM at the first painted image, plus how many images the page paints. */
async function imageCtm(bytes: Uint8Array): Promise<{ ctm: M | null; count: number }> {
  const doc = await pdfjs.getDocument({ data: bytes, useWorkerFetch: false, isEvalSupported: false }).promise
  const p = await doc.getPage(1)
  const ops = await p.getOperatorList()
  const OPS = pdfjs.OPS
  let ctm: M = [1, 0, 0, 1, 0, 0]
  const stack: M[] = []
  let hit: M | null = null, count = 0
  for (let i = 0; i < ops.fnArray.length; i++) {
    const fn = ops.fnArray[i], a = ops.argsArray[i] as unknown as M
    if (fn === OPS.save) stack.push([...ctm] as M)
    else if (fn === OPS.restore) ctm = stack.pop() || ctm
    else if (fn === OPS.transform) ctm = mul(a, ctm)
    else if (fn === OPS.paintImageXObject || fn === OPS.paintImageMaskXObject || fn === OPS.paintJpegXObject) {
      count++; if (!hit) hit = [...ctm] as M
    }
  }
  return { ctm: hit, count }
}

test.describe('pdf-edit end-to-end', () => {
  test('nudging an image right moves it right in the exported PDF', async ({ page }) => {
    const original = await makePdf()
    const before = await imageCtm(new Uint8Array(original))
    expect(before.count).toBe(1)

    await page.goto('/en/tools/pdf-edit')
    await page.locator('input[type=file]').setInputFiles({ name: 'test.pdf', mimeType: 'application/pdf', buffer: original })

    const img = page.getByTestId('edit-obj-image').first()
    await expect(img).toBeVisible({ timeout: 15_000 })
    await img.click()
    const STEPS = 10
    for (let i = 0; i < STEPS; i++) await page.keyboard.press('ArrowRight')

    await page.getByTestId('edit-export').click()
    const dl = page.waitForEvent('download')
    await page.getByTestId('edit-download').click()
    const editedBytes = new Uint8Array(readFileSync(await (await dl).path()))

    const after = await imageCtm(editedBytes)
    expect(after.count).toBe(1) // still one image, not deleted
    expect(after.ctm).not.toBeNull()

    // 10 nudges × 0.004 × 300pt = 12pt to the RIGHT; y unchanged; size unchanged.
    const expectedDx = STEPS * 0.004 * PAGE
    expect(after.ctm![4] - before.ctm![4]).toBeCloseTo(expectedDx, 0)
    expect(after.ctm![5]).toBeCloseTo(before.ctm![5], 0)   // no vertical move
    expect(after.ctm![0]).toBeCloseTo(before.ctm![0], 1)   // width unchanged
  })

  test('growing an image scales it in the exported PDF', async ({ page }) => {
    const original = await makePdf()
    const before = await imageCtm(new Uint8Array(original))
    await page.goto('/en/tools/pdf-edit')
    await page.locator('input[type=file]').setInputFiles({ name: 'test.pdf', mimeType: 'application/pdf', buffer: original })
    const img = page.getByTestId('edit-obj-image').first()
    await expect(img).toBeVisible({ timeout: 15_000 })
    await img.click()
    const N = 4
    for (let i = 0; i < N; i++) await page.keyboard.press('=') // grow ×1.0526 each
    await page.getByTestId('edit-export').click()
    const dl = page.waitForEvent('download')
    await page.getByTestId('edit-download').click()
    const editedBytes = new Uint8Array(readFileSync(await (await dl).path()))
    const after = await imageCtm(editedBytes)
    expect(after.count).toBe(1)
    expect(after.ctm![0] / before.ctm![0]).toBeCloseTo(1.0526 ** N, 1) // width scaled up
  })

  test('deleting an image removes it from the exported PDF', async ({ page }) => {
    const original = await makePdf()
    await page.goto('/en/tools/pdf-edit')
    await page.locator('input[type=file]').setInputFiles({ name: 'test.pdf', mimeType: 'application/pdf', buffer: original })
    const img = page.getByTestId('edit-obj-image').first()
    await expect(img).toBeVisible({ timeout: 15_000 })
    await img.click()
    await page.keyboard.press('Delete')
    await page.getByTestId('edit-export').click()
    const dl = page.waitForEvent('download')
    await page.getByTestId('edit-download').click()
    const editedBytes = new Uint8Array(readFileSync(await (await dl).path()))
    const after = await imageCtm(editedBytes)
    expect(after.count).toBe(0) // image gone
  })
})
