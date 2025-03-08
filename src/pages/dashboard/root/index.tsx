import useOrders from '@/hooks/use-orders'
import useProducts from '@/hooks/use-products'
import { TotalRevenue } from './components/total-revenue'
import { Card, CardContent } from '@/components/ui/card'
import { PackageIcon, TrendingUp } from 'lucide-react'
import { TotalOrder } from './components/total-order'
import { TopProductsChart } from './components/top-products-chart'
import { CategoryPieChart } from './components/category-pie-chart'
import AlertError from '@/components/shared/alert-error'
import DashboardSkeletonLoading from './components/dashboard-skeleton-loading'

export default function DashboardPage() {
  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError
  } = useProducts({})

  const { data: orders = [], isLoading, error } = useOrders()

  const totalSales = orders.reduce((total, order) => {
    return (
      total +
      order.products.reduce(
        (itemsTotal, item) => itemsTotal + item.product.price * item.quantity,
        0
      )
    )
  }, 0)
  const totalOrders = orders.length
  const totalProducts = products.length
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {productsLoading || isLoading ? (
        <DashboardSkeletonLoading />
      ) : error ? (
        <AlertError description={error.message} />
      ) : productsError ? (
        <AlertError description={productsError.message} />
      ) : (
        <>
          <div className="block md:flex space-x-4 space-y-4">
            <TotalRevenue />

            <TotalOrder />

            <div className="flex flex-row md:flex-col space-x-4 md:space-y-4 w-full md:w-[300px]">
              <Card className="w-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Avg. Order Value
                      </p>
                      <p className="text-2xl font-bold">
                        ${averageOrderValue.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-purple-200 p-2 rounded-full">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Products
                      </p>
                      <p className="text-2xl font-bold">{totalProducts}</p>
                    </div>
                    <div className="p-2 bg-blue-200 rounded-full">
                      <PackageIcon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-x-4">
            <CategoryPieChart />
            <TopProductsChart />
          </div>
        </>
      )}
    </div>
  )
}
