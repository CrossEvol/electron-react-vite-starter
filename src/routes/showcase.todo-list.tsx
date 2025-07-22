// components/TodoList.tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useTodoStore } from '@/store/todo-store'
import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react'

const TodoList: React.FC = () => {
  const [newTodo, setNewTodo] = useState('')
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodoStore()

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo)
      setNewTodo('')
    }
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Todo List</CardTitle>
          <p className="text-muted-foreground text-sm leading-7 [&:not(:first-child)]:mt-6">
            This page demonstrates the integration and basic usage of the
            Zustand state management library.
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex space-x-2">
            <Input
              type="text"
              placeholder="Add a new todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddTodo()
                }
              }}
            />
            <Button onClick={handleAddTodo}>Add</Button>
          </div>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="bg-muted flex items-center justify-between rounded-md p-3"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={cn(
                      'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                      todo.completed ? 'text-muted-foreground line-through' : ''
                    )}
                  >
                    {todo.text}
                  </label>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/showcase/todo-list')({
  component: TodoList
})
