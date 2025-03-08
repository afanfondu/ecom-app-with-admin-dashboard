import { Order } from '@/hooks/use-orders'
import api from '@/lib/api'
import { onError } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

const updateOrder = async (order: Order) => {
  const { data } = await api.patch(`/carts/${order.id}`, {
    id: order.id,
    userId: order.userId,
    date: order.date,
    products: order.products.map(({ productId, quantity }) => ({
      productId,
      quantity
    }))
  })
  return data
}

export const useUpdateOrder = () =>
  useMutation({
    mutationFn: updateOrder,
    onSuccess: data => {
      toast.success(`Order with ID ${data.id} has been marked as delivered.`)
    },
    onError
  })
