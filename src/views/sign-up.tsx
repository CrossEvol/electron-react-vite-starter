import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock } from 'lucide-react'
import * as React from 'react'

function Copyright(props: any) {
  return (
    <p className="text-sm text-muted-foreground text-center" {...props}>
      {'Copyright © '}
      <a href="https://mui.com/" className="underline">
        Your Website
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </p>
  )
}

export default function SignUp() {
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
        <h1 className="text-2xl font-semibold tracking-tight mt-2">Sign up</h1>
        <form onSubmit={handleSubmit} className="w-full mt-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  autoFocus
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" required />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">
                I want to receive inspiration, marketing promotions and updates
                via email.
              </Label>
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            <div className="text-sm text-muted-foreground text-right">
              <a href="#" className="underline">
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
