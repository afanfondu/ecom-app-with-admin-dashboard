import api from '@/lib/api'
import { Product } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'

type CategoryProductsParams = {
  category: string | null
  limit: string | null
  sort: string | null
}

const fetchCategoryProducts = async ({
  category,
  limit,
  sort
}: CategoryProductsParams) => {
  const { data } = await api.get(`/products/category/${category}`, {
    params: { limit, sort }
  })
  return data
}

const useCategoryProducts = ({
  category,
  limit,
  sort
}: CategoryProductsParams) => {
  limit = limit ?? '20'
  sort = sort ?? 'asc'

  return useQuery<Product[]>({
    queryKey: ['products', 'category', category, limit, sort],
    queryFn: () => fetchCategoryProducts({ category, limit, sort })
  })
}

export default useCategoryProducts
