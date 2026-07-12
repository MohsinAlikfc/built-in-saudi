// Shared client-side PDF rasteriser for the interactive PDF tools (sign / fill /
// edit). Renders each page to a PNG data URL *and* reports the page's size in PDF
// points (getViewport scale 1 === points at 72dpi), which the tools need to map
// on-screen placements back to pdf-lib coordinates on export. Heavy (pdf.js), so
// lazy-import. With `extract`, it also pulls each image's real bitmap (with alpha)
// so the editor can show the actual image, not a crop of the page raster.
import * as pdfjs from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl

/** A real embedded image, cleanly extracted (transparent PNG) + its on-page rect. */
export interface PageImage { x: number; y: number; w: number; h: number; url: string }

export interface RenderedPage {
  url: string
  /** Page width/height in PDF points (origin bottom-left in the actual PDF). */
  wPt: number
  hPt: number
  images?: PageImage[]
}

type M = [number, number, number, number, number, number]
const mmul = (m: M, n: M): M => [
  m[0] * n[0] + m[1] * n[2], m[0] * n[1] + m[1] * n[3],
  m[2] * n[0] + m[3] * n[2], m[2] * n[1] + m[3] * n[3],
  m[4] * n[0] + m[5] * n[2] + n[4], m[4] * n[1] + m[5] * n[3] + n[5],
]

const MAX_EDGE = 700 // miniature cap for extracted image bitmaps

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function bitmapOf(page: any, id: string): any {
  try { return page.objs.get(id) } catch { /* not ready */ }
  return null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractPageImages(page: any, ops: any, wPt: number, hPt: number): PageImage[] {
  const OPS = pdfjs.OPS
  const out: PageImage[] = []
  let ctm: M = [1, 0, 0, 1, 0, 0]
  const stack: M[] = []
  for (let i = 0; i < ops.fnArray.length; i++) {
    const fn = ops.fnArray[i], a = ops.argsArray[i]
    if (fn === OPS.save) stack.push([...ctm] as M)
    else if (fn === OPS.restore) ctm = stack.pop() || ctm
    else if (fn === OPS.transform) ctm = mmul(a as M, ctm)
    else if (fn === OPS.paintImageXObject) {
      const [aa, , , dd, ee, ff] = ctm
      const obj = bitmapOf(page, a[0])
      const bmp = obj?.bitmap
      if (!bmp) continue
      try {
        const s = Math.min(1, MAX_EDGE / Math.max(bmp.width, bmp.height))
        const cw = Math.max(1, Math.round(bmp.width * s)), ch = Math.max(1, Math.round(bmp.height * s))
        const c = document.createElement('canvas'); c.width = cw; c.height = ch
        const x = c.getContext('2d'); if (!x) continue
        x.drawImage(bmp, 0, 0, cw, ch)
        out.push({
          x: Math.min(ee, ee + aa) / wPt, y: 1 - Math.max(ff, ff + dd) / hPt,
          w: Math.abs(aa) / wPt, h: Math.abs(dd) / hPt, url: c.toDataURL('image/png'),
        })
      } catch { /* skip this image */ }
    }
  }
  return out
}

/** Rasterise every page. `scale` trades sharpness for memory (2 ≈ crisp on retina). */
export async function renderPdf(data: ArrayBuffer, scale = 2, extract = false): Promise<RenderedPage[]> {
  const doc = await pdfjs.getDocument({ data }).promise
  const out: RenderedPage[] = []
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i)
    const pts = page.getViewport({ scale: 1 })
    const vp = page.getViewport({ scale })
    const canvas = document.createElement('canvas')
    canvas.width = Math.ceil(vp.width)
    canvas.height = Math.ceil(vp.height)
    const ctx = canvas.getContext('2d')
    if (!ctx) continue
    await page.render({ canvas, canvasContext: ctx, viewport: vp }).promise
    let images: PageImage[] | undefined
    if (extract) {
      try { images = extractPageImages(page, await page.getOperatorList(), pts.width, pts.height) } catch { /* ignore */ }
    }
    out.push({ url: canvas.toDataURL('image/png'), wPt: pts.width, hPt: pts.height, images })
  }
  return out
}
