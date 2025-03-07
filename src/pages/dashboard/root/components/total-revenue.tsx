import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import useOrders from '@/hooks/use-orders'
import { formatCurrency } from '@/lib/utils'

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--chart-1)'
  }
} satisfies ChartConfig

type ChartData = {
  month: string
  revenue: number
}[]

export function TotalRevenue() {
  const { data: orders = [] } = useOrders()

  const totalSales = orders.reduce((total, order) => {
    return (
      total +
      order.products.reduce(
        (itemsTotal, item) => itemsTotal + item.product.price * item.quantity,
        0
      )
    )
  }, 0)

  const chartData = [
    { month: 'January', revenue: 0 },
    { month: 'February', revenue: 0 },
    { month: 'March', revenue: 0 },
    { month: 'April', revenue: 0 }
  ] as ChartData

  orders.forEach(order => {
    const month = new Date(order.date).toLocaleString('default', {
      month: 'long'
    })
    const total = order.products.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )

    const item = chartData.find(data => data.month === month)
    item!.revenue += total
  })

  chartData.sort((a, b) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    return months.indexOf(a.month) - months.indexOf(b.month)
  })

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-muted-foreground">Total Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <h3 className="text-2xl font-bold mb-4">
            {formatCurrency(totalSales)}
          </h3>
        </div>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="w-[100px]" hideLabel />}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => value.slice(0, 3)}
            />
            <Line
              dataKey="revenue"
              type="natural"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={{
                fill: 'var(--color-revenue)'
              }}
              activeDot={{
                r: 6
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
