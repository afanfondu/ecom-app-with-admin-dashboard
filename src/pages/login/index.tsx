import { useEffect } from 'react'
import { LoginForm } from './login-form'
import { useNavigate } from 'react-router'
import useAuth from '@/store/useAuth'

const LoginPage = () => {
  const user = useAuth(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  return (
    <div className="w-full max-w-sm mx-auto mt-24">
      <LoginForm />
    </div>
  )
}

export default LoginPage
