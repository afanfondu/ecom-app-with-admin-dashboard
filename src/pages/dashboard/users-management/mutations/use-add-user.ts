import api from '@/lib/api'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserFormType } from '../schema'
import { APIUser } from '@/hooks/use-orders'
import { onError } from '@/lib/utils'

const addUser = async (user: UserFormType) => {
  const { data } = await api.post<APIUser>('/users', user)
  return data
}

export const useAddUser = (
  opts: UseMutationOptions<APIUser, AxiosError, UserFormType>
) =>
  useMutation({
    mutationFn: addUser,
    onError,
    ...opts
  })
