import { Link } from 'react-router'

import AuthCard from '@/components/ui/AuthCard'
import { Button } from '@/components/ui/button'
import PageShell from '@/components/ui/PageShell'
import SigninForm from '@/components/pages/Signin/SigninForm'
import { signinTexts } from '@/data/signin'

export default function SigninPage() {
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
        <SigninForm />
      </AuthCard>
    </PageShell>
  )
}
