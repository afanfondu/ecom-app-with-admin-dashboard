import api from '@/lib/api'
import { Product } from '@/lib/types'
import { onError } from '@/lib/utils'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

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
    onError,
    ...opts
  })
