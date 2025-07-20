import 'dotenv/config'
import { LibSQLDatabase } from 'drizzle-orm/libsql'
import { comments, posts } from './schema'

async function seed(db: LibSQLDatabase<Record<string, never>>) {
  console.log('开始为 posts 和 comments 表添加种子数据...')

  // 清空现有数据（可选，但对于种子脚本通常很有用）
  await db.delete(comments)
  await db.delete(posts)
  console.log('已清空 posts 和 comments 表。')

  // 插入 posts 数据
  const insertedPosts = await db
    .insert(posts)
    .values([
      {
        id: 1,
        title: '我的第一篇文章',
        content: '这是关于我的第一篇文章的内容。'
      },
      {
        id: 2,
        title: 'Hono 和 Drizzle ORM',
        content: '探索 Hono 框架与 Drizzle ORM 的集成。'
      },
      {
        id: 3,
        title: '数据库迁移指南',
        content: '一步步教你如何进行数据库迁移。'
      }
    ])
    .returning()
  console.log('已插入 posts 数据:', insertedPosts.length, '条记录。')

  // 插入 comments 数据，关联到 posts
  await db.insert(comments).values([
    { id: 101, text: '很棒的文章！', postId: 1 },
    { id: 102, text: '期待更多内容。', postId: 1 },
    { id: 103, text: 'Drizzle ORM 真的很好用。', postId: 2 },
    { id: 104, text: '感谢分享！', postId: 3 }
  ])
  console.log('已插入 comments 数据。')

  console.log('种子脚本执行完毕。')
}

export { seed }
