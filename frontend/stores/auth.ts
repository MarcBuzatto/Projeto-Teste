import { defineStore } from 'pinia'
import jwtDecode from 'jwt-decode'

interface DecodedToken {
  email: string
  sub: string
  exp?: number
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '' as string,
    user: null as null | { email: string; id: string },
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      try {
        const decoded = jwtDecode<DecodedToken>(token)
        this.user = { email: decoded.email, id: decoded.sub }
      } catch (e) {
        console.error('Invalid token', e)
      }
    },
    logout() {
      this.token = ''
      this.user = null
    }
  }
})
