import { useId, type ComponentProps } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type TextFieldProps = Omit<ComponentProps<'input'>, 'id'> & {
  label: string
  error?: string
  isRequired?: boolean
}

export default function TextField({ label, error, isRequired, ...inputProps }: TextFieldProps) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className="flex w-full flex-col gap-1.5">
      <Label htmlFor={id}>
        {label}
        {isRequired && <span aria-hidden="true">*</span>}
      </Label>
      <Input
        id={id}
        aria-required={isRequired}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
