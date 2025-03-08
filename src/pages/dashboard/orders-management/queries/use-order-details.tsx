import { APIUser, Order } from '@/hooks/use-orders'
import api from '@/lib/api'
import { Product } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'

const fetchOrderDetails = async (orderId: number) => {
  const { data: order } = await api.get<Order>(`/carts/${orderId}`)
  const { data: products } = await api.get<Product[]>('/products')
  const { data: user } = await api.get<APIUser>(`/users/${order.userId}`)

  return {
    ...order,
    products: order.products.map(orderProduct => ({
      ...orderProduct,
      product: products.find(product => product.id === orderProduct.productId)!
    })),
    user: user
  }
}

export const useOrderDetails = (orderId: number) =>
  useQuery<Order>({
    queryKey: ['orders', orderId],
    queryFn: () => fetchOrderDetails(orderId)
  })
