import { AlertCircle } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '../ui/alert'

export default function AlertError({
  title = 'Error',
  description = 'Something went wrong!'
}: {
  title?: string
  description?: string
}) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
