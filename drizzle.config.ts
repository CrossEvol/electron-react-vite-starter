import type { Config } from 'drizzle-kit'

export default {
  schema: './electron/main/database/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'durable-sqlite',
  dbCredentials: {
    url: './sqlite.db'
  }
} satisfies Config
