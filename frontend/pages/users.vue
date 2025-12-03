<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Usuários</h1>

    <div v-if="pending" class="flex items-center justify-center py-12">
      <Icon name="mdi:loading" class="animate-spin text-4xl text-blue-400" />
      <span class="ml-3 text-gray-300">Carregando usuários...</span>
    </div>

    <div v-else-if="error" class="bg-red-900/40 border border-red-700 text-red-200 p-4 rounded">
      Ocorreu um erro ao carregar os usuários.
    </div>

    <div v-else>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="user in users" :key="user._id" class="bg-slate-800 rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
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
</template>

<script setup lang="ts">
declare const definePageMeta: (meta: any) => void
definePageMeta({ middleware: ['auth'] })
const { data, pending, error } = await useFetch('http://localhost:3000/users')

const users = computed(() => data?.value ?? [])

function formatDate(d?: string | Date) {
  try {
    const date = new Date(d as any)
    return date.toLocaleString()
  } catch {
    return '-'
  }
}
</script>
