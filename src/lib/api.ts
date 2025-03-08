import axios from 'axios'
import { toast } from 'sonner'

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(res => {
  if (res.config.method !== 'get') {
    toast.info(
      `${res.config.method?.toUpperCase()} ${res.config.url} ${res.status}`
    )
  }
  return res
})

export default api
