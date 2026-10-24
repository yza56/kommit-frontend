import { Loader2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'

type SubmitButtonProps = {
  label: string
  loadingLabel: string
  isLoading: boolean
  isDisabled: boolean
}

export default function SubmitButton({ label, loadingLabel, isLoading, isDisabled }: SubmitButtonProps) {
  return (
    <Button type="submit" size="lg" className="w-full" disabled={isDisabled}>
      {isLoading ? (
        <>
          <Loader2Icon aria-hidden="true" className="animate-spin" />
          <span className="sr-only">{loadingLabel}</span>
        </>
      ) : (
        label
      )}
    </Button>
  )
}
