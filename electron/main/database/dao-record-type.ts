import { drizzle } from 'drizzle-orm/libsql'
import { comments, posts } from './schema/default-schema'

const _getPost = async (db: ReturnType<typeof drizzle>) => {
  return await db.select().from(posts).get()
}

export type PostRecord = Awaited<ReturnType<typeof _getPost>>

const _getComment = (db: ReturnType<typeof drizzle>) => {
  return db.select().from(comments).get()
}

export type CommentRecord = Awaited<ReturnType<typeof _getComment>>

export type PostWithCommentsSchema = PostRecord & {
  comments: CommentRecord[]
}
