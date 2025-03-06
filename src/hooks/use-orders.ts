import api from '@/lib/api'
import { Product } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'

type Cart = {
  id: number
  userId: number
  date: string
  user: User
  products: {
    productId: number
    quantity: number
  }[]
}

export type Order = {
  products: {
    productId: number
    quantity: number
    product: Product
  }[]
} & Cart

type User = {
  address: Address
  id: number
  email: string
  username: string
  password: string
  name: {
    firstname: string
    lastname: string
  }
  phone: string
}

type Address = {
  geolocation: {
    lat: string
    long: string
  }
  city: string
  street: string
  number: number
  zipcode: string
}

const fetchOrders = async (): Promise<Order[]> => {
  const orders = await api.get<Cart[]>('/carts')
  const products = await api.get<Product[]>('/products')
  const users = await api.get<User[]>('/users')

  return orders.data.map(order => ({
    ...order,
    products: order.products.map(orderProduct => ({
      ...orderProduct,
      product: products.data.find(
        product => product.id === orderProduct.productId
      )!
    })),
    user: users.data.find(user => user.id === order.userId)!
  }))
}

const useOrders = () =>
  useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: fetchOrders
  })

export default useOrders
