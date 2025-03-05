import { Button } from '@/components/ui/button'
import OrderSummary from './order-summary'
import CartItem from './cart-item'
import { useNavigate } from 'react-router'
import useCart from '@/store/useCart'

export default function CartPage() {
  const items = useCart(state => state.items)
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Button variant="outline" onClick={() => navigate('/')}>
          Continue Shopping
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-8">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>

        <OrderSummary />
      </div>
    </div>
  )
}
