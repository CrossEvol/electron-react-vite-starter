import { createRouter, RouterProvider } from '@tanstack/react-router'
import React from 'react'
import { usePort } from './hooks/use-port'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => {
  usePort()
  return <RouterProvider router={router} />
}

export default App
