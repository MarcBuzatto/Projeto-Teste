<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100">
    <div class="max-w-6xl mx-auto px-6 py-16">
      <header class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400">
            Tech Test
          </span>
        </h1>
        <p class="mt-4 text-gray-300">Nuxt 3 + Tailwind + NestJS + MongoDB</p>
      </header>

      <section class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <NuxtLink
          to="/users"
          class="group relative overflow-hidden rounded-2xl border border-purple-700 bg-gray-900/50 p-8 shadow-lg hover:shadow-purple-800/30 transition-all"
        >
          <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#a855f7_0,transparent_40%),radial-gradient(circle_at_80%_80%,#06b6d4_0,transparent_40%)]"></div>
          <div class="relative z-10">
            <div class="flex items-center gap-4 mb-4">
              <span class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-700/30 text-purple-300 border border-purple-500/30">
                <!-- Ícone simplificado para evitar erros de parsing -->
                <span class="w-7 h-7 rounded bg-purple-600/40 border border-purple-500/40"></span>
              </span>
              <h2 class="text-2xl font-bold">Lista de Usuários</h2>
            </div>
            <p class="text-gray-300">Gerencie e visualize usuários cadastrados.</p>
            <div class="mt-6">
              <span class="inline-block px-5 py-3 rounded-xl bg-purple-600 text-white font-semibold group-hover:bg-purple-500 transition-colors">Ir para Usuários →</span>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/starwars"
          class="group relative overflow-hidden rounded-2xl border border-cyan-700 bg-gray-900/50 p-8 shadow-lg hover:shadow-cyan-800/30 transition-all"
        >
          <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_70%,#22d3ee_0,transparent_40%),radial-gradient(circle_at_70%_30%,#64748b_0,transparent_40%)]"></div>
          <div class="relative z-10">
            <div class="flex items-center gap-4 mb-4">
              <span class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-700/30 text-cyan-300 border border-cyan-500/30">
                <!-- Ícone simplificado para evitar erros de parsing -->
                <span class="w-7 h-7 rounded bg-cyan-600/40 border border-cyan-500/40"></span>
              </span>
              <h2 class="text-2xl font-bold">Star Wars API</h2>
            </div>
            <p class="text-gray-300">Explore dados dos personagens e planetas.</p>
            <div class="mt-6">
              <span class="inline-block px-5 py-3 rounded-xl bg-cyan-600 text-white font-semibold group-hover:bg-cyan-500 transition-colors">Explorar Star Wars →</span>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/dashboard"
          class="group relative overflow-hidden rounded-2xl border border-red-700 bg-gray-900/50 p-8 shadow-lg hover:shadow-red-800/30 transition-all"
        >
          <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_40%_40%,#ef4444_0,transparent_40%),radial-gradient(circle_at_60%_60%,#f97316_0,transparent_40%)]"></div>
          <div class="relative z-10">
            <div class="flex items-center gap-4 mb-4">
              <span class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-700/30 text-red-300 border border-red-500/30">
                <!-- Ícone simplificado para evitar erros de parsing -->
                <span class="w-7 h-7 rounded bg-red-600/40 border border-red-500/40"></span>
              </span>
              <h2 class="text-2xl font-bold">Cyber Dashboard</h2>
            </div>
            <p class="text-gray-300">Monitor em tempo real de análises de segurança.</p>
            <div class="mt-6">
              <span class="inline-block px-5 py-3 rounded-xl bg-red-600 text-white font-semibold group-hover:bg-red-500 transition-colors">Acessar Dashboard →</span>
            </div>
          </div>
        </NuxtLink>
      </section>

      <footer class="mt-16 text-center text-sm text-gray-400">
        <p></p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
// Página inicial estilizada com tema dark/cyberpunk
</script>