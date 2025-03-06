import api from '@/lib/api'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { UserFormType } from '../schema'
import { APIUser } from '@/hooks/use-orders'

const addUser = async (user: UserFormType) => {
  const { data } = await api.post<APIUser>('/users', user)
  return data
}

export const useAddUser = (
  opts: UseMutationOptions<APIUser, AxiosError, UserFormType>
) =>
  useMutation({
    mutationFn: addUser,
    onError: error => {
      const errMsg =
        error instanceof AxiosError
          ? (error.response?.data as string)
          : 'Something went wrong while adding a new product!'
      toast.error(errMsg)
    },
    ...opts
  })
