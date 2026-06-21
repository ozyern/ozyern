import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain (about.ozyern.me) serves from the root, so base MUST be '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
