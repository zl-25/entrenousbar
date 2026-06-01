import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      '/api/maketou': {
        target: 'https://api.maketou.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/maketou/, ''),
        secure: true,
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('jspdf') || id.includes('html2canvas')) {
            return 'pdf-export';
          }
          if (id.includes('qrcode')) {
            return 'qr-code';
          }
          if (id.includes('zod') || id.includes('react-hook-form')) {
            return 'form-validation';
          }
          if (id.includes('react-router-dom')) {
            return 'router';
          }
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
})

