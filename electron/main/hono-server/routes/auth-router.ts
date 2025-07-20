import { OpenAPIHono } from '@hono/zod-openapi'
import type { AuthType } from '../../lib/auth'
import { createBetterAuthMiddleware } from '../../lib/auth'

export const createAuthRouter = (baseURL: string) => {
  const router = new OpenAPIHono<{ Bindings: AuthType }>({
    strict: false
  })

  const auth = createBetterAuthMiddleware(baseURL)

  router.post('/sign-in/email', (c) => {
    console.log('Email login request received')
    return auth.handler(c.req.raw)
  })

  router.post('/sign-up/email', (c) => {
    console.log('Email registration request received')
    return auth.handler(c.req.raw)
  })

  router.post('/sign-out', (c) => {
    console.log('Logout request received')
    return auth.handler(c.req.raw)
  })

  router.get('/get-session', (c) => {
    console.log('Session request received')
    return auth.handler(c.req.raw)
  })

  router.get('/ok', (c) => {
    console.log('OK request received')
    return auth.handler(c.req.raw)
  })

  router.get('/error', (c) => {
    console.log('OK request received')
    return auth.handler(c.req.raw)
  })

  router.get('/reference', async (c) => {
    console.log('Reference request received')
    // This route is used to reference the auth handler in the OpenAPI documentation
    // It does not perform any authentication or authorization checks
    return auth.handler(c.req.raw)
  })

  router.get('/doc', async (c) => {
    return c.json(await auth.api.generateOpenAPISchema())
  })

  return router
}
