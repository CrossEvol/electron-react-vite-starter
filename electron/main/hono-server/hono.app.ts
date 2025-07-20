import { swaggerUI } from '@hono/swagger-ui'
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { getPostsWithComments } from '../database/database'
import { PostWithCommentsSchema } from './api-schema'

const app = new OpenAPIHono()

app.use('*', async (c, next) => {
  const corsMiddlewareHandler = cors({
    origin: '*'
  })
  return corsMiddlewareHandler(c, next)
})

app.openapi(
  createRoute({
    method: 'get',
    path: '/hello',
    responses: {
      200: {
        description: 'Respond a message',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string()
            })
          }
        }
      }
    }
  }),
  (c) => {
    return c.json({
      message: 'hello'
    })
  }
)

app.openapi(
  createRoute({
    method: 'get',
    path: '/posts',
    responses: {
      200: {
        description: 'Retrieve all posts with their comments',
        content: {
          'application/json': {
            schema: z.object({
              data: z.array(PostWithCommentsSchema)
            })
          }
        }
      }
    }
  }),
  async (c) => {
    const posts = await getPostsWithComments()
    return c.json({ data: posts })
  }
)

app.get(
  '/ui',
  swaggerUI({
    url: '/doc'
  })
)

app.doc('/doc', {
  info: {
    title: 'An API',
    version: 'v1'
  },
  openapi: '3.1.0'
})

// Export the Hono app
export default app
