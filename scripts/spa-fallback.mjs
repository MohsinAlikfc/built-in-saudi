// Post-build step for GitHub Pages hosting of this SPA.
//
// 1. SPA fallback: copy index.html → 404.html so genuinely unknown paths still
//    boot the app (React Router then renders the 404 page).
// 2. Prerender: emit a real 200-status HTML shell at dist/tools/<id>/index.html
//    for every routable tool, so individual tool pages are crawlable/indexable
//    (a bare 404.html fallback returns HTTP 404, which search engines skip).
//
// Routable tools are auto-discovered: each real tool is a folder under
// src/tools/ containing a meta.ts. Coming-soon tools live inline in index.ts
// (no folder) and are correctly excluded — so adding a tool needs no change here.
import {
  copyFileSync, existsSync, mkdirSync, readdirSync, statSync,
} from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const indexHtml = join(dist, 'index.html')

if (!existsSync(indexHtml)) {
  console.error(`spa-fallback: ${indexHtml} not found — did the Vite build run?`)
  process.exit(1)
}

// 1. SPA fallback
copyFileSync(indexHtml, join(dist, '404.html'))
console.log('spa-fallback: created dist/404.html')

// 2. Per-tool prerendered shells
const toolsDir = 'src/tools'
const slugs = readdirSync(toolsDir).filter((name) => {
  const p = join(toolsDir, name)
  return statSync(p).isDirectory() && existsSync(join(p, 'meta.ts'))
})

for (const slug of slugs) {
  const dir = join(dist, 'tools', slug)
  mkdirSync(dir, { recursive: true })
  copyFileSync(indexHtml, join(dir, 'index.html'))
  console.log(`spa-fallback: prerendered dist/tools/${slug}/index.html`)
}
