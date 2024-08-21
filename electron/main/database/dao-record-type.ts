import { drizzle } from 'drizzle-orm/better-sqlite3'
import { ProjectsTable, UsersTable } from './schema'

const getUser = (db: ReturnType<typeof drizzle>) => {
  return db.select().from(UsersTable).get()
}

export type UserRecord = ReturnType<typeof getUser>

const getProject = (db: ReturnType<typeof drizzle>) => {
  return db.select().from(ProjectsTable).get()
}

export type ProjectRecord = ReturnType<typeof getProject>
