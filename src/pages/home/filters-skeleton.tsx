import { Skeleton } from '@/components/ui/skeleton'

export default function CategoryListSkeleton() {
  return Array.from({ length: 3 }).map((_, i) => (
    <Skeleton key={i} className="h-16 w-[180px]" />
  ))
}
