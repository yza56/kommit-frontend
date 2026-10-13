import { CircleCheckIcon, CircleXIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { healthCheckTexts } from '@/data/healthCheck'

type ConnectionCheckProps = {
  label: string
  isFetching: boolean
  result?: { isOk: boolean; message: string }
  onCheck: () => void
}

export default function ConnectionCheck({ label, isFetching, result, onCheck }: ConnectionCheckProps) {
  return (
    <div className="flex flex-col items-start gap-2">
      <Button onClick={onCheck} disabled={isFetching}>
        {label}
      </Button>

      {isFetching && <p className="text-sm text-muted-foreground">{healthCheckTexts.loading}</p>}

      {!isFetching && result && (
        <p className="flex items-center gap-2 text-sm">
          {result.isOk ? (
            <CircleCheckIcon className="size-4 text-emerald-600" />
          ) : (
            <CircleXIcon className="size-4 text-destructive" />
          )}
          {result.message}
        </p>
      )}
    </div>
  )
}
