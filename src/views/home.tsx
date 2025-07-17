import { Button } from '@/components/ui/button'
import fetchClient from '@/utils/fetch.client'
import React from 'react'
import ProTip from '../ProTip'

function Copyright() {
  return (
    <p className="text-sm text-muted-foreground text-center">
      {'Copyright © '}
      <a href="https://mui.com/" className="underline">
        Your Website
      </a>{' '}
      {new Date().getFullYear()}.
    </p>
  )
}

export default function Home() {
  React.useEffect(() => {
    handleUpdatePort()
  }, [])

  const handleUpdatePort = async () => {
    const { port } = await window.electronAPI.updatePort()
    localStorage.setItem('port', port.toString())
  }

  const handleHttpRequest = async () => {
    const res = await fetchClient.get(
      `http://localhost:${localStorage.getItem('port')}/users`
    )
    console.log(res)
  }

  return (
    <div className="container mx-auto sm:max-w-sm">
      <div className="my-4">
        <h1 className="text-2xl font-semibold mb-2">
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
