import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'

import SubmitButton from '@/components/ui/SubmitButton'
import TextField from '@/components/ui/TextField'
import { authTexts } from '@/data/auth'
import { signupTexts } from '@/data/signup'
import { getVisibleSignupErrors } from '@/logic/auth/errorDisplay/errorDisplay'
import { isSignupSubmitDisabled, type SignupValues } from '@/logic/auth/submit/submit'
import { getInvalidSignupFields, type SignupField } from '@/logic/auth/validation/validation'

type SignupFormProps = {
  isPending: boolean
  emailError?: string
  formError?: string
  onSubmit: (values: SignupValues) => void
}

export default function SignupForm({ isPending, emailError, formError, onSubmit }: SignupFormProps) {
  const [values, setValues] = useState<SignupValues>({ name: '', email: '', password: '' })
  const [hasSubmitted, setHasSubmitted] = useState(false)
  // isPending ne passe à vrai qu'au rendu suivant : le ref bloque un 2e clic immédiat (RM16).
  const hasSubmittedRef = useRef(false)

  useEffect(() => {
    if (!isPending) hasSubmittedRef.current = false
  }, [isPending])
  const visibleErrors = getVisibleSignupErrors(values, hasSubmitted)

  const fieldProps = (field: SignupField) => ({
    name: field,
    value: values[field],
    onChange: (event: ChangeEvent<HTMLInputElement>) => setValues({ ...values, [field]: event.target.value }),
  })
  const formatError = (field: SignupField) =>
    visibleErrors.includes(field) ? signupTexts.fieldErrors[field] : undefined

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (hasSubmittedRef.current) return

    setHasSubmitted(true)
    if (getInvalidSignupFields(values).length === 0) {
      hasSubmittedRef.current = true
      onSubmit(values)
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
      <TextField
        label={authTexts.labels.firstName}
        autoComplete="given-name"
        error={formatError('name')}
        isRequired
        {...fieldProps('name')}
      />
      <TextField
        label={authTexts.labels.email}
        type="email"
        autoComplete="email"
        placeholder={authTexts.emailPlaceholder}
        error={formatError('email') ?? emailError}
        isRequired
        {...fieldProps('email')}
      />
      <TextField
        label={authTexts.labels.password}
        type="password"
        autoComplete="new-password"
        error={formatError('password')}
        isRequired
        {...fieldProps('password')}
      />
      {formError && (
        <p role="alert" className="text-xs text-destructive">
          {formError}
        </p>
      )}
      <SubmitButton
        label={signupTexts.submit}
        loadingLabel={signupTexts.submitting}
        isLoading={isPending}
        isDisabled={isSignupSubmitDisabled(values, isPending)}
      />
    </form>
  )
}
