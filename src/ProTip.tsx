import { Lightbulb } from 'lucide-react'

export default function ProTip() {
  return (
    <p className="text-muted-foreground 2- mt-6 mb-3">
      <Lightbulb className="mr-1 align-middle" />
      {'Pro tip: See more '}
      <a href="https://ui.shadcn.com/" className="underline">
        templates
      </a>
      {' in the Shadcn UI documentation.'}
    </p>
  )
}
