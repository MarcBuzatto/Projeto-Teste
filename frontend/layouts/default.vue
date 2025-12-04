<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
    <!-- Navbar Sticky Cyberpunk -->
    <nav class="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-cyan-500/30">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <div class="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">
              <span class="text-white font-bold text-sm">T</span>
            </div>
            <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 hidden sm:inline">
              TechTest
            </span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-8">
            <NuxtLink
              to="/"
              class="text-slate-300 hover:text-cyan-400 transition-colors font-mono text-sm"
              active-class="text-cyan-400"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/users"
              class="text-slate-300 hover:text-cyan-400 transition-colors font-mono text-sm"
              active-class="text-cyan-400"
            >
              Usuários
            </NuxtLink>
            <NuxtLink
              to="/starwars"
              class="text-slate-300 hover:text-cyan-400 transition-colors font-mono text-sm"
              active-class="text-cyan-400"
            >
              Star Wars
            </NuxtLink>
            <NuxtLink
              to="/dashboard"
              class="text-slate-300 hover:text-cyan-400 transition-colors font-mono text-sm"
              active-class="text-cyan-400"
            >
              Dashboard
            </NuxtLink>
          </div>

          <!-- Right Side: Auth + Mobile Menu Button -->
          <div class="flex items-center gap-4">
            <!-- Auth Area (Client-only to avoid SSR hydration mismatch) -->
            <ClientOnly>
              <div v-if="auth.user" class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full overflow-hidden border border-cyan-500/50 hover:border-cyan-400 transition-colors">
                  <img v-if="auth.user?.picture" :src="auth.user.picture" :alt="auth.user?.name" class="w-full h-full object-cover" />
                </div>
                <span class="hidden sm:inline text-sm text-slate-300 font-mono">
                  {{ auth.user?.name?.split(' ')[0] }}
                </span>
                <button
                  @click="logout"
                  class="hidden sm:block px-3 py-1 text-sm rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/40 border border-red-500/30 hover:border-red-500 transition-all"
                >
                  Sair
                </button>
              </div>
              <a
                v-else
                href="http://localhost:3000/auth/google"
                class="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Login
              </a>
            </ClientOnly>

            <!-- Mobile Menu Button -->
            <button
              class="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-cyan-500/30 hover:border-cyan-500 transition-colors"
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              :aria-label="isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'"
            >
              <svg v-if="!isMobileMenuOpen" class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div v-if="isMobileMenuOpen" class="md:hidden mt-4 pt-4 border-t border-cyan-500/20 space-y-3">
            <NuxtLink
              to="/"
              class="block px-4 py-2 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors font-mono text-sm"
              active-class="text-cyan-400 bg-cyan-500/10"
              @click="isMobileMenuOpen = false"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/users"
              class="block px-4 py-2 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors font-mono text-sm"
              active-class="text-cyan-400 bg-cyan-500/10"
              @click="isMobileMenuOpen = false"
            >
              Usuários
            </NuxtLink>
            <NuxtLink
              to="/starwars"
              class="block px-4 py-2 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors font-mono text-sm"
              active-class="text-cyan-400 bg-cyan-500/10"
              @click="isMobileMenuOpen = false"
            >
              Star Wars
            </NuxtLink>
            <NuxtLink
              to="/dashboard"
              class="block px-4 py-2 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors font-mono text-sm"
              active-class="text-cyan-400 bg-cyan-500/10"
              @click="isMobileMenuOpen = false"
            >
              Dashboard
            </NuxtLink>
            <ClientOnly>
              <button
                v-if="auth.user"
                @click="logout"
                class="w-full mt-2 px-4 py-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/40 border border-red-500/30 hover:border-red-500 transition-all text-sm font-mono"
              >
                Sair
              </button>
            </ClientOnly>
          </div>
        </transition>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1 w-full">
      <slot />
    </main>

    <!-- Rodapé Único -->
    <footer class="mt-auto border-t border-cyan-500/30 bg-slate-950/60 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <!-- Branding -->
          <div>
            <h3 class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-3">
              TechTest
            </h3>
            <p class="text-sm text-slate-400">
              Plataforma de teste integrada com NestJS, Nuxt e MongoDB.
            </p>
          </div>

          <!-- Navigation -->
          <div>
            <h4 class="text-sm font-bold text-slate-300 mb-3">Navegação</h4>
            <ul class="space-y-2 text-sm text-slate-400">
              <li>
                <NuxtLink to="/" class="hover:text-cyan-400 transition-colors">
                  Home
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/users" class="hover:text-cyan-400 transition-colors">
                  Usuários
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/starwars" class="hover:text-cyan-400 transition-colors">
                  Star Wars
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/dashboard" class="hover:text-cyan-400 transition-colors">
                  Dashboard
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Tech Stack -->
          <div>
            <h4 class="text-sm font-bold text-slate-300 mb-3">Tech Stack</h4>
            <ul class="space-y-2 text-sm text-slate-400">
              <li>NestJS</li>
              <li>Nuxt 3</li>
              <li>MongoDB</li>
              <li>Socket.io</li>
            </ul>
          </div>

          <!-- Status -->
          <div>
            <h4 class="text-sm font-bold text-slate-300 mb-3">Status</h4>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span class="text-sm text-slate-400">Sistema Operacional</span>
            </div>
          </div>
        </div>

        <!-- Bottom -->
        <div class="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2025 TechTest. Todos os direitos reservados.</p>
          <div class="flex gap-4 mt-4 md:mt-0">
            <a href="#" class="hover:text-cyan-400 transition-colors">Privacidade</a>
            <a href="#" class="hover:text-cyan-400 transition-colors">Termos</a>
            <a href="#" class="hover:text-cyan-400 transition-colors">Contato</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const isMobileMenuOpen = ref(false)

// Sync user on mount
auth.syncUser()

const logout = () => {
  auth.logout()
  isMobileMenuOpen.value = false
}
</script>
