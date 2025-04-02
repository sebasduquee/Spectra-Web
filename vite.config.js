import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Detectar si estamos en el entorno de Replit
const isReplit = process.env.REPL_ID !== undefined || 
                 process.env.REPL_SLUG !== undefined

export default defineConfig({
  plugins: [react()],
  server: {
    // Solo usar 0.0.0.0 en Replit, de lo contrario usar localhost
    host: isReplit ? '0.0.0.0' : 'localhost',
    port: 3000,
    // Solo aplicar allowedHosts si estamos en Replit
    ...(isReplit && {
      allowedHosts: [
        '327e9f45-5481-4aad-b5a3-2307333bd1f5-00-34s3kj4lpf2ac.riker.replit.dev',
        '.replit.dev'
      ]
    })
  }
})