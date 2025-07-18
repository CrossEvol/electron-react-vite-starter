import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { migrate } from 'drizzle-orm/libsql/migrator'
import { seed } from 'electron/main/database/seed'

const client = createClient({ url: 'file:sqlite.db' })
const db = drizzle(client)

// this will automatically run needed migrations on the database
migrate(db, { migrationsFolder: './drizzle' })

seed(db)
