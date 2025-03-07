import { CartesianGrid, Line, LineChart } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import useOrders from '@/hooks/use-orders'

const chartConfig = {
  order: {
    label: 'Order',
    color: 'var(--chart-1)'
  }
} satisfies ChartConfig

export function TotalOrder() {
  const { data: orders = [] } = useOrders()

  const chartData = orders.map((order, idx) => {
    const total = order.products.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
    return { no: `Order #${idx + 1}`, value: total }
  })

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-muted-foreground">Total Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <h3 className="text-2xl font-bold mb-4">{orders.length}</h3>
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
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="value"
              type="natural"
              stroke="var(--color-order)"
              strokeWidth={2}
              dot={{
                fill: 'var(--color-order)'
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
