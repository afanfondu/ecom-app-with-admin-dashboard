import api from '@/lib/api'
import { LoginFormValues } from './schema'

export const login = async (loginData: LoginFormValues) => {
  const { data } = await api.post('/auth/login', loginData)
  return data
}
