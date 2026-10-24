import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router'

import SigninForm from '@/components/pages/Signin/SigninForm'
import AuthCard from '@/components/ui/AuthCard'
import { Button } from '@/components/ui/button'
import PageShell from '@/components/ui/PageShell'
import { signinTexts } from '@/data/signin'
import { fetchSession, signIn } from '@/lib/api/auth'
import { ApiRequestError } from '@/lib/api/client'
import { queryKeys } from '@/lib/api/queryKeys'
import { displayApiError } from '@/logic/auth/errorMessage/errorMessage'

export default function SigninPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const signin = useMutation({
    mutationFn: signIn,
    onSuccess: async () => {
      queryClient.setQueryData(queryKeys.session, await fetchSession())
      navigate('/', { state: { arrival: 'signin' } })
    },
  })
  const serverError = signin.error instanceof ApiRequestError ? displayApiError(signin.error.apiError).message : undefined

  return (
    <PageShell
      navBarActions={
        <Button nativeButton={false} render={<Link to="/signup" />}>
          {signinTexts.headerSignUp}
        </Button>
      }
    >
      <AuthCard
        title={signinTexts.title}
        footer={
          <>
            {signinTexts.footerQuestion}
            <Link to="/signup" className="text-brand">
              {signinTexts.footerLink}
            </Link>
            {signinTexts.footerEnd}
          </>
        }
      >
        <SigninForm
          isPending={signin.isPending}
          serverError={serverError}
          onSubmit={(values) => signin.mutate({ email: values.email.trim(), password: values.password })}
        />
      </AuthCard>
    </PageShell>
  )
}
