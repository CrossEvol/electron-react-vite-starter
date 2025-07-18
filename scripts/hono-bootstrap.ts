import { serve } from '@hono/node-server'
import app from 'electron/main/hono-server/hono.app'

serve(
  {
    fetch: app.fetch,
    port: 8080,
    hostname: '127.0.0.1',
  },
  (addressInfo) => {
    console.log(
      `Server is running at http://${addressInfo.address}:${addressInfo.port}`,
    )
  },
)
