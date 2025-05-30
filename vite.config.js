import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/real-estate-calc/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
