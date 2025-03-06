import api from '@/lib/api'
import { Product } from '@/lib/types'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

type EditProduct = Omit<Product, 'rating'>

const updateProduct = async (product: EditProduct) => {
  const { data } = await api.put(`/products/${product.id}`, product)
  return data
}

export const useUpdateProduct = (
  opts: UseMutationOptions<Product, AxiosError, EditProduct>
) =>
  useMutation({
    mutationFn: updateProduct,
    onError: error => {
      const errMsg =
        error instanceof AxiosError
          ? (error.response?.data as string)
          : 'Something went wrong while editing a new product!'
      toast.error(errMsg)
    },
    ...opts
  })
