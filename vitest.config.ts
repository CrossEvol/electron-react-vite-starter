/// <reference types="vitest" />

import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    exclude: ['**/node_modules/**', '**/dist/**', '**/coverage/**', 'e2e/**'],
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts']
  }
})
