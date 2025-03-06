import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function TableSkeleton({
  className,
  tableClassName,
  ...props
}: React.ComponentProps<'div'> & { tableClassName?: string }) {
  return (
    <div
      className={cn(
        'w-full space-y-4 animate-in fade-in duration-300 py-4',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-sm" />
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </div>

      <div className="rounded-md border">
        <Skeleton className={cn('h-[300px] w-full', tableClassName)} />
      </div>

      <div className="flex items-center justify-end space-x-2">
        <Skeleton className="h-10 w-[80px]" />
        <Skeleton className="h-10 w-[60px]" />
      </div>
    </div>
  )
}
