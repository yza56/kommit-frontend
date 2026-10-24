import { LockIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { Card } from '@/components/ui/card'
import { authTexts } from '@/data/auth'

type AuthCardProps = {
  title: string
  footer: ReactNode
  children: ReactNode
}

export default function AuthCard({ title, footer, children }: AuthCardProps) {
  return (
    <div className="flex w-full max-w-[432px] flex-col items-center px-4 pt-10 pb-10 md:pt-54.5">
      <Card className="min-h-[479px] w-full items-center">
        <h1 className="w-full text-center text-2xl leading-[1.4] font-bold text-heading">{title}</h1>
        {children}
        <p className="text-center text-sm leading-5 text-label">{footer}</p>
      </Card>
      <p className="mt-8 flex items-center gap-2 text-[10px] leading-[15px] font-medium tracking-[1px] text-label/60 uppercase">
        <LockIcon aria-hidden="true" className="size-3" />
        {authTexts.securityNotice}
      </p>
    </div>
  )
}
