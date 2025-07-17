import { Lightbulb } from 'lucide-react'
import * as React from 'react'

export default function ProTip() {
  return (
    <p className="text-muted-foreground mt-6 mb-3">
      <Lightbulb className="mr-1 align-middle" />
      {'Pro tip: See more '}
      <a
        href="https://mui.com/material-ui/getting-started/templates/"
        className="underline"
      >
        templates
      </a>
      {' in the Material UI documentation.'}
    </p>
  )
}
