import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: base must match your GitHub repo name
export default defineConfig({
  plugins: [react()],
  base: '/hetul-portfolio-microapps/'
})