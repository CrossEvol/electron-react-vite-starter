import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { BetterAuthPaths } from '@/schemas/better-auth/better-auth.schema.d'
import fetchClient from '@/utils/fetch.client'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Lock } from 'lucide-react'
import * as React from 'react'
import { useState } from 'react'

function Copyright(props: any) {
  return (
    <p className="text-muted-foreground text-center text-sm" {...props}>
      {'Copyright © '}
      <a href="https://mui.com/" className="underline">
        Your Website
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </p>
  )
}

type SignUpResponse =
  BetterAuthPaths['/sign-up/email']['post']['responses']['200']['content']['application/json']

function SignUp() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    const data = new FormData(event.currentTarget)
    const name = data.get('name') as string
    const email = data.get('email') as string
    const password = data.get('password') as string

    try {
      const _data = await fetchClient.post<SignUpResponse>(
        `http://localhost:${localStorage.getItem('port')}/api/auth/sign-up/email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        }
      )

      navigate({ to: '/auth/confirm-email' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-xs py-12">
      <div className="flex flex-col items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>
            <Lock />
          </AvatarFallback>
        </Avatar>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Sign up</h1>
        <form onSubmit={handleSubmit} className="mt-6 w-full">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                required
                autoFocus
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                required
                disabled={loading}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
            <div className="text-muted-foreground text-right text-sm">
              <a href="/auth/sign-in" className="underline">
                Already have an account? Sign in
              </a>
            </div>
          </div>
        </form>
      </div>
      <Copyright className="mt-8" />
    </div>
  )
}

export const Route = createFileRoute('/auth/sign-up')({
  component: SignUp
})
