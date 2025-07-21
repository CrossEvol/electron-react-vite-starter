import { createFileRoute } from '@tanstack/react-router'

function ConfirmEmail() {
  return (
    <div className="container mx-auto max-w-md py-12 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Confirm Your Email
      </h1>
      <p className="text-muted-foreground mt-4">
        We&apos;ve sent a confirmation link to your email address. Please check
        your inbox and click the link to complete the registration process.
      </p>
    </div>
  )
}

export const Route = createFileRoute('/auth/confirm-email')({
  component: ConfirmEmail
})
