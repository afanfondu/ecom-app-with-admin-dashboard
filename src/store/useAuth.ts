import config from '@/lib/config'
import { Role, User } from '@/lib/types'
import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  token: string | null
  user: User | null

  setAuth: (token: string) => void
  removeAuth: () => void
}

type Token = {
  sub: number
  user: string
  iat: number
}

const persistKey = `${config.appName}-auth`

const useAuth = create<AuthState>()(
  persist(
    set => ({
      token: null,
      user: null,

      setAuth: (token: string) => {
        const user = jwtDecode(token) as Token
        set({
          token,
          user: {
            id: user.sub,
            name: user.user,
            role:
              user.user === 'donero'
                ? Role.Admin
                : user.user === 'johnd'
                  ? Role.Staff
                  : Role.User
          }
        })
      },

      removeAuth: () => set({ user: null, token: null })
    }),
    {
      name: persistKey
    }
  )
)

export default useAuth
