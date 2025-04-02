import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      '327e9f45-5481-4aad-b5a3-2307333bd1f5-00-34s3kj4lpf2ac.riker.replit.dev',
      '.replit.dev'
    ]
  }
})