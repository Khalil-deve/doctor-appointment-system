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
      '/api/auth/register': 'http://localhost:5000',
      '/api/auth/login': 'http://localhost:5000',
      '/api/doctors': 'http://localhost:5000',
      '/api/doctors/register/:doctorId': 'http://localhost:5000',
      '/api': 'http://localhost:5000',
      '/api/appointments/:id': 'http://localhost:5000',
      // '/Auth/forgot-password': 'http://localhost:3000',
      // '/Auth/reset-password/:token': 'http://localhost:3000',
      // '/dash/expenses': 'http://localhost:3000',
      // '/dash/incomes': 'http://localhost:3000',
      // '/dash/expense/:id': 'http://localhost:3000',
      // '/dash/incomes/:id': 'http://localhost:3000',
    }
  }
})
