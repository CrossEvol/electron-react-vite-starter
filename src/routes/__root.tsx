import ErrorPage from '@/error-page'
import Layout from '@/layout'
import {
  createRootRouteWithContext,
  Outlet
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

interface MyRouterContext {
  // auth: AuthContext
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  errorComponent: ErrorPage,
  component: () => (
    <Layout>
      <Outlet />
      <TanStackRouterDevtools />
    </Layout>
  )
})
