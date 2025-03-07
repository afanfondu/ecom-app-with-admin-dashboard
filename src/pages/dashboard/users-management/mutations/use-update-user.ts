import { APIUser } from '@/hooks/use-orders'
import api from '@/lib/api'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

const updateUser = async (user: APIUser) => {
  const { data } = await api.put(`/users/${user.id}`, user)
  return data
}

export const useUpdateUser = (
  opts: UseMutationOptions<APIUser, AxiosError, APIUser>
) =>
  useMutation({
    mutationFn: updateUser,
    onError: error => {
      const errMsg =
        error instanceof AxiosError
          ? (error.response?.data as string)
          : 'Something went wrong while editing a new product!'
      toast.error(errMsg)
    },
    ...opts
  })
