import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'

import SubmitButton from '@/components/ui/SubmitButton'
import TextField from '@/components/ui/TextField'
import { authTexts } from '@/data/auth'
import { signinTexts } from '@/data/signin'
import { isSigninSubmitDisabled, type SigninValues } from '@/logic/auth/submit/submit'

type SigninFormProps = {
  isPending: boolean
  serverError?: string
  onSubmit: (values: SigninValues) => void
}

export default function SigninForm({ isPending, serverError, onSubmit }: SigninFormProps) {
  const [values, setValues] = useState<SigninValues>({ email: '', password: '' })
  // isPending ne passe à vrai qu'au rendu suivant : le ref bloque un 2e clic immédiat (RM16).
  const hasSubmittedRef = useRef(false)

  useEffect(() => {
    if (!isPending) hasSubmittedRef.current = false
  }, [isPending])

  const fieldProps = (field: keyof SigninValues) => ({
    name: field,
    value: values[field],
    onChange: (event: ChangeEvent<HTMLInputElement>) => setValues({ ...values, [field]: event.target.value }),
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (hasSubmittedRef.current || isSigninSubmitDisabled(values, isPending)) return

    hasSubmittedRef.current = true
    onSubmit(values)
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
      <TextField
        label={authTexts.labels.email}
        type="email"
        autoComplete="email"
        placeholder={authTexts.emailPlaceholder}
        {...fieldProps('email')}
      />
      <TextField
        label={authTexts.labels.password}
        type="password"
        autoComplete="current-password"
        {...fieldProps('password')}
      />
      <p role="alert" className="min-h-16.25 text-xs text-destructive">
        {serverError}
      </p>
      <SubmitButton
        label={signinTexts.submit}
        loadingLabel={signinTexts.submitting}
        isLoading={isPending}
        isDisabled={isSigninSubmitDisabled(values, isPending)}
      />
    </form>
  )
}
