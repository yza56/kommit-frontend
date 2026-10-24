import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router'

import SignupForm from '@/components/pages/Signup/SignupForm'
import AuthCard from '@/components/ui/AuthCard'
import { Button } from '@/components/ui/button'
import PageShell from '@/components/ui/PageShell'
import { signupTexts } from '@/data/signup'
import { fetchSession, signUp } from '@/lib/api/auth'
import { ApiRequestError } from '@/lib/api/client'
import { queryKeys } from '@/lib/api/queryKeys'
import { displayApiError } from '@/logic/auth/errorMessage/errorMessage'

export default function SignupPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const signup = useMutation({
    mutationFn: signUp,
    onSuccess: async () => {
      queryClient.setQueryData(queryKeys.session, await fetchSession())
      navigate('/', { state: { arrival: 'signup' } })
    },
  })
  const error = signup.error instanceof ApiRequestError ? displayApiError(signup.error.apiError) : undefined

  return (
    <PageShell
      navBarActions={
        <Button variant="outline" nativeButton={false} render={<Link to="/signin" />}>
          {signupTexts.headerSignIn}
        </Button>
      }
    >
      <AuthCard
        title={signupTexts.title}
        footer={
          <>
            {signupTexts.footerQuestion}
            <Link to="/signin" className="text-brand">
              {signupTexts.footerLink}
            </Link>
          </>
        }
      >
        <SignupForm
          isPending={signup.isPending}
          emailError={error?.target === 'email' ? error.message : undefined}
          formError={error?.target === 'form' ? error.message : undefined}
          onSubmit={(values) =>
            signup.mutate({ name: values.name.trim(), email: values.email.trim(), password: values.password })
          }
        />
      </AuthCard>
    </PageShell>
  )
}
