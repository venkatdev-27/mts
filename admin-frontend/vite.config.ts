import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],

  server: {
    port: 5174, // dev only
    strictPort: true,
  },

  build: {
    outDir: 'dist',
    sourcemap: false, // disable in production
    target: 'es2017',
  },

  preview: {
    port: 4174, // for `vite preview`
    strictPort: true,
  },
}));
