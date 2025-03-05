import api from '@/lib/api'

export const placeOrder = async ({
  userId,
  products
}: {
  userId: number
  products: {
    productId: number
    quantity: number
  }[]
}) => {
  const { data } = await api.post('/carts', { userId, products })
  return data
}
