import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain (about.ozyern.me) serves from the root, but using relative base allows both custom domain and github.io path to work perfectly.
export default defineConfig({
  plugins: [react()],
  base: './',
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  }
})
