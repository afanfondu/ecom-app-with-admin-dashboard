import api from '@/lib/api'
import { Product } from '@/lib/types'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

const deleteProduct = async (productId: number) => {
  const { data } = await api.delete(`/products/${productId}`)
  return data
}

export const useDeleteProduct = (
  opts: UseMutationOptions<Product, AxiosError, number>
) =>
  useMutation({
    mutationFn: deleteProduct,
    onError: error => {
      const errMsg =
        error instanceof AxiosError
          ? (error.response?.data as string)
          : 'Something went wrong while deleting a new product!'
      toast.error(errMsg)
    },
    ...opts
  })
