import api from '@/lib/api'
import { Product } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'

const fetchProductDetails = async (productId: string) => {
  const { data } = await api.get(`/products/${productId}`)
  return data
}

const useProductDetails = (productId: string) =>
  useQuery<Product>({
    queryKey: ['products', productId],
    queryFn: () => fetchProductDetails(productId)
  })

export default useProductDetails
