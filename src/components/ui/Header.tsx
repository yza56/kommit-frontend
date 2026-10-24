import type { ReactNode } from 'react'

import Logo from '@/components/ui/Logo'

export default function Header({ children }: { children?: ReactNode }) {
  return (
    <header className="flex w-full flex-wrap items-center justify-between gap-x-2 gap-y-3 bg-white/80 px-3 py-5 backdrop-blur-[6px] md:gap-x-6 md:px-6">
      <Logo />
      <div className="flex items-center gap-2 md:gap-6">{children}</div>
    </header>
  )
}
