<template>
  <div class="max-w-md mx-auto text-center">
    <h1 class="text-3xl font-bold mb-4">Login</h1>
    <p class="text-gray-300">Processando autenticação...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

onMounted(() => {
  const token = route.query.token as string | undefined
  if (token) {
    auth.setToken(token)
    router.push('/')
  }
})
</script>
