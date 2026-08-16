/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Claxed',
      formats: ['es', 'cjs'],
      fileName: (format) =>
        format === 'es' ? 'claxed.esm.js' : 'claxed.cjs.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
  plugins: [
    dts({
      include: ['src/**/*.ts'],
    }),
  ],
  test: {
    include: [
      '__tests__/**/*.{test,spec}.{ts,tsx,js,jsx}',
      '__tests__/**/*.tsx',
    ],
    environment: 'jsdom',
    globals: true,
  },
});
