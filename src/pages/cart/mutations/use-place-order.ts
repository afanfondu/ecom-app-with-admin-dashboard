import { onError } from '@/lib/utils'
import { MutationOptions, useMutation } from '@tanstack/react-query'
import api from '@/lib/api'
import { AxiosError } from 'axios'
import { Order } from '@/hooks/use-orders'

type PlaceOrderVars = {
  userId: number
  products: {
    productId: number
    quantity: number
  }[]
}

export const placeOrder = async ({ userId, products }: PlaceOrderVars) => {
  const { data } = await api.post('/carts', {
    userId,
    products
  })
  return data
}

export const usePlaceOrder = (
  opts: MutationOptions<Order, AxiosError, PlaceOrderVars>
) => {
  return useMutation({
    mutationFn: placeOrder,
    onError,
    ...opts
  })
}
