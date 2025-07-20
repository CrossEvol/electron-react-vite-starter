import * as z from 'zod'

export const PostSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  content: z.string().nullable()
})

export type Post = z.infer<typeof PostSchema>

export const CommentSchema = z.object({
  id: z.number(),
  text: z.string().nullable(),
  postId: z.number()
})

export type Comment = z.infer<typeof CommentSchema>

export const PostWithCommentsSchema = PostSchema.extend({
  comments: z.array(CommentSchema.nullable())
})

export type PostWithComments = z.infer<typeof PostWithCommentsSchema>
