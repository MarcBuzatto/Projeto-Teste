<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Star Wars</h1>

    <div class="flex gap-3 mb-6">
      <button
        class="px-4 py-2 rounded-lg"
        :class="tab === 'people' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-200'"
        @click="tab = 'people'"
      >
        Personagens
      </button>
      <button
        class="px-4 py-2 rounded-lg"
        :class="tab === 'planets' ? 'bg-purple-600 text-white' : 'bg-slate-700 text-gray-200'"
        @click="tab = 'planets'"
      >
        Planetas
      </button>
    </div>

    <div v-if="pending" class="flex items-center justify-center py-12">
      <Icon name="mdi:loading" class="animate-spin text-4xl text-blue-400" />
      <span class="ml-3 text-gray-300">Carregando dados do Star Wars...</span>
    </div>

    <div v-else-if="error" class="bg-red-900/40 border border-red-700 text-red-200 p-4 rounded">
      Ocorreu um erro ao carregar os dados.
    </div>

    <div v-else>
      <div v-if="tab === 'people'">
        <div class="bg-slate-800 rounded-xl p-6">
          <h2 class="text-2xl font-semibold mb-4">Personagens</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div v-for="p in (data as any)?.results ?? []" :key="p.name" class="bg-slate-700 rounded-lg p-4">
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
      <div v-else>
        <div class="bg-slate-800 rounded-xl p-6">
          <h2 class="text-2xl font-semibold mb-4">Planetas</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div v-for="pl in (data as any)?.results ?? []" :key="pl.name" class="bg-slate-700 rounded-lg p-4">
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
