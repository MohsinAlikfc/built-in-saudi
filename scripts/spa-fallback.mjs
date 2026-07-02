// GitHub Pages serves 404.html for any unknown path. By copying the built
// index.html to 404.html, deep links (e.g. /tools/qr-code) boot the SPA and
// React Router takes over — giving clean URLs without a server.
import { copyFileSync, existsSync } from 'node:fs'

const src = 'dist/index.html'
const dest = 'dist/404.html'

if (!existsSync(src)) {
  console.error(`spa-fallback: ${src} not found — did the Vite build run?`)
  process.exit(1)
}

copyFileSync(src, dest)
console.log(`spa-fallback: created ${dest} from ${src}`)
