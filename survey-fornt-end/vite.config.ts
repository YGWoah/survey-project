import { defineConfig } from 'vite';
import path from 'path';
// import { ResolveFn } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src'),
      '@/': path.resolve(__dirname, './'),
    },
  },
});
