import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { openAPI } from 'better-auth/plugins'
import 'dotenv/config'
import { session } from 'electron'
import { account, user, verification } from 'electron/main/database/schema'
import { db } from '../database/database'

export const auth = betterAuth({
  baseURL: 'http://localhost:3000',
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
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }
  }
})

export type AuthType = {
  user: typeof auth.$Infer.Session.user | null
  session: typeof auth.$Infer.Session.session | null
}
