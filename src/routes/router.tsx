import ErrorPage from '@/error-page'
import Counter from '@/views/counter'
import Home from '@/views/home'
import Len from '@/views/len'
import SignIn from '@/views/sign-in'
import SignUp from '@/views/sign-up'
import TodoList from '@/views/todo-list'
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter
} from '@tanstack/react-router'
import Layout from '../layout'

const rootRoute = createRootRoute({
  errorComponent: ErrorPage,
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  )
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home
})

const counterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/counter',
  component: Counter
})

const lenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/len',
  component: Len
})

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sign-in',
  component: SignIn
})

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sign-up',
  component: SignUp
})

const todoListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/todo-list',
  component: TodoList
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  counterRoute,
  lenRoute,
  signInRoute,
  signUpRoute,
  todoListRoute
])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
