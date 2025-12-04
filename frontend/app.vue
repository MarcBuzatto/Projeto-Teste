<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Importação MANUAL para evitar erros de resolução
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(() => {
  if (import.meta.client) {
    authStore.syncUser();
  }
});
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: #0f172a;
  min-height: 100vh;
}

#__nuxt {
  min-height: 100vh;
}
</style>