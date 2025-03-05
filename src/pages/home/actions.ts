import api from '@/lib/api'

export async function fetchCategories() {
  const { data } = await api.get('/products/categories')
  return data
}
