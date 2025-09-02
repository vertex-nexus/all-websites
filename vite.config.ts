import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  preview: {
    host: true, // Allow external access
    port: 4173,  // Your preview port
    allowedHosts: [
      "vertex.skaya.org", // Allow www subdomain
    ],
  },
  plugins: [react()],
})
