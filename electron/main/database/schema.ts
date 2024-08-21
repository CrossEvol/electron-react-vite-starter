import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const UsersTable = sqliteTable('users', {
  id: integer('id').primaryKey(), // 'id' is the column name
  fullName: text('full_name').notNull().default('')
})

export const ProjectsTable = sqliteTable('projects', {
  id: integer('id').primaryKey(), // 'id' is the column name
  name: text('name').notNull().default(''),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  ownerId: integer('owner_id')
    .notNull()
    .references(() => UsersTable.id)
})
