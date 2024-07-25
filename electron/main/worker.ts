import { serve } from '@hono/node-server'
import app from './hono.app'
import { findFreePort } from './util/net.util'

;(async () => {
    const port = await findFreePort(3000, 8000)

    console.log(`Server is running on port ${port}`)

    serve({
        fetch: app.fetch,
        port,
    })
})()
