import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: ['**/db.json'] // این خط می‌گوید تغییرات db.json را نادیده بگیر
    }
  },
  build: {
    chunkSizeWarningLimit: 1000
  },
   
})
