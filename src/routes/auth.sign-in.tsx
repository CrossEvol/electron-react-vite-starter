import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createFileRoute } from '@tanstack/react-router'
import { Lock } from 'lucide-react'
import * as React from 'react'

function Copyright(props: any) {
  return (
    <p className="text-center text-sm text-muted-foreground" {...props}>
      {'Copyright © '}
      <a href="https://mui.com/" className="underline">
        Your Website
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </p>
  )
}

function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password')
    })
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
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Sign in</h1>
        <form onSubmit={handleSubmit} className="mt-6 w-full">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
              autoFocus
            />
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              required
            />
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit" className="mt-4 w-full">
              Sign In
            </Button>
            <div className="mt-4 flex justify-between text-sm text-muted-foreground">
              <a href="#" className="underline">
                Forgot password?
              </a>
              <a href="#" className="underline">
                {"Don't have an account? Sign Up"}
              </a>
            </div>
          </div>
        </form>
      </div>
      <Copyright className="mt-8" />
    </div>
  )
}

export const Route = createFileRoute('/auth/sign-in')({
  component: SignIn
})
