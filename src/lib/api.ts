import axios from 'axios'

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(res => {
  console.log(
    res.config.method?.toUpperCase().padEnd(6),
    res.config.url,
    res.config.params,
    res.status
  )
  return res
})

export default api
