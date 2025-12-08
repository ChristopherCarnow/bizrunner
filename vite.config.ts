import { defineConfig } from 'vite';

export default defineConfig({
  // No plugins needed for static HTML
  base: './',
  build: {
    outDir: 'dist'
  }
});