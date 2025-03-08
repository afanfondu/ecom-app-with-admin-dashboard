import { APIUser } from '@/hooks/use-orders'
import api from '@/lib/api'
import { onError } from '@/lib/utils'
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
      toast.success(`User with ID ${data.id} has been deleted.`)
    },
    onError,
    ...opts
  })
