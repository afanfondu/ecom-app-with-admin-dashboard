import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import useOrders from '@/hooks/use-orders'
import useProducts from '@/hooks/use-products'

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--primary)'
  }
} satisfies ChartConfig

export function TopProductsChart() {
  const { data: orders = [] } = useOrders()
  const { data: products = [] } = useProducts({})

  const chartData = products.map(product => {
    const revenue = orders.reduce((total, order) => {
      const item = order.products.find(item => item.productId === product.id)
      return item ? total + item.product.price * item.quantity : total
    }, 0)
    return {
      product: product.title,
      revenue
    }
  })
  chartData.sort((a, b) => b.revenue - a.revenue).splice(5)

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
              right: 50
            }}
          >
            <XAxis type="number" dataKey="revenue" hide />
            <YAxis
              dataKey="product"
              type="category"
              tickLine={false}
              tickMargin={10}
              width={200}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={5}>
              <LabelList
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
