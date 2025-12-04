// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/icon'
  ],

  imports: {
    dirs: ['stores']
  },

  devServer: {
    port: 3001
  },

  routeRules: {
    '/dashboard': { ssr: false }
  }
})
