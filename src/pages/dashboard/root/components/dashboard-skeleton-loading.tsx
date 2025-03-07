import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardSkeletonLoading() {
  return (
    <div className="block md:flex space-x-4 space-y-4">
      <Card className="flex-1">
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-24 mb-4" />
          <Skeleton className="h-[180px] w-full" />
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-24 mb-4" />
          <Skeleton className="h-[180px] w-full" />
        </CardContent>
      </Card>

      <div className="flex flex-row md:flex-col space-x-4 md:space-y-4 w-full md:w-[300px]">
        <Card>
          <CardContent className="p-6 flex justify-between">
            <div>
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex justify-between">
            <div>
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
