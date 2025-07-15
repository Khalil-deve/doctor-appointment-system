import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api/auth/register': 'https://doctor-appointment-system-sage-psi.vercel.app',
      '/api/auth/login': 'https://doctor-appointment-system-sage-psi.vercel.app',
      '/api/doctors': 'https://doctor-appointment-system-sage-psi.vercel.app',
      '/api/doctors/register/:doctorId': 'https://doctor-appointment-system-sage-psi.vercel.app',
      '/api': 'https://doctor-appointment-system-sage-psi.vercel.app',
      '/api/appointments/:id': 'https://doctor-appointment-system-sage-psi.vercel.app',
    }
  }
})
