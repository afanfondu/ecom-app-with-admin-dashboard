import { Card } from '@/components/ui/card'
import { CartItem as TCartItem } from '@/lib/types'

export default function CartItem({ item }: { item: TCartItem }) {
  const { product, quantity } = item

  return (
    <Card key={product.id} className="p-4">
      <div className="flex gap-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-24 w-24 object-contain"
        />
        <div className="flex-1 space-y-2">
          <h3 className="font-medium">{product.title}</h3>
          <p className="text-sm text-muted-foreground">${product.price}</p>
        </div>
        <div className="text-right">
          <p className="font-medium">
            ${(product.price * quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </Card>
  )
}
