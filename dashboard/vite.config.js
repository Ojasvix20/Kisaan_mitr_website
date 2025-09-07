// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Kisaan_mitr_website/', // <-- This must match your repo name exactly!
  plugins: [react()],
})