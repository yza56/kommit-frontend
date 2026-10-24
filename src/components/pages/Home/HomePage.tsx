import { LogOutIcon } from 'lucide-react'
import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import PageShell from '@/components/ui/PageShell'
import { homeTexts } from '@/data/home'

type HomePageProps = {
  firstName?: string
}

export default function HomePage({ firstName }: HomePageProps) {
  const isConnected = firstName !== undefined

  return (
    <PageShell
      headerActions={
        isConnected ? (
          <Button variant="ghost">
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
      <section className="flex w-full flex-col items-center gap-3 px-4 py-15 text-center md:px-50">
        <h1 className="text-3xl leading-[1.2] font-bold text-heading md:text-5xl">
          {isConnected ? homeTexts.connected.titleStart : homeTexts.visitor.titleStart}
          <span className="text-accent-title">
            {isConnected ? `${firstName} ?` : homeTexts.visitor.titleHighlight}
          </span>
        </h1>
        <p className="max-w-[544px] text-lg leading-7 text-muted-foreground">
          {isConnected ? homeTexts.connected.subtitle : homeTexts.visitor.subtitle}
        </p>
      </section>
    </PageShell>
  )
}
