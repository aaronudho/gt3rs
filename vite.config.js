import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps every path relative, so the same build works at
// https://<you>.github.io/<repo>/ (GitHub Pages) or any other static host.
//
//   npm run build           -> dist/           (the website; GitHub Actions publishes this)
//   npm run build:artifact  -> dist-artifact/  (everything inlined into one file)
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: './',
  build:
    mode === 'artifact'
      ? {
          outDir: 'dist-artifact',
          assetsInlineLimit: 100_000_000,
          cssCodeSplit: false,
          modulePreload: { polyfill: false },
          copyPublicDir: false,
          chunkSizeWarningLimit: 8000,
        }
      : {
          outDir: 'dist',
          chunkSizeWarningLimit: 1500,
        },
}))
