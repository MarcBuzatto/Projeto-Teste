<template>
  <div class="max-w-4xl mx-auto">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <div class="mb-6">
        <Icon name="mdi:rocket-launch" class="text-blue-400 text-6xl mx-auto" />
      </div>
      <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Bem-vindo ao eMiolo Test
      </h1>
      <p class="text-xl text-gray-300">
        Projeto de teste técnico desenvolvido com NestJS, Nuxt 3 e MongoDB
      </p>
    </div>

    <!-- Features Grid -->
    <div class="grid md:grid-cols-2 gap-6 mb-12">
      <!-- Backend Feature -->
      <div class="bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
        <div class="flex items-center mb-4">
          <Icon name="mdi:server" class="text-green-400 text-3xl mr-3" />
          <h2 class="text-2xl font-semibold">Backend (NestJS)</h2>
        </div>
        <ul class="space-y-2 text-gray-300">
          <li class="flex items-start">
            <Icon name="mdi:check-circle" class="text-green-400 mr-2 mt-1" />
            <span>Autenticação Google OAuth2</span>
          </li>
          <li class="flex items-start">
            <Icon name="mdi:check-circle" class="text-green-400 mr-2 mt-1" />
            <span>Integração com MongoDB</span>
          </li>
          <li class="flex items-start">
            <Icon name="mdi:check-circle" class="text-green-400 mr-2 mt-1" />
            <span>API REST para gerenciamento de usuários</span>
          </li>
          <li class="flex items-start">
            <Icon name="mdi:check-circle" class="text-green-400 mr-2 mt-1" />
            <span>Integração com SWAPI (Star Wars API)</span>
          </li>
        </ul>
      </div>

      <!-- Frontend Feature -->
      <div class="bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
        <div class="flex items-center mb-4">
          <Icon name="mdi:application" class="text-blue-400 text-3xl mr-3" />
          <h2 class="text-2xl font-semibold">Frontend (Nuxt 3)</h2>
        </div>
        <ul class="space-y-2 text-gray-300">
          <li class="flex items-start">
            <Icon name="mdi:check-circle" class="text-blue-400 mr-2 mt-1" />
            <span>Interface moderna com Tailwind CSS</span>
          </li>
          <li class="flex items-start">
            <Icon name="mdi:check-circle" class="text-blue-400 mr-2 mt-1" />
            <span>Gerenciamento de estado com Pinia</span>
          </li>
          <li class="flex items-start">
            <Icon name="mdi:check-circle" class="text-blue-400 mr-2 mt-1" />
            <span>Tema escuro responsivo</span>
          </li>
          <li class="flex items-start">
            <Icon name="mdi:check-circle" class="text-blue-400 mr-2 mt-1" />
            <span>Navegação fluida entre páginas</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Tech Stack -->
    <div class="bg-slate-800 rounded-lg p-8 shadow-lg">
      <h2 class="text-3xl font-bold mb-6 text-center">Stack Tecnológica</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="text-center">
          <Icon name="mdi:nodejs" class="text-green-500 text-5xl mx-auto mb-2" />
          <p class="font-semibold">NestJS</p>
        </div>
        <div class="text-center">
          <Icon name="mdi:vuejs" class="text-green-400 text-5xl mx-auto mb-2" />
          <p class="font-semibold">Nuxt 3</p>
        </div>
        <div class="text-center">
          <Icon name="mdi:database" class="text-green-600 text-5xl mx-auto mb-2" />
          <p class="font-semibold">MongoDB</p>
        </div>
        <div class="text-center">
          <Icon name="mdi:docker" class="text-blue-500 text-5xl mx-auto mb-2" />
          <p class="font-semibold">Docker</p>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="mt-12 text-center">
      <p class="text-lg text-gray-300 mb-6">
        Explore as funcionalidades navegando pelo menu acima
      </p>
      <div class="flex justify-center gap-4">
        <NuxtLink 
          to="/users" 
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center"
        >
          <Icon name="mdi:account-group" class="mr-2 text-xl" />
          Ver Usuários
        </NuxtLink>
        <NuxtLink 
          to="/starwars" 
          class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center"
        >
          <Icon name="mdi:space-invaders" class="mr-2 text-xl" />
          Explorar Star Wars
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Home page
</script>
