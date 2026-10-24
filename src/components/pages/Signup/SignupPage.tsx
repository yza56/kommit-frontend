import { Link } from 'react-router'

import AuthCard from '@/components/ui/AuthCard'
import { Button } from '@/components/ui/button'
import PageShell from '@/components/ui/PageShell'
import SignupForm from '@/components/pages/Signup/SignupForm'
import { signupTexts } from '@/data/signup'

export default function SignupPage() {
  return (
    <PageShell
      headerActions={
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
        <SignupForm />
      </AuthCard>
    </PageShell>
  )
}
