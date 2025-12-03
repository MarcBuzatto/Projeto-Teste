import { defineStore } from 'pinia'
import jwtDecode from 'jwt-decode'
import { useCookie } from 'nuxt/app'

interface DecodedToken {
  email: string
  sub: string
  name?: string
  picture?: string
  exp?: number
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    tokenCookie: useCookie<string | null>('token'),
    user: null as null | { id: string; email: string; name?: string; picture?: string },
  }),
  actions: {
    setToken(token: string) {
      this.tokenCookie.value = token
      this.syncUser()
    },
    syncUser() {
      const token = this.tokenCookie.value
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
      }
    },
    logout() {
      this.tokenCookie.value = null
      this.user = null
    }
  }
})
