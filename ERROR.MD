## ESM vs Commmonjs

```ts
Running seed command `ts-node --esm prisma/seed.ts` ...
D:\WEB-Code\my-electron\electron-vite-react-cp\prisma\seed.ts:1
import { PrismaClient } from '@prisma/client';
^^^^^^

SyntaxError: Cannot use import statement outside a module
```

需要修改`tsconfig.json`

```ts
 "module": "CommonJS",
```

但是由于这是`vite`项目,这么做可能会导致别的bug或性能问题

所以最后只在`npx prisma db seed` 的时候这么操作