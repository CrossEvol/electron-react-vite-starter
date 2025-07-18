import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

import { useTheme } from '@/providers/color-mode-provider'
import { useNavigate } from '@tanstack/react-router'
import {
  AlarmPlus,
  CaseSensitive,
  Home,
  List,
  LogIn,
  Menu,
  Moon,
  Sun,
  UserPlus
} from 'lucide-react'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate({ from: '/' })
  const { setTheme } = useTheme()

  const menuItems = [
    { icon: <Home />, text: 'Home', path: '/' },
    { icon: <LogIn />, text: 'SignIn', path: '/sign-in' },
    { icon: <UserPlus />, text: 'SignUp', path: '/sign-up' }
  ]

  const featureItems = [
    { icon: <List />, text: 'Todo', path: '/todo-list' },
    { icon: <AlarmPlus />, text: 'Counter', path: '/counter' },
    { icon: <CaseSensitive />, text: 'Len', path: '/len' }
  ]

  return (
    <div id="app">
      <header className="flex items-center justify-between border-b p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-4">
              <ul>
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Button
                      variant="ghost"
                      className="w-full cursor-pointer justify-start"
                      onClick={() => navigate({ href: item.path })}
                    >
                      {item.icon}
                      <span className="ml-2">{item.text}</span>
                    </Button>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
              <ul>
                {featureItems.map((item, index) => (
                  <li key={index}>
                    <Button
                      variant="ghost"
                      className="w-full cursor-pointer justify-start"
                      onClick={() => navigate({ href: item.path })}
                    >
                      {item.icon}
                      <span className="ml-2">{item.text}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="text-xl font-semibold">Shadcn-UI</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
