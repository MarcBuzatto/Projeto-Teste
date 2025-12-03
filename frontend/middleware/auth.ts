export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie<string | null>('token')
  if (!token.value) {
    return navigateTo('/')
  }
})