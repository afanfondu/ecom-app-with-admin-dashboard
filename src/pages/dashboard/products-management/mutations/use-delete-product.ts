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
    onSuccess: data => {
      toast.success('Product deleted successfully! ' + JSON.stringify(data))
    },
    onError: error => {
      const errMsg =
        error instanceof AxiosError
          ? (error.response?.data as string)
          : 'Something went wrong while deleting a product'
      toast.error(errMsg)
    },
    ...opts
  })
