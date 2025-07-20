import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title'),
  content: text('content')
})

export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey(),
  text: text('text'),
  postId: integer('post_id')
    .notNull()
    .references(() => posts.id)
})
