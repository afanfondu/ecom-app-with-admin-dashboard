import api from '@/lib/api'
import { Product } from '@/lib/types'
import { onError } from '@/lib/utils'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

type NewProduct = Omit<Product, 'id' | 'rating'>

const addProduct = async (product: NewProduct) => {
  const { data } = await api.post<Product>('/products', product)
  return data
}

export const useAddProduct = (
  opts: UseMutationOptions<Product, AxiosError, NewProduct>
) =>
  useMutation({
    mutationFn: addProduct,
    onError,
    ...opts
  })
