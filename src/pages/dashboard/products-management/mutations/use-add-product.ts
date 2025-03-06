import api from '@/lib/api'
import { Product } from '@/lib/types'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

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
    onError: error => {
      const errMsg =
        error instanceof AxiosError
          ? (error.response?.data as string)
          : 'Something went wrong while adding a new product!'
      toast.error(errMsg)
    },
    ...opts
  })
