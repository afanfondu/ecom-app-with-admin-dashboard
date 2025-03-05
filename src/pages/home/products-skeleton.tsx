import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProductsSkeleton() {
  return Array.from({ length: 8 }).map((_, i) => (
    <Card key={i}>
      <CardContent className="pt-4">
        <Skeleton className="aspect-square w-full" />
        <Skeleton className="mt-4 h-4 w-2/3" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-20" />
      </CardFooter>
    </Card>
  ))
}
