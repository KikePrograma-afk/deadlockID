import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/deadlockID/', // Asegúrate que el nombre coincide exactamente con tu repo
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
