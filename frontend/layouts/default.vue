<template>
  <div class="min-h-screen bg-slate-900 text-gray-100">
    <!-- Navbar -->
    <nav class="fixed top-0 left-0 right-0 bg-slate-800 shadow-lg z-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-2">
            <Icon name="mdi:rocket-launch" class="text-blue-400 text-2xl" />
            <span class="text-xl font-bold text-white">eMiolo Test</span>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-6">
            <NuxtLink 
              to="/" 
              class="hover:text-blue-400 transition-colors duration-200"
              active-class="text-blue-400 font-semibold"
            >
              Home
            </NuxtLink>
            <NuxtLink 
              to="/users" 
              class="hover:text-blue-400 transition-colors duration-200"
              active-class="text-blue-400 font-semibold"
            >
              Usuários
            </NuxtLink>
            <NuxtLink 
              to="/starwars" 
              class="hover:text-blue-400 transition-colors duration-200"
              active-class="text-blue-400 font-semibold"
            >
              Star Wars
            </NuxtLink>
          </div>

          <!-- Auth Area -->
          <div>
            <template v-if="auth.user">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-full bg-slate-700 overflow-hidden border border-slate-600">
                  <img v-if="avatarUrl" :src="avatarUrl" alt="Avatar" class="w-full h-full object-cover" />
                </div>
                <span class="text-sm">{{ auth.user.email }}</span>
                <button @click="logout" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                  Sair
                </button>
              </div>
            </template>
            <template v-else>
              <a 
                href="http://localhost:3000/auth/google" 
                class="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Icon name="mdi:google" class="text-xl" />
                <span>Login com Google</span>
              </a>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="pt-20 container mx-auto px-4 py-8">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-slate-800 mt-16">
      <div class="container mx-auto px-4 py-6 text-center text-gray-400">
        <p>&copy; 2025 eMiolo Test - Projeto de Teste Técnico</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const avatarUrl = computed(() => null)
const logout = () => auth.logout()
</script>
