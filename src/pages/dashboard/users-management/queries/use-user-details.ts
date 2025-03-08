import { APIUser } from '@/hooks/use-orders'
import api from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

const fetchUserDetails = async (userId: number) => {
  const { data } = await api.get(`/users/${userId}`)
  return data
}

export const useUserDetails = (userId: number) =>
  useQuery<APIUser>({
    queryKey: ['users', userId],
    queryFn: () => fetchUserDetails(userId)
  })
