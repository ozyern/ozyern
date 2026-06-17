import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change '/ozi-portfolio/' to match your exact GitHub repo name
// e.g. if your repo is github.com/ozyern/about.ozyern.me → base: '/about.ozyern.me/'
export default defineConfig({
  plugins: [react()],
  base: '/ozi-portfolio/',
})
