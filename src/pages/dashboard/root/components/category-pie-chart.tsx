import { Label, Pie, PieChart } from 'recharts'

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
  electronics: {
    label: 'Electronics',
    color: 'var(--chart-2)'
  },
  jewelery: {
    label: 'Jewelery',
    color: 'var(--chart-4)'
  },
  mensclothing: {
    label: "Men's Clothing",
    color: 'var(--chart-1)'
  },
  womensclothing: {
    label: "Women's Clothing",
    color: 'var(--chart-5)'
  }
} satisfies ChartConfig

const chartData = [
  { category: 'electronics', revenue: 0, fill: 'var(--color-electronics)' },
  { category: 'jewelery', revenue: 0, fill: 'var(--color-jewelery)' },
  {
    category: 'mensclothing',
    revenue: 0,
    fill: 'var(--color-mensclothing)'
  },
  {
    category: 'womensclothing',
    revenue: 0,
    fill: 'var(--color-womensclothing)'
  }
]

export function CategoryPieChart() {
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

  orders.forEach(order => {
    order.products.forEach(item => {
      const category = item.product.category
        .toLowerCase()
        .replace(' ', '')
        .replace("'", '')
      const chartItem = chartData.find(
        chartItem => chartItem.category === category
      )
      chartItem!.revenue += item.product.price * item.quantity
    })
  })

  return (
    <Card className="flex-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>Revenue By Category</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="revenue"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          {formatCurrency(totalSales)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Revenue
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="flex flex-col px-16">
          {Object.values(chartConfig).map((config, idx) => (
            <div key={idx} className="flex items-center space-x-4">
              <div
                style={{ backgroundColor: config.color }}
                className={`w-2 h-2`}
              ></div>
              <p className="text-sm">{config.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
