import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // For https://u0822444-e.github.io/solea/
  base: '/solea/',
})
