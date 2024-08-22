## What

the project structure is decided by [electron-vite-react](https://github.com/electron-vite/electron-vite-react) <br/>
use the [block-note](https://github.com/TypeCellOS/BlockNote) as the rich-text-editor. <br/>
use the [drizzle-orm](https://orm.drizzle.team/) to interact with the sqlite <br/>
can run the [hono-server](https://hono.dev/docs/) in the service_workers(the author is too lazy to migrate) <br/>

## Getting Started

### Install

Install dependencies.

```bash
npm install
```

before run , should initialize the drizzle-orm

```bash
npm run generate
npm run migrate
npm run rebuild
```

should rebuild better-sqlite3 before run app,  <br/>
if you want to restore the better-sqlite3, run `npm run reset` <br/>

```bash
npm run dev
```

### Lint

```bash
npm run lint
```

### Build

```bash
npm run build
```

### Test

```bash
npm run test
```

View and interact with your tests via UI.

```bash
npm run test:ui
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
