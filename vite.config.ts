import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain (built-in-saudi.com) serves from the root, so base is '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    target: 'es2020',
    sourcemap: false,
  },
})
