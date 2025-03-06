import { APIUser } from '@/hooks/use-orders'
import api from '@/lib/api'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

const deleteUser = async (userId: number) => {
  const { data } = await api.delete(`/users/${userId}`)
  return data
}

export const useDeleteUser = (
  opts: UseMutationOptions<APIUser, AxiosError, number>
) =>
  useMutation({
    mutationFn: deleteUser,
    onSuccess: data => {
      toast.success('User deleted successfully! ' + JSON.stringify(data))
    },
    onError: error => {
      const errMsg =
        error instanceof AxiosError
          ? (error.response?.data as string)
          : 'Something went wrong while deleting a new user!'
      toast.error(errMsg)
    },
    ...opts
  })
