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

export const insertUserWithProject = async () => {
    const res = db
        .insert(UsersTable)
        .values([
            {
                fullName: 'User_' + Date.now().toString(),
            },
        ])
        .run()

    const userId = res.lastInsertRowid

    db.insert(ProjectsTable)
        .values([
            {
                name: 'Project_' + Date.now().toString(),
                ownerId: userId as number,
            },
        ])
        .run()

    const allUsersAndProjects = db
        .select()
        .from(UsersTable)
        .leftJoin(ProjectsTable, eq(UsersTable.id, ProjectsTable.ownerId))
        .all()

    console.log(allUsersAndProjects)
    return allUsersAndProjects
}
