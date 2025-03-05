import { Card } from '@/components/ui/card'
import useAuth from '@/store/useAuth'
import useCart from '@/store/useCart'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { placeOrder } from './actions'
import { LoadingButton } from '@/components/shared/loading-button'

export default function OrderSummary() {
  const user = useAuth(state => state.user)
  const items = useCart(state => state.items)
  const emptyCart = useCart(state => state.emptyCart)

  const { mutate, isPending } = useMutation({
    mutationFn: placeOrder,
    onSuccess: data => {
      emptyCart()
      toast.success('Order placed successfully\n' + JSON.stringify(data))
    },
    onError: error => {
      toast.error(error.message)
    }
  })

  const subtotal = items.reduce(
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
            onClick={() => {
              if (!user) return toast.error('Please login to place order')

              mutate({
                userId: user.id,
                products: items.map(item => ({
                  productId: item.product.id,
                  quantity: item.quantity
                }))
              })
            }}
            className="w-full"
          >
            Place Order
          </LoadingButton>
        </div>
      </Card>
    </div>
  )
}
