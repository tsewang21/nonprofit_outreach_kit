import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/nonprofit_outreach_kit/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
