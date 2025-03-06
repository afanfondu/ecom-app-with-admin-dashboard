import { APIUser } from '@/hooks/use-orders'
import api from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

const fetchUsers = async () => {
  const { data } = await api.get('/users')
  return data
}

const useUsers = () =>
  useQuery<APIUser[]>({
    queryKey: ['users'],
    queryFn: fetchUsers
  })

export default useUsers
