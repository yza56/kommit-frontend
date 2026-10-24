import type { ReactNode } from 'react'

import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'

type PageShellProps = {
  headerActions: ReactNode
  children: ReactNode
}

export default function PageShell({ headerActions, children }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background">
      <Header>{headerActions}</Header>
      <main className="flex w-full flex-1 flex-col items-center">{children}</main>
      <Footer />
    </div>
  )
}
