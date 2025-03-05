import React from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

type LoadingButtonProps = {
  isLoading?: boolean
  children: React.ReactNode
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function LoadingButton({
  isLoading = false,
  children,
  disabled,
  variant,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      variant={variant ?? 'default'}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </Button>
  )
}
