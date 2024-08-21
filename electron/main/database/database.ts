import Database from 'better-sqlite3'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { join } from 'node:path'
import { isDev } from '../util/electron.util'
import { ProjectsTable, UsersTable } from './schema'

const databasePath = 'sqlite.db'

const sqlite = new Database(
  isDev() ? databasePath : join(process.resourcesPath, databasePath)
)
const db = drizzle(sqlite, { logger: true })

export const getUserWithProjects = async () => {
  const result = db
    .select()
    .from(UsersTable)
    .leftJoin(ProjectsTable, eq(UsersTable.id, ProjectsTable.ownerId))
    .offset(0)
    .all()

  return { ...result[0].users, projects: result.map((e) => e.projects) }
}
