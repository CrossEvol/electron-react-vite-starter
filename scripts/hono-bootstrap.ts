import { serve } from '@hono/node-server'
import { createHonoApp } from 'electron/main/hono-server/hono.app'

const app = createHonoApp('http://localhost:8080')

serve(
  {
    fetch: app.fetch,
    port: 8080,
    hostname: '127.0.0.1'
  },
  (addressInfo) => {
    console.log(
      `Server is running at http://${addressInfo.address}:${addressInfo.port}`
    )
  }
)
