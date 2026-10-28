import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // The API (and its keys) live in server/; the browser only ever calls /api/chat.
  server: { proxy: { '/api': 'http://localhost:8787' } },
})
