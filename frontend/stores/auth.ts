import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { useCookie } from 'nuxt/app'

interface DecodedToken {
  email: string
  sub: string
  name?: string
  picture?: string
  exp?: number
}

interface UserState {
  id: string
  email: string
  name?: string
  picture?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | UserState,
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user,
    token(): string | null {
      if (import.meta.client) {
        return useCookie<string | null>('token').value
      }
      return null
    }
  },
  
  actions: {
    setToken(token: string) {
      if (import.meta.client) {
        const tokenCookie = useCookie<string | null>('token', {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
          sameSite: 'lax',
        })
        tokenCookie.value = token
        this.syncUser()
      }
    },
    
    syncUser() {
      if (!import.meta.client) return
      
      const tokenCookie = useCookie<string | null>('token')
      const token = tokenCookie.value
      
      if (!token) {
        this.user = null
        return
      }
      
      try {
        const decoded = jwtDecode<DecodedToken>(token)
        this.user = {
          id: decoded.sub,
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
        }
      } catch (e) {
        console.error('Invalid token', e)
        this.user = null
        tokenCookie.value = null
      }
    },
    
    logout() {
      if (import.meta.client) {
        const tokenCookie = useCookie<string | null>('token')
        tokenCookie.value = null
      }
      this.user = null
    }
  }
})
