import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss()],
  server: {
    host: true, // allows network access
    port: 5173, // your dev port
    allowedHosts: [
      // 'https://unopposing-magisterial-garnett.ngrok-free.dev'
      'all',
      'momentum-campbell-islands-bible.trycloudflare.com',
      'clause-alternatives-resolution-sierra.trycloudflare.com',
    ]
  },
})
