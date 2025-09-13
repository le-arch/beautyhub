'use client'

import { type ComponentProps } from 'react'
import { Button } from '@/components/ui/button'

type Props = ComponentProps<typeof Button> & {
  pendingText?: string
}

export function SubmitButton({ children, pendingText, ...props }: Props) {
  // Removed useFormStatus to make the button instant for mock frontend
  return (
    <Button {...props} type="submit">
      {children}
    </Button>
  )
}
