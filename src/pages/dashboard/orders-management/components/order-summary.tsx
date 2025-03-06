import { Card } from '@/components/ui/card'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { LoadingButton } from '@/components/shared/loading-button'
import { Order } from '@/hooks/use-orders'
import { useUpdateOrder } from '../mutations/use-update-order'

export default function OrderSummary({ order }: { order: Order }) {
  const { mutate, isPending } = useUpdateOrder()

  const subtotal = order.products.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )
  const shipping = 10
  const total = subtotal + shipping

  return (
    <div className="lg:col-span-1">
      <Card className="p-6 sticky top-8">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <LoadingButton
            isLoading={isPending}
            onClick={() => mutate(order)}
            className="w-full"
          >
            Mark it as Delivered
          </LoadingButton>
        </div>
      </Card>
    </div>
  )
}
