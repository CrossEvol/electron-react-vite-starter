## What

the project structure is decided by [electron-vite-react](https://github.com/electron-vite/electron-vite-react) <br/>
use the [drizzle-orm](https://orm.drizzle.team/) to interact with the sqlite <br/>
can run the [hono-server](https://hono.dev/docs/) in the service_workers <br/>
authorization and authentication by [better-auth](https://www.better-auth.com/)<br/>
use [scalar](https://scalar.com/) to expose auth-related endpoints [better-auth with openapi](https://www.better-auth.com/docs/plugins/open-api)<br/>


## Getting Started

### Prepare
you should copy the .env.example to .env before you start.

### Install

Install dependencies.

```bash
pnpm install
```

before run , should initialize the drizzle-orm

```bash
pnpm run db:gen
pnpm run db:migrate
```

other drizzle commands you can call are

```bash
pnpm run db:push 
pnpm run db:pull
pnpm run db:export
pnpm run db:check
pnpm run db:up
pnpm run db:studio
```

This project includes a backend server built with Hono that runs in a service worker. You can start this server for development with the following command:

```bash
pnpm run hono:dev
```

This server exposes an OpenAPI endpoint. You can generate the client-side schemas from this endpoint by running:

```bash
pnpm run openapi:gen
```

This will populate the `src\schemas` directory with the generated schemas.

To start the main application development server, run:

```bash
pnpm run dev
```

### Lint

```bash
pnpm run lint
```

### Build

```bash
pnpm run build
```

### Test

```bash
pnpm run test
```

View and interact with your tests via UI.

```bash
pnpm run test:ui
```

## References

[integrate-hono-with-openapi](https://dev.to/bimaadi/integrate-hono-with-openapiswagger-3dem) <br/>
[create-a-monorepo-using-pnpm-workspace](https://dev.to/vinomanick/create-a-monorepo-using-pnpm-workspace-1ebn) <br/>
[managing-full-stack-monorepo-pnpm](https://blog.logrocket.com/managing-full-stack-monorepo-pnpm/#create-root-project) <br/>
[pnpm-workspace-examples](https://github.com/ashleydavis/pnpm-workspace-examples) <br/>

## Q & A

### pnpm workspace

rename the `pnpm-workspace.yaml.example` to `pnpm-workspace.yaml` <br/>
in `package.json` , <br/>
rewrite `"reset": "rm -rf ./node_modules/better-sqlite3 && npm install better-sqlite3",` <br/>
to `"reset": "rm -rf ./node_modules/better-sqlite3 && rm -rf ./node_modules/.pnpm/better-sqlite3@11.1.2 && pnpm install -w better-sqlite3",` <br/>
then you can use `pnpm --filter ${sub-app-name}` to control them in root

### run in service_worker

`vite.config.ts`

```ts
build: {
    sourcemap,
    minify: isBuild,
    outDir: 'dist-electron/main',
    rollupOptions: {
        external: Object.keys(
            'dependencies' in pkg
                ? pkg.dependencies
                : {}
        ),
        input: {
            index: 'electron/main/index.ts',
            'worker':
                'electron/main/worker.ts',
        }
    },
},
```

`run-worker`

```ts
import path from 'node:path'
import { Worker } from 'node:worker_threads'

export const startScheduleWorker = () => {
  const worker = new Worker(path.resolve(__dirname, 'worker.js'))

  worker.on('message', (message) => {})
  worker.on('error', (err) => {
    console.error('Worker thread error:', err)
  })
  worker.on('exit', (code) => {
    if (code !== 0) console.error(`Worker stopped with exit code ${code}`)
  })
}
```
