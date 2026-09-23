// Turns the artifact build into one self-contained page (CSS, JS and images
// inlined) for hosts that need a single file, e.g. a claude.ai artifact.
// Not needed for GitHub Pages.
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist-artifact'
const assets = readdirSync(join(dist, 'assets'))
const read = (ext) =>
  assets
    .filter((f) => f.endsWith(ext))
    .map((f) => readFileSync(join(dist, 'assets', f), 'utf8'))
    .join('\n')

const js = read('.js').replace(/<\/script/gi, '<\\/script')
const css = read('.css')
const page = `<title>Aaron Udho</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet">
<style>${css}</style>
<div id="root"></div>
<script type="module">${js}</script>
`
mkdirSync('dist-single', { recursive: true })
writeFileSync(join('dist-single', 'aaron-udho.html'), page)
console.log(`dist-single/aaron-udho.html  ${(page.length / 1024).toFixed(0)} KB`)
