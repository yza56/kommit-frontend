import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2Icon, LogOutIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import PageShell from '@/components/ui/PageShell'
import { homeTexts } from '@/data/home'
import { fetchSession, signOut } from '@/lib/api/auth'
import { queryKeys } from '@/lib/api/queryKeys'
import { composeArrivalToast, type ArrivalOrigin } from '@/logic/auth/toast/toast'
import { composeGreeting } from '@/logic/home/greeting/greeting'

export default function HomePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()
  const session = useQuery({ queryKey: queryKeys.session, queryFn: fetchSession, retry: false })
  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => queryClient.setQueryData(queryKeys.session, null),
  })

  const arrival = (location.state as { arrival?: ArrivalOrigin } | null)?.arrival
  const firstName = session.data?.user.name
  const hasShownToast = useRef(false)

  useEffect(() => {
    if (!arrival || firstName === undefined || hasShownToast.current) return

    hasShownToast.current = true
    toast.success(composeArrivalToast(arrival, firstName))
    navigate('.', { replace: true, state: null })
  }, [arrival, firstName, navigate])

  const greeting = firstName === undefined ? '' : composeGreeting(firstName)
  const highlight = `${firstName} ?`

  return (
    <PageShell
      navBarActions={
        session.isPending ? null : firstName !== undefined ? (
          <Button variant="ghost" disabled={signOutMutation.isPending} onClick={() => signOutMutation.mutate()}>
            <LogOutIcon aria-hidden="true" className="size-6" />
            {homeTexts.signOut}
          </Button>
        ) : (
          <>
            <Button variant="outline" nativeButton={false} render={<Link to="/signin" />}>
              {homeTexts.signIn}
            </Button>
            <Button nativeButton={false} render={<Link to="/signup" />}>
              {homeTexts.signUp}
            </Button>
          </>
        )
      }
    >
      {session.isPending ? (
        <div role="status" className="py-30">
          <Loader2Icon aria-hidden="true" className="size-8 animate-spin text-brand" />
          <span className="sr-only">{homeTexts.loading}</span>
        </div>
      ) : (
        <section className="flex w-full flex-col items-center gap-3 px-4 py-15 text-center md:px-50">
          <h1 className="text-3xl leading-[1.2] font-bold text-heading md:text-5xl">
            {firstName !== undefined ? (
              <>
                {greeting.slice(0, greeting.length - highlight.length)}
                <span className="text-accent-title">{highlight}</span>
              </>
            ) : (
              <>
                {homeTexts.visitor.titleStart}
                <span className="text-accent-title">{homeTexts.visitor.titleHighlight}</span>
              </>
            )}
          </h1>
          <p className="max-w-[544px] text-lg leading-7 text-muted-foreground">
            {firstName !== undefined ? homeTexts.connected.subtitle : homeTexts.visitor.subtitle}
          </p>
        </section>
      )}
    </PageShell>
  )
}
