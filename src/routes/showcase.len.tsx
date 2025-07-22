import { Input } from '@/components/ui/input' // Import Shadcn UI's Input component
import { cn } from '@/lib/utils' // Import cn utility function
import { createFileRoute } from '@tanstack/react-router'
import { atom, useAtom } from 'jotai'

const textAtom = atom('hello')
const textLenAtom = atom((get) => get(textAtom).length)
const uppercaseAtom = atom((get) => get(textAtom).toUpperCase())

const InputComponent = () => {
  const [text, setText] = useAtom(textAtom)
  return (
    <Input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Enter some text..."
      className="mb-4 w-full max-w-sm" // Apply Tailwind CSS classes
    />
  )
}

const CharCount = () => {
  const [len] = useAtom(textLenAtom)
  return (
    <div className="mb-2 flex items-center justify-between text-lg font-medium">
      <span>Character Count:</span>{' '}
      <span className="text-primary font-bold">{len}</span>
    </div>
  )
}

const Uppercase = () => {
  const [uppercase] = useAtom(uppercaseAtom)
  return (
    <div className="flex items-center justify-between text-lg font-medium">
      <span>Uppercase:</span>{' '}
      <span className="text-secondary-foreground font-mono">{uppercase}</span>
    </div>
  )
}

const Len = () => (
  <div
    className={cn(
      'bg-background text-foreground flex min-h-screen flex-col items-center justify-center p-4'
    )}
  >
    <div className="bg-card text-card-foreground w-full max-w-md rounded-lg p-8 shadow-lg">
      <h1 className="mb-2 text-center text-3xl font-semibold">Text Analyzer</h1>
      <p className="text-muted-foreground text-sm leading-7 [&:not(:first-child)]:mt-6">
        This page demonstrates the integration and basic usage of the Jotai
        state management library.
      </p>
      <InputComponent />
      <CharCount />
      <Uppercase />
    </div>
  </div>
)

export const Route = createFileRoute('/showcase/len')({
  component: Len
})
