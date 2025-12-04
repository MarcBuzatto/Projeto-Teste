<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100">
    <div class="max-w-7xl mx-auto px-6 py-12">
      <header class="mb-8">
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400">Lista de Usuários</span>
        </h1>
      </header>

      <div v-if="pending" class="flex items-center justify-center py-12">
        <Icon name="mdi:loading" class="animate-spin text-4xl text-purple-400" />
        <span class="ml-3 text-gray-300">Carregando usuários...</span>
      </div>

      <div v-else-if="error" class="bg-red-900/40 border border-red-700 text-red-200 p-4 rounded">
        Ocorreu um erro ao carregar os usuários.
      </div>

      <div v-else>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="user in users" :key="user._id" class="group relative overflow-hidden rounded-2xl border border-purple-700 bg-gray-900/50 p-6 shadow-lg hover:shadow-purple-800/30 transition-all">
            <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#a855f7_0,transparent_40%),radial-gradient(circle_at_80%_80%,#06b6d4_0,transparent_40%)]"></div>
            <div class="relative z-10">
              <div class="flex items-center mb-4">
                <img v-if="user.picture" :src="user.picture" alt="Foto" class="w-12 h-12 rounded-full mr-4 border border-slate-700" />
                <div>
                  <h2 class="text-xl font-semibold">{{ user.name }}</h2>
                  <p class="text-gray-400 text-sm">{{ user.email }}</p>
                </div>
              </div>
              <div class="flex items-center text-sm text-gray-400">
                <Icon name="mdi:calendar" class="mr-2" />
                <span>Criação: {{ formatDate(user.createdAt) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFetch } from 'nuxt/app'

type User = {
  _id: string
  name: string
  email: string
  picture?: string
  createdAt?: string | Date
}

// declare const definePageMeta: (meta: any) => void
// definePageMeta({ middleware: ['auth'] })

const { data, pending, error } = await useFetch<User[]>('http://localhost:3000/users')

const users = computed<User[]>(() => (data?.value ?? []) as User[])

function formatDate(d?: string | Date) {
  try {
    const date = new Date(d as any)
    return date.toLocaleString()
  } catch {
    return '-'
  }
}
</script>
