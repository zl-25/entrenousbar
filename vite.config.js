import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    basicSsl()
  ],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/uploads': {
        target: 'http://localhost:3000',
        changeOrigin: true
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

