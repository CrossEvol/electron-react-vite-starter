import { ErrorComponentProps } from '@tanstack/react-router'

export default function ErrorPage({ error }: ErrorComponentProps) {
  console.error(error)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{(error as Error).message}</i>
      </p>
    </div>
  )
}
