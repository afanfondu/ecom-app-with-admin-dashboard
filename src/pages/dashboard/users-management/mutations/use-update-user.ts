import { APIUser } from '@/hooks/use-orders'
import api from '@/lib/api'
import { onError } from '@/lib/utils'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

const updateUser = async (user: APIUser) => {
  const { data } = await api.put(`/users/${user.id}`, user)
  return data
}

export const useUpdateUser = (
  opts: UseMutationOptions<APIUser, AxiosError, APIUser>
) =>
  useMutation({
    mutationFn: updateUser,
    onError,
    ...opts
  })
