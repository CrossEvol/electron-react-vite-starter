import { createClient } from '@libsql/client'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/libsql'
import { join } from 'node:path'
import { isDev } from '../util/electron.util'
import { ProjectsTable, UsersTable } from './schema'

const databasePath = 'file:sqlite.db'
const resourcesPath = `file:${join(process.resourcesPath, 'sqlite.db')}`

const client = createClient({
  url: isDev() ? databasePath : resourcesPath
})
const db = drizzle(client, { logger: true })

export const getUserWithProjects = async () => {
  const result = await db
    .select()
    .from(UsersTable)
    .leftJoin(ProjectsTable, eq(UsersTable.id, ProjectsTable.ownerId))
    .offset(0)
    .all()

  return { ...result[0].users, projects: result.map((e) => e.projects) }
}
