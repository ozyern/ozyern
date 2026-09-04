import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site is served from a custom domain (about.ozyern.me) at the root, but a
// relative base means the exact same build also works from the github.io
// project path without a second config.
export default defineConfig({
  plugins: [react()],
  base: './',
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'es2020',
    cssMinify: true,
    // The whole site is one route; a separate vendor chunk would only cost an
    // extra request. Inlining small assets saves a few more.
    assetsInlineLimit: 4096,
    reportCompressedSize: false,
  },
  server: {
    port: 5173,
    open: false,
  },
})
