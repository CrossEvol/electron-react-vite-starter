import { Button } from '@/components/ui/button'
import type { HonoPaths } from '@/schemas/openapi3/openapi.schema.d'
import fetchClient from '@/utils/fetch.client'
import { createFileRoute } from '@tanstack/react-router'
import ProTip from '../ProTip'

type UserResponse =
  HonoPaths['/posts']['get']['responses'][200]['content']['application/json']

function Copyright() {
  return (
    <p className="text-muted-foreground text-center text-sm">
      {'Copyright © '}
      <a href="https://mui.com/" className="underline">
        Your Website
      </a>{' '}
      {new Date().getFullYear()}.
    </p>
  )
}

function Home() {
  const handleHttpRequest = async () => {
    const res = await fetchClient.get<UserResponse>(
      `http://localhost:${localStorage.getItem('port')}/posts`
    )
    console.log(res)
  }

  return (
    <div className="container mx-auto sm:max-w-sm">
      <div className="my-4">
        <h1 className="mb-2 text-2xl font-semibold">
          Material UI Vite.js example in TypeScript
        </h1>
        <Button onClick={handleHttpRequest}>Test HttpRequest</Button>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <ProTip />
        <Copyright />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home
})
