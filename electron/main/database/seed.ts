import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { ProjectsTable, UsersTable } from './schema'

export const seed = (db: BetterSQLite3Database<Record<string, never>>) => {
  const res = db
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
        ownerId: userId as number
      }))
    )
    .run()
}
