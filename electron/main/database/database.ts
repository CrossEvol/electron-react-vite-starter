import { createClient } from '@libsql/client'
import 'dotenv/config' // 导入 dotenv/config 以加载环境变量
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/libsql'
import { join } from 'path'
import { isDev } from '../util/electron.util'
import { PostWithCommentsSchema } from './dao-record-type'
import { comments, posts } from './schema' // 导入 posts 和 comments 表

const databasePath = 'file:sqlite.db'
const resourcesPath = `file:${join(process.resourcesPath ?? '', 'sqlite.db')}`

const client = createClient({
  url: isDev() ? databasePath : resourcesPath
})
export const db = drizzle(client, { logger: true }) // 使用 libsql 客户端初始化 drizzle，并传入 schema

export const getPostsWithComments = async () => {
  const rows = await db
    .select()
    .from(posts)
    .leftJoin(comments, eq(posts.id, comments.postId))
    .all()

  const result = rows.reduce<Record<number, PostWithCommentsSchema>>(
    (acc, row) => {
      const post = row.posts
      const comment = row.comments
      if (!acc[post.id]) {
        acc[post.id] = { ...post, comments: [] }
      }
      if (comment?.postId === post.id) {
        // 确保 comment 存在且关联到当前 post
        acc[post.id].comments.push(comment)
      }
      return acc
    },
    {}
  )

  return Object.values(result)
}
