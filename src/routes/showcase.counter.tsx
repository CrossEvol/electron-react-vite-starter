import { Button } from '@/components/ui/button' // 导入 Button 组件
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card' // 导入 Card 组件
import { cn } from '@/lib/utils' // 导入 cn 工具函数
import { useCounterStore } from '@/store/counter-store'
import { createFileRoute } from '@tanstack/react-router'

function Counter() {
  const { count, inc } = useCounterStore()
  return (
    <div
      className={cn(
        'bg-background text-foreground flex min-h-screen flex-col items-center justify-center p-4'
      )}
    >
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>Counter</CardTitle>
          <p className="text-muted-foreground text-sm leading-7 [&:not(:first-child)]:mt-6">
            This page demonstrates the integration and basic usage of the
            Zustand state management library.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <span className={cn('text-primary mb-6 text-6xl font-bold')}>
            {count}
          </span>
          <Button onClick={inc}>Increment</Button>{' '}
          {/* 使用 Shadcn UI 的 Button 组件 */}
        </CardContent>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/showcase/counter')({
  component: Counter
})
