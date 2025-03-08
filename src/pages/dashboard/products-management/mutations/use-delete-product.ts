import api from '@/lib/api'
import { Product } from '@/lib/types'
import { onError } from '@/lib/utils'
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
      toast.success(`Product with ID ${data.id} has been deleted.`)
    },
    onError,
    ...opts
  })
