import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CartItem as TCartItem } from '@/lib/types'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { Trash2 } from 'lucide-react'
import useCart from '@/store/useCart'

const MAX_QUANTITY = 5

export default function CartItem({ item }: { item: TCartItem }) {
  const updateQuantity = useCart(state => state.updateQuantity)
  const removeItem = useCart(state => state.removeItem)
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
          <div className="flex items-center gap-4">
            <Select
              value={quantity.toString()}
              onValueChange={value =>
                updateQuantity(product.id, parseInt(value))
              }
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: MAX_QUANTITY }, (_, i) => i + 1).map(
                  num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeItem(product.id)}
            >
              <Trash2 />
            </Button>
          </div>
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
