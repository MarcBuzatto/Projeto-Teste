<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100">
    <div class="max-w-7xl mx-auto px-6 py-12">
      <header class="mb-8">
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500">Star Wars API</span>
        </h1>
      </header>

      <div class="flex gap-3 mb-6">
        <button
          class="px-4 py-2 rounded-lg border border-cyan-700"
          :class="tab === 'people' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-gray-200'"
          @click="tab = 'people'"
        >
          Personagens
        </button>
        <button
          class="px-4 py-2 rounded-lg border border-purple-700"
          :class="tab === 'planets' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-gray-200'"
          @click="tab = 'planets'"
        >
          Planetas
        </button>
      </div>

      <div v-if="pending" class="flex items-center justify-center py-12">
        <Icon name="mdi:loading" class="animate-spin text-4xl text-cyan-400" />
        <span class="ml-3 text-gray-300">Carregando dados do Star Wars...</span>
      </div>

      <div v-else-if="error" class="bg-red-900/40 border border-red-700 text-red-200 p-4 rounded">
        Ocorreu um erro ao carregar os dados.
      </div>

      <div v-else>
        <div v-if="tab === 'people'" class="group relative overflow-hidden rounded-2xl border border-cyan-700 bg-gray-900/50 p-6 shadow-lg hover:shadow-cyan-800/30 transition-all">
          <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_70%,#22d3ee_0,transparent_40%),radial-gradient(circle_at_70%_30%,#64748b_0,transparent_40%)]"></div>
          <div class="relative z-10">
            <h2 class="text-2xl font-semibold mb-4">Personagens</h2>
            <div class="grid md:grid-cols-2 gap-4">
              <div v-for="p in (data as any)?.results ?? []" :key="p.name" class="bg-slate-800 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <span class="font-semibold">{{ p.name }}</span>
                  <span class="text-sm text-gray-300">Altura: {{ p.height }}</span>
                </div>
                <div class="text-sm text-gray-400">Gênero: {{ p.gender }}</div>
                <div class="text-sm text-gray-400">Nascimento: {{ p.birth_year }}</div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="group relative overflow-hidden rounded-2xl border border-purple-700 bg-gray-900/50 p-6 shadow-lg hover:shadow-purple-800/30 transition-all">
          <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#a855f7_0,transparent_40%),radial-gradient(circle_at_80%_80%,#06b6d4_0,transparent_40%)]"></div>
          <div class="relative z-10">
            <h2 class="text-2xl font-semibold mb-4">Planetas</h2>
            <div class="grid md:grid-cols-2 gap-4">
              <div v-for="pl in (data as any)?.results ?? []" :key="pl.name" class="bg-slate-800 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <span class="font-semibold">{{ pl.name }}</span>
                  <span class="text-sm text-gray-300">População: {{ pl.population }}</span>
                </div>
                <div class="text-sm text-gray-400">Clima: {{ pl.climate }}</div>
                <div class="text-sm text-gray-400">Terreno: {{ pl.terrain }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Nuxt auto-importa definePageMeta em runtime; em TS, declare global
declare const definePageMeta: (meta: any) => void
definePageMeta({ middleware: ['auth'] })
import { ref, computed } from 'vue'
import { useFetch } from 'nuxt/app'

const tab = ref<'people' | 'planets'>('people')

const url = computed(() =>
  tab.value === 'people'
    ? 'http://localhost:3000/swapi/people'
    : 'http://localhost:3000/swapi/planets'
)

const { data, pending, error } = await useFetch(url)
</script>
