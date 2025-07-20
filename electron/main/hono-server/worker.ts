import { serve } from '@hono/node-server'
import { parentPort } from 'worker_threads'
import { findFreePort } from '../util/net.util'
import { createHonoApp } from './hono.app'
;(async () => {
  const port = await findFreePort(3000, 8000)
  const baseURL = `http://localhost:${port}`
  const app = createHonoApp(baseURL)

  console.log(`Server is running on port ${port}`)

  serve({
    fetch: app.fetch,
    port
  })

  parentPort?.postMessage({ port })
})()
