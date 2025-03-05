import api from '@/lib/api'
import { Product } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'

type ProductsParams = {
  limit?: string | null
  sort?: string | null
}

const fetchProducts = async ({
  limit,
  sort
}: Omit<ProductsParams, 'category'>) => {
  const { data } = await api.get('/products', {
    params: { limit, sort }
  })
  return data
}

const useProducts = ({ sort, limit }: ProductsParams) => {
  sort = sort ?? 'asc'
  limit = limit ?? '20'
  return useQuery<Product[]>({
    queryKey: ['products', sort ?? 'asc', limit ?? '20'],
    queryFn: () => fetchProducts({ limit, sort })
  })
}

export default useProducts
