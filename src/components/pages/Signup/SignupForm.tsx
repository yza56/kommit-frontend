import { Button } from '@/components/ui/button'
import TextField from '@/components/ui/TextField'
import { authTexts } from '@/data/auth'
import { signupTexts } from '@/data/signup'

type SignupFormProps = {
  passwordError?: string
  isSubmitDisabled?: boolean
}

export default function SignupForm({ passwordError, isSubmitDisabled }: SignupFormProps) {
  return (
    <form noValidate className="flex w-full flex-col gap-8">
      <TextField label={authTexts.labels.firstName} name="name" autoComplete="given-name" isRequired />
      <TextField
        label={authTexts.labels.email}
        name="email"
        type="email"
        autoComplete="email"
        placeholder={authTexts.emailPlaceholder}
        isRequired
      />
      <TextField
        label={authTexts.labels.password}
        name="password"
        type="password"
        autoComplete="new-password"
        error={passwordError}
        isRequired
      />
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitDisabled}>
        {signupTexts.submit}
      </Button>
    </form>
  )
}
