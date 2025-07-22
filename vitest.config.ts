/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['**/node_modules/**', '**/dist/**', '**/coverage/**', 'e2e/**'],
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts']
  }
})
