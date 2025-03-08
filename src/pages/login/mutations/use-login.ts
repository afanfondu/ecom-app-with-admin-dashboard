import { onError } from '@/lib/utils'
import { MutationOptions, useMutation } from '@tanstack/react-query'
import api from '@/lib/api'
import { LoginFormValues } from '../schema'
import { AxiosError } from 'axios'

export const login = async (loginData: LoginFormValues) => {
  const { data } = await api.post('/auth/login', loginData)
  return data
}

export const useLogin = (
  opts: MutationOptions<{ token: string }, AxiosError, LoginFormValues>
) => {
  return useMutation({
    mutationFn: login,
    onError,
    ...opts
  })
}
