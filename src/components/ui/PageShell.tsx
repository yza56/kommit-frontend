import type { ReactNode } from 'react'

import Footer from '@/components/ui/Footer'
import NavBar from '@/components/ui/NavBar'

type PageShellProps = {
  navBarActions: ReactNode
  children: ReactNode
}

export default function PageShell({ navBarActions, children }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background">
      <NavBar>{navBarActions}</NavBar>
      <main className="flex w-full flex-1 flex-col items-center">{children}</main>
      <Footer />
    </div>
  )
}
