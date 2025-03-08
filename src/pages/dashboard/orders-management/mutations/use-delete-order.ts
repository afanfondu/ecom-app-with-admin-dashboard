import api from '@/lib/api'
import { Product } from '@/lib/types'
import { onError } from '@/lib/utils'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

const deleteOrder = async (orderId: number) => {
  const { data } = await api.delete(`/carts/${orderId}`)
  return data
}

export const useDeleteOrder = (
  opts: UseMutationOptions<Product, AxiosError, number>
) =>
  useMutation<Product, AxiosError, number>({
    mutationFn: deleteOrder,
    onError,
    ...opts
  })
