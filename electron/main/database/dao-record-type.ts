import { drizzle } from 'drizzle-orm/libsql'
import { ProjectsTable, UsersTable } from './schema'

const _getUser = (db: ReturnType<typeof drizzle>) => {
  return db.select().from(UsersTable).get()
}

export type UserRecord = ReturnType<typeof _getUser>

const _getProject = (db: ReturnType<typeof drizzle>) => {
  return db.select().from(ProjectsTable).get()
}

export type ProjectRecord = ReturnType<typeof _getProject>
