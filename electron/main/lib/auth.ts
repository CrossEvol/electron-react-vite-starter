import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { openAPI } from 'better-auth/plugins'
import 'dotenv/config'
import { db } from '../database/database'
import { account, session, user, verification } from '../database/schema'

export const createBetterAuthMiddleware = (baseURL: string) => {
  return betterAuth({
    baseURL,
    plugins: [openAPI()],
    database: drizzleAdapter(db, {
      provider: 'sqlite',
      schema: {
        user,
        session,
        account,
        verification
      }
    }),
    emailAndPassword: {
      enabled: true
    },
    socialProviders: {
      github: {
        clientId: process.env.AUTH_GITHUB_CLIENT_ID as string,
        clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET as string
      }
    }
  })
}

type BetterAuthInstance = ReturnType<typeof createBetterAuthMiddleware>

export type AuthType = {
  user: BetterAuthInstance['$Infer']['Session']['user'] | null
  session: BetterAuthInstance['$Infer']['Session']['session'] | null
}
