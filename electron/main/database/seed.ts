import { LibSQLDatabase } from 'drizzle-orm/libsql'
import { ProjectsTable, UsersTable } from './schema'

export const seed = async (db: LibSQLDatabase<Record<string, never>>) => {
  const res = await db
    .insert(UsersTable)
    .values([
      {
        fullName: 'User_' + Date.now().toString()
      }
    ])
    .run()

  const userId = res.lastInsertRowid

  db.insert(ProjectsTable)
    .values(
      Array.from({ length: 3 }).map((_, idx) => ({
        name: `Project_${idx + 1}`,
        ownerId: userId as unknown as number
      }))
    )
    .run()
}
