import { AxiosError } from 'axios'
import { clsx, type ClassValue } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(date))

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    amount
  )

export const onError = (error: AxiosError | Error | string) => {
  const errorMessage =
    error instanceof AxiosError
      ? error.response?.data
      : error instanceof Error
        ? error.message
        : 'Something went wrong!'
  toast.error(errorMessage)
}
