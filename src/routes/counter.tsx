import { useCounterStore } from '@/store/counter-store'
import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

function Counter() {
  const { count, inc } = useCounterStore()
  return (
    <div className="counter">
      <span>{count}</span>
      <button onClick={inc}>one up</button>
    </div>
  )
}

export const Route = createFileRoute('/counter')({
  component: Counter
})
