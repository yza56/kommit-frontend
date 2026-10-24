import { Button } from '@/components/ui/button'
import TextField from '@/components/ui/TextField'
import { authTexts } from '@/data/auth'
import { signinTexts } from '@/data/signin'

type SigninFormProps = {
  serverError?: string
  isSubmitDisabled?: boolean
}

export default function SigninForm({ serverError, isSubmitDisabled }: SigninFormProps) {
  return (
    <form noValidate className="flex w-full flex-col gap-5">
      <TextField
        label={authTexts.labels.email}
        name="email"
        type="email"
        autoComplete="email"
        placeholder={authTexts.emailPlaceholder}
      />
      <TextField
        label={authTexts.labels.password}
        name="password"
        type="password"
        autoComplete="current-password"
      />
      <p role="alert" className="min-h-16.25 text-xs text-destructive">
        {serverError}
      </p>
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitDisabled}>
        {signinTexts.submit}
      </Button>
    </form>
  )
}
